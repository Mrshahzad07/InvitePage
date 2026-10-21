import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  MapPin,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  QrCode,
  Download,
  Car,
  Compass,
} from 'lucide-react';
import { weddingData } from '../data/invitation';
import { copyToClipboard } from '../utils/share';

/**
 * SECTION 7: VENUE (Hotel Shree Parivaar, Barhi)
 * - Directly includes a scannable Google Maps QR Code for effortless phone GPS navigation
 * - One-tap "Open in Google Maps"
 * - "Copy Address" with toast feedback
 * - Travel route guidance (GT Road / NH 19)
 */
export default function Venue() {
  const [copied, setCopied] = useState(false);
  const [mapQrUrl, setMapQrUrl] = useState('');

  // Generate the Google Maps QR code on mount
  useEffect(() => {
    QRCode.toDataURL(weddingData.venue.googleMapsUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#06231A', // Deep emerald
        light: '#FBF6E9', // Ivory
      },
      errorCorrectionLevel: 'H',
    })
      .then((url) => setMapQrUrl(url))
      .catch((err) => console.error('Map QR error', err));
  }, []);

  const handleCopyAddress = async () => {
    const fullAddress = `${weddingData.venue.name}, ${weddingData.venue.address}`;
    const res = await copyToClipboard(fullAddress);
    if (res.success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const downloadMapQr = () => {
    if (!mapQrUrl) return;
    const a = document.createElement('a');
    a.href = mapQrUrl;
    a.download = 'Hotel-Shree-Parivaar-Barhi-Map-QR.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section
      id="venue"
      className="relative min-h-screen flex items-center justify-center py-20 px-3 sm:px-6 z-10"
    >
      <div className="max-w-4xl w-full mx-auto">
        <div className="glass-emerald-card rounded-3xl p-6 sm:p-12 border-2 border-[#C9A24B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden text-center">
          {/* Subtle Fairy Lights Effect at top of card */}
          <div className="absolute top-0 left-0 right-0 h-10 flex items-center justify-around px-4 pointer-events-none">
            {[...Array(14)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full bg-[#FFE58F] shadow-[0_0_10px_#FFE58F] animate-pulse"
                style={{ animationDelay: `${(i * 0.2).toFixed(2)}s` }}
              />
            ))}
          </div>

          {/* Section Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/90 border border-[#C9A24B]/40 mb-4 mt-3">
            <MapPin className="w-4 h-4 text-[#C9A24B]" />
            <span className="font-cinzel text-xs font-bold text-[#F3E6C4] tracking-[0.2em] uppercase">
              WEDDING VENUE & GPS NAVIGATION
            </span>
          </div>

          {/* Venue Name Verbatim */}
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-gold-bright font-bold tracking-wide mb-2">
            {weddingData.venue.name}
          </h2>

          <p className="font-cinzel text-sm sm:text-base text-[#C9A24B] tracking-[0.2em] uppercase font-semibold mb-6">
            {weddingData.venue.displayCity}
          </p>

          {/* Detailed Address Block */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#06231A]/80 border border-[#C9A24B]/30 max-w-xl mx-auto mb-8 shadow-inner">
            <p className="font-poppins text-sm sm:text-base text-[#FBF6E9] leading-relaxed font-medium">
              {weddingData.venue.address}
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#E5C365] font-poppins">
              <Car className="w-4 h-4 text-[#C9A24B]" />
              <span>Prime Highway Location: Grand Trunk Road / NH 19 (near Barhi Chowk)</span>
            </div>
          </div>

          {/* QR CODE FOR DIRECT GOOGLE MAPS NAVIGATION */}
          <div className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#06231A]/90 to-[#0B3D2E]/90 border-2 border-[#C9A24B] max-w-lg mx-auto shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-center gap-2 mb-3">
              <QrCode className="w-5 h-5 text-[#E5C365]" />
              <span className="font-cinzel text-xs sm:text-sm font-bold text-gold-bright tracking-wider uppercase">
                SCAN WITH PHONE FOR GOOGLE MAPS
              </span>
            </div>

            <p className="font-poppins text-xs text-[#F3E6C4]/80 mb-5 max-w-md mx-auto">
              Scan this QR code with any smartphone camera to instantly launch turn-by-turn GPS navigation directly to Hotel Shree Parivaar:
            </p>

            {/* QR Code Container with Gold Glow */}
            <div className="relative inline-block p-4 rounded-2xl bg-[#FBF6E9] shadow-[0_0_25px_rgba(201,162,75,0.4)] border-2 border-[#C9A24B]">
              {mapQrUrl ? (
                <img
                  src={mapQrUrl}
                  alt="Google Maps QR Code for Hotel Shree Parivaar Barhi"
                  className="w-48 h-48 sm:w-56 sm:h-56 mx-auto rounded-lg"
                />
              ) : (
                <div className="w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center text-[#06231A]">
                  Generating Maps QR...
                </div>
              )}

              {/* Center Map Pin Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0B3D2E] border-2 border-[#C9A24B] flex items-center justify-center shadow-lg pointer-events-none">
                <MapPin className="w-5 h-5 text-[#E5C365]" />
              </div>
            </div>

            {/* Download QR button */}
            <div className="mt-4">
              <button
                onClick={downloadMapQr}
                className="inline-flex items-center gap-1.5 text-xs font-poppins text-[#C9A24B] hover:text-[#FFFDF8] transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Location QR Image to Phone</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
            {/* Open in Google Maps */}
            <a
              href={weddingData.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] hover:brightness-110 transition-all duration-200 shadow-[0_4px_20px_rgba(201,162,75,0.4)] cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#06231A]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#06231A]" />
            </a>

            {/* Copy Address */}
            <button
              onClick={handleCopyAddress}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-cinzel text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#134E3A] text-[#F3E6C4] border border-[#C9A24B]/50 hover:border-[#C9A24B] hover:bg-[#0B3D2E] transition-all duration-200 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#10B981]" />
                  <span className="text-[#10B981] font-bold">Address Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#C9A24B]" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
