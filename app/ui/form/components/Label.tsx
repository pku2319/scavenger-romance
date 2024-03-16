export default function Label({ htmlFor, text }: { htmlFor: string, text: string }) {
  return (
    <label htmlFor="email" className="mt-4 mb-2 block text-base font-medium">
      {text}
    </label>
  )
}