import type { QuoteWizardData } from '../types';

// Converts "7:30 AM" or "3:00 PM" to [hours, minutes] in 24h format
const parseTime = (timeStr: string): [number, number] => {
  if (!timeStr) return [12, 0]; // Default to noon if no time
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  
  if (period && period.toUpperCase() === 'PM' && hours !== 12) {
    hours += 12;
  }
  if (period && period.toUpperCase() === 'AM' && hours === 12) {
    hours = 0;
  }
  
  return [hours, minutes || 0];
};

// YYYY-MM-DD and "H:MM AM/PM" -> YYYYMMDDTHHMMSSZ
const formatISODate = (date: string, time: string): string => {
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = parseTime(time);
  
  // Create a date object in UTC to avoid timezone issues with the link generator
  const startDate = new Date(Date.UTC(year, month - 1, day, hours, minutes));
  // Assume a 1-hour appointment for the calendar event
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); 

  const toISOStringWithZ = (d: Date) => d.toISOString().replace(/[-:.]/g, '').slice(0, 15) + 'Z';

  return `${toISOStringWithZ(startDate)}/${toISOStringWithZ(endDate)}`;
};


export const createGoogleCalendarLink = (data: Partial<QuoteWizardData>): string => {
    const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';

    const title = `RDV: ${data.fullName || 'Client'} - ${data.vehicleType} (${data.serviceCategory})`;
    
    const details = `Rendez-vous pour MGC Réparation.

Client: ${data.fullName || 'N/A'}
Téléphone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}

Type de véhicule: ${data.vehicleType || 'N/A'}
Catégorie de service: ${data.serviceCategory || 'N/A'}

Description:
${data.description || 'Aucune description fournie.'}
    `;

    const params = new URLSearchParams({
        text: title,
        details: details,
        // The business address is static but could be fetched from context in the future if needed
        location: '1287 Chem. de la Côte Georges, Mascouche, QC J7K 3C3, Canada' 
    });

    if (data.appointmentDate && data.appointmentTime) {
        params.append('dates', formatISODate(data.appointmentDate, data.appointmentTime));
    }
    
    return `${baseUrl}&${params.toString()}`;
};
