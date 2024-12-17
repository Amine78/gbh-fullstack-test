import { useState } from 'react';

interface SidebarProps {
  currentFilters: {
    vehicleType?: string;
    fuelType?: string;
    transmission?: string;
    year?: string; // Ajout de l'année
  };
  onFilterChange: (filters: {
    vehicleType?: string;
    fuelType?: string;
    transmission?: string;
    year?: string; // Gestion de lannée
  }) => void;
}

const vehicleTypes = ['SUV', 'SEDAN', 'TRUCK', 'SPORTS', 'LUXURY', 'ELECTRIC'];
const fuelTypes = ['GASOLINE', 'DIESEL', 'ELECTRIC', 'HYBRID', 'PLUGIN_HYBRID'];
const transmissions = ['Automatic', 'Manual'];
const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'];

export default function Sidebar({ currentFilters, onFilterChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Fonction pour gérer la sélection/désélection des filtres
  const handleFilterToggle = (filterKey: keyof SidebarProps['currentFilters'], value: string) => {
    onFilterChange({
      ...currentFilters,
      [filterKey]: currentFilters[filterKey] === value ? undefined : value,
    });
  };

  return (
    <>
      {/* Bouton burger pour ouvrir la sidebar en mobile */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded focus:outline-none z-50"
      >
        {isOpen ? 'Fermer' : 'Filtres'}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:static top-0 left-0 h-full lg:h-auto w-64 bg-gray-100 p-4 transition-transform duration-300 z-40 sidebar overflow-auto`}
      >
        <h2 className="text-lg font-bold mb-4">Filtres</h2>

        {/* Types de véhicules */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Type de véhicule</h3>
          <ul className="space-y-2">
            {vehicleTypes.map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleFilterToggle('vehicleType', type)}
                  className={`block w-full px-4 py-2 text-sm rounded text-left transition ${
                    currentFilters.vehicleType === type
                      ? 'text-black bg-red-600 hover:bg-red-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Types de carburant */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Type de carburant</h3>
          <ul className="space-y-2">
            {fuelTypes.map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleFilterToggle('fuelType', type)}
                  className={`block w-full px-4 py-2 text-sm rounded text-left transition ${
                    currentFilters.fuelType === type
                      ? 'text-black bg-red-600 hover:bg-red-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Transmission */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Transmission</h3>
          <ul className="space-y-2">
            {transmissions.map((type) => (
              <li key={type}>
                <button
                  onClick={() => handleFilterToggle('transmission', type)}
                  className={`block w-full px-4 py-2 text-sm rounded text-left transition ${
                    currentFilters.transmission === type
                      ? 'text-black bg-red-600 hover:bg-red-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {type}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Année */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Année</h3>
          <ul className="space-y-2">
            {years.map((year) => (
              <li key={year}>
                <button
                  onClick={() => handleFilterToggle('year', year)}
                  className={`block w-full px-4 py-2 text-sm rounded text-left transition ${
                    currentFilters.year === year
                      ? 'text-black bg-red-600 hover:bg-red-300'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Overlay pour fermer la sidebar en mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-primary bg-opacity-50 z-30 lg:hidden"
        ></div>
      )}
    </>
  );
}
