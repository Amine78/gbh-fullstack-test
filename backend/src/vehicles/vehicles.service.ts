import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class VehiclesService {
  private vehicles: any[] = [];

  constructor() {
    const filePath = path.join(process.cwd(), 'src/data/mock_vehicles.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    this.vehicles = JSON.parse(fileContent);
  }
  //all vehicles
  getAllVehicles() {
    return this.vehicles;
  }
  //get vehicles by query
  getFilteredVehicles(vehicleType?: string , fuelType?: string , transmission?: string): any[]{
    return this.vehicles.filter((vehicle) => {
      const matchesType = vehicleType ? vehicle.type === vehicleType : true;
      const matchesFuel = fuelType ? vehicle.fuelType === fuelType : true;
      const matchesTransmission = transmission ? vehicle.transmission === transmission : true;
  
      return matchesType && matchesFuel && matchesTransmission ;
    });
  }
}