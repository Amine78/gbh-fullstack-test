'use client';

import { useEffect, useState, useCallback } from 'react';
import Sidebar from '@/components/sidebarFilters';
import Link from 'next/link';
import Image from 'next/image';

interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  type: string;
  price: number;
  fuelType: string;
  transmission: string;
  description: string;
  images: string[];
}

interface VehicleResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  data: Vehicle[];
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>('');

  const [filters, setFilters] = useState<{
    vehicleType?: string;
    fuelType?: string;
    transmission?: string;
    year?: number;
  }>({});

  const fetchVehicles = useCallback(() => {
    setLoading(true);

    const queryParams = new URLSearchParams({
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = Array.isArray(value) ? value.join('-') : value;
        }
        return acc;
      }, {} as Record<string, string>),
      page: String(currentPage),
      ...(sortBy && { sortBy }), // Ajoute le critère de tri s'il est sélectionné
    }).toString();

    const url = `http://localhost:3500/vehicles?${queryParams}`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.data)) {
          setVehicles(data);
        } else {
          setVehicles(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des véhicules :', err);
        setVehicles(null);
        setLoading(false);
      });
    }, [filters, currentPage, sortBy]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const handleFilterChange = (newFilters: {
    vehicleType?: string;
    fuelType?: string;
    transmission?: string;
    year?: number;
  }) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
    setCurrentPage(1); // Réinitialise la page lors du changement de filtre
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value); // Met à jour le tri
    setCurrentPage(1); // Réinitialise à la page 1
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="flex p-4">
      {/* Sidebar */}
      <Sidebar currentFilters={filters} onFilterChange={handleFilterChange} />

      {/* Liste des véhicules */}
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">Liste des Véhicules</h1>

        <select
            value={sortBy}
            onChange={handleSortChange}
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none"
          >
            <option value="">Trier par</option>
            <option value="year">Année</option>
            <option value="price">Prix</option>
          </select>

        {/* Affichage du message d'absence de véhicules */}
        {(!vehicles || !vehicles.data || vehicles.data.length === 0) && (
          <p className="text-gray-600 mb-4">Aucun véhicule correspondant à vos critères.</p>
        )}

        {/* Affichage des véhicules */}
        {vehicles && vehicles.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {vehicles.data.map((vehicle) => (
                <div key={vehicle.id} className="p-4 border rounded shadow">
                  <Image
                    src={vehicle.images[0] || 'https://via.placeholder.com/300'}
                    alt={vehicle.model}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <h2 className="text-xl font-semibold mt-2">
                    {vehicle.manufacturer} {vehicle.model}
                  </h2>
                  <p>Année : {vehicle.year}</p>
                  <p>Prix : {vehicle.price} €</p>
                  <Link
                    href={`/vehicles/${vehicle.id}`}
                    className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Voir les détails
                  </Link>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-8 space-x-2">
              {[...Array(vehicles.totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <Link
                    key={pageNumber}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    className={`px-3 py-2 rounded ${
                      currentPage === pageNumber
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
