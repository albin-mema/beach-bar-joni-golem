import React, { useState } from 'react';
import WifiModalReact from './WifiModalReact';

interface WifiButtonProps {
  t: {
    wifi: {
      title: string;
      connectTitle: string;
      networkName: string;
      password: string;
      copiedMessage: string;
      buttonLabel: string;
    }
  };
}

export default function WifiButton({ t }: WifiButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {/* WiFi Icon Button */}
      <button
        onClick={openModal}
        aria-label={t.wifi.buttonLabel}
        className="group flex justify-center items-center bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-lg transition-colors nav-icon-link"
      >
        <svg
          className="w-4 sm:w-5 h-4 sm:h-5 text-white group-hover:scale-110 transition-transform nav-icon"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.07 2.93 1 9z"/>
          <path d="M5 13l2 2c2.76-2.76 7.24-2.76 10 0l2-2c-4.28-4.28-11.72-4.28-16 0z"/>
          <path d="M9 17l2 2c0.55-0.55 1.45-0.55 2 0l2-2c-1.66-1.66-4.34-1.66-6 0z"/>
          <circle cx="12" cy="20" r="1"/>
        </svg>
      </button>

      {/* WiFi Modal */}
      <WifiModalReact
        isOpen={isModalOpen}
        onClose={closeModal}
        t={t.wifi}
      />
    </>
  );
}
