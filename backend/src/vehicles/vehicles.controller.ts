import { Controller, Get , Param ,NotFoundException  } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get()
  getAllVehicles() {
    return this.vehiclesService.getAllVehicles();
  }

  @Get(':id')
  async getVehicleById(@Param('id') id: string) {
  const vehicles = await this.getAllVehicles(); // get all
  const vehicle = vehicles.find((vehicle)  => vehicle.id === id); // on recherche dans le tableau si id existant
  //gestion erreur
  if (!vehicle) {
    throw new NotFoundException(`Véhicule avec l'ID ${id} introuvable`); //404
  }
  return vehicle
  }
}