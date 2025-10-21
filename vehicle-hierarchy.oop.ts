// 🚗 VEHICLE HIERARCHY SYSTEM - Polymorphism & Method Overriding Exercise
// Concepts: Inheritance, Polymorphism, Method Overriding, Abstract Classes

// Abstract base class for all vehicles
abstract class Vehicle {
    protected brand: string;
    protected model: string;
    protected year: number;
    protected speed: number = 0;
    protected isRunning: boolean = false;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    // Abstract methods - must be implemented by subclasses
    abstract start(): void;
    abstract stop(): void;
    abstract accelerate(speed: number): void;

    // Concrete methods
    public getInfo(): string {
        return `${this.year} ${this.brand} ${this.model}`;
    }

    public getCurrentSpeed(): number {
        return this.speed;
    }

    public getStatus(): string {
        return this.isRunning ? "Running" : "Stopped";
    }

    // Template method pattern
    public drive(): void {
        console.log(`🚗 ${this.getInfo()} is ready to drive`);
        this.start();
        this.accelerate(30);
        console.log(`Current speed: ${this.getCurrentSpeed()} km/h`);
    }
}

// Car class
class Car extends Vehicle {
    private doors: number;
    private fuelType: 'gasoline' | 'electric' | 'hybrid';

    constructor(brand: string, model: string, year: number, doors: number, fuelType: 'gasoline' | 'electric' | 'hybrid') {
        super(brand, model, year);
        this.doors = doors;
        this.fuelType = fuelType;
    }

    public start(): void {
        if (this.isRunning) {
            console.log("🚗 Car is already running");
            return;
        }
        this.isRunning = true;
        console.log(`🚗 ${this.getInfo()} started with ${this.fuelType} engine`);
    }

    public stop(): void {
        if (!this.isRunning) {
            console.log("🚗 Car is already stopped");
            return;
        }
        this.isRunning = false;
        this.speed = 0;
        console.log(`🚗 ${this.getInfo()} stopped`);
    }

    public accelerate(speed: number): void {
        if (!this.isRunning) {
            console.log("🚗 Cannot accelerate - car is not running");
            return;
        }
        this.speed += speed;
        console.log(`🚗 Accelerating to ${this.speed} km/h`);
    }

    public honk(): void {
        console.log("🚗 Beep beep!");
    }

    public getDoors(): number {
        return this.doors;
    }

    public getFuelType(): string {
        return this.fuelType;
    }
}

// Motorcycle class
class Motorcycle extends Vehicle {
    private engineSize: number; // in cc
    private hasWindshield: boolean;

    constructor(brand: string, model: string, year: number, engineSize: number, hasWindshield: boolean) {
        super(brand, model, year);
        this.engineSize = engineSize;
        this.hasWindshield = hasWindshield;
    }

    public start(): void {
        if (this.isRunning) {
            console.log("🏍️ Motorcycle is already running");
            return;
        }
        this.isRunning = true;
        console.log(`🏍️ ${this.getInfo()} started with ${this.engineSize}cc engine`);
    }

    public stop(): void {
        if (!this.isRunning) {
            console.log("🏍️ Motorcycle is already stopped");
            return;
        }
        this.isRunning = false;
        this.speed = 0;
        console.log(`🏍️ ${this.getInfo()} stopped`);
    }

    public accelerate(speed: number): void {
        if (!this.isRunning) {
            console.log("🏍️ Cannot accelerate - motorcycle is not running");
            return;
        }
        this.speed += speed;
        console.log(`🏍️ Accelerating to ${this.speed} km/h`);
    }

    public wheelie(): void {
        if (this.speed < 20) {
            console.log("🏍️ Need more speed for a wheelie!");
            return;
        }
        console.log("🏍️ Doing a wheelie! 🎪");
    }

    public getEngineSize(): number {
        return this.engineSize;
    }
}

// Truck class
class Truck extends Vehicle {
    private cargoCapacity: number; // in tons
    private currentCargo: number = 0;

    constructor(brand: string, model: string, year: number, cargoCapacity: number) {
        super(brand, model, year);
        this.cargoCapacity = cargoCapacity;
    }

    public start(): void {
        if (this.isRunning) {
            console.log("🚛 Truck is already running");
            return;
        }
        this.isRunning = true;
        console.log(`🚛 ${this.getInfo()} started - Heavy vehicle ready`);
    }

    public stop(): void {
        if (!this.isRunning) {
            console.log("🚛 Truck is already stopped");
            return;
        }
        this.isRunning = false;
        this.speed = 0;
        console.log(`🚛 ${this.getInfo()} stopped`);
    }

    public accelerate(speed: number): void {
        if (!this.isRunning) {
            console.log("🚛 Cannot accelerate - truck is not running");
            return;
        }
        // Trucks accelerate slower
        this.speed += speed * 0.5;
        console.log(`🚛 Accelerating to ${this.speed} km/h (heavy vehicle)`);
    }

    public loadCargo(weight: number): void {
        if (this.currentCargo + weight > this.cargoCapacity) {
            console.log(`🚛 Cannot load ${weight} tons - exceeds capacity`);
            return;
        }
        this.currentCargo += weight;
        console.log(`🚛 Loaded ${weight} tons. Current cargo: ${this.currentCargo}/${this.cargoCapacity} tons`);
    }

    public unloadCargo(weight: number): void {
        if (this.currentCargo - weight < 0) {
            console.log("🚛 Cannot unload more cargo than currently loaded");
            return;
        }
        this.currentCargo -= weight;
        console.log(`🚛 Unloaded ${weight} tons. Current cargo: ${this.currentCargo}/${this.cargoCapacity} tons`);
    }

    public getCargoCapacity(): number {
        return this.cargoCapacity;
    }

    public getCurrentCargo(): number {
        return this.currentCargo;
    }
}

// Vehicle Fleet Manager
class VehicleFleet {
    private vehicles: Vehicle[] = [];

    public addVehicle(vehicle: Vehicle): void {
        this.vehicles.push(vehicle);
        console.log(`✅ Added ${vehicle.getInfo()} to fleet`);
    }

    public startAllVehicles(): void {
        console.log("\n🚀 Starting all vehicles...");
        this.vehicles.forEach(vehicle => {
            vehicle.start();
        });
    }

    public stopAllVehicles(): void {
        console.log("\n🛑 Stopping all vehicles...");
        this.vehicles.forEach(vehicle => {
            vehicle.stop();
        });
    }

    public getFleetInfo(): void {
        console.log("\n📊 FLEET INFORMATION:");
        this.vehicles.forEach((vehicle, index) => {
            console.log(`${index + 1}. ${vehicle.getInfo()} - Status: ${vehicle.getStatus()}`);
        });
    }

    // Polymorphism in action - different vehicles respond differently
    public demonstratePolymorphism(): void {
        console.log("\n🎭 POLYMORPHISM DEMONSTRATION:");
        this.vehicles.forEach(vehicle => {
            console.log(`\n--- ${vehicle.getInfo()} ---`);
            vehicle.drive();
            
            // Type-specific methods
            if (vehicle instanceof Car) {
                vehicle.honk();
                console.log(`Doors: ${vehicle.getDoors()}, Fuel: ${vehicle.getFuelType()}`);
            } else if (vehicle instanceof Motorcycle) {
                vehicle.wheelie();
                console.log(`Engine: ${vehicle.getEngineSize()}cc`);
            } else if (vehicle instanceof Truck) {
                vehicle.loadCargo(2);
                console.log(`Cargo: ${vehicle.getCurrentCargo()}/${vehicle.getCargoCapacity()} tons`);
            }
        });
    }
}

// 🚀 Example Usage
console.log("=== VEHICLE HIERARCHY SYSTEM ===\n");

const fleet = new VehicleFleet();

// Create different types of vehicles
const car1 = new Car("Toyota", "Camry", 2023, 4, "hybrid");
const car2 = new Car("Tesla", "Model 3", 2023, 4, "electric");
const motorcycle1 = new Motorcycle("Honda", "CBR600", 2023, 600, true);
const motorcycle2 = new Motorcycle("Ducati", "Monster", 2023, 821, false);
const truck1 = new Truck("Ford", "F-150", 2023, 1.5);
const truck2 = new Truck("Volvo", "FH16", 2023, 25);

// Add vehicles to fleet
fleet.addVehicle(car1);
fleet.addVehicle(car2);
fleet.addVehicle(motorcycle1);
fleet.addVehicle(motorcycle2);
fleet.addVehicle(truck1);
fleet.addVehicle(truck2);

// Show fleet information
fleet.getFleetInfo();

// Demonstrate polymorphism
fleet.demonstratePolymorphism();

// Start all vehicles
fleet.startAllVehicles();

// Show updated status
fleet.getFleetInfo();

// Stop all vehicles
fleet.stopAllVehicles();
