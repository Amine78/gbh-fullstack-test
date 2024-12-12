'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/sidebarFilters';

interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  type: string;
  price: number;
  fuelType: string;
  description: string;
  images: string[];
}

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3500/vehicles' , {
      method:'GET',
      headers:{
        'Content-type':'application/json',
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data); // Stockage des données
        setLoading(false); // Fin du chargement
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des véhicules :', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="flex p-4">
      <Sidebar/>
      <div className='flex-1 p-4"'>
      <h1 className="text-3xl font-bold mb-4">Liste des Véhicules</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 border rounded shadow">
            <img
              src={vehicle.images[0] || 'https://via.placeholder.com/300'}
              alt={vehicle.model}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-xl font-semibold mt-2">{vehicle.manufacturer} {vehicle.model}</h2>
            <p>Année : {vehicle.year}</p>
            <p>Prix : {vehicle.price} €</p>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
