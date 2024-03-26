import QRCode from "react-qr-code";

export default function BorderedQRCode({ value }: { value: string }) {
  return (
    <QRCode
      value={value}
      className="flex flex-col items-center p-5 bg-white" />
  )
}