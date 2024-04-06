"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import { useRouter } from 'next/navigation'

import { pieceIdFromCode } from "@/app/lib/decoder";
import QRCodeScanner from "../ui/components/QRCodeScanner";

export default function CodeCameraSwitcher({ myId }: { myId: string }) {
  const [mode, setMode] = useState('camera');
  const router = useRouter();

  const onScan = (data: string) => {
    const { path, id } = pieceIdFromCode(data)

    if (path && id) {
      router.push(`/${path}/${id}`);
    }
  }

  if (mode === 'camera') {
    // Codes that we accept come in the form of piece:<pieceId>
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