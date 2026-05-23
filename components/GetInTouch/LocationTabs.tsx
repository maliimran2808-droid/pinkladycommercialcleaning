import { LocationData } from './locationsConfig'

interface LocationTabsProps {
  locations: LocationData[]
  activeId: string
  onSelect: (id: string) => void
}

export default function LocationTabs({ locations, activeId, onSelect }: LocationTabsProps) {
  return (
    <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
      {locations.map((loc) => (
        <button
          key={loc.id}
          onClick={() => onSelect(loc.id)}
          className={`px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-md ${
            activeId === loc.id
              ? 'bg-luxury-pink text-white shadow-lg shadow-luxury-pink/30'
              : 'bg-white text-luxury-dark hover:bg-gray-50'
          }`}
        >
          {loc.name}
        </button>
      ))}
    </div>
  )
}