/**
 * SHARING & QR CODE UTILITY
 */

import QRCode from 'qrcode';
import { weddingData } from '../data/invitation';

/**
 * Builds the personalized link for a specific guest
 */
export function buildInviteLink(guestName = '') {
  if (typeof window === 'undefined') return '';
  const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  if (!guestName || !guestName.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?to=${encodeURIComponent(guestName.trim())}`;
}

/**
 * Shares invitation text + link directly to WhatsApp
 */
export function shareOnWhatsApp(guestName = '') {
  const link = buildInviteLink(guestName);
  const text = `🌸 *Wedding Invitation* 🌸\n\n` +
    `*In the name of ALLAH the most beneficent & merciful*\n\n` +
    `Mrs. & Mr. Md. Mahtab cordially request the honour of your presence at the marriage ceremony of their loving daughter\n\n` +
    `✨ *Farha Praveen* weds *Md. Firoj* ✨\n\n` +
    `📅 *Date:* 12.12.2026 (Saturday)\n` +
    `📍 *Venue:* Hotel Shree Parivaar, Barhi\n\n` +
    `Tap below to open your personalized 3D royal invitation:\n` +
    `${link}\n\n` +
    `_With Best Compliments From: Md. Mahtab Khan_`;

  const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Invokes native Web Share API if available, else falls back to clipboard
 */
export async function shareViaWebShare(guestName = '') {
  const link = buildInviteLink(guestName);
  const shareData = {
    title: weddingData.meta.title,
    text: `Wedding Invitation: Farha Praveen weds Md. Firoj on 12.12.2026 at Hotel Shree Parivaar, Barhi. Request the honour of your presence!`,
    url: link,
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (err) {
      if (err.name !== 'AbortError') {
        return copyToClipboard(link);
      }
      return { success: false, method: 'aborted' };
    }
  } else {
    return copyToClipboard(link);
  }
}

/**
 * Copies string to clipboard and returns promise
 */
export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return { success: true, method: 'clipboard' };
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: !!successful, method: 'fallback' };
    }
  } catch (err) {
    console.error('Failed to copy', err);
    return { success: false, error: err };
  }
}

/**
 * Generates an SVG or PNG QR Code data URL
 */
export async function generateQrDataUrl(url) {
  try {
    return await QRCode.toDataURL(url, {
      width: 280,
      margin: 2,
      color: {
        dark: '#0B3D2E', // Deep emerald
        light: '#FBF6E9', // Ivory
      },
      errorCorrectionLevel: 'M',
    });
  } catch (err) {
    console.error('QR code generation error', err);
    return '';
  }
}
