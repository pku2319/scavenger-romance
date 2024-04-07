export default function Prompt(
  { prompt }:
    { prompt: string }
) {

  return (
    <p className="mb-2 block text-base font-medium">
      {prompt}
    </p>
  )
}