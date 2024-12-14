'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function ManufacturersPage() {
  const [manufacturers, setManufacturers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:3500/vehicles/manufacturers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setManufacturers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Erreur lors de la récupération des fabricants :', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Marques Disponibles</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {manufacturers.map((manufacturer) => (
          <div key={manufacturer} className="text-center">
            <Link href={`/manufactures/${manufacturer}`}>
              <div className="p-4 border rounded hover:shadow-lg transition">
                <Image
                  src={`https://via.placeholder.com/150?text=${manufacturer}`}
                  width={150}
                  height={150}
                  alt={manufacturer}
                  className="w-full h-24 object-contain mb-2"
                />
                <p className="text-lg font-medium">{manufacturer}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
