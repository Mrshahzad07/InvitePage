import React, { useState, useEffect } from 'react';
import {
  Share2,
  Calendar,
  Copy,
  Check,
  QrCode,
  MessageCircle,
  Sparkles,
  Download,
  X,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { weddingData } from '../data/invitation';
import {
  shareOnWhatsApp,
  shareViaWebShare,
  copyToClipboard,
  buildInviteLink,
  generateQrDataUrl,
} from '../utils/share';
import { downloadAllEventsIcs, getGoogleCalendarUrl } from '../utils/calendar';
import { generatePersonalizedWeddingPdf } from '../utils/pdfGenerator';
import { useLanguage } from '../context/LanguageContext';

/**
 * SECTION 9: SHARE & SAVE
 * - Add to Calendar (.ics with all 7 events + Google Calendar link)
 * - Download Personalized PDF Card with guest name
 * - Share on WhatsApp with custom or default guest name
 * - Web Share API
 * - Copy Link with Toast
 * - Interactive QR Code Modal
 * - Custom Guest Name Link Builder (for family sharing convenience!)
 * - Multi-language support (English, हिन्दी, اردو)
 */
export default function ShareSave({ guestInfo }) {
  const { t, isUrdu, isHindi, language } = useLanguage();
  const [customName, setCustomName] = useState(guestInfo.displayName || '');
  const [copied, setCopied] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  // Update QR code whenever customName changes
  useEffect(() => {
    const link = buildInviteLink(customName);
    generateQrDataUrl(link).then((url) => setQrDataUrl(url));
  }, [customName]);

  const handleDownloadPdf = async () => {
    setIsDownloadingPdf(true);
    try {
      await generatePersonalizedWeddingPdf(customName || guestInfo.displayName);
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#C9A24B', '#F3E6C4', '#134E3A', '#7A1F2B'],
      });
    } catch (err) {
      console.error('PDF generation error', err);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleCopyLink = async () => {
    const link = buildInviteLink(customName);
    const res = await copyToClipboard(link);
    if (res.success) {
      setCopied(true);
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#C9A24B', '#F3E6C4', '#134E3A'],
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsAppShare = () => {
    shareOnWhatsApp(customName);
  };

  const handleNativeShare = async () => {
    await shareViaWebShare(customName);
  };

  return (
    <section
      id="share"
      className="relative py-20 px-4 z-10"
    >
      <div className="max-w-3xl mx-auto">
        <div className="glass-emerald-card rounded-3xl p-8 sm:p-12 border-2 border-[#C9A24B]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center">
          {/* Header */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#134E3A]/80 border border-[#C9A24B]/30 mb-4">
            <Share2 className="w-3.5 h-3.5 text-[#C9A24B]" />
            <span className={`text-xs text-[#F3E6C4] uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel tracking-[0.2em]'}`}>
              {t.share.badge}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-4xl text-gold-bright font-bold mb-3 ${isUrdu ? 'font-urdu text-3xl sm:text-4xl' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
            {t.share.title}
          </h2>

          <p className={`text-xs sm:text-sm text-[#FBF6E9]/80 max-w-lg mx-auto mb-8 ${isUrdu ? 'font-urdu text-sm' : 'font-poppins'}`}>
            {t.share.subtitle}
          </p>

          {/* Guest Personalization Box for Easy Sharing */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#06231A]/70 border border-[#C9A24B]/30 mb-8 max-w-xl mx-auto text-left">
            <label className={`block text-[11px] text-[#C9A24B] uppercase tracking-wider mb-2 ${isUrdu ? 'font-urdu text-xs' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
              {t.share.personalizeLabel}
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t.share.placeholder}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#0B3D2E] border border-[#C9A24B]/40 text-[#FFFDF8] placeholder-[#F3E6C4]/40 font-poppins text-sm focus:outline-none focus:border-[#C9A24B]"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl bg-[#134E3A] border border-[#C9A24B]/50 text-[#F3E6C4] text-xs font-semibold tracking-wider flex items-center justify-center gap-2 hover:bg-[#C9A24B] hover:text-[#06231A] transition-colors cursor-pointer ${
                  isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-[#10B981]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.share.copiedText : t.share.copyLinkText}</span>
              </button>
            </div>
            <p className="font-poppins text-[10px] text-[#F3E6C4]/60 mt-2">
              {t.share.generatingLabel} {buildInviteLink(customName)}
            </p>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
            {/* Download Personalized PDF Invitation Card (Featured Full Width) */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloadingPdf}
              className={`col-span-1 sm:col-span-2 py-4 px-6 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] hover:brightness-110 transition-all flex items-center justify-center gap-2.5 shadow-[0_6px_25px_rgba(201,162,75,0.45)] cursor-pointer border-2 border-[#FFFDF8]/50 active:scale-98 ${
                isUrdu ? 'font-urdu text-base' : isHindi ? 'font-poppins' : 'font-cinzel'
              }`}
            >
              <Download className="w-5 h-5 text-[#06231A]" />
              <span>{isDownloadingPdf ? t.share.downloadingPdf : t.share.downloadMyPdf}</span>
            </button>

            {/* WhatsApp Share Button */}
            <button
              onClick={handleWhatsAppShare}
              className={`py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#25D366] text-[#06231A] hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(37,211,102,0.3)] cursor-pointer ${
                isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-[#06231A]" />
              <span>{t.share.shareWhatsAppButton}</span>
            </button>

            {/* Web Share / Device Share */}
            <button
              onClick={handleNativeShare}
              className={`py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-gradient-to-r from-[#F3E6C4] via-[#E5C365] to-[#C9A24B] text-[#06231A] hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_4px_15px_rgba(201,162,75,0.4)] cursor-pointer ${
                isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
              }`}
            >
              <Share2 className="w-4 h-4 text-[#06231A]" />
              <span>{t.share.shareOthers}</span>
            </button>

            {/* Download Calendar .ICS */}
            <button
              onClick={downloadAllEventsIcs}
              className={`py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#134E3A] border border-[#C9A24B]/50 text-[#F3E6C4] hover:bg-[#0B3D2E] hover:border-[#C9A24B] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
              }`}
            >
              <Download className="w-4 h-4 text-[#C9A24B]" />
              <span>{t.share.downloadIcs}</span>
            </button>

            {/* View QR Code */}
            <button
              onClick={() => setQrModalOpen(true)}
              className={`py-3.5 px-6 rounded-xl text-xs sm:text-sm font-semibold tracking-wider uppercase bg-[#134E3A] border border-[#C9A24B]/50 text-[#F3E6C4] hover:bg-[#0B3D2E] hover:border-[#C9A24B] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isUrdu ? 'font-urdu text-sm' : isHindi ? 'font-poppins' : 'font-cinzel'
              }`}
            >
              <QrCode className="w-4 h-4 text-[#C9A24B]" />
              <span>{t.share.showQr}</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Pop-up Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06231A]/90 backdrop-blur-md">
          <div className="relative glass-emerald-card rounded-3xl p-6 sm:p-8 max-w-sm w-full border-2 border-[#C9A24B] text-center shadow-[0_25px_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setQrModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#0B3D2E] border border-[#C9A24B]/40 flex items-center justify-center text-[#F3E6C4] hover:text-[#C9A24B] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className={`text-xs text-[#C9A24B] tracking-widest uppercase ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins' : 'font-cinzel'}`}>
              {t.share.scanToOpen}
            </span>
            <h3 className={`text-2xl text-gold-bright font-bold my-2 ${isUrdu ? 'font-urdu' : isHindi ? 'font-poppins font-bold' : 'font-serif'}`}>
              {t.couple.brideFull} &amp; {t.couple.groomFull}
            </h3>

            {/* QR Code Canvas / Image */}
            <div className="my-4 p-3 bg-[#FBF6E9] rounded-2xl inline-block shadow-inner border border-[#C9A24B]/40">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Wedding Invitation QR Code"
                  className="w-56 h-56 mx-auto rounded-lg"
                />
              ) : (
                <div className="w-56 h-56 flex items-center justify-center text-[#0B3D2E]">
                  Generating QR...
                </div>
              )}
            </div>

            <p className="font-poppins text-xs text-[#F3E6C4]/80">
              {customName ? `${t.share.tailoredFor} ${customName}` : t.share.pointPhone}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
