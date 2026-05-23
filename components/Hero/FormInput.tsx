interface FormInputProps {
  type?: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function FormInput({ type = 'text', placeholder, value, onChange, error }: FormInputProps) {
  return (
    <div className="flex flex-col">
      <input
        style={{fontWeight:"400"}}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="font-outfit w-full px-4 py-3.5 bg-white/90 border border-gray-300 rounded-md text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-luxury-pink focus:ring-1 focus:ring-luxury-pink transition-all duration-300"
      />
      {error && <span className="text-black text-xs mt-1.5 font-medium">{error}</span>}
    </div>
  )
}