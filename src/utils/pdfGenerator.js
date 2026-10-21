/**
 * DYNAMIC 2-PAGE ROYAL WEDDING INVITATION PDF GENERATOR
 * Generates an Awwwards-quality, high-DPI royal wedding card in standard 2-page PDF format
 * tailored with the visitor's / guest's name.
 * 
 * Page 1: Front Royal Cover with 3D Cartoon Couple Illustration, Full Names (Dulhan first!),
 *         and Auspicious Marriage Ceremony Details.
 * Page 2: Auspicious 4-Day Wedding Itinerary, Venue with Scannable Google Maps GPS QR,
 *         Sacred Memory of Late Elders, and Complete RSVP Family Honors (None removed!).
 * 
 * Pure JavaScript, zero bloat, 100% compliant with standard PDF 1.4 specification.
 */

import QRCode from 'qrcode';
import { weddingData } from '../data/invitation';

/**
 * Creates a valid, standard 2-page PDF 1.4 document containing two full-bleed JPEG images
 */
function createPdfFromTwoPages(page1Bytes, page2Bytes, imgWidthPx, imgHeightPx, widthPt = 420, heightPt = 595) {
  const contentStream1 = `q ${widthPt.toFixed(2)} 0 0 ${heightPt.toFixed(2)} 0 0 cm /Im1 Do Q\n`;
  const contentStream2 = `q ${widthPt.toFixed(2)} 0 0 ${heightPt.toFixed(2)} 0 0 cm /Im2 Do Q\n`;

  const chunks = [];
  const offsets = [];
  let currentOffset = 0;

  function pushString(str) {
    const encoder = new TextEncoder();
    const bytes = encoder.encode(str);
    chunks.push(bytes);
    currentOffset += bytes.length;
  }

  function pushBytes(bytes) {
    chunks.push(bytes);
    currentOffset += bytes.length;
  }

  // PDF Header
  pushString('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');

  // Object 1: Catalog
  offsets.push(currentOffset);
  pushString('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // Object 2: Pages (Contains 2 pages: 3 0 R and 6 0 R)
  offsets.push(currentOffset);
  pushString('2 0 obj\n<< /Type /Pages /Kids [3 0 R 6 0 R] /Count 2 >>\nendobj\n');

  // Object 3: Page 1
  offsets.push(currentOffset);
  pushString(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${widthPt} ${heightPt}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);

  // Object 4: Image 1 XObject
  offsets.push(currentOffset);
  pushString(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidthPx} /Height ${imgHeightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page1Bytes.length} >>\nstream\n`);
  pushBytes(page1Bytes);
  pushString('\nendstream\nendobj\n');

  // Object 5: Contents 1
  offsets.push(currentOffset);
  pushString(`5 0 obj\n<< /Length ${contentStream1.length} >>\nstream\n${contentStream1}endstream\nendobj\n`);

  // Object 6: Page 2
  offsets.push(currentOffset);
  pushString(`6 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${widthPt} ${heightPt}] /Resources << /XObject << /Im2 7 0 R >> >> /Contents 8 0 R >>\nendobj\n`);

  // Object 7: Image 2 XObject
  offsets.push(currentOffset);
  pushString(`7 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidthPx} /Height ${imgHeightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${page2Bytes.length} >>\nstream\n`);
  pushBytes(page2Bytes);
  pushString('\nendstream\nendobj\n');

  // Object 8: Contents 2
  offsets.push(currentOffset);
  pushString(`8 0 obj\n<< /Length ${contentStream2.length} >>\nstream\n${contentStream2}endstream\nendobj\n`);

  // XRef Table (Objects 0 through 8 = 9 entries)
  const xrefOffset = currentOffset;
  pushString('xref\n0 9\n0000000000 65535 f \n');
  for (let i = 0; i < offsets.length; i++) {
    const offStr = String(offsets[i]).padStart(10, '0');
    pushString(`${offStr} 00000 n \n`);
  }

  // Trailer
  pushString(`trailer\n<< /Size 9 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`);

  return new Blob(chunks, { type: 'application/pdf' });
}

/**
 * Safely draws a rounded filled & stroked rectangle without polluting or sharing the canvas path
 */
function drawCardBox(ctx, x, y, w, h, radius = 14, fill = null, stroke = null, lineWidth = 2) {
  ctx.save();
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(x, y, w, h, radius);
  } else {
    ctx.rect(x, y, w, h);
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.closePath();
  ctx.restore();
}

/**
 * Loads an image URL into an HTMLImageElement
 */
function loadImage(src) {
  return new Promise((resolve) => {
    if (!src) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = (err) => {
      console.warn('Image load error for:', src, err);
      resolve(null);
    };
    img.src = src;
  });
}

export async function generatePersonalizedWeddingPdf(guestName = 'Respected Guest') {
  const cleanName = (guestName && guestName.trim() && guestName !== 'Dear Guest')
    ? guestName.trim()
    : 'Honourable Guest & Family';

  // Load Assets: High-contrast scannable QR code and 3D Cartoon Couple image
  let qrDataUrl = '';
  try {
    qrDataUrl = await QRCode.toDataURL(weddingData.venue.googleMapsUrl, {
      width: 320,
      margin: 1,
      color: { dark: '#06231A', light: '#FFFFFF' },
      errorCorrectionLevel: 'H',
    });
  } catch (err) {
    console.error('QR failed', err);
  }

  const [coupleImg, qrImg] = await Promise.all([
    loadImage('/couple-cartoon.jpg'),
    qrDataUrl ? loadImage(qrDataUrl) : null,
  ]);

  // Dimensions: 1240 x 1754 px (~300 DPI A5 portrait)
  const W = 1240;
  const H = 1754;

  // ==========================================
  // PAGE 1: ROYAL FRONT INVITATION COVER CARD
  // ==========================================
  const canvas1 = document.createElement('canvas');
  canvas1.width = W;
  canvas1.height = H;
  const ctx1 = canvas1.getContext('2d');

  if (!ctx1) throw new Error('Canvas 1 context unavailable');

  // Background Royal Gradient (Deep Emerald & Maroon warmth)
  const bgGrad1 = ctx1.createLinearGradient(0, 0, 0, H);
  bgGrad1.addColorStop(0, '#06231A');
  bgGrad1.addColorStop(0.35, '#0B3D2E');
  bgGrad1.addColorStop(0.7, '#1A080C');
  bgGrad1.addColorStop(1, '#041610');
  ctx1.fillStyle = bgGrad1;
  ctx1.fillRect(0, 0, W, H);

  // Outer Ornate Gold Border
  ctx1.save();
  ctx1.beginPath();
  ctx1.strokeStyle = '#C9A24B';
  ctx1.lineWidth = 6;
  ctx1.strokeRect(36, 36, W - 72, H - 72);
  ctx1.closePath();
  ctx1.restore();

  // Inner Fine Gold Border
  ctx1.save();
  ctx1.beginPath();
  ctx1.strokeStyle = 'rgba(229, 195, 101, 0.7)';
  ctx1.lineWidth = 2;
  ctx1.strokeRect(48, 48, W - 96, H - 96);
  ctx1.closePath();
  ctx1.restore();

  // Corner Accents
  const corners1 = [[54, 54], [W - 54, 54], [54, H - 54], [W - 54, H - 54]];
  ctx1.save();
  ctx1.fillStyle = '#E5C365';
  corners1.forEach(([cx, cy]) => {
    ctx1.beginPath();
    ctx1.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx1.fill();
    ctx1.closePath();
  });
  ctx1.restore();

  // Top Monogram Medallion
  ctx1.save();
  ctx1.beginPath();
  ctx1.arc(W / 2, 88, 30, 0, Math.PI * 2);
  ctx1.fillStyle = '#0B3D2E';
  ctx1.fill();
  ctx1.lineWidth = 3;
  ctx1.strokeStyle = '#E5C365';
  ctx1.stroke();
  ctx1.closePath();
  ctx1.fillStyle = '#E5C365';
  ctx1.font = 'bold 26px Georgia, serif';
  ctx1.textAlign = 'center';
  ctx1.fillText('FF', W / 2, 97);
  ctx1.restore();

  // Bismillah in Arabic Calligraphy
  ctx1.save();
  ctx1.font = 'bold 44px "Amiri", "Traditional Arabic", serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.textAlign = 'center';
  ctx1.fillText('بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', W / 2, 168);

  // Bismillah English
  ctx1.font = 'italic 18px "Cormorant Garamond", Georgia, serif';
  ctx1.fillStyle = '#F3E6C4';
  ctx1.fillText("In the name of 'ALLAH' the most beneficent & merciful", W / 2, 206);

  // Spiritual Invocations
  ctx1.font = 'italic 22px "Cormorant Garamond", Georgia, serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.fillText('Together with the blessings of Allah', W / 2, 246);
  ctx1.restore();

  // ATTACHED 3D CARTOON COUPLE ILLUSTRATION
  if (coupleImg) {
    const imgSize = 330;
    const imgX = (W - imgSize) / 2;
    const imgY = 270;

    // Outer Gold Glow Rim
    drawCardBox(ctx1, imgX - 6, imgY - 6, imgSize + 12, imgSize + 12, 24, 'rgba(201, 162, 75, 0.4)', null, 0);

    // Clip & Draw Couple Cartoon Image
    ctx1.save();
    ctx1.beginPath();
    ctx1.roundRect ? ctx1.roundRect(imgX, imgY, imgSize, imgSize, 20) : ctx1.rect(imgX, imgY, imgSize, imgSize);
    ctx1.clip();
    ctx1.drawImage(coupleImg, imgX, imgY, imgSize, imgSize);
    ctx1.closePath();
    ctx1.restore();

    // Border around couple image
    drawCardBox(ctx1, imgX, imgY, imgSize, imgSize, 20, null, '#E5C365', 3);

    // Caption Box beneath characters: Groom on left, Bride on right
    drawCardBox(ctx1, imgX + 8, imgY + imgSize - 38, imgSize - 16, 32, 10, '#06231A', '#E5C365', 1.5);

    ctx1.save();
    ctx1.font = 'bold 13px "Cinzel", Georgia, sans-serif';
    ctx1.fillStyle = '#FFFDF8';
    ctx1.textAlign = 'center';
    ctx1.fillText('Md. Firoj (Dulha)   ♥   Farha Praveen (Dulhan)', W / 2, imgY + imgSize - 17);
    ctx1.restore();
  }

  // DYNAMIC PERSONALIZED GUEST CARD BOX (100% VISIBLE & PROMINENT)
  const guestBoxW = 920;
  const guestBoxH = 115;
  const guestBoxX = (W - guestBoxW) / 2;
  const guestBoxY = 630;

  drawCardBox(ctx1, guestBoxX, guestBoxY, guestBoxW, guestBoxH, 18, '#0B3D2E', '#E5C365', 2.5);

  ctx1.save();
  ctx1.textAlign = 'center';
  ctx1.font = 'bold 16px "Cinzel", Georgia, sans-serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText('CORDIALLY INVITING OUR RESPECTED GUEST', W / 2, guestBoxY + 36);

  ctx1.font = 'bold 42px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#FFFFFF';
  ctx1.shadowColor = 'rgba(229, 195, 101, 0.9)';
  ctx1.shadowBlur = 10;
  ctx1.fillText(cleanName, W / 2, guestBoxY + 84);
  ctx1.restore();

  // Host Invitation Sentence
  ctx1.save();
  ctx1.textAlign = 'center';
  ctx1.font = 'bold 21px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText(weddingData.invitationText.hosts, W / 2, 782);

  ctx1.font = 'italic 20px "Cormorant Garamond", Georgia, serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.fillText('Request the honour of your presence on the auspicious occasion of', W / 2, 814);
  ctx1.fillText('the marriage ceremony of their loving Daughter', W / 2, 842);

  // --- DULHAN NAME FIRST: Farha Praveen ---
  ctx1.font = 'bold 58px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.shadowColor = 'rgba(201, 162, 75, 0.9)';
  ctx1.shadowBlur = 12;
  ctx1.fillText(weddingData.bride.fullName, W / 2, 920);
  ctx1.shadowBlur = 0;

  ctx1.font = '16px "Poppins", sans-serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText(`(${weddingData.bride.badge}) • ${weddingData.bride.relation}`, W / 2, 956);
  ctx1.font = '15px "Poppins", sans-serif';
  ctx1.fillStyle = '#F3E6C4';
  ctx1.fillText(weddingData.bride.address, W / 2, 982);

  // Ornament divider
  ctx1.font = 'italic 32px "Cormorant Garamond", Georgia, serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText('— weds —', W / 2, 1028);

  // --- DULHA NAME SECOND: Md. Firoj ---
  ctx1.font = 'bold 58px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.shadowColor = 'rgba(201, 162, 75, 0.9)';
  ctx1.shadowBlur = 12;
  ctx1.fillText(weddingData.groom.fullName, W / 2, 1102);
  ctx1.shadowBlur = 0;

  ctx1.font = '16px "Poppins", sans-serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText(`(${weddingData.groom.badge}) • ${weddingData.groom.relation}`, W / 2, 1138);
  ctx1.font = '15px "Poppins", sans-serif';
  ctx1.fillStyle = '#F3E6C4';
  ctx1.fillText(weddingData.groom.address, W / 2, 1164);
  ctx1.restore();

  // Auspicious Nikah Ceremony Highlights Card
  const dBoxW = 920;
  const dBoxH = 180;
  const dBoxX = (W - dBoxW) / 2;
  const dBoxY = 1205;

  drawCardBox(ctx1, dBoxX, dBoxY, dBoxW, dBoxH, 18, '#06231A', '#E5C365', 2);

  ctx1.save();
  ctx1.textAlign = 'center';
  ctx1.font = 'bold 16px "Cinzel", Georgia, sans-serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText('MAIN AUSPICIOUS NIKAH CEREMONY', W / 2, dBoxY + 36);

  ctx1.font = 'bold 32px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.fillText('Saturday, 12th December 2026', W / 2, dBoxY + 76);

  ctx1.font = 'bold 19px "Poppins", sans-serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText('Dinner: 07:00 PM  •  Arrival of Barat: 09:00 PM  •  Sacred Nikah: 10:00 PM', W / 2, dBoxY + 116);

  ctx1.font = '16px "Poppins", sans-serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.fillText(`Venue: ${weddingData.venue.name}, ${weddingData.venue.displayCity}`, W / 2, dBoxY + 150);
  ctx1.restore();

  // Page 1 Footnote / Host Invitation Line
  ctx1.save();
  ctx1.textAlign = 'center';
  ctx1.font = 'italic 18px "Cormorant Garamond", Georgia, serif';
  ctx1.fillStyle = '#F3E6C4';
  ctx1.fillText('“Your gracious presence will bring barakah and joy to our celebration.”', W / 2, 1435);

  ctx1.font = 'bold 22px "Cinzel", Georgia, serif';
  ctx1.fillStyle = '#E5C365';
  ctx1.fillText(`With Best Compliments From: ${weddingData.inviter.name}`, W / 2, 1478);

  ctx1.font = '16px "Poppins", sans-serif';
  ctx1.fillStyle = '#FFFDF8';
  ctx1.fillText(`Mobiles: ${weddingData.inviter.mobiles.join('  •  ')}`, W / 2, 1508);

  // Page 1 Footer Navigation Indicator
  ctx1.fillStyle = '#E5C365';
  ctx1.font = 'bold 14px "Cinzel", Georgia, sans-serif';
  ctx1.fillText('✦ PAGE 1 OF 2  •  PLEASE SEE OVERLEAF FOR COMPLETE PROGRAMME & RSVP ✦', W / 2, 1665);
  ctx1.restore();


  // =========================================================================
  // PAGE 2: COMPLETE PROGRAMME, VENUE GPS QR, LATE ELDERS & FULL RSVP HONORS
  // =========================================================================
  const canvas2 = document.createElement('canvas');
  canvas2.width = W;
  canvas2.height = H;
  const ctx2 = canvas2.getContext('2d');

  if (!ctx2) throw new Error('Canvas 2 context unavailable');

  // Background Royal Gradient
  const bgGrad2 = ctx2.createLinearGradient(0, 0, 0, H);
  bgGrad2.addColorStop(0, '#06231A');
  bgGrad2.addColorStop(0.35, '#0B3D2E');
  bgGrad2.addColorStop(0.7, '#113B2C');
  bgGrad2.addColorStop(1, '#041610');
  ctx2.fillStyle = bgGrad2;
  ctx2.fillRect(0, 0, W, H);

  // Outer Ornate Gold Border
  ctx2.save();
  ctx2.beginPath();
  ctx2.strokeStyle = '#C9A24B';
  ctx2.lineWidth = 6;
  ctx2.strokeRect(36, 36, W - 72, H - 72);
  ctx2.closePath();
  ctx2.restore();

  // Inner Fine Gold Border
  ctx2.save();
  ctx2.beginPath();
  ctx2.strokeStyle = 'rgba(229, 195, 101, 0.7)';
  ctx2.lineWidth = 2;
  ctx2.strokeRect(48, 48, W - 96, H - 96);
  ctx2.closePath();
  ctx2.restore();

  // Corner Accents
  ctx2.save();
  ctx2.fillStyle = '#E5C365';
  corners1.forEach(([cx, cy]) => {
    ctx2.beginPath();
    ctx2.arc(cx, cy, 6, 0, Math.PI * 2);
    ctx2.fill();
    ctx2.closePath();
  });
  ctx2.restore();

  // Top Page 2 Header Banner
  ctx2.save();
  ctx2.textAlign = 'center';
  ctx2.font = 'bold 20px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('INSHA ALLAH TO BE SOLEMNISED AS PER PROGRAMME', W / 2, 85);

  ctx2.font = 'bold 36px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText('Auspicious Wedding Itinerary', W / 2, 128);
  ctx2.restore();

  // 1. ALL 7 CEREMONIES PRESERVED COMPLETELY (EACH IN AN ISOLATED BOX)
  const progEvents = [
    { day: 'Day 1 • 10.12.2026 (Thursday)', title: 'Qurankhani & Milad', time: 'at 08:00 a.m.', desc: 'Blessing the holy union with sacred Quran recitations and prayers.' },
    { day: 'Day 1 • 10.12.2026 (Thursday)', title: 'Rasm-E-Haldi (Lagan)', time: 'at 04:00 p.m.', desc: 'Joyous turmeric celebrations and traditional family blessings.' },
    { day: 'Day 2 • 11.12.2026 (Friday)', title: 'Rasm-E-Mehndi', time: 'at 04:00 p.m.', desc: 'Intricate henna designs adorning hands amidst melodious folk songs.' },
    { day: 'Day 3 • 12.12.2026 (Saturday)', title: 'Dinner', time: 'at 07:00 p.m.', desc: 'Grand royal feast prepared to honour all our esteemed guests.' },
    { day: 'Day 3 • 12.12.2026 (Saturday)', title: 'Arrival of Barat', time: 'at 09:00 p.m.', desc: 'Ceremonial welcome of the groom and his wedding procession.' },
    { day: 'Day 3 • 12.12.2026 (Saturday)', title: 'Sacred Nikah', time: 'at 10:00 p.m.', desc: 'The sacred covenant solemnising eternal love and faith in Allah.' },
    { day: 'Day 4 • 13.12.2026 (Sunday)', title: 'Rukhsati', time: 'at 08:00 a.m.', desc: 'Heartfelt farewell and prayers as our beloved daughter embarks on her new journey.' },
  ];

  let pY = 158;
  progEvents.forEach((item) => {
    const isNikah = item.title === 'Sacred Nikah';
    const rowW = 920;
    const rowH = 58;
    const rowX = (W - rowW) / 2;

    // Isolate path completely so it never repaints or covers
    drawCardBox(
      ctx2,
      rowX,
      pY,
      rowW,
      rowH,
      10,
      isNikah ? '#134E3A' : '#06231A',
      isNikah ? '#E5C365' : 'rgba(201, 162, 75, 0.6)',
      isNikah ? 2.5 : 1.5
    );

    ctx2.save();
    // Event Title (Left)
    ctx2.font = 'bold 17px "Cinzel", Georgia, serif';
    ctx2.fillStyle = isNikah ? '#E5C365' : '#FFFDF8';
    ctx2.textAlign = 'left';
    ctx2.fillText(`${item.title}`, rowX + 22, pY + 25);

    // Event Day & Subtext (Left)
    ctx2.font = '13px "Poppins", sans-serif';
    ctx2.fillStyle = '#F3E6C4';
    ctx2.fillText(`${item.day} — ${item.desc}`, rowX + 22, pY + 46);

    // Event Time (Right)
    ctx2.font = 'bold 16px "Poppins", sans-serif';
    ctx2.fillStyle = isNikah ? '#FFFDF8' : '#E5C365';
    ctx2.textAlign = 'right';
    ctx2.fillText(item.time, rowX + rowW - 22, pY + 35);
    ctx2.restore();

    pY += 66;
  });

  // 2. VENUE & GPS NAVIGATION SECTION WITH SCANNABLE QR
  const vBoxW = 920;
  const vBoxH = 175;
  const vBoxX = (W - vBoxW) / 2;
  const vBoxY = pY + 16;

  drawCardBox(ctx2, vBoxX, vBoxY, vBoxW, vBoxH, 16, '#06231A', '#E5C365', 2.5);

  ctx2.save();
  ctx2.textAlign = 'left';
  ctx2.font = 'bold 16px "Cinzel", Georgia, sans-serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('SACRED WEDDING VENUE & GPS NAVIGATION', vBoxX + 25, vBoxY + 34);

  ctx2.font = 'bold 24px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText(weddingData.venue.name, vBoxX + 25, vBoxY + 70);

  ctx2.font = '15px "Poppins", sans-serif';
  ctx2.fillStyle = '#F3E6C4';
  ctx2.fillText(weddingData.venue.address, vBoxX + 25, vBoxY + 100);
  ctx2.fillText('Grand Trunk Road / NH 19 (near Barhi Chowk, Hazaribagh, Jharkhand)', vBoxX + 25, vBoxY + 126);

  ctx2.font = 'bold 13px "Poppins", sans-serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('✦ Scan or tap QR code on right for live Google Maps directions ✦', vBoxX + 25, vBoxY + 154);
  ctx2.restore();

  // Draw High-contrast Scannable QR Code Badge on the right
  const qrBoxSize = 145;
  const qrBoxX = vBoxX + vBoxW - qrBoxSize - 16;
  const qrBoxY = vBoxY + (vBoxH - qrBoxSize) / 2;

  // Solid white background badge so phone cameras can scan with 100% precision
  drawCardBox(ctx2, qrBoxX, qrBoxY, qrBoxSize, qrBoxSize, 12, '#FFFFFF', '#E5C365', 2.5);

  if (qrImg) {
    ctx2.drawImage(qrImg, qrBoxX + 8, qrBoxY + 8, qrBoxSize - 16, qrBoxSize - 32);
    ctx2.save();
    ctx2.font = 'bold 10px "Poppins", sans-serif';
    ctx2.fillStyle = '#06231A';
    ctx2.textAlign = 'center';
    ctx2.fillText('SCAN FOR GPS', qrBoxX + qrBoxSize / 2, qrBoxY + qrBoxSize - 8);
    ctx2.restore();
  }

  // 3. SACRED BLESSINGS OF OUR REVERED LATE ELDERS (Dedicated Memorial Card)
  const elderBoxW = 920;
  const elderBoxH = 120;
  const elderBoxX = (W - elderBoxW) / 2;
  const elderBoxY = vBoxY + vBoxH + 20;

  drawCardBox(ctx2, elderBoxX, elderBoxY, elderBoxW, elderBoxH, 14, '#06231A', '#C9A24B', 2);

  ctx2.save();
  ctx2.textAlign = 'center';
  ctx2.font = 'bold 15px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('IN SACRED MEMORY & ETERNAL BLESSINGS OF OUR REVERED LATE ELDERS', W / 2, elderBoxY + 32);

  ctx2.font = 'bold 26px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText(`${weddingData.rsvp.lateElders[0].name}     &     ${weddingData.rsvp.lateElders[1].name}`, W / 2, elderBoxY + 68);

  ctx2.font = 'italic 16px "Amiri", serif';
  ctx2.fillStyle = '#F3E6C4';
  ctx2.fillText('سایۂ شفقت و مغفرت کی دعا کے ساتھ (May Allah grant them the highest station in Jannat-ul-Firdaus)', W / 2, elderBoxY + 98);
  ctx2.restore();

  // 4. CORDIAL INVITATION FROM HOST CARD
  const hostBoxW = 920;
  const hostBoxH = 135;
  const hostBoxX = (W - hostBoxW) / 2;
  const hostBoxY = elderBoxY + elderBoxH + 20;

  drawCardBox(ctx2, hostBoxX, hostBoxY, hostBoxW, hostBoxH, 14, '#0B3D2E', '#E5C365', 2);

  ctx2.save();
  ctx2.textAlign = 'center';
  ctx2.font = 'bold 16px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('A CORDIAL INVITATION FROM:', W / 2, hostBoxY + 32);

  ctx2.font = 'bold 26px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText(weddingData.inviter.name, W / 2, hostBoxY + 66);

  ctx2.font = '15px "Poppins", sans-serif';
  ctx2.fillStyle = '#F3E6C4';
  ctx2.fillText(weddingData.inviter.address, W / 2, hostBoxY + 94);

  ctx2.font = 'bold 15px "Poppins", sans-serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText(`Phone: ${weddingData.inviter.mobiles.join('   •   ')}`, W / 2, hostBoxY + 118);
  ctx2.restore();

  // 5. COMPLETE R.S.V.P. FAMILY MEMBERS CARD (ALL INCLUDED, NONE REMOVED)
  const rsvpBoxW = 920;
  const rsvpBoxH = 160;
  const rsvpBoxX = (W - rsvpBoxW) / 2;
  const rsvpBoxY = hostBoxY + hostBoxH + 20;

  drawCardBox(ctx2, rsvpBoxX, rsvpBoxY, rsvpBoxW, rsvpBoxH, 14, '#06231A', '#C9A24B', 2);

  // Render all family members in two clean, balanced rows:
  const fam = weddingData.rsvp.familyMembers;
  const row1 = fam.slice(0, 3).join('     •     ');
  const row2 = fam.slice(3).join('     •     ');

  ctx2.save();
  ctx2.textAlign = 'center';
  ctx2.font = 'bold 16px "Cinzel", Georgia, serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('R.S.V.P. — WITH RESPECTS & COMPLIMENTS OF:', W / 2, rsvpBoxY + 30);

  ctx2.font = 'bold 18px "Poppins", sans-serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText(row1, W / 2, rsvpBoxY + 66);
  ctx2.fillText(row2, W / 2, rsvpBoxY + 96);

  ctx2.font = 'italic 21px "Cormorant Garamond", Georgia, serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText(`& ${weddingData.rsvp.inclusive}`, W / 2, rsvpBoxY + 132);
  ctx2.restore();

  // 6. SACRED CLOSING DUA
  const duaY = rsvpBoxY + rsvpBoxH + 32;
  ctx2.save();
  ctx2.textAlign = 'center';
  ctx2.font = 'bold 36px "Amiri", serif';
  ctx2.fillStyle = '#E5C365';
  ctx2.fillText('جَزَاكُمُ اللَّهُ خَيْرًا', W / 2, duaY);

  ctx2.font = 'italic 17px "Cormorant Garamond", Georgia, serif';
  ctx2.fillStyle = '#FFFDF8';
  ctx2.fillText('“May Allah SWT shower endless barakah, happiness, and peace upon you and your family.”', W / 2, duaY + 36);

  // Page 2 Bottom Footer Indicator
  ctx2.fillStyle = '#E5C365';
  ctx2.font = 'bold 14px "Cinzel", Georgia, sans-serif';
  ctx2.fillText('✦ PAGE 2 OF 2  •  FARHA PRAVEEN & MD. FIROJ WEDDING CELEBRATIONS ✦', W / 2, 1665);
  ctx2.restore();


  // ========================================================
  // ASSEMBLE BOTH PAGES INTO HIGH-DPI 2-PAGE PDF DOCUMENT
  // ========================================================
  function canvasToJpegBytes(cvs) {
    const dataUrl = cvs.toDataURL('image/jpeg', 0.95);
    const b64 = dataUrl.split(',')[1];
    const binStr = atob(b64);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bytes[i] = binStr.charCodeAt(i);
    }
    return bytes;
  }

  const page1Bytes = canvasToJpegBytes(canvas1);
  const page2Bytes = canvasToJpegBytes(canvas2);

  const pdfBlob = createPdfFromTwoPages(page1Bytes, page2Bytes, W, H, 420, 595);
  const pdfUrl = URL.createObjectURL(pdfBlob);

  const safeName = cleanName.replace(/[^a-zA-Z0-9]/g, '-').slice(0, 30);
  const fileName = `Wedding-Invitation-Farha-Praveen-weds-Md-Firoj-for-${safeName}.pdf`;

  const link = document.createElement('a');
  link.href = pdfUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  setTimeout(() => URL.revokeObjectURL(pdfUrl), 15000);

  return {
    success: true,
    fileName,
    cleanName,
  };
}
