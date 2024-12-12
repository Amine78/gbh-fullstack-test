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

  getAllVehicles() {
    return this.vehicles;
  }
}