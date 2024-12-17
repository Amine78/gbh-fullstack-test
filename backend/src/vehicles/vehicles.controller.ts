import { Controller, Get , Param ,NotFoundException , Query  } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { query } from 'express';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getAllVehicles(
    @Query('vehicleType') vehicleType?: string,
    @Query('fuelType') fuelType?: string,
    @Query('transmission') transmission?: string,
    @Query('year') year?: string,
    @Query('page')page: number= 1,
    @Query('limit') limit: number = 5,
    @Query('sortBy') sortBy?: string,
  ) {
    const parsedYear = year ? parseInt(year, 10) : undefined; //convertto int
    const vehicles = this.vehiclesService.getFilteredVehicles(vehicleType, fuelType , transmission , parsedYear , sortBy);
  
    const startIndex = (page - 1)* limit
    const endIndex = startIndex + limit
    const paginatedVehicles = vehicles.slice(startIndex, endIndex);

    if (!paginatedVehicles || paginatedVehicles.length === 0) {
      throw new NotFoundException(`Aucun véhicule trouvé pour la page ${page}.`);
    }
    // 404
    if (!vehicles || vehicles.length === 0) {
      throw new NotFoundException('Aucun véhicule correspondant trouvé.');
    }
  
    return {
      total: vehicles.length,
      page,
      limit,
      totalPages: Math.ceil(vehicles.length / limit),
      data : paginatedVehicles,
    }
  }

  @Get('get/:id')
  async getVehicleById(@Param('id') id: string) {
  const vehicles = this.vehiclesService.getAllVehiclesRaw();// all
  const vehicle = vehicles.find((vehicle)  => vehicle.id === id); // on recherche dans le array si id existant
  //gestion erreur
  if (!vehicle) {
    throw new NotFoundException({//404
      statusCode: 404,
      message: `Véhicule avec l'ID ${id} introuvable`,
      error: 'Not Found',
    });
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