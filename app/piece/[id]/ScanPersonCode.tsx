"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'

import { partnerIdFromCode } from "@/app/lib/decoder";
import QRCodeScanner from "@/app/ui/components/QRCodeScanner";

export default function ScanPersonCode({ pieceId }: { pieceId: string }) {
  const [showScan, setShowScan] = useState(false);
  const router = useRouter();

  const onScan = (data: string) => {
    // Codes that we accept come in the form of partner:<partnerId>
    const { path, id } = partnerIdFromCode(data)

    if (path === 'partner' && id) {
      router.push(`/piece/${pieceId}/${path}/${id}`);
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-4'>
        Scan another person&apos;s QR Code to complete
      </div>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 mb-10"
        onClick={() => setShowScan(!showScan)}>
        {!showScan && "Open Scanner"}
        {showScan && "Close Scanner"}
      </button>
      {
        showScan && <QRCodeScanner onScan={onScan} />
      }
    </div>
  )
}