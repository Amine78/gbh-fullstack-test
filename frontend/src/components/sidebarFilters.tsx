import Link from 'next/link';

interface SidebarProps {
  currentFilters?: { vehicleType?: string; fuelType?: string };
}

const vehicleTypes = ['SUV', 'SEDAN', 'TRUCK', 'SPORTS', 'LUXURY', 'ELECTRIC'];

const fuelTypes = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUGIN_HYBRID'];

export default function Sidebar({ currentFilters = {} }: SidebarProps) {
  return (
    <div className="w-64 bg-gray-100 p-4 rounded shadow">
      <h2 className="text-lg font-bold mb-4">Filtres</h2>

      {/* Types de véhicules */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Type de véhicule</h3>
        <ul className="space-y-2">
          {vehicleTypes.map((type) => (
            <li key={type}>
              <Link
                href={{
                  pathname: '/vehicles',
                  query: { ...currentFilters, vehicleType: type },
                }}
                className={`block px-4 py-2 text-sm rounded transition ${
                  currentFilters?.vehicleType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {type}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Types de carburant */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Type de carburant</h3>
        <ul className="space-y-2">
          {fuelTypes.map((type) => (
            <li key={type}>
              <Link
                href={{
                  pathname: '/vehicles',
                  query: { ...currentFilters, fuelType: type },
                }}
                className={`block px-4 py-2 text-sm rounded transition ${
                  currentFilters?.fuelType === type
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {type}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
