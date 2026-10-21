/**
 * GUEST NAME UTILITY
 * Safely extracts and sanitizes ?to= parameter from the URL
 * Example: ?to=Rahim%20Uncle -> "Rahim Uncle"
 * Fallback: "Dear Guest"
 */

export function formatGuestInfo(name) {
  if (!name || !name.trim()) {
    return {
      rawName: '',
      displayName: 'Dear Guest',
      hasCustomName: false,
      salutation: 'To, Mrs./Mr.',
    };
  }

  // Sanitize: strip script tags or hazardous characters, limit length to 50 chars
  const sanitized = name
    .replace(/<[^>]*>?/gm, '')
    .replace(/[^\w\s.,'&()-]/gi, '')
    .trim()
    .slice(0, 50);

  if (!sanitized) {
    return {
      rawName: '',
      displayName: 'Dear Guest',
      hasCustomName: false,
      salutation: 'To, Mrs./Mr.',
    };
  }

  // Check if the parameter already includes Mr/Mrs/Dr etc.
  const hasSalutation = /^(mrs\.|mr\.|dr\.|janab|hazrat|bhai|uncle|aunt|md\.)/i.test(sanitized);

  return {
    rawName: sanitized,
    displayName: sanitized,
    hasCustomName: true,
    salutation: hasSalutation ? 'To,' : 'To, Mrs./Mr.',
  };
}

export function getGuestInfo() {
  if (typeof window === 'undefined') {
    return formatGuestInfo('');
  }

  try {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('guest') || params.get('name');

    if (toParam && toParam.trim()) {
      const info = formatGuestInfo(toParam);
      try {
        localStorage.setItem('wedding_guest_name', info.displayName);
      } catch {
        // ignore
      }
      return info;
    }

    // Fallback to localStorage if guest previously entered their name
    const stored = localStorage.getItem('wedding_guest_name');
    if (stored && stored.trim()) {
      return formatGuestInfo(stored);
    }

    return formatGuestInfo('');
  } catch {
    return formatGuestInfo('');
  }
}
