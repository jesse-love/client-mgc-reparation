function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');

        // --- PIPELINE & AVATAR LOGIC (UPDATED FOR 3 FIRE OFFERS) ---
        let avatar = 'Unknown';
        let tag = '';
        let pipelineStage = 'Prospect Entrant'; // Default Stage
        let internalAlertSubject = '';
        let internalAlertBody = '';
        let offerClaimed = data.serviceCategory; // The serviceCategory now holds the Offer Title

        // Logic to determine Avatar based on Vehicle & Offer Claimed
        if (data.vehicleType === 'Heavy Truck') {
            // Heavy Truck (Priority / Code Red)
            avatar = 'Heavy Truck (Fleet)';
            tag = 'ppl_lead_heavy_fleet';
            offerClaimed = 'Code Red Priority';
            internalAlertSubject = `🚨 URGENT: HEAVY TRUCK LEAD / LEAD CAMION LOURD (Code Red)`;
            internalAlertBody = `🚨 **LEAD URGENT (Camion Lourd)**: ${data.fullName}, ${data.phone}. Appelez-le MAINTENANT.`;
        }
        else if (offerClaimed === 'Tire Change + Free Inspection') {
            // Avatar 3: Martin (Seasonal)
            avatar = 'Martin (Seasonal)';
            tag = 'ppl_lead_seasonal';
            internalAlertSubject = `❄️ NOUVEAU LEAD (Pneus) - ${data.fullName}`;
            internalAlertBody = `❄️ **OFFRE RÉCLAMÉE: COMBO PNEUS + INSPECTION**\n\nNom: ${data.fullName}\nTél: ${data.phone}\n\nAppelez pour confirmer le changement de pneus et l'inspection gratuite.`;
        }
        else if (offerClaimed === '$49 Credited Diagnostic') {
            // Avatar 2: Sophie (Trust/Prevention)
            avatar = 'Sophie (Health Check)';
            tag = 'ppl_lead_health_check';
            internalAlertSubject = `✅ NOUVEAU LEAD (Bilan 49$) - ${data.fullName}`;
            internalAlertBody = `✅ **OFFRE RÉCLAMÉE: BILAN 49$ CRÉDITÉ**\n\nNom: ${data.fullName}\nTél: ${data.phone}\n\nAppelez pour confirmer le rendez-vous de diagnostic crédité.`;
        }
        else if (offerClaimed === 'Oil Change + Free Inspection') {
            // Avatar 1: Alex (Urgency/Repair)
            avatar = 'Alex (Urgent Repair)';
            tag = 'ppl_lead_brakes_inspection';
            internalAlertSubject = `🚨 LEAD URGENT (Huile + Insp) - ${data.fullName}`;
            internalAlertBody = `🚨 **OFFRE RÉCLAMÉE: HUILE + INSPECTION GRATUITE**\n\nNom: ${data.fullName}\nTél: ${data.phone}\n\nAppelez-le MAINTENANT.`;
        }
        else {
            // Fallback
            avatar = 'General Lead';
            tag = 'ppl_lead_general';
            internalAlertSubject = `New Lead - ${data.fullName}`;
            internalAlertBody = `New Lead: ${data.fullName}, ${data.phone}.`;
        }
        // -------------------------------

        // 1. Log to Google Sheet
        const timestamp = new Date();
        // Columns: Timestamp, Avatar, Pipeline Stage, Tag, Vehicle, Offer Claimed, Name, Phone, Email, Details, Tires, Description, Appt Date, Appt Time
        sheet.appendRow([
            timestamp,
            avatar,
            pipelineStage,
            tag,
            data.vehicleType,
            offerClaimed, // Replaces generic Service Category
            data.fullName,
            data.phone,
            data.email,
            `${data.vehicleYear || ''} ${data.vehicleMake || ''} ${data.vehicleModel || ''}`.trim(),
            data.tireSize || '',
            data.description,
            data.appointmentDate,
            data.appointmentTime
        ]);

        // 2. Send Email Alert (Internal)
        MailApp.sendEmail({
            to: "owner@mgcreparation.ca", // Replace with actual owner email
            subject: internalAlertSubject,
            htmlBody: `
        <h2>${internalAlertSubject}</h2>
        <p style="white-space: pre-wrap;">${internalAlertBody}</p>
        <hr>
        <h3>Lead Details / Détails du Lead:</h3>
        <ul>
          <li><strong>Avatar:</strong> ${avatar}</li>
          <li><strong>Offer Claimed:</strong> ${offerClaimed}</li>
          <li><strong>Vehicle:</strong> ${data.vehicleType} (${data.vehicleYear || ''} ${data.vehicleMake || ''} ${data.vehicleModel || ''})</li>
          <li><strong>Tires:</strong> ${data.tireSize || 'N/A'}</li>
          <li><strong>Description:</strong> ${data.description}</li>
          <li><strong>Requested Time:</strong> ${data.appointmentDate} @ ${data.appointmentTime}</li>
        </ul>
      `
        });

        return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
