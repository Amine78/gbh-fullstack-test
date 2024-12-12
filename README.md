# GBH Technical Test

## Context
This technical test simulates a real-world development environment where you'll be working as part of a team of 5 developers. We expect you to follow standard team development practices including proper git workflow, clear documentation, and maintainable code. Your work should reflect how you would contribute to a shared codebase.

## Objective
Create a vehicle showcase application using Next.js and a backend of your choice (NestJS or Next.js API Routes). The application should display a list of vehicles with filtering and sorting capabilities.

You can either:
- Use the provided mock data
- Implement your own backend with the provided data structure

## Required Features
- Responsive design (mobile, tablet, desktop)
- Display a paginated vehicle list
- Filter vehicles by manufacturer, type, and year
- Sort vehicles by price and year
- Display detailed vehicle information
- Implement proper git workflow (feature branches, clear commits, PRs)

## Data Structure
```typescript
interface Vehicle {
  id: string;
  manufacturer: string;  // e.g., "BMW", "Tesla", "Toyota"
  model: string;        // e.g., "X5", "Model 3", "Camry"
  year: number;
  type: VehicleType;
  price: number;
  fuelType: string;
  transmission: string;
  mileage?: number;
  features: string[];
  images: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

enum VehicleType {
  SUV = 'SUV',
  SEDAN = 'SEDAN',
  TRUCK = 'TRUCK',
  SPORTS = 'SPORTS',
  LUXURY = 'LUXURY',
  ELECTRIC = 'ELECTRIC'
}

enum FuelType {
  GASOLINE = 'GASOLINE',
  DIESEL = 'DIESEL',
  ELECTRIC = 'ELECTRIC',
  HYBRID = 'HYBRID',
  PLUGIN_HYBRID = 'PLUGIN_HYBRID'
}
```

## Evaluation Criteria

### Technical Presentation (50%)
The most important part of the evaluation will be a video call where you'll present:
- Your technical choices and their justification
- Architecture decisions
- Code organization
- Challenges encountered and solutions
- Potential improvements and scalability
- Live demonstration of the application

### Code Quality (30%)
- Clean and maintainable code
- TypeScript usage
- Component organization
- Error handling
- Testing approach
- Responsive design implementation

### Development Practices (20%)
- Git workflow
- Documentation
- Code organization
- Commit clarity

## Timeline
- Expected time: 4-6 hours
- Technical presentation: 20 minutes + 10 minutes Q&A

## Presentation Guidelines
Prepare to discuss:
1. Technical stack choices
2. Architecture decisions
3. State management approach
4. Data fetching strategy
5. Performance considerations
6. Testing strategy
7. Potential improvements
8. Scalability considerations

Good luck! 🚀