import { cookies } from "next/headers";
import QRCode from "react-qr-code";
import { fetchTravelerById } from "../lib/data";

export default async function MyQRCode() {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;

  return (
    <div className="flex flex-col items-center p-24">
      <div className="mb-2 block text-base font-medium">
        {travelerData?.name}&apos;s code
      </div>
      <QRCode value={`http://scavenger-romance.vercel.app/partner/${traveler?.value}`} />
    </div>
  )
}