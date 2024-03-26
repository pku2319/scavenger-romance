import { cookies } from "next/headers";

import { fetchTravelerById } from "../lib/data";
import CodeCameraSwitcher from "./CodeCameraSwitcher";
import Header from "@/app/ui/components/Header";

export default async function MyQRCode() {
  const traveler = cookies().get('traveler');
  const travelerData = traveler ? await fetchTravelerById(traveler.value) : null;

  return (
    <div className="flex flex-col items-center pt-24">
      <Header />
      <CodeCameraSwitcher myId={travelerData?.id || ""} />
    </div>
  )
}