interface FormSelectProps {
  options: { label: string; value: string }[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  error?: string
}

export default function FormSelect({ options, value, onChange, error }: FormSelectProps) {
  return (
    <div className="flex flex-col">
      <select
        value={value}
        onChange={onChange}
        className="font-outfit w-full px-4 py-3.5 bg-white/90 border border-gray-300 rounded-md text-sm text-gray-800 focus:outline-none focus:border-luxury-pink focus:ring-1 focus:ring-luxury-pink transition-all duration-300 appearance-none cursor-pointer"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 12px center',
        }}
      >
        <option value="" disabled>Select a Service</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span className="text-black text-xs mt-1.5 font-medium">{error}</span>}
    </div>
  )
}