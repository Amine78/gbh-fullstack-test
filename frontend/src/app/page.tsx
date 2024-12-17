'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Metadata } from 'next';

interface Manufacturer {
  name: string;
  logo: string;
}

export default function HomePage() {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  
  useEffect(() => {
    // Récupérer les marques depuis l'API
    fetch('http://localhost:3500/vehicles/manufacturers')
      .then((res) => res.json())
      .then((data) =>
        setManufacturers(
          data.map((name: string) => ({
            name,
            logo: `https://via.placeholder.com/100x50.png?text=${name}`,
          }))
        )
      )
      .catch((err) => console.error('Erreur lors du chargement des marques :', err));
  }, []);

  return (
    <div>
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        {/* Contenu à gauche */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Trouvez Votre Véhicule Idéal
          </h1>
    
          <div className="flex space-x-4">
            <Link
              href="/vehicles"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Explorer les Véhicules
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Nous Contacter
            </Link>
          </div>
        </div>

        {/* Image à droite */}
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            src="https://via.placeholder.com/400x400"
            alt="Mockup"
            width={400}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>

      {/* Slider Section */}
      <section className="bg-white py-8">
        <h2 className="text-2xl font-bold text-center mb-6">Nos Marques</h2>
        <div className="overflow-x-auto whitespace-nowrap flex items-center space-x-4 px-6">
      {manufacturers.map((manufacturer) => (
        <Link
          href={`/manufactures/${manufacturer.name.toLowerCase()}`} // Crée une URL dynamique
          key={manufacturer.name}
          className="flex flex-col items-center justify-center bg-gray-200 p-4 rounded-lg shadow w-40 transition hover:bg-gray-300"
        >
          <Image
            src={manufacturer.logo}
            alt={manufacturer.name}
            height={100}
            width={50}
            className="w-20 h-12 object-contain mb-2"
          />
          <p className="text-sm font-semibold text-gray-800">{manufacturer.name}</p>
        </Link>
      ))}
    </div>
      </section>
    </div>
  );
}
