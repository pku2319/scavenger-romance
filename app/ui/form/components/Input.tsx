export default function Input({ name, type, placeholder }: { name: string, type: string, placeholder: string }) {
  return (
    <input
      className="h-4 p-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 rounded"
      id={name}
      name={name}
      type={type}
      placeholder={placeholder} />
  )
}