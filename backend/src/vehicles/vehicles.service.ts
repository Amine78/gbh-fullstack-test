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
  getAllVehiclesRaw() {
    return this.vehicles; 
  }
  //get vehicles by query
  getFilteredVehicles(vehicleType?: string , fuelType?: string , transmission?: string, year?: number , sortBy?: string): any[]{
    let filteredVehicles = this.vehicles.filter((vehicle) => {
      const matchesType = vehicleType ? vehicle.type === vehicleType : true;
      const matchesFuel = fuelType ? vehicle.fuelType === fuelType : true;
      const matchesTransmission = transmission ? vehicle.transmission === transmission : true;
      const matchesYear = year ? vehicle.year === year : true;
      return matchesType && matchesFuel && matchesTransmission && matchesYear;
    });

    // Tri par année ou prix
    if (sortBy === 'year') {
      filteredVehicles.sort((a, b) => a.year - b.year);
    } else if (sortBy === 'price') {
      filteredVehicles.sort((a, b) => a.price - b.price);
    }

    return filteredVehicles;
    };
  }