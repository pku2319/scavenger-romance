"use client";

import { useRef, useCallback, useEffect } from "react";
import { BarcodeDetector } from "barcode-detector/pure";
import Webcam from "react-webcam";

export default function QRCodeScanner({ onScan }: { onScan: (data: string) => void }) {
  const delay = 700;
  const webcamRef = useRef<Webcam>(null);

  // Takes pictures and then decodes
  const capture = useCallback(() => {
    const qrCodeReader: BarcodeDetector = new BarcodeDetector({
      formats: ["qr_code"],
    });
    const imageSrc = webcamRef?.current?.getScreenshot();
    const image = new Image();
    image.src = imageSrc || "";

    if (imageSrc) {
      qrCodeReader
        .detect(image)
        .then((result) => {
          if (result.length > 0) {
            onScan(result[0].rawValue || "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Take a picture every <delay>ms (default: 700ms)
  useEffect(() => {
    const timer = setInterval(capture, delay);
    return () => clearInterval(timer);
  }, [capture])

  return (
    <Webcam
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{
        facingMode: "environment",
      }}
    />
  )
}