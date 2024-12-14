'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // Importer le composant Image

interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  year: number;
  type: string;
  price: number;
  fuelType: string;
  transmission: string;
  images: string[];
}

export default function VehiclesByManufacturer() {
  const { marque } = useParams(); // Récupère le paramètre dynamique "marque"
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!marque) return;

    fetch(`http://localhost:3500/vehicles/manufacturer/${marque}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Erreur lors de la récupération des véhicules pour ${marque}`, err);
        setLoading(false);
      });
  }, [marque]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (!vehicles.length) {
    return <div>Aucun véhicule trouvé pour {marque}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Véhicules par {marque}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 border rounded shadow">
            <Image
              src={vehicle.images[0] || 'https://via.placeholder.com/300'}
              alt={vehicle.model}
              className="w-full h-48 object-cover rounded mb-4"
              width={300} // Largeur de l'image
              height={200} // Hauteur de l'image
              priority={true} // Optimisation LCP
            />
            <h2 className="text-xl font-semibold">{vehicle.model}</h2>
            <p className="text-gray-700">Prix : {vehicle.price} €</p>
            <p className="text-gray-500">Année : {vehicle.year}</p>
            <Link
              href={`/vehicles/${vehicle.id}`}
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Voir les détails
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
