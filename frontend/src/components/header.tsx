'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className=" bg-primary text-white">
      <div className=" container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          Logo
        </Link>

        {/* Navigation principale (desktop) */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/" className="hover:underline">
            Accueil
          </Link>
          <Link href="/manufactures" className="hover:underline">
            Marques
          </Link>
          <Link href="/vehicles" className="hover:underline">
            Véhicules
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Menu burger pour mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden focus:outline-none"
          aria-label="Ouvrir le menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-blue-700">
          <ul className="flex flex-col space-y-2 p-4">
            <li>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-left w-full hover:underline"
              >
                <Link href="/">Accueil</Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-left w-full hover:underline"
              >
                <Link href="/manufacturers">Marques</Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-left w-full hover:underline"
              >
                <Link href="/vehicles">Véhicules</Link>
              </button>
            </li>
            <li>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-left w-full hover:underline"
              >
                <Link href="/contact">Contact</Link>
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
