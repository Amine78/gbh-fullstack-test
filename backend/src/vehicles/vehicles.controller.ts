import { Controller, Get , Param ,NotFoundException , Query  } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getAllVehicles(
    @Query('vehicleType') vehicleType?: string,
    @Query('fuelType') fuelType?: string
  ) {
    const vehicles = this.vehiclesService.getFilteredVehicles(vehicleType, fuelType);
  
    // Si aucun véhicule n'est trouvé, lever une exception avec un message approprié
    if (!vehicles || vehicles.length === 0) {
      throw new NotFoundException('Aucun véhicule correspondant trouvé.');
    }
  
    return vehicles;
  }

  @Get('get/:id')
  async getVehicleById(@Param('id') id: string) {
  const vehicles = this.getAllVehicles(); // all
  const vehicle = vehicles.find((vehicle)  => vehicle.id === id); // on recherche dans le array si id existant
  //gestion erreur
  if (!vehicle) {
    throw new NotFoundException({
      statusCode: 404,
      message: `Véhicule avec l'ID ${id} introuvable`,
      error: 'Not Found',
    });//404
  }
  return vehicle
  }

  @Get('manufacturers')
  getManufacturers() {
    const vehicles = this.vehiclesService.getAllVehicles();
    const manufacturers = Array.from(
      new Set(vehicles.map((vehicle) => vehicle.manufacturer)),
    );
    // Gestion d'erreur si aucun fabricant n'est trouvé
    if (manufacturers.length === 0) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'Aucun fabricant trouvé dans la base de données.',
        error: 'Not Found',
      });
    }

    return manufacturers;
  }

  @Get('manufacturer/:manufacturer')
  getVehiclesByManufacturer(@Param('manufacturer') manufacturer: string) {
    const vehicles = this.vehiclesService
      .getAllVehicles()
      .filter(
        (vehicle) =>
          vehicle.manufacturer.toLowerCase() === manufacturer.toLowerCase()
      );
    if (vehicles.length === 0) {
      throw new NotFoundException(
        `Aucun véhicule trouvé pour le fabricant ${manufacturer}`
      );
    }
    return vehicles;
  }

  
}