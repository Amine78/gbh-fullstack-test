import { Test, TestingModule } from '@nestjs/testing';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('VehiclesController', () => {
  let app: INestApplication;
  let vehiclesService: VehiclesService;

  const mockVehicles = [
    { id: '1', manufacturer: 'Tesla', vehicleType: 'Car', fuelType: 'Electric' },
    { id: '2', manufacturer: 'Toyota', vehicleType: 'Truck', fuelType: 'Hybrid' },
    { id: '3', manufacturer: 'Tesla', vehicleType: 'SUV', fuelType: 'Electric' },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehiclesController],
      providers: [
        {
          provide: VehiclesService,
          useValue: {
            getAllVehicles: jest.fn().mockReturnValue(mockVehicles),
            getFilteredVehicles: jest.fn().mockImplementation((vehicleType, fuelType) => {
              return mockVehicles.filter(
                (v) =>
                  (!vehicleType || v.vehicleType === vehicleType) &&
                  (!fuelType || v.fuelType === fuelType),
              );
            }),
          },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    vehiclesService = module.get<VehiclesService>(VehiclesService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/vehicles (GET)', () => {
    it('should return all vehicles', async () => {
      return request(app.getHttpServer())
        .get('/vehicles')
        .expect(200)
    
    });
  });

  describe('/vehicles/get/:id (GET)', () => {
    it('should return a vehicle by valid ID', async () => {
      const validId = '1';
      return request(app.getHttpServer())
        .get(`/vehicles/get/${validId}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(mockVehicles.find((v) => v.id === validId)); // Vérifie le véhicule spécifique
        });
    });

    it('should return 404 for an invalid ID', async () => {
      const invalidId = '999';
      return request(app.getHttpServer())
        .get(`/vehicles/get/${invalidId}`)
        .expect(404)
        .expect((res) => {
            expect(res.body).toHaveProperty('statusCode', 404);
            expect(res.body).toHaveProperty('message', `Véhicule avec l'ID ${invalidId} introuvable`);
            expect(res.body).toHaveProperty('error', 'Not Found');
          });
    });
  });

  describe('/vehicles/manufacturer/:manufacturer (GET)', () => {
    it('should return vehicles by valid manufacturer', async () => {
      const manufacturer = 'Tesla';
      return request(app.getHttpServer())
        .get(`/vehicles/manufacturer/${manufacturer}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual(
            mockVehicles.filter((vehicle) => vehicle.manufacturer === manufacturer),
          );
        });
    });

    it('should return 404 for an invalid manufacturer', async () => {
      const invalidManufacturer = 'UnknownBrand';
      return request(app.getHttpServer())
        .get(`/vehicles/manufacturer/${invalidManufacturer}`)
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toContain('Aucun véhicule trouvé');
        });
    });
  });
});
