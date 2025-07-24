import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon, WifiIcon, ClipboardIcon, CheckIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

import type { TranslationStructure } from '../i18n/utils';

interface WifiModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationStructure['wifi'];
}

export default function WifiModalReact({ isOpen, onClose, t }: WifiModalProps) {
  // Enhanced WiFi modal with glassmorphic design and improved UX
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(true); // Show password by default
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const networkName = 'Beach Bar Joni';
  const password = 'golem2025';

  // Reset drag state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setDragY(0);
      setIsDragging(false);
      setCopied(false);
      setShowPassword(true); // Reset to show password by default
    }
  }, [isOpen]);

  // Global mouse and touch event listeners for drag handling
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      currentY.current = e.clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        setDragY(deltaY);
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;

      setIsDragging(false);
      const deltaY = currentY.current - startY.current;

      if (deltaY > 100) {
        onClose();
      } else {
        setDragY(0);
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      console.log('Global touch move');

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        setDragY(deltaY);
        e.preventDefault();
      }
    };

    const handleGlobalTouchEnd = () => {
      if (!isDragging) return;
      console.log('Global touch end');

      setIsDragging(false);
      const deltaY = currentY.current - startY.current;

      if (deltaY > 100) {
        onClose();
      } else {
        setDragY(0);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging, onClose]);

  const copyPassword = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = password;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Drag handling functions
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch start detected');
    setIsDragging(true);
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    console.log('Touch move detected, dragging:', isDragging);

    currentY.current = e.touches[0].clientY;
    const deltaY = currentY.current - startY.current;
    console.log('Delta Y:', deltaY);

    // Only allow dragging down (positive deltaY)
    if (deltaY > 0) {
      setDragY(deltaY);
      // Prevent scrolling when dragging
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    console.log('Touch end detected');

    setIsDragging(false);
    const deltaY = currentY.current - startY.current;
    console.log('Final delta Y:', deltaY);

    // Close if dragged down more than 100px
    if (deltaY > 100) {
      console.log('Closing modal');
      onClose();
    } else {
      console.log('Snapping back');
      // Snap back to original position
      setDragY(0);
    }
  };

  // Mouse events for desktop testing
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startY.current = e.clientY;
    currentY.current = e.clientY;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="z-50 relative">
      {/* Enhanced Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300" aria-hidden="true" />

      {/* Full-screen container */}
      <div className="fixed inset-0 flex justify-center items-center p-4">
        {/* Desktop Modal - Enhanced Glassmorphic Design */}
        <DialogPanel className="hidden sm:block relative bg-white/95 shadow-2xl backdrop-blur-xl border border-white/20 rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden scale-100 transition-all duration-300 transform">
          {/* Header with Gradient */}
          <div className="relative bg-gradient-to-r from-sky-500/10 to-blue-500/10 border-white/20 border-b">
            <div className="flex justify-between items-center p-6">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg rounded-full w-12 h-12">
                  <WifiIcon className="w-6 h-6 text-white" />
                </div>
                <DialogTitle className="font-bold text-gray-900 text-xl tracking-tight">
                  {t.title}
                </DialogTitle>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center hover:bg-white/20 rounded-full w-10 h-10 text-gray-500 hover:text-gray-700 hover:scale-105 transition-all duration-200"
                aria-label="Close WiFi dialog"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8 p-8">
            {/* WiFi Network Info */}
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="mb-3 font-bold text-gray-900 text-2xl tracking-tight">{t.connectTitle}</h4>
                <p className="text-gray-600 text-sm">Use the credentials below to connect to our free WiFi</p>
              </div>

              {/* Network Details */}
              <div className="space-y-4 bg-gradient-to-r from-gray-50/80 to-blue-50/30 backdrop-blur-sm p-6 border border-white/30 rounded-2xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{t.networkName}</span>
                  </div>
                  <div className="bg-white/80 shadow-sm backdrop-blur-sm px-4 py-3 border border-gray-200/50 rounded-xl font-mono text-base text-center">
                    {networkName}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{t.password}</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={togglePasswordVisibility}
                        className="flex justify-center items-center hover:bg-white/20 rounded-lg w-8 h-8 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showPassword ? "Hide password" : "Show password"}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={copyPassword}
                        className="flex justify-center items-center hover:bg-green-50 rounded-lg w-8 h-8 text-gray-500 hover:text-green-600 hover:scale-105 transition-all duration-200"
                        title="Copy password"
                        aria-label="Copy password to clipboard"
                      >
                        {copied ? (
                          <CheckIcon className="w-4 h-4 text-green-600" />
                        ) : (
                          <ClipboardIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/80 shadow-sm backdrop-blur-sm px-4 py-3 border border-gray-200/50 rounded-xl font-mono text-base text-center">
                    {showPassword ? password : '•'.repeat(password.length)}
                  </div>
                  {copied && (
                    <div className="flex justify-center items-center space-x-2 font-medium text-green-600 text-sm animate-pulse">
                      <CheckIcon className="w-4 h-4" />
                      <span>{t.copiedMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
        
        {/* Mobile Sheet - Enhanced Design */}
        <DialogPanel
          ref={sheetRef}
          className="sm:hidden right-0 bottom-0 left-0 fixed bg-white/95 shadow-2xl backdrop-blur-xl border-white/20 border-t rounded-t-3xl max-h-[85vh] overflow-hidden transition-transform duration-300 ease-out"
          style={{
            transform: `translateY(${dragY}px)`,
            opacity: isDragging ? Math.max(0.5, 1 - dragY / 200) : 1
          }}
        >
          {/* Sheet Handle - Draggable */}
          <div
            className="flex justify-center pt-5 pb-3 cursor-grab active:cursor-grabbing select-none"
            style={{ touchAction: 'none' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <div className="bg-gray-400 shadow-sm rounded-full w-12 h-1.5 pointer-events-none"></div>
          </div>

          {/* Header with Gradient */}
          <div className="relative bg-gradient-to-r from-sky-500/10 to-blue-500/10 border-white/20 border-b">
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex items-center space-x-3">
                <div className="flex justify-center items-center bg-gradient-to-r from-sky-400 to-blue-500 shadow-lg rounded-full w-10 h-10">
                  <WifiIcon className="w-5 h-5 text-white" />
                </div>
                <DialogTitle className="font-bold text-gray-900 text-xl tracking-tight">
                  {t.title}
                </DialogTitle>
              </div>
              <button
                onClick={onClose}
                className="flex justify-center items-center hover:bg-white/20 rounded-full w-10 h-10 text-gray-500 hover:text-gray-700 hover:scale-105 transition-all duration-200"
                aria-label="Close WiFi dialog"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-8 px-6 py-6 overflow-y-auto">
            {/* WiFi Network Info */}
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="mb-3 font-bold text-gray-900 text-2xl tracking-tight">{t.connectTitle}</h4>
                <p className="text-gray-600 text-sm">{t.connectTitle}</p>
              </div>

              {/* Network Details */}
              <div className="space-y-5 bg-gradient-to-r from-gray-50/80 to-blue-50/30 backdrop-blur-sm p-6 border border-white/30 rounded-2xl">
                <div className="space-y-3">
                  <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{t.networkName}</span>
                  <div className="bg-white/80 shadow-sm backdrop-blur-sm px-4 py-4 border border-gray-200/50 rounded-xl font-mono text-lg text-center">
                    {networkName}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700 text-sm uppercase tracking-wide">{t.password.split(':')[0]}</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={togglePasswordVisibility}
                        className="flex justify-center items-center hover:bg-white/20 rounded-lg w-10 h-10 text-gray-500 hover:text-gray-700 transition-colors"
                        title={showPassword ? "Hide password" : "Show password"}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={copyPassword}
                        className="flex justify-center items-center hover:bg-green-50 rounded-lg w-10 h-10 text-gray-500 hover:text-green-600 hover:scale-105 transition-all duration-200"
                        title="Copy password"
                        aria-label="Copy password to clipboard"
                      >
                        {copied ? (
                          <CheckIcon className="w-5 h-5 text-green-600" />
                        ) : (
                          <ClipboardIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/80 shadow-sm backdrop-blur-sm px-4 py-4 border border-gray-200/50 rounded-xl font-mono text-lg text-center">
                    {showPassword ? password : '•'.repeat(password.length)}
                  </div>
                  {copied && (
                    <div className="flex justify-center items-center space-x-2 font-medium text-green-600 text-sm animate-pulse">
                      <CheckIcon className="w-4 h-4" />
                      <span>{t.copiedMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
