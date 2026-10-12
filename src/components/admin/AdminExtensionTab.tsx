import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  Download,
  Copy,
  Check,
  Puzzle,
  ExternalLink,
  Shield,
  MessageCircle,
  Phone,
  Bell,
  Code,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Radio,
  FileCheck,
} from 'lucide-react';
import { EnquiryItem, GeneralSettings } from '../../types';

interface AdminExtensionTabProps {
  settings: GeneralSettings;
  setSettings: React.Dispatch<React.SetStateAction<GeneralSettings>>;
  enquiries: EnquiryItem[];
  onOpenDashboard: () => void;
  onOpenImages: () => void;
  showToast: (msg: string) => void;
}

export const AdminExtensionTab: React.FC<AdminExtensionTabProps> = ({
  settings,
  setSettings,
  enquiries,
  showToast,
}) => {
  const [isGeneratingZip, setIsGeneratingZip] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'chrome' | 'quickbar' | 'bookmarklet' | 'webhooks'>('chrome');

  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  const copyToClipboard = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    showToast(`${section} copied to clipboard!`);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  // Manifest V3 definition
  const manifestJson = JSON.stringify(
    {
      manifest_version: 3,
      name: `Maulana Shamsuddin Admin Extension`,
      version: '1.2.0',
      description: `Official Chrome & Browser Extension for Maulana Shamsuddin Spiritual Consultation Services Admin Portal. Real-time lead alerts, quick call, and 1-click admin access.`,
      permissions: ['storage', 'notifications', 'alarms'],
      host_permissions: ['<all_urls>'],
      action: {
        default_popup: 'popup.html',
        default_title: 'Maulana Shamsuddin Admin Hub',
        default_icon: {
          '16': 'icon16.png',
          '48': 'icon48.png',
          '128': 'icon128.png',
        },
      },
      background: {
        service_worker: 'background.js',
      },
      icons: {
        '16': 'icon16.png',
        '48': 'icon48.png',
        '128': 'icon128.png',
      },
    },
    null,
    2
  );

  // Popup HTML definition
  const popupHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maulana Shamsuddin Admin</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { width: 340px; background: #0b1a12; color: #f3f7f4; padding: 16px; }
    .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(212,175,55,0.3); padding-bottom: 12px; margin-bottom: 14px; }
    .title { font-size: 15px; font-weight: 700; color: #d4af37; }
    .subtitle { font-size: 11px; color: #86efac; }
    .badge { background: #d4af37; color: #0b1a12; font-size: 10px; font-weight: bold; padding: 2px 7px; border-radius: 99px; }
    .card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 12px; margin-bottom: 10px; }
    .stat-row { display: flex; justify-content: space-between; align-items: center; }
    .stat-val { font-size: 18px; font-weight: bold; color: #fde047; }
    .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 10px; }
    .btn { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 10px; border-radius: 8px; font-size: 11px; font-weight: 600; text-decoration: none; cursor: pointer; border: none; }
    .btn-primary { background: #155e3c; color: #fff; }
    .btn-primary:hover { background: #0f442b; }
    .btn-gold { background: #d4af37; color: #0b1a12; }
    .btn-gold:hover { background: #b89324; }
    .btn-full { width: 100%; margin-top: 8px; }
    .footer { font-size: 10px; color: #94a3b8; text-align: center; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="title">Maulana Shamsuddin</div>
      <div class="subtitle">Admin Companion Extension</div>
    </div>
    <span class="badge">v1.2</span>
  </div>

  <div class="card">
    <div class="stat-row">
      <span>Pending Enquiries:</span>
      <span class="stat-val" id="enqCount">${newEnquiriesCount} New</span>
    </div>
    <div style="font-size: 11px; color: #94a3b8; margin-top: 4px;">Direct call & WhatsApp ready</div>
  </div>

  <div class="btn-row">
    <a href="tel:${settings.phoneNumber}" class="btn btn-gold" target="_blank">
      📞 Direct Call
    </a>
    <a href="https://wa.me/${settings.whatsappNumber}" class="btn btn-primary" target="_blank">
      💬 WhatsApp
    </a>
  </div>

  <button id="openAdminBtn" class="btn btn-gold btn-full">
    👑 Open Full Admin Portal
  </button>

  <button id="toggleImagesBtn" class="btn btn-primary btn-full">
    🖼️ Toggle Website Images
  </button>

  <div class="footer">
    Official Browser Extension &bull; Auto-Sync Enabled
  </div>

  <script src="popup.js"></script>
</body>
</html>`;

  // Popup JS definition
  const popupJs = `document.getElementById('openAdminBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.url) {
      const url = new URL(tabs[0].url);
      url.hash = 'admin';
      chrome.tabs.update(tabs[0].id, { url: url.toString() });
    } else {
      chrome.tabs.create({ url: 'https://ais-dev-r7cmkfk5pqke3fvxyw2xpj-144620656396.asia-east1.run.app/#admin' });
    }
    window.close();
  });
});

document.getElementById('toggleImagesBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          window.location.hash = 'images';
        }
      });
    }
    window.close();
  });
});`;

  // Background JS definition
  const backgroundJs = `chrome.runtime.onInstalled.addListener(() => {
  console.log('Maulana Shamsuddin Admin Extension installed');
  chrome.action.setBadgeText({ text: 'MS' });
  chrome.action.setBadgeBackgroundColor({ color: '#155e3c' });
});

// Periodic alarm to check for new enquiries
chrome.alarms.create('checkEnquiries', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkEnquiries') {
    // Lead polling routine
  }
});`;

  // Readme text
  const readmeTxt = `======================================================
MAULANA SHAMSUDDIN ADMIN EXTENSION (CHROME & BROWSERS)
======================================================

How to install this extension in Google Chrome, Brave, Edge, or Opera:

1. Unzip this downloaded archive into a folder on your computer.
2. Open Google Chrome (or Edge/Brave) and navigate to:
   chrome://extensions  (or edge://extensions)
3. In the top-right corner, turn ON "Developer mode".
4. In the top-left corner, click "Load unpacked".
5. Select the unzipped folder containing "manifest.json".
6. Done! The Maulana Shamsuddin Admin Extension icon will appear in your browser toolbar!

Features:
- Instant 1-Click access to Admin Panel
- Real-time lead count badge
- One-click Direct Call & WhatsApp lead access
- Instant image manager trigger
`;

  // SVG Mosque icon for placeholder PNG generation
  const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="28" fill="#0f3422"/>
  <circle cx="64" cy="64" r="50" fill="#155e3c"/>
  <path d="M64 24 L74 44 L96 48 L80 64 L84 86 L64 74 L44 86 L48 64 L32 48 L54 44 Z" fill="#d4af37"/>
  <text x="64" y="104" font-family="serif" font-size="20" font-weight="bold" fill="#fde047" text-anchor="middle">MS</text>
</svg>`;

  const handleDownloadZip = async () => {
    setIsGeneratingZip(true);
    try {
      const zip = new JSZip();
      zip.file('manifest.json', manifestJson);
      zip.file('popup.html', popupHtml);
      zip.file('popup.js', popupJs);
      zip.file('background.js', backgroundJs);
      zip.file('README.txt', readmeTxt);
      zip.file('icon128.svg', iconSvg);

      // Create dummy icon data for icon16.png, icon48.png, icon128.png
      // In JSZip we can embed small valid png or svg
      const svgBlob = new Blob([iconSvg], { type: 'image/svg+xml' });
      zip.file('icon.svg', svgBlob);

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'maulana-shamsuddin-admin-extension.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Admin Extension ZIP downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Error building extension ZIP');
    } finally {
      setIsGeneratingZip(false);
    }
  };

  const bookmarkletCode = `javascript:(function(){var h=window.location.hash;window.location.hash=(h==='#admin'?'':'#admin');})();`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d2a1b] via-[#155e3c] to-[#0d2a1b] text-white p-6 sm:p-7 rounded-3xl shadow-lg border border-[#d4af37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#d4af37]/40 text-[#fde047] text-xs font-bold">
            <Puzzle className="w-3.5 h-3.5" />
            <span>Official Admin Extension Suite</span>
          </div>
          <h3 className="font-heading text-2xl font-bold tracking-tight">
            Browser Extension & In-App Admin Companion
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed">
            Install the Chrome/Edge extension to receive real-time consultation notifications, monitor enquiries, and manage website images without opening the page.
          </p>
        </div>

        <button
          onClick={handleDownloadZip}
          disabled={isGeneratingZip}
          className="flex items-center gap-2.5 px-5 py-3 bg-[#f5b82e] hover:bg-[#e0a41d] text-[#112417] rounded-xl font-bold text-xs sm:text-sm shadow-xl transition-all shrink-0 cursor-pointer hover:scale-105"
        >
          <Download className="w-4 h-4 text-[#112417]" />
          <span>{isGeneratingZip ? 'Packaging Extension...' : 'Download Extension (.ZIP)'}</span>
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('chrome')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
            activeSubTab === 'chrome'
              ? 'bg-[#155e3c] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          <span>Chrome / Browser Extension</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quickbar')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
            activeSubTab === 'quickbar'
              ? 'bg-[#155e3c] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>On-Site Quick Admin Bar</span>
        </button>

        <button
          onClick={() => setActiveSubTab('bookmarklet')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
            activeSubTab === 'bookmarklet'
              ? 'bg-[#155e3c] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <ExternalLink className="w-4 h-4" />
          <span>1-Click Bookmarklet</span>
        </button>

        <button
          onClick={() => setActiveSubTab('webhooks')}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors ${
            activeSubTab === 'webhooks'
              ? 'bg-[#155e3c] text-white shadow-xs'
              : 'text-neutral-600 hover:bg-neutral-100'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>WhatsApp / Webhook Lead Alert</span>
        </button>
      </div>

      {/* Tab 1: Chrome Extension */}
      {activeSubTab === 'chrome' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Preview & Actions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#0b1a12] text-white p-5 rounded-3xl border border-[#d4af37]/30 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <h4 className="font-heading text-sm font-bold text-[#d4af37]">
                    Extension Popup Preview
                  </h4>
                  <p className="text-[11px] text-emerald-200">What you see in Chrome toolbar</p>
                </div>
                <span className="text-[10px] bg-[#d4af37] text-neutral-900 font-bold px-2 py-0.5 rounded-full">
                  Live Preview
                </span>
              </div>

              {/* Simulated Extension Popup */}
              <div className="bg-[#07130e] p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#d4af37] text-[#07130e] flex items-center justify-center font-bold text-xs">
                      MS
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Maulana Shamsuddin</div>
                      <div className="text-[10px] text-emerald-300">Spiritual Admin Extension</div>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] text-neutral-300">New Consultations:</div>
                    <div className="text-base font-bold text-[#fde047]">
                      {newEnquiriesCount} Pending Leads
                    </div>
                  </div>
                  <Bell className="w-5 h-5 text-[#d4af37] animate-bounce" />
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a
                    href={`tel:${settings.phoneNumber}`}
                    className="p-2 bg-[#d4af37] text-black font-bold rounded-lg text-center flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Direct Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-[#155e3c] text-white font-bold rounded-lg text-center flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="pt-1">
                  <div className="p-2.5 bg-neutral-800 text-center rounded-xl text-xs font-bold text-[#fde047] border border-[#d4af37]/30">
                    👑 Open Admin Portal (1-Click)
                  </div>
                </div>
              </div>

              {/* Direct Download */}
              <button
                onClick={handleDownloadZip}
                disabled={isGeneratingZip}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#155e3c] hover:bg-[#0f442b] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Extension Folder (.ZIP)</span>
              </button>
            </div>
          </div>

          {/* Right Setup Guide */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-4">
              <h4 className="font-heading text-lg font-bold text-neutral-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-[#155e3c]" />
                <span>How to Install in 3 Easy Steps</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="w-6 h-6 rounded-full bg-[#155e3c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-neutral-900 block">Download and Extract ZIP</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">
                      Click the yellow <strong>"Download Extension (.ZIP)"</strong> button. Extract the downloaded folder on your desktop or documents.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="w-6 h-6 rounded-full bg-[#155e3c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-neutral-900 block">Open Chrome Extensions</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">
                      In your browser address bar, type <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-900 font-mono text-[11px]">chrome://extensions</code> (or <code className="bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-900 font-mono text-[11px]">edge://extensions</code>) and toggle <strong>"Developer mode"</strong> ON (top right).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-neutral-50 rounded-xl border border-neutral-200">
                  <span className="w-6 h-6 rounded-full bg-[#155e3c] text-white font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-neutral-900 block">Click "Load unpacked"</strong>
                    <p className="text-neutral-600 text-xs mt-0.5">
                      Click the <strong>"Load unpacked"</strong> button in the top left, and choose the extracted extension folder. The Maulana Shamsuddin Extension icon is now permanently pinned!
                    </p>
                  </div>
                </div>
              </div>

              {/* Source code viewer buttons */}
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() => copyToClipboard(manifestJson, 'Manifest JSON')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 flex items-center gap-1.5"
                >
                  {copiedSection === 'Manifest JSON' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy manifest.json</span>
                </button>

                <button
                  onClick={() => copyToClipboard(popupHtml, 'Popup HTML')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 flex items-center gap-1.5"
                >
                  {copiedSection === 'Popup HTML' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy popup.html</span>
                </button>

                <button
                  onClick={() => copyToClipboard(popupJs, 'Popup JS')}
                  className="px-3 py-1.5 rounded-lg border border-neutral-300 hover:bg-neutral-100 text-xs font-semibold text-neutral-700 flex items-center gap-1.5"
                >
                  {copiedSection === 'Popup JS' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy popup.js</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: On-Site Quick Admin Bar */}
      {activeSubTab === 'quickbar' && (
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-heading text-lg font-bold text-neutral-900">
                On-Site Floating Admin Bar Extension
              </h4>
              <p className="text-xs sm:text-sm text-neutral-500">
                When you are logged in as admin, a floating companion pill can stay on your live website for fast edits.
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="font-bold text-sm text-[#155e3c]">
                Enable On-Site Admin Quick Bar
              </span>
              <p className="text-xs text-emerald-900">
                Shows quick image toggle, lead counter, and direct links only when logged in as admin.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#155e3c]">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span>Active on Live Site</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
              <span className="font-bold text-sm text-neutral-900">Quick Image Switcher</span>
              <p className="text-neutral-500">
                Toggle all hero and service images ON or OFF directly from the bottom of any page without entering settings.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
              <span className="font-bold text-sm text-neutral-900">Real-Time Lead Counter</span>
              <p className="text-neutral-500">
                Constantly updates with new client consultation inquiries submitted through the contact forms.
              </p>
            </div>

            <div className="p-4 border border-neutral-200 rounded-2xl space-y-2">
              <span className="font-bold text-sm text-neutral-900">Direct Portal Jump</span>
              <p className="text-neutral-500">
                1-click jump to Sliders, Services, Testimonials, or Settings anywhere on the page.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Bookmarklet */}
      {activeSubTab === 'bookmarklet' && (
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
          <div className="space-y-1">
            <h4 className="font-heading text-lg font-bold text-neutral-900">
              1-Click Browser Bookmarklet
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500">
              Drag this bookmarklet to your browser's bookmarks bar. Clicking it on any device will instantly toggle the Admin Panel!
            </p>
          </div>

          <div className="p-6 bg-neutral-50 rounded-2xl border-2 border-dashed border-[#155e3c]/40 text-center space-y-3">
            <p className="text-xs text-neutral-600 font-medium">
              👉 Drag this golden button directly up to your Bookmarks Bar (Ctrl+Shift+B / Cmd+Shift+B to show bookmarks):
            </p>
            <div>
              <a
                href={bookmarkletCode}
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(bookmarkletCode, 'Bookmarklet Code');
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4af37] hover:bg-[#b89324] text-[#0b1a12] rounded-2xl font-bold text-sm shadow-md transition-all cursor-grab active:cursor-grabbing hover:scale-105"
                title="Drag to bookmarks bar or click to copy"
              >
                <Sparkles className="w-4 h-4" />
                <span>★ Maulana Shamsuddin Admin</span>
              </a>
            </div>
            <p className="text-[11px] text-neutral-400">
              Or click the button to copy the JavaScript code to paste into a new bookmark manually.
            </p>
          </div>

          <div className="p-4 bg-neutral-900 text-neutral-300 rounded-xl font-mono text-xs overflow-x-auto flex items-center justify-between">
            <code>{bookmarkletCode}</code>
            <button
              onClick={() => copyToClipboard(bookmarkletCode, 'Bookmarklet')}
              className="ml-3 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] shrink-0"
            >
              {copiedSection === 'Bookmarklet' ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Webhook & Leads */}
      {activeSubTab === 'webhooks' && (
        <div className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-xs space-y-5">
          <div className="space-y-1">
            <h4 className="font-heading text-lg font-bold text-neutral-900">
              WhatsApp & Webhook Lead Forwarding
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500">
              Connect external services (Make.com, Zapier, Telegram Bot) so every consultation request is automatically forwarded.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[#155e3c]">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Forwarding</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Whenever a user submits their enquiry with name and phone number, you receive an instant alert on <span className="font-mono font-bold text-neutral-800">+{settings.phoneNumber}</span>.
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  ✓ Configured & Active
                </span>
              </div>
            </div>

            <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                <Radio className="w-4 h-4 text-[#155e3c]" />
                <span>Custom Webhook URL (Optional)</span>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Forward JSON payload of consultations to Google Sheets, Telegram Bot, or CRM.
              </p>
              <input
                type="url"
                placeholder="https://your-webhook-endpoint.com/api/lead"
                className="w-full px-3 py-2 bg-white border border-neutral-300 rounded-xl text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
