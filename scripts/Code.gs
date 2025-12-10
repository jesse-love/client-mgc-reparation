/**
 * MGC Réparation - Serverless CRM (Google Workspace Edition) 🛠️
 * 
 * This script powers the backend of the MGC website.
 * It connects the Website (QuoteWizard) -> Google Sheets (CRM) -> Gmail (Notifications).
 * 
 * Setup Instructions:
 * 1. Create a new Google Sheet.
 * 2. Rename the first tab to "Leads".
 * 3. Add headers in Row 1: Lead_ID, Timestamp, Status, Name, Phone, Email, Vehicle, Service_Type, Selected_Offer, Appt_Date, Appt_Time, Notes.
 * 4. Go to Extensions > Apps Script.
 * 5. Paste this code.
 * 6. Deploy as Web App (Execute as: Me, Who has access: Anyone).
 */

const SHEET_NAME = "Leads";
const ADMIN_EMAIL = "info@mgcreparation.ca";

// --- MAIN WEBHOOK HANDLER ---
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const data = JSON.parse(e.postData.contents);
    
    // 1. Generate Metadata
    const leadId = Utilities.getUuid();
    const timestamp = new Date();
    
    // 2. Save to Sheet
    saveLeadToSheet(leadId, timestamp, data);
    
    // 3. Send Notifications (Workspace Integration)
    sendAdminNotification(data);
    sendCustomerConfirmation(data);

    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "success", 
      "lead_id": leadId 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      "status": "error", 
      "message": error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } finally {
    lock.releaseLock();
  }
}

// --- SHEET OPERATIONS ---
function saveLeadToSheet(leadId, timestamp, data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  
  sheet.appendRow([
    leadId,
    timestamp,
    "NEW", // Initial Status
    data.fullName,
    "'" + data.phone, // Force string to prevent format issues
    data.email,
    `${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}`,
    data.vehicleType,
    data.serviceCategory, // The Offer (Alex, Sophie, Martin)
    data.appointmentDate,
    data.appointmentTime,
    data.description
  ]);
}

// --- GMAIL AUTOMATION (WORKSPACE) ---

/**
 * Sends an internal alert to the shop owner.
 */
function sendAdminNotification(data) {
  const subject = `🔥 NEW LEAD: ${data.serviceCategory} - ${data.fullName}`;
  const htmlBody = `
    <h2>New Quote Request</h2>
    <p><strong>Customer:</strong> ${data.fullName}</p>
    <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
    <p><strong>Vehicle:</strong> ${data.vehicleYear} ${data.vehicleMake} ${data.vehicleModel}</p>
    <p><strong>Offer:</strong> ${data.serviceCategory}</p>
    <p><strong>Requested Time:</strong> ${data.appointmentDate} @ ${data.appointmentTime}</p>
    <hr>
    <p><strong>Notes:</strong><br>${data.description}</p>
  `;
  
  GmailApp.sendEmail(ADMIN_EMAIL, subject, "", { htmlBody: htmlBody });
}

/**
 * Sends a branded, professional confirmation to the client.
 * Uses the info@mgcreparation.ca alias automatically.
 */
function sendCustomerConfirmation(data) {
  const subject = `Confirmation: Votre demande de prix chez MGC Réparation 🔧`;
  
  // Choose template based on Offer (Personalization)
  let offerMessage = "";
  if (data.serviceCategory.includes("Oil Change")) {
    offerMessage = "Excellent choice. Our Oil Change + Inspection package ensures your engine runs significantly smoother.";
  } else if (data.serviceCategory.includes("Diagnostic")) {
    offerMessage = "We received your diagnostic request. Our team is ready to identify the issue accurately (and the $49 is credited if you repair with us).";
  } else {
    offerMessage = "Thank you for trusting MGC Réparation.";
  }

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #ff6b35;">MGC Réparation</h1>
      <p>Bonjour ${data.fullName.split(' ')[0]},</p>
      <p>We have successfully received your request for: <strong>${data.serviceCategory}</strong>.</p>
      <p>${offerMessage}</p>
      <div style="background-color: #fce8e6; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <strong>Next Step:</strong> One of our experts will review your vehicle details and call you at <strong>${data.phone}</strong> shortly to confirm the price and appointment.
      </div>
      <p>Requested Appointment: ${data.appointmentDate} around ${data.appointmentTime}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">
        MGC Réparation Inc.<br>
        1234 Rue Principale, Mascouche<br>
        <a href="tel:5141234567">514-123-4567</a> | info@mgcreparation.ca
      </p>
    </div>
  `;
  
  // Send the email (Apps Script automatically uses the active Workspace account)
  GmailApp.sendEmail(data.email, subject, "", { 
    htmlBody: htmlBody,
    name: "MGC Réparation (Automated)"
  });
}
