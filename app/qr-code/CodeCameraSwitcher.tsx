"use client";

import QRCode from "react-qr-code";

import { partnerIdFromCode } from "./decoder";
import QRCodeScanner from "./QRCodeScanner";
import { useState } from "react";

export default function CodeCameraSwitcher({ myId }: { myId: string }) {
  const [mode, setMode] = useState('camera');

  const onScan = (data: string) => {
    const partnerId = partnerIdFromCode(data)

    if (partnerId) {
      window.location.href = `/partner/${partnerId}`;
    }
  }

  if (mode === 'camera') {
    // Codes that we accept come in the form of partner:<partnerId>
    return (
      <div className="flex flex-col items-center p-10">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mb-10"
          onClick={() => setMode('code')}>
          Switch to QR Code
        </button>
        <QRCodeScanner onScan={onScan} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center p-10">
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mb-10"
        onClick={() => setMode('camera')}>
        Switch to Camera
      </button>
      <div className="flex flex-col items-center p-5 bg-white">
        <QRCode value={`partner:${myId}`} />
      </div>
    </div>
  )
}