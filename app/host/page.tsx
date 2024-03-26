"use client";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import pieces from "@/app/lib/pieces.json";
import Header from "@/app/ui/components/Header";
import BorderedQRCode from "../ui/components/BorderedQRCode";

export default function Page() {
  const componentRef: React.RefObject<HTMLDivElement> | null = useRef(null);
  const handlePrint = useReactToPrint({
    bodyClass: "py-8",
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col items-center pt-24">
      <Header hideHomeLink>
        QR Codes to Print
        <button
          className="absolute right-5 top-4 rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={handlePrint}>
          Print
        </button>
      </Header>
      <div
        ref={componentRef}
        className="flex flex-wrap items-center justify-center">
        {
          Object.keys(pieces).map((pieceId) => {
            return (
              <div className="border-2 border-black p-2"
                key={pieceId}>
                Piece {pieceId}
                <BorderedQRCode
                  key={pieceId}
                  value={`piece:${pieceId}`} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}