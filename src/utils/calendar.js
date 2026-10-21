/**
 * CALENDAR UTILITY
 * Generates .ics file with all 7 wedding events and provides Google Calendar links
 */

import { weddingData } from '../data/invitation';

function formatToIcsDate(date) {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Downloads a complete .ics file containing all events of the wedding
 */
export function downloadAllEventsIcs() {
  const events = weddingData.programme;
  const now = formatToIcsDate(new Date());

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Farha Praveen weds Md. Firoj//Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Farha Praveen weds Md. Firoj - Wedding Celebrations',
    'X-WR-TIMEZONE:Asia/Kolkata',
  ];

  events.forEach((evt) => {
    const startDate = new Date(evt.isoTime);
    const endDate = new Date(evt.endTime);
    const startStr = formatToIcsDate(startDate);
    const endStr = formatToIcsDate(endDate);

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:wedding-ff-${evt.id}-2026@farhawedsfiroj.com`,
      `DTSTAMP:${now}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      `SUMMARY:${evt.event} | Farha Praveen weds Md. Firoj`,
      `DESCRIPTION:${evt.description}\\n\\nVenue: ${weddingData.venue.name}, ${weddingData.venue.address}\\nHosts: Mrs. & Mr. Md. Mahtab\\nContact: ${weddingData.inviter.mobiles.join(', ')}`,
      `LOCATION:${weddingData.venue.name}, ${weddingData.venue.address}`,
      'STATUS:CONFIRMED',
      'SEQUENCE:0',
      'BEGIN:VALARM',
      'TRIGGER:-PT2H',
      'ACTION:DISPLAY',
      `DESCRIPTION:Reminder: ${evt.event} - Farha Praveen weds Md. Firoj in 2 hours`,
      'END:VALARM',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');

  const blob = new Blob([icsContent.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Farha-Praveen-weds-Md-Firoj-Wedding-Programme.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generates direct Google Calendar link for the sacred Nikah (or any specified event)
 */
export function getGoogleCalendarUrl(eventId = 'nikah') {
  const event = weddingData.programme.find((p) => p.id === eventId) || weddingData.programme[5];
  const startDate = new Date(event.isoTime);
  const endDate = new Date(event.endTime);

  const startStr = formatToIcsDate(startDate);
  const endStr = formatToIcsDate(endDate);

  const title = encodeURIComponent(`${event.event} - Farha Praveen weds Md. Firoj`);
  const details = encodeURIComponent(
    `${weddingData.invitationText.message}\n\nVenue: ${weddingData.venue.name}\n${weddingData.venue.address}\n\nA Cordial Invitation From: ${weddingData.inviter.name}\nContact: ${weddingData.inviter.mobiles[0]}`
  );
  const location = encodeURIComponent(`${weddingData.venue.name}, Barhi, Jharkhand`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startStr}/${endStr}&details=${details}&location=${location}&sf=true&output=xml`;
}
