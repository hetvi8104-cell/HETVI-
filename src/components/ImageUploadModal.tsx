import React, { useState } from 'react';
import { X, Upload, RotateCcw, Link as LinkIcon, Check, Image as ImageIcon } from 'lucide-react';
import { saveCustomImage, resetCustomImage } from '../utils/imageStore';
import { sounds } from '../utils/soundEffects';

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  slotId: string;
  label: string;
  currentUrl: string;
  defaultUrl: string;
  placeholderHint: string;
  onImageChanged: (newUrl: string) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  onClose,
  slotId,
  label,
  currentUrl,
  defaultUrl,
  placeholderHint,
  onImageChanged
}) => {
  const [urlInput, setUrlInput] = useState(currentUrl);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        setPreviewUrl(base64);
        setUrlInput(base64);
        setStatusMessage('File loaded successfully.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApply = () => {
    sounds.playClick();
    saveCustomImage(slotId, previewUrl);
    onImageChanged(previewUrl);
    onClose();
  };

  const handleReset = () => {
    sounds.playClick();
    resetCustomImage(slotId);
    setPreviewUrl(defaultUrl);
    setUrlInput(defaultUrl);
    onImageChanged(defaultUrl);
    setStatusMessage('Reset to curated default placeholder.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FCFAF7] border border-[#D8C7B5] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-[#F7F3EC] border-b border-[#D8C7B5]/60 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#722F37]" />
            <h3 className="font-serif-luxury text-lg text-[#262223] font-semibold">
              Asset Replacement Studio
            </h3>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Label callout */}
          <div className="p-3.5 rounded-xl bg-[#5A1F2B]/5 border border-[#5A1F2B]/20">
            <p className="text-[10px] font-sans-modern tracking-[0.2em] uppercase font-bold text-[#5A1F2B]">
              Placeholder Target
            </p>
            <p className="text-sm font-serif-luxury font-semibold text-[#262223] mt-0.5">
              {label}
            </p>
            <p className="text-xs text-stone-600 mt-1 font-sans-modern">
              {placeholderHint}
            </p>
          </div>

          {/* Image Preview Window */}
          <div className="space-y-2">
            <label className="text-xs font-sans-modern font-semibold uppercase tracking-wider text-stone-500">
              Live Preview
            </label>
            <div className="relative w-full h-52 rounded-xl border-2 border-dashed border-[#D8C7B5] bg-[#F7F3EC] overflow-hidden flex items-center justify-center group">
              <img
                src={previewUrl}
                alt="Replacement Preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => {
                  setPreviewUrl(defaultUrl);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] text-white/90 font-sans-modern px-2 py-1 rounded bg-black/60 backdrop-blur-xs">
                  Aspect ratio will be maintained in slide layout
                </span>
              </div>
            </div>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-[#D8C7B5]/60 text-xs font-sans-modern">
            <button
              onClick={() => setActiveTab('upload')}
              className={`pb-2.5 px-4 font-semibold transition-all border-b-2 flex items-center space-x-2 ${
                activeTab === 'upload'
                  ? 'border-[#722F37] text-[#722F37]'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Local File</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`pb-2.5 px-4 font-semibold transition-all border-b-2 flex items-center space-x-2 ${
                activeTab === 'url'
                  ? 'border-[#722F37] text-[#722F37]'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Image URL / Web Link</span>
            </button>
          </div>

          {activeTab === 'upload' ? (
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center p-6 border border-[#D8C7B5] bg-[#FCFAF7] hover:bg-[#F7F3EC] rounded-xl cursor-pointer transition-all border-dashed">
                <Upload className="w-8 h-8 text-[#722F37] mb-2" />
                <span className="text-xs font-semibold text-stone-700 font-sans-modern">
                  Click to select high-res image (PNG, JPG, WEBP)
                </span>
                <span className="text-[11px] text-stone-500 mt-1">
                  Directly replaces this placeholder across all slides & exports
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="https://example.com/hetvi-look-01-illustration.jpg"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    setPreviewUrl(e.target.value);
                  }}
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-[#D8C7B5] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#722F37]"
                />
              </div>
            </div>
          )}

          {statusMessage && (
            <p className="text-xs text-[#722F37] font-sans-modern italic">
              ✓ {statusMessage}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F7F3EC] border-t border-[#D8C7B5]/60 flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-stone-500 hover:text-[#722F37] flex items-center space-x-1.5 transition-colors font-sans-modern"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                sounds.playClick();
                onClose();
              }}
              className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900 font-sans-modern transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#5A1F2B] hover:bg-[#722F37] text-white shadow-md flex items-center space-x-2 transition-all"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Apply Asset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
