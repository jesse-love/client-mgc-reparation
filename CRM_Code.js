/**
 * MGC Réparation - God Mode CRM Script
 * 
 * Instructions:
 * 1. Go to https://script.google.com/home
 * 2. Create a New Project.
 * 3. Paste this code into Code.gs
 * 4. Deploy as Web App -> Execute as Me -> Who has access: Anyone (including anonymous).
 * 5. Copy the Web App URL and ensure it matches the frontend.
 */

// --- CONFIGURATION ---
const ADMIN_EMAIL = "admin@mgcreparation.ca"; // Or the effective admin email
const COMPANY_NAME = "MGC Réparation";
const CALENDAR_ID = "primary"; // Uses the executing user's calendar

// --- ENTRY POINT ---
function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);

        // 1. Create/Update Google Contact
        const contact = processContact(data);

        // 2. Schedule Appointment
        const eventId = processCalendar(data);

        // 3. Create Drive Folder
        const folderUrl = processDrive(data);

        // 4. Send Emails (Hybrid Language)
        sendEmails(data, folderUrl);

        return ContentService.createTextOutput(JSON.stringify({ status: 'success', eventId: eventId }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        // Log error to Drive or Email (Basic fail-safe)
        MailApp.sendEmail(ADMIN_EMAIL, "CRM ERROR", error.toString());
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// --- MODULE: CONTACTS ---
function processContact(data) {
    // Check if contact exists by email
    const contacts = ContactsApp.getContactsByEmail(data.email);
    let contact;

    if (contacts.length > 0) {
        contact = contacts[0];
        // Update phone if missing
        if (!contact.getPhones().length && data.phone) {
            contact.addPhone(ContactsApp.Field.MOBILE_PHONE, data.phone);
        }
    } else {
        // Create new contact
        const names = data.fullName.split(' ');
        const firstName = names[0];
        const lastName = names.slice(1).join(' ') || '';
        contact = ContactsApp.createContact(firstName, lastName, data.email);
        if (data.phone) contact.addPhone(ContactsApp.Field.MOBILE_PHONE, data.phone);
    }

    // Add Group/Label
    const groupName = "MGC Leads";
    let group = ContactsApp.getContactGroup(groupName);
    if (!group) group = ContactsApp.createContactGroup(groupName);
    contact.addToGroup(group);

    // Add Note with Vehicle Info
    const note = `Vehicle: ${data.vehicleYear || ''} ${data.vehicleMake || ''} ${data.vehicleModel || ''}\nType: ${data.vehicleType}\nService: ${data.serviceCategory}\nIssue: ${data.description}`;
    contact.setNotes(contact.getNotes() + "\n\n" + note);

    return contact;
}

// --- MODULE: CALENDAR ---
function processCalendar(data) {
    if (!data.appointmentDate) return null;

    const calendar = CalendarApp.getCalendarById(CALENDAR_ID);

    // Parse Date/Time
    // Assuming format YYYY-MM-DD and HH:MM
    const startTime = new Date(data.appointmentDate.replace(/-/g, '/'));
    if (data.appointmentTime) {
        const parts = data.appointmentTime.match(/(\d+):(\d+)\s?(AM|PM)?/i);
        if (parts) {
            let hours = parseInt(parts[1]);
            const minutes = parseInt(parts[2]);
            const ampm = parts[3];

            // Standardize to 24h
            if (ampm) {
                if (ampm.toUpperCase() === 'PM' && hours < 12) hours += 12;
                if (ampm.toUpperCase() === 'AM' && hours === 12) hours = 0;
            }

            startTime.setHours(hours, minutes, 0);
        } else {
            startTime.setHours(8, 0, 0); // Default 8AM if clean parse fail
        }
    } else {
        startTime.setHours(8, 0, 0); // Default to morning if no time
    }

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1); // 1 Hour Default Block

    const title = `[MGC] ${data.serviceCategory} - ${data.fullName}`;
    const description = `Vehicle: ${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}\nType: ${data.vehicleType}\n\nClient Issue: ${data.description}\n\nPhone: ${data.phone}\nEmail: ${data.email}`;

    const event = calendar.createEvent(title, startTime, endTime, {
        description: description,
        location: "MGC Réparation, Mascouche"
    });

    return event.getId();
}

// --- MODULE: DRIVE ---
function processDrive(data) {
    // Structure: MGC Clients -> [Year] -> [Client Name]
    const rootName = "MGC Clients";
    const currentYear = new Date().getFullYear().toString();

    // 1. Get Root
    const roots = DriveApp.getFoldersByName(rootName);
    let rootFolder = roots.hasNext() ? roots.next() : DriveApp.createFolder(rootName);

    // 2. Get Year
    const years = rootFolder.getFoldersByName(currentYear);
    let yearFolder = years.hasNext() ? years.next() : rootFolder.createFolder(currentYear);

    // 3. Create Client Folder
    const folderName = `${data.fullName} - ${data.vehicleMake || 'Vehicle'}`;
    const duplicateCheck = yearFolder.getFoldersByName(folderName);
    if (duplicateCheck.hasNext()) return duplicateCheck.next().getUrl(); // Return existing if duplicate

    const clientFolder = yearFolder.createFolder(folderName);

    // 4. Create Info File
    const infoContent = `
CLIENT: ${data.fullName}
PHONE: ${data.phone}
EMAIL: ${data.email}
---
VEHICLE: ${data.vehicleType}
YEAR: ${data.vehicleYear}
MAKE: ${data.vehicleMake}
MODEL: ${data.vehicleModel}
---
SERVICE: ${data.serviceCategory}
ISSUE: ${data.description}
DATE REQUESTED: ${new Date().toLocaleString()}
  `;
    clientFolder.createFile("Lead_Info.txt", infoContent);

    return clientFolder.getUrl();
}

// --- MODULE: EMAIL ---
function sendEmails(data, folderUrl) {
    // 1. ADMIN NOTIFICATION (English for Internal Ops)
    const subjectAdmin = `NEW LEAD: ${data.vehicleType} - ${data.fullName}`;
    const bodyAdmin = `
New Lead from Website Wizard 🚀

Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}

Vehicle: ${data.vehicleYear || ''} ${data.vehicleMake || ''} ${data.vehicleModel || ''}
Service: ${data.serviceCategory}
Description: ${data.description}

Requested Date: ${data.appointmentDate} @ ${data.appointmentTime}

Drive Folder: ${folderUrl}
  `;

    MailApp.sendEmail(ADMIN_EMAIL, subjectAdmin, bodyAdmin);

    // 2. CUSTOMER CONFIRMATION (French)
    const subjectClient = `Confirmation de votre demande - MGC Réparation`;
    const bodyClient = `
Bonjour ${data.fullName.split(' ')[0]},

Nous avons bien reçu votre demande pour : ${data.serviceCategory}.

Détails de votre véhicule : ${data.vehicleMake || ''} ${data.vehicleModel || ''}
Problème mentionné : ${data.description}

Un membre de notre équipe analysera votre demande et vous contactera rapidement (souvent en moins de 2h pendant les heures d'ouverture) pour confirmer le rendez-vous.

Si c'est une urgence, veuillez nous appeler directement.

Merci de votre confiance,

L'équipe MGC Réparation
Mascouche, QC
  `;

    MailApp.sendEmail(data.email, subjectClient, bodyClient, {
        name: COMPANY_NAME
    });
}
