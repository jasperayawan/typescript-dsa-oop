// Enhanced Coffee Shop System with better OOP practices

class Coffee {
    private name: string;
    private price: number;
    private origin: string;
    private roastLevel: 'light' | 'medium' | 'dark';
    private stock: number;

    constructor(name: string, price: number, origin: string, roastLevel: 'light' | 'medium' | 'dark' = 'medium', stock: number = 0) {
        this.name = name;
        this.price = price;
        this.origin = origin;
        this.roastLevel = roastLevel;
        this.stock = stock;
    }

    // Getters
    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getOrigin(): string { return this.origin; }
    public getRoastLevel(): string { return this.roastLevel; }
    public getStock(): number { return this.stock; }

    // Setters
    public setPrice(price: number): void {
        if (price < 0) throw new Error('Price cannot be negative');
        this.price = price;
    }

    public setStock(stock: number): void {
        if (stock < 0) throw new Error('Stock cannot be negative');
        this.stock = stock;
    }

    public addStock(amount: number): void {
        this.stock += amount;
    }

    public reduceStock(amount: number): void {
        if (this.stock < amount) throw new Error('Insufficient stock');
        this.stock -= amount;
    }

    public isInStock(): boolean {
        return this.stock > 0;
    }

    public getDetails(): string {
        return `${this.name} from ${this.origin} (${this.roastLevel} roast) - $${this.price.toFixed(2)} (Stock: ${this.stock})`;
    }

    public displayDetails(): void {
        console.log(`☕ ${this.getDetails()}`);
    }
}

class Owner {
    private name: string;
    private experience: number; // years of experience

    constructor(name: string, experience: number = 0) {
        this.name = name;
        this.experience = experience;
    }

    public getName(): string { return this.name; }
    public getExperience(): number { return this.experience; }

    public introduce(): void {
        console.log(`👋 Hi! I'm ${this.name}, owner with ${this.experience} years of coffee experience`);
    }

    public addExperience(years: number): void {
        this.experience += years;
    }
}

class Store {
    private owner: Owner; // Composition - Store HAS an Owner
    private storeName: string;
    private location: string;
    private coffees: Coffee[] = [];
    private totalRevenue: number = 0;

    constructor(owner: Owner, storeName: string, location: string) {
        this.owner = owner;
        this.storeName = storeName;
        this.location = location;
    }

    public getOwner(): Owner { return this.owner; }
    public getStoreName(): string { return this.storeName; }
    public getLocation(): string { return this.location; }
    public getTotalRevenue(): number { return this.totalRevenue; }

    public addCoffee(coffee: Coffee): void {
        this.coffees.push(coffee);
        console.log(`✅ Added ${coffee.getName()} to ${this.storeName}`);
    }

    public removeCoffee(coffeeName: string): boolean {
        const index = this.coffees.findIndex(coffee => coffee.getName() === coffeeName);
        if (index === -1) {
            console.log(`❌ Coffee '${coffeeName}' not found`);
            return false;
        }
        this.coffees.splice(index, 1);
        console.log(`✅ Removed ${coffeeName} from ${this.storeName}`);
        return true;
    }

    public findCoffee(name: string): Coffee | undefined {
        return this.coffees.find(coffee => coffee.getName().toLowerCase().includes(name.toLowerCase()));
    }

    public getAvailableCoffees(): Coffee[] {
        return this.coffees.filter(coffee => coffee.isInStock());
    }

    public sellCoffee(coffeeName: string, quantity: number = 1): boolean {
        const coffee = this.findCoffee(coffeeName);
        if (!coffee) {
            console.log(`❌ Coffee '${coffeeName}' not found`);
            return false;
        }
        if (!coffee.isInStock()) {
            console.log(`❌ ${coffeeName} is out of stock`);
            return false;
        }
        if (coffee.getStock() < quantity) {
            console.log(`❌ Only ${coffee.getStock()} units of ${coffeeName} available`);
            return false;
        }

        coffee.reduceStock(quantity);
        this.totalRevenue += coffee.getPrice() * quantity;
        console.log(`💰 Sold ${quantity}x ${coffeeName} for $${(coffee.getPrice() * quantity).toFixed(2)}`);
        return true;
    }

    public displayMenu(): void {
        console.log(`\n📋 ${this.storeName} Menu (${this.location}):`);
        if (this.coffees.length === 0) {
            console.log("   No coffees available");
            return;
        }
        this.coffees.forEach((coffee, index) => {
            const status = coffee.isInStock() ? "✅" : "❌";
            console.log(`   ${index + 1}. ${status} ${coffee.getDetails()}`);
        });
    }

    public getStoreInfo(): string {
        return `
🏪 ${this.storeName}
📍 Location: ${this.location}
👤 Owner: ${this.owner.getName()}
☕ Coffee Varieties: ${this.coffees.length}
💰 Total Revenue: $${this.totalRevenue.toFixed(2)}
        `;
    }

    public displayStoreInfo(): void {
        console.log(this.getStoreInfo());
    }
}

// 🚀 Enhanced Coffee Shop Demo
console.log("=== ENHANCED COFFEE SHOP SYSTEM ===\n");

// Create owner
const owner = new Owner('Jasper', 5);
owner.introduce();

// Create store with composition
const store = new Store(owner, 'Boss Coffee', 'Downtown Manila');
store.displayStoreInfo();

// Create enhanced coffee varieties
const coffee1 = new Coffee('Native Blend', 100, 'Sultan Kudarat', 'dark', 50);
const coffee2 = new Coffee('Coffee Blanka', 13, 'Pitogo', 'light', 30);
const coffee3 = new Coffee('Premium Arabica', 25, 'Benguet', 'medium', 20);
const coffee4 = new Coffee('Espresso Roast', 15, 'Sagada', 'dark', 0); // Out of stock

// Add coffees to store
store.addCoffee(coffee1);
store.addCoffee(coffee2);
store.addCoffee(coffee3);
store.addCoffee(coffee4);

// Display menu
store.displayMenu();

// Demonstrate coffee operations
console.log("\n=== COFFEE OPERATIONS ===");
coffee1.displayDetails();
coffee1.setPrice(95); // Price adjustment
coffee1.addStock(10);
console.log("After price change and restock:");
coffee1.displayDetails();

// Demonstrate sales
console.log("\n=== SALES DEMONSTRATION ===");
store.sellCoffee('Native Blend', 2);
store.sellCoffee('Coffee Blanka', 1);
store.sellCoffee('Premium Arabica', 3);
store.sellCoffee('Espresso Roast', 1); // Should fail - out of stock

// Show updated store info
console.log("\n=== UPDATED STORE INFO ===");
store.displayStoreInfo();

// Demonstrate search functionality
console.log("\n=== SEARCH FUNCTIONALITY ===");
const foundCoffee = store.findCoffee('arabica');
if (foundCoffee) {
    console.log(`Found: ${foundCoffee.getDetails()}`);
}

// Show available coffees only
console.log("\n=== AVAILABLE COFFEES ===");
const availableCoffees = store.getAvailableCoffees();
availableCoffees.forEach(coffee => coffee.displayDetails());
