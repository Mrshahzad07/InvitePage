/**
 * WEDDING INVITATION DATA - SINGLE SOURCE OF TRUTH
 * Couple: Farha Praveen weds Md. Firoj
 * Date: 12.12.2026 (Saturday)
 * Venue: Hotel Shree Parivaar, Barhi
 *
 * All card content preserved verbatim. Edit this file to update any text.
 */

export const weddingData = {
  meta: {
    title: 'Wedding Invitation | 12.12.2026 (Saturday) | Monogram FF | "Farha Praveen weds Md. Firoj"',
    coupleNames: 'Farha Praveen weds Md. Firoj',
    brideFull: 'Farha Praveen',
    groomFull: 'Md. Firoj',
    brideShort: 'Farha Praveen',
    groomShort: 'Md. Firoj',
    monogram: 'FF',
    dateShort: '12.12.2026',
    dayShort: 'Saturday',
    ogDescription: 'Request the honour of your presence on the auspicious occasion of the marriage ceremony of Farha Praveen & Md. Firoj on 12th December 2026 at Hotel Shree Parivaar, Barhi.',
    primaryColor: '#0B3D2E',
    maroonColor: '#7A1F2B',
    goldColor: '#C9A24B',
  },

  bismillah: {
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    english: "In the name of 'ALLAH' the most beneficent & merciful",
  },

  invitationText: {
    hosts: 'Mrs. & Mr. Md. Mahtab',
    message: 'Request the honour of your presence on the auspicious occasion of marriage ceremony of our loving Daughter',
  },

  bride: {
    fullName: 'Farha Praveen',
    relation: 'D/o.- Md. Mahtab',
    address: 'Vill.-Konhara Khurd, Near Mazar Sharif, Barkatha, Dist.- Hazaribagh (Jharkhand)',
    role: 'Bride',
    badge: 'Dulhan',
  },

  groom: {
    fullName: 'Md. Firoj',
    relation: 'S/o.- Md. Mustaque',
    address: 'At.-L.F. Road, Hindpiri, Ranchi, Jharkhand',
    role: 'Groom',
    badge: 'Dulha',
  },

  programmeHeader: 'INSHA ALLAH to be solemnised as per PROGRAMME',

  programme: [
    {
      id: 'milad',
      day: '1',
      date: '10.12.2026',
      dayOfWeek: 'Thursday',
      event: 'Qurankhani & Milad',
      time: 'at 08:00 a.m.',
      isoTime: '2026-12-10T08:00:00+05:30',
      endTime: '2026-12-10T12:00:00+05:30',
      description: 'Blessing the holy union with sacred Quran recitations and Milad prayers for lifelong peace and prosperity.',
      themeLighting: 'dusk', // Milad dusk
      themeColor: '#4A5568',
      accentColor: '#C9A24B',
      icon: 'BookOpen',
    },
    {
      id: 'haldi',
      day: '1',
      date: '10.12.2026',
      dayOfWeek: 'Thursday',
      event: 'Rasm-E-Haldi (Lagan)',
      time: 'at 04:00 p.m.',
      isoTime: '2026-12-10T16:00:00+05:30',
      endTime: '2026-12-10T19:00:00+05:30',
      description: 'A joyful celebration of radiant turmeric, songs, laughter and traditional blessings with loved ones.',
      themeLighting: 'warmYellow', // Haldi warm yellow
      themeColor: '#D97706',
      accentColor: '#F59E0B',
      icon: 'Sun',
    },
    {
      id: 'mehndi',
      day: '2',
      date: '11.12.2026',
      dayOfWeek: 'Friday',
      event: 'Rasm-E-Mehndi',
      time: 'at 04:00 p.m.',
      isoTime: '2026-12-11T16:00:00+05:30',
      endTime: '2026-12-11T20:00:00+05:30',
      description: 'Intricate henna designs adorning hands amidst melodious folk songs and fragrant floral celebrations.',
      themeLighting: 'hennaGreen', // Mehndi green/henna
      themeColor: '#059669',
      accentColor: '#10B981',
      icon: 'Sparkles',
    },
    {
      id: 'dinner',
      day: '3',
      date: '12.12.2026',
      dayOfWeek: 'Saturday',
      event: 'Dinner',
      time: 'at 07:00 p.m.',
      isoTime: '2026-12-12T19:00:00+05:30',
      endTime: '2026-12-12T21:00:00+05:30',
      description: 'Grand royal feast featuring authentic delicacies prepared to honour all our esteemed guests.',
      themeLighting: 'royalGold',
      themeColor: '#7A1F2B',
      accentColor: '#C9A24B',
      icon: 'Utensils',
    },
    {
      id: 'barat',
      day: '3',
      date: '12.12.2026',
      dayOfWeek: 'Saturday',
      event: 'Arrival of Barat',
      time: 'at 09:00 p.m.',
      isoTime: '2026-12-12T21:00:00+05:30',
      endTime: '2026-12-12T22:00:00+05:30',
      description: 'Joyous ceremonial welcome of the groom and his wedding procession with floral garlands and warm embraces.',
      themeLighting: 'royalGold',
      themeColor: '#134E3A',
      accentColor: '#F3E6C4',
      icon: 'Compass',
    },
    {
      id: 'nikah',
      day: '3',
      date: '12.12.2026',
      dayOfWeek: 'Saturday',
      event: 'Nikah',
      time: 'at 10:00 p.m.',
      isoTime: '2026-12-12T22:00:00+05:30',
      endTime: '2026-12-12T23:30:00+05:30',
      description: 'The sacred Nikah ceremony solemnising the bond of eternal love and faith in the presence of Allah and loved ones.',
      themeLighting: 'royalGoldNight', // Nikah royal gold night
      themeColor: '#0B3D2E',
      accentColor: '#C9A24B',
      isMainNikah: true,
      icon: 'HeartHandshake',
    },
    {
      id: 'rukhsati',
      day: '4',
      date: '13.12.2026',
      dayOfWeek: 'Sunday',
      event: 'Rukhsati',
      time: 'at 08:00 a.m.',
      isoTime: '2026-12-13T08:00:00+05:30',
      endTime: '2026-12-13T10:00:00+05:30',
      description: 'Heartfelt farewell and dua as our beloved daughter embarks on her new journey with eternal blessings.',
      themeLighting: 'softDawn', // Rukhsati soft dawn
      themeColor: '#F3E6C4',
      accentColor: '#C9A24B',
      icon: 'Sunrise',
    },
  ],

  nikahTargetIso: '2026-12-12T22:00:00+05:30',

  venue: {
    name: 'Hotel Shree Parivaar, Barhi',
    address: 'Near Barhi Chowk, GT Road / NH 19, Barhi, Dist.- Hazaribagh, Jharkhand',
    searchQuery: 'Hotel Shree Parivaar Barhi',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Hotel+Shree+Parivaar+Barhi',
    displayCity: 'Barhi, Hazaribagh (Jharkhand)',
  },

  inviter: {
    heading: 'A Cordial Invitation From:',
    name: 'Md. Mahtab Khan',
    address: 'Vill.-Konhara Khurd, Near Mazar Sharif, Barkatha, Dist.- Hazaribagh (Jharkhand)',
    mobiles: ['9122912973', '7061743077', '9304732817'],
    whatsappMobile: '9122912973',
  },

  rsvp: {
    heading: 'R.S.V.P.',
    // Respectful treatment: Late elders shown plainly without festive decoration
    lateElders: [
      { name: 'Late Naim Khan', isLate: true },
      { name: 'Late Aftab Khan', isLate: true },
    ],
    familyMembers: [
      'Sattar Khan',
      'Gaffar Khan',
      'Mahtab Khan',
      'Meraj Khan',
      'Md. Saif Ali Khan',
      'Md. Mudassir Hussain',
    ],
    inclusive: 'All Relatives & Friends',
  },

  closingCompliments: 'With Best Compliments From: Md. Mahtab Khan',

  dua: {
    arabic: 'جَزَاكُمُ اللَّهُ خَيْرًا',
    transliteration: 'Jazakallah Khair for your gracious presence & prayers',
    subtext: 'May Allah SWT shower endless barakah, happiness, and peace upon you and your family.',
  },

  welcomeGreetings: [
    'Assalamu Alaikum',
    'Welcome',
    'Aap sabhi ko dil se dawat hai',
    'Khush Amdeed',
  ],

  developer: {
    name: 'Md Shahzad (Raja)',
    phone: '8340156191',
    whatsapp: '8340156191',
    role: 'Website Developer',
    inquiryText: 'Want to build a custom 3D digital invitation website like this for your marriage?',
  },
};
