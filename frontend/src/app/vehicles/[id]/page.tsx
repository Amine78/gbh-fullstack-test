'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Utilisation du hook useParams

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
  mileage?: number;
  features?: string[];
}

async function fetchVehicleById(id: string): Promise<Vehicle | null> {
  try {
    const res = await fetch(`http://localhost:3500/vehicles/get/${id}`);

    if (!res.ok) {
      return null; // Retourne null en cas d'erreur HTTP
    }
    return await res.json();
  } catch (error) {
    console.error('Erreur lors de la récupération du véhicule :', error);
    return null;
  }
}

export default function VehicleDetailsPage() {
  const params = useParams(); // Récupération dynamique des paramètres
  const id = params.id as string; // Extraction de l'ID (assurez-vous que l'ID est valide)

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID manquant.');
      setLoading(false);
      return;
    }

    async function loadVehicle() {
      const data = await fetchVehicleById(id);
      if (!data) {
        setError('Véhicule introuvable.');
      } else {
        setVehicle(data);
      }
      setLoading(false);
    }

    loadVehicle();
  }, [id]);

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Retour */}
      <div className="mb-4">
        <Link href="/vehicles">
          <span className="text-blue-500 underline bg-inherit cursor-pointer">
            ← Retour à la liste des véhicules
          </span>
        </Link>
      </div>

      {/* Image principale */}
      <div className="flex gap-4">
        <Image
          src={vehicle!.images[0] || 'https://via.placeholder.com/300x200'}
          alt={vehicle!.model}
          width={600}
          height={400}
          className="w-2/3 h-auto object-cover rounded-lg"
        />
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">
            {vehicle!.manufacturer} {vehicle!.model}
          </h1>
          <p className="text-xl font-semibold text-green-600">
            {vehicle!.price.toLocaleString()} €
          </p>
          <p className="text-sm text-gray-500">Année : {vehicle!.year}</p>
          <p className="text-sm text-gray-500">Type : {vehicle!.type}</p>
          <p className="text-sm text-gray-500">Transmission : {vehicle!.transmission}</p>
        </div>
      </div>

      {/* Points forts */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Points forts</h2>
        <div className="flex flex-wrap gap-4">
          {vehicle!.features?.map((feature, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Caractéristiques */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Année</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle!.year}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Kilométrage</td>
              <td className="border border-gray-300 px-4 py-2">
                {vehicle!.mileage ? `${vehicle!.mileage} km` : 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Énergie</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle!.fuelType}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Transmission</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle!.transmission}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Description</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle!.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
