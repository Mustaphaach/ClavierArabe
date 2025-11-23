import React, { useState, useRef, useEffect } from 'react';
import { Copy, Download, Trash2, Keyboard as KeyboardIcon, Languages, CheckCircle2, Search, Mail, Shield, Globe } from 'lucide-react';
import { Key } from './components/Key';
import { ActionButton } from './components/ActionButton';
import { Modal } from './components/Modal';
import { GoogleAd } from './components/GoogleAd';
import { ARABIC_NUMBERS, LATIN_NUMBERS, ROW_1, ROW_2, ROW_3, ROW_4, TASHKEEL, PUNCTUATION } from './constants';

function App() {
  const [text, setText] = useState<string>('');
  const [notification, setNotification] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'contact' | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Handler to insert character at cursor position
  const handleKeyPress = (char: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newText = text.substring(0, start) + char + text.substring(end);

    setText(newText);
    
    // Restore focus and move cursor
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + char.length;
    }, 0);
  };

  const handleSpace = () => {
    handleKeyPress(' ');
  };

  const handleBackspace = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    if (start === end && start > 0) {
      // Remove character before cursor
      const newText = text.substring(0, start - 1) + text.substring(end);
      setText(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start - 1;
      }, 0);
    } else if (start !== end) {
      // Remove selection
      const newText = text.substring(0, start) + text.substring(end);
      setText(newText);
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start;
      }, 0);
    } else {
       textarea.focus();
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Text copied to clipboard!');
    } catch (err) {
      showNotification('Failed to copy text.');
    }
  };

  const handleGoogleSearch = () => {
    const textarea = textareaRef.current;
    let query = text;

    // If user has selected text, search only that
    if (textarea && textarea.selectionStart !== textarea.selectionEnd) {
      query = text.substring(textarea.selectionStart, textarea.selectionEnd);
    }

    if (!query.trim()) {
      showNotification('Please type something to search');
      return;
    }
    const url = `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`;
    window.open(url, '_blank');
  };

  const handleDownload = () => {
    if (!text) return;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'arabic_text.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Text downloaded!');
  };

  const handleClear = () => {
    setText('');
    textareaRef.current?.focus();
    showNotification('All text cleared');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[60] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-900 text-white px-6 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 size={18} className="text-emerald-400" />
            {notification}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 p-2.5 rounded-xl shadow-lg shadow-emerald-200/50">
              <KeyboardIcon className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Clavier<span className="text-emerald-600">Arabe</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">Premium Arabic Typing Tool</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 uppercase tracking-wider">
              Free Online Tool
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        
        {/* Intro Text */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3 font-amiri leading-relaxed">
            لوحة المفاتيح العربية
          </h2>
          <p className="text-slate-600">
            Write in Arabic easily with our smart on-screen keyboard. Compatible with all devices.
          </p>
        </div>

        {/* AD SLOT: Top Banner */}
        {/* Replace slot="1234567890" with your actual ad slot ID */}
        <GoogleAd slot="1234567890" className="min-h-[100px]" />

        {/* Editor Container */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          
          {/* Toolbar */}
          <div className="bg-slate-50/50 border-b border-slate-100 p-3 flex flex-wrap gap-2 justify-between items-center">
             <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Editor Actions</span>
             </div>
             <div className="flex items-center gap-2 flex-wrap">
                <ActionButton label="Google Search" icon={Search} onClick={handleGoogleSearch} variant="blue" />
                <ActionButton label="Copy" icon={Copy} onClick={handleCopy} variant="primary" />
                <ActionButton label="Save .txt" icon={Download} onClick={handleDownload} variant="secondary" />
                <ActionButton label="Clear" icon={Trash2} onClick={handleClear} variant="danger" />
             </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              dir="rtl"
              placeholder="اكتب هنا..."
              className="w-full h-48 sm:h-64 p-6 text-2xl sm:text-3xl font-amiri leading-loose text-slate-800 placeholder-slate-300 bg-transparent resize-none focus:outline-none focus:bg-slate-50/30 transition-colors"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Keyboard Container */}
        <div className="bg-slate-200/60 p-2 sm:p-4 rounded-2xl border border-slate-200 shadow-inner">
          <div className="max-w-4xl mx-auto space-y-2 sm:space-y-3">
            
            {/* Numbers Row */}
            <div className="grid grid-cols-10 gap-1 sm:gap-2">
              {ARABIC_NUMBERS.map((char) => (
                <Key key={char} char={char} onClick={handleKeyPress} className="text-slate-500 text-lg sm:text-xl" />
              ))}
            </div>

            {/* Main Rows */}
            <div className="grid grid-cols-12 gap-1 sm:gap-2">
              {ROW_1.map((char) => (
                <Key key={char} char={char} onClick={handleKeyPress} />
              ))}
            </div>
            <div className="grid grid-cols-11 gap-1 sm:gap-2 px-0 sm:px-4 md:px-8">
              {ROW_2.map((char) => (
                <Key key={char} char={char} onClick={handleKeyPress} />
              ))}
            </div>
             <div className="grid grid-cols-10 gap-1 sm:gap-2 px-0 sm:px-8 md:px-16">
              {ROW_3.map((char) => (
                <Key key={char} char={char} onClick={handleKeyPress} />
              ))}
            </div>

            {/* Bottom Function Row */}
            <div className="flex gap-1 sm:gap-2 items-stretch justify-center">
                {/* Tashkeel and Extras group */}
                <div className="hidden md:flex gap-1 sm:gap-2">
                  {ROW_4.map(char => <Key key={char} char={char} onClick={handleKeyPress} className="w-12" />)}
                </div>

                {/* Space Bar */}
                <button
                    onClick={handleSpace}
                    className="flex-grow flex items-center justify-center h-12 sm:h-14 md:h-16 bg-white hover:bg-slate-50 active:bg-slate-100 border-b-4 border-slate-200 active:border-b-0 active:translate-y-1 rounded-lg shadow-sm transition-all text-slate-400 text-sm font-medium uppercase tracking-widest"
                >
                    Space
                </button>
                
                {/* Backspace */}
                 <button
                    onClick={handleBackspace}
                    className="w-20 sm:w-24 flex items-center justify-center h-12 sm:h-14 md:h-16 bg-slate-100 hover:bg-rose-50 active:bg-rose-100 text-slate-600 hover:text-rose-600 border-b-4 border-slate-300 hover:border-rose-200 active:border-b-0 active:translate-y-1 rounded-lg shadow-sm transition-all"
                    aria-label="Backspace"
                >
                   ⌫
                </button>
            </div>

            {/* Tashkeel & Punctuation (Mobile/Desktop mixed) */}
             <div className="grid grid-cols-8 sm:grid-cols-12 gap-1 sm:gap-2 pt-2 border-t border-slate-300/50 mt-2">
                {TASHKEEL.map((char) => (
                  <Key key={char} char={char} onClick={handleKeyPress} isSpecial />
                ))}
                {PUNCTUATION.slice(0, 4).map((char) => (
                  <Key key={char} char={char} onClick={handleKeyPress} className="text-emerald-700 bg-emerald-50/50 border-emerald-100" />
                ))}
            </div>

          </div>
        </div>

        {/* AD SLOT: Bottom Banner */}
        {/* Replace slot="0987654321" with your actual ad slot ID */}
        <GoogleAd slot="0987654321" className="min-h-[100px]" />

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500">
             <Languages size={16} />
             <span className="text-sm font-medium">Designed for Arabic Typography</span>
          </div>
          <div className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Clavier Arabe Pro. All rights reserved.
          </div>
          <div className="flex gap-4">
            <button onClick={() => setActiveModal('privacy')} className="text-slate-400 hover:text-emerald-600 transition-colors text-sm font-medium">
              Privacy
            </button>
            <button onClick={() => setActiveModal('contact')} className="text-slate-400 hover:text-emerald-600 transition-colors text-sm font-medium">
              Contact
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'privacy'} 
        onClose={() => setActiveModal(null)} 
        title="Privacy Policy"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-emerald-700 bg-emerald-50 p-3 rounded-lg border border-emerald-100">
             <Shield className="shrink-0" />
             <p className="font-semibold">Your typing is 100% private.</p>
          </div>
          <p>
            At <strong>Clavier Arabe Pro</strong>, we take your privacy seriously. 
            This keyboard tool operates entirely <strong>client-side</strong> within your browser.
          </p>
          <ul className="list-disc pl-5 space-y-2">
             <li>We do <strong>not</strong> store, record, or transmit any text you type.</li>
             <li>No data is sent to any external servers.</li>
             <li>Once you refresh the page or close the tab, your text is cleared locally.</li>
          </ul>
          <p className="text-sm text-slate-400 mt-4 pt-4 border-t border-slate-100">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </Modal>

      <Modal 
        isOpen={activeModal === 'contact'} 
        onClose={() => setActiveModal(null)} 
        title="Contact Us"
      >
         <div className="space-y-4">
            <p>
              Have a suggestion, found a bug, or just want to say hello? We'd love to hear from you!
            </p>
            
            <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 mt-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Mail className="text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Email Support</h4>
                <p className="text-sm text-slate-500 mb-2">We usually reply within 24 hours.</p>
                <a href="mailto:support@clavierarabe.pro" className="text-emerald-600 font-semibold hover:underline">
                  support@clavierarabe.pro
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400 justify-center mt-6">
              <Globe size={16} />
              <span>Based in the Cloud</span>
            </div>
         </div>
      </Modal>

    </div>
  );
}

export default App;