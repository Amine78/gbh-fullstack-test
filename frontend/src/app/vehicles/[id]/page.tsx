async function getVehicleById(id: string): Promise<any | null> {
  const res = await fetch(`http://localhost:3500/vehicles/${id}`);

  if (!res.ok) {
    return null; // nulkl
  }
console.log(res);
  return res.json(); // Response
}

export default async function VehicleDetailsPage({ params }: { params: { id: string } }) {

  const { id } =  await params; 
  const vehicle = await getVehicleById(id);
  console.table(vehicle);
  if (!vehicle) {
    return <div>Véhicule introuvable</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Retour */}
      <div className="mb-4">
        <a href="/vehicles" className="text-blue-500 underline">
          ← Retour à la liste des véhicules
        </a>
      </div>

      {/* Image principale */}
      <div className="flex gap-4">
        <img
          src={vehicle.images[0] || 'https://via.placeholder.com/300x200'}
          alt={vehicle.model}
          className="w-2/3 h-auto object-cover rounded-lg"
        />
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">
            {vehicle.manufacturer} {vehicle.model}
          </h1>
          <p className="text-xl font-semibold text-green-600">{vehicle.price.toLocaleString()} €</p>
          <p className="text-sm text-gray-500">Année : {vehicle.year}</p>
          <p className="text-sm text-gray-500">Type : {vehicle.type}</p>
          <p className="text-sm text-gray-500">Transmission : {vehicle.transmission}</p>
        </div>
      </div>

      {/* Points forts */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Points forts</h2>
        <div className="flex flex-wrap gap-4">
          {vehicle.features.map((feature: string, index: number) => (
            <span
              key={index}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded-full shadow-sm"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Caractéristique */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Caractéristiques</h2>
        <table className="w-full table-auto border-collapse border border-gray-300">
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Année</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.year}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Kilométrage</td>
              <td className="border border-gray-300 px-4 py-2">
                {vehicle.mileage ? `${vehicle.mileage} km` : 'N/A'}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Énergie</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.fuelType}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Transmission</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.transmission}</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-bold">Description</td>
              <td className="border border-gray-300 px-4 py-2">{vehicle.description}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* equuipement et options */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Équipements et Options</h2>
        {vehicle.features && vehicle.features.length > 0 ? (
          <ul className="list-disc list-inside">
            {vehicle.features.map((option: string, index: number) => (
              <li key={index} className="text-gray-700">
                {option}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Aucun équipement ou option disponible.</p>
        )}
      </div>
    </div>
  );
}
