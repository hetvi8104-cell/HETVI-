import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, ArrowUp, Instagram, Linkedin, Globe, Loader2, AlertCircle } from 'lucide-react';

export const ATELIER_INQUIRY_EMAIL = 'hetvi8104@gmail.com';

interface ContactSectionProps {
  isDarkTheme: boolean;
  onScrollToTop: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkTheme, onScrollToTop }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: 'Couture Commission',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setStatusMessage('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${ATELIER_INQUIRY_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `[HK Atelier Inquiry] ${formData.inquiryType} from ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
          name: formData.name,
          email: formData.email,
          inquiryType: formData.inquiryType,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setSubmitStatus('success');
        setStatusMessage(`Thank you, ${formData.name}. Your inquiry has been forwarded directly to ${ATELIER_INQUIRY_EMAIL}.`);
        setFormData({
          name: '',
          email: '',
          inquiryType: 'Couture Commission',
          message: ''
        });
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Direct web transmission failed. You can send your inquiry directly via your default email application.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMailtoFallback = () => {
    const subject = encodeURIComponent(`[HK Atelier Inquiry] ${formData.inquiryType} from ${formData.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nInquiry: ${formData.inquiryType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${ATELIER_INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative w-full pt-28 pb-16 px-6 md:px-12 lg:px-20 border-t border-[#D4C5B0]/60 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Pre-Title */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-[1px] bg-[#6E1A29] dark:bg-[#D48B96]" />
            <span className="text-[10px] font-sans-modern tracking-[0.35em] uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
              07 • STUDIO & INQUIRIES
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-luxury font-bold tracking-tight text-[#5C1322] dark:text-[#FAF6F0]">
            INITIATE DIALOGUE
          </h2>
          <p className="text-xs sm:text-sm font-sans-modern text-[#221B1C]/75 dark:text-[#F3EBE6]/75 leading-relaxed max-w-2xl">
            For bespoke couture commissions, academic research collaborations, editorial loans, or press inquiries.
          </p>
        </div>

        {/* 2 Column Editorial Form & Contact Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Atelier Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className={`p-8 rounded-3xl border space-y-6 ${
              isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#6E1A29] dark:text-[#D48B96]">
                  DESIGNER ATELIER
                </span>
                <h3 className="text-2xl font-serif-luxury font-bold text-[#5C1322] dark:text-[#FAF6F0]">
                  HETVI KAPADIA
                </h3>
              </div>

              <div className="space-y-4 text-xs font-sans-modern">
                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold opacity-60">Direct Email</span>
                    <a 
                      href="mailto:hetvi8104@gmail.com" 
                      data-cursor="link"
                      className="text-sm font-serif-luxury font-bold hover:text-[#6E1A29] dark:hover:text-[#D48B96] transition-colors"
                    >
                      hetvi8104@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 pt-2">
                  <MapPin className="w-4 h-4 text-[#6E1A29] dark:text-[#D48B96] mt-0.5 shrink-0" />
                  <div>
                    <span className="block text-[10px] uppercase font-bold opacity-60">Atelier Studio Base</span>
                    <span className="text-sm font-serif-luxury font-bold">
                      Ahmedabad / Mumbai, India
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-2 pt-4 border-t border-current/10">
                <span className="text-[10px] uppercase font-bold opacity-60 tracking-wider">
                  Digital Platforms
                </span>
                <div className="flex items-center space-x-3 pt-1">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="p-3 rounded-full border border-current/15 hover:bg-[#6E1A29] hover:text-[#FAF6F0] transition-all text-xs"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="p-3 rounded-full border border-current/15 hover:bg-[#6E1A29] hover:text-[#FAF6F0] transition-all text-xs"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href="https://behance.net"
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="link"
                    className="p-3 rounded-full border border-current/15 hover:bg-[#6E1A29] hover:text-[#FAF6F0] transition-all text-xs"
                    title="Behance"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Inquiry Form */}
          <div className="lg:col-span-7">
            <form 
              onSubmit={handleSubmit}
              className={`p-8 sm:p-10 rounded-3xl border shadow-xl space-y-6 ${
                isDarkTheme ? 'bg-[#280D1A]/90 border-[#6E1A29]/40' : 'bg-[#FCFAF7] border-[#DCD0BF]'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-modern uppercase tracking-wider font-bold opacity-75">
                    Your Name
                  </label>
                  <input
                    id="contact-name-input"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Hetvi Kapadia"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-sans-modern outline-none transition-all focus:ring-1 ${
                      isDarkTheme 
                        ? 'bg-black/40 border-white/15 focus:border-[#D48B96] focus:ring-[#D48B96]/40 text-[#FAF6F0] placeholder:text-stone-500' 
                        : 'bg-[#FCFAF7] border-[#D4C5B0] focus:border-[#6E1A29] focus:ring-[#6E1A29]/30 text-[#221B1C] placeholder:text-stone-400'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-sans-modern uppercase tracking-wider font-bold opacity-75">
                    Email Address
                  </label>
                  <input
                    id="contact-email-input"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="hetvi8104@gmail.com"
                    className={`w-full px-4 py-3 rounded-xl border text-xs font-sans-modern outline-none transition-all focus:ring-1 ${
                      isDarkTheme 
                        ? 'bg-black/40 border-white/15 focus:border-[#D48B96] focus:ring-[#D48B96]/40 text-[#FAF6F0] placeholder:text-stone-500' 
                        : 'bg-[#FCFAF7] border-[#D4C5B0] focus:border-[#6E1A29] focus:ring-[#6E1A29]/30 text-[#221B1C] placeholder:text-stone-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans-modern uppercase tracking-wider font-bold opacity-75">
                  Inquiry Nature
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs font-sans-modern outline-none transition-all ${
                    isDarkTheme 
                      ? 'bg-[#181114] border-white/15 focus:border-[#D48B96] text-[#FAF6F0]' 
                      : 'bg-[#FCFAF7] border-[#D4C5B0] focus:border-[#6E1A29] text-[#221B1C]'
                  }`}
                >
                  <option value="Couture Commission">Bespoke Couture Commission</option>
                  <option value="Editorial Loan">Editorial / Runway Loan</option>
                  <option value="Textile Collaboration">Textile Research Collaboration</option>
                  <option value="Press Interview">Press & Academic Interview</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-sans-modern uppercase tracking-wider font-bold opacity-75">
                  Message / Project Scope
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, timeline, or commission details..."
                  className={`w-full px-4 py-3 rounded-xl border text-xs font-sans-modern outline-none resize-none transition-all ${
                    isDarkTheme 
                      ? 'bg-black/40 border-white/15 focus:border-[#D48B96] text-[#FAF6F0]' 
                      : 'bg-[#FCFAF7] border-[#D4C5B0] focus:border-[#6E1A29] text-[#221B1C]'
                  }`}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-start space-x-3 text-emerald-400 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0 text-emerald-400" />
                  <p className="text-xs font-sans-modern leading-relaxed">
                    {statusMessage}
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3 text-rose-300 animate-in fade-in">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 shrink-0 text-rose-400" />
                    <p className="text-xs font-sans-modern leading-relaxed">
                      {statusMessage}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleMailtoFallback}
                    data-cursor="link"
                    className="px-4 py-2 rounded-full bg-[#6E1A29] hover:bg-[#802031] text-white text-[10px] font-sans-modern tracking-widest uppercase font-bold flex items-center space-x-2 transition-all shadow-sm active:scale-95"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Launch in Mail App Directly</span>
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                data-cursor="link"
                className={`w-full py-4 rounded-full text-[#FAF6F0] text-[11px] font-sans-modern tracking-[0.22em] uppercase font-bold flex items-center justify-center space-x-2 shadow-md transition-all active:scale-95 ${
                  isSubmitting 
                    ? 'bg-[#6E1A29]/70 cursor-wait' 
                    : 'bg-[#6E1A29] hover:bg-[#802031]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#FAF6F0]" />
                    <span>Transmitting to Atelier...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Inquiry Transmitted Successfully</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Atelier Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Minimal Luxury Footer */}
        <footer className="pt-16 border-t border-[#D4C5B0]/70 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] font-sans-modern opacity-65 uppercase tracking-widest">
          <div>
            © 2026 HETVI KAPADIA • ALL RIGHTS RESERVED
          </div>

          <div className="text-center sm:text-right">
            ARCHITECTURAL TAILORING & ANCESTRAL CRAFT
          </div>

          <button
            onClick={onScrollToTop}
            data-cursor="link"
            className="flex items-center space-x-2 hover:text-[#6E1A29] dark:hover:text-[#D48B96] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </footer>
      </div>
    </section>
  );
};
