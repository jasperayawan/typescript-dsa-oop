# 🎯 Object-Oriented Programming Exercises Guide

This guide contains 5 comprehensive OOP exercises that build upon your existing knowledge and introduce advanced concepts.

## 📚 Exercise Overview

### 1. **Library Management System** (`library-management.oop.ts`)
**Concepts Covered:**
- **Interfaces** - `Borrowable` interface for items that can be borrowed
- **Abstract Classes** - `LibraryItem` as base class with abstract methods
- **Inheritance** - `Book` and `Magazine` extending `LibraryItem`
- **Composition** - `Library` containing `LibraryItem` and `Member` objects
- **Error Handling** - Try-catch blocks and custom error messages
- **Method Overriding** - Each subclass implements abstract methods differently

**Key Learning Points:**
- How to design interfaces for common behaviors
- When to use abstract classes vs interfaces
- Proper error handling in OOP systems
- Building complex systems with multiple interacting classes

### 2. **Vehicle Hierarchy System** (`vehicle-hierarchy.oop.ts`)
**Concepts Covered:**
- **Polymorphism** - Different vehicles respond differently to same methods
- **Method Overriding** - Each vehicle type implements methods differently
- **Abstract Methods** - `start()`, `stop()`, `accelerate()` must be implemented
- **Template Method Pattern** - `drive()` method calls abstract methods
- **Inheritance Hierarchy** - `Car`, `Motorcycle`, `Truck` extending `Vehicle`
- **Type-Specific Methods** - Each vehicle has unique capabilities

**Key Learning Points:**
- How polymorphism works in practice
- When to use abstract methods
- Building flexible hierarchies
- Template method pattern for common workflows

### 3. **E-commerce System** (`ecommerce-system.oop.ts`)
**Concepts Covered:**
- **Composition vs Aggregation** - Customer owns Cart (composition), has Orders (aggregation)
- **Value Objects** - `Money` class for currency handling
- **Static Methods** - `generateOrderId()` for unique ID generation
- **Getters/Setters** - Controlled access to private properties
- **Factory Pattern** - `CharacterFactory` for creating different character types
- **Encapsulation** - Private properties with public methods

**Key Learning Points:**
- Difference between composition and aggregation
- When to use static methods
- Proper encapsulation with getters/setters
- Value objects for domain modeling

### 4. **Game Character System** (`game-character-system.oop.ts`)
**Concepts Covered:**
- **Singleton Pattern** - `GameStats` ensures single instance
- **Static Methods & Variables** - Class-level functionality
- **Interface Implementation** - `Equipment` interface for weapons/armor
- **Factory Pattern** - `CharacterFactory` for character creation
- **Observer Pattern** - Game stats tracking
- **Complex Inheritance** - Multiple character types with unique abilities

**Key Learning Points:**
- Singleton pattern implementation
- Static vs instance methods
- Interface design for flexible systems
- Complex game logic with OOP

### 5. **Shape Calculator System** (`shape-calculator.oop.ts`)
**Concepts Covered:**
- **Multiple Interface Implementation** - `Drawable` and `Movable` interfaces
- **Abstract Methods** - `getArea()`, `getPerimeter()` must be implemented
- **Method Overriding** - Each shape calculates area/perimeter differently
- **Polymorphism** - All shapes can be drawn and moved
- **Singleton Pattern** - `ShapeManager` for global shape management
- **Mathematical Calculations** - Real-world application of OOP

**Key Learning Points:**
- Multiple interface implementation
- Abstract methods for common behavior
- Polymorphism in collections
- Real-world problem solving with OOP

## 🎯 Learning Progression

### **Beginner Level** (You're here!)
- Basic classes and objects
- Simple inheritance
- Public/private properties
- Basic methods

### **Intermediate Level** (These exercises)
- Abstract classes and methods
- Interface implementation
- Composition and aggregation
- Error handling
- Static methods and variables

### **Advanced Level** (Next steps)
- Design patterns (Singleton, Factory, Observer)
- Complex inheritance hierarchies
- Polymorphism in collections
- SOLID principles
- Dependency injection

## 🚀 How to Use These Exercises

### **Step 1: Read and Understand**
- Go through each exercise file
- Understand the class relationships
- Identify the OOP concepts being used

### **Step 2: Run and Experiment**
```bash
# Run each exercise
npx ts-node library-management.oop.ts
npx ts-node vehicle-hierarchy.oop.ts
npx ts-node ecommerce-system.oop.ts
npx ts-node game-character-system.oop.ts
npx ts-node shape-calculator.oop.ts
```

### **Step 3: Modify and Extend**
- Add new features to existing classes
- Create new subclasses
- Implement additional interfaces
- Add new methods and properties

### **Step 4: Create Your Own**
- Design a new system using these concepts
- Combine ideas from multiple exercises
- Solve real-world problems with OOP

## 🔧 Key OOP Concepts Explained

### **Interfaces**
```typescript
interface Borrowable {
    borrow(): void;
    return(): void;
    isAvailable(): boolean;
}
```
- Define contracts that classes must follow
- Enable polymorphism
- Allow multiple inheritance of behavior

### **Abstract Classes**
```typescript
abstract class Vehicle {
    abstract start(): void; // Must be implemented
    public drive(): void { /* Common implementation */ }
}
```
- Cannot be instantiated directly
- Can have both abstract and concrete methods
- Provide common functionality to subclasses

### **Composition vs Aggregation**
```typescript
// Composition - Customer OWNS Cart
class Customer {
    private cart: ShoppingCart; // Customer creates and destroys cart
}

// Aggregation - Customer HAS Orders
class Customer {
    private orders: Order[]; // Orders exist independently
}
```

### **Static Methods**
```typescript
class CharacterFactory {
    public static createCharacter(type: string): Character {
        // Class-level method, not instance method
    }
}
```

### **Polymorphism**
```typescript
// Same method call, different behavior
shapes.forEach(shape => shape.draw()); // Each shape draws differently
vehicles.forEach(vehicle => vehicle.start()); // Each vehicle starts differently
```

## 🎓 Next Steps

1. **Master these exercises** - Understand every concept
2. **Create variations** - Modify existing exercises
3. **Build new systems** - Apply concepts to real problems
4. **Study design patterns** - Learn advanced OOP patterns
5. **Practice SOLID principles** - Write maintainable code

## 📖 Additional Resources

- **TypeScript Handbook** - Official TypeScript documentation
- **Design Patterns** - Gang of Four book
- **Clean Code** - Robert Martin
- **SOLID Principles** - Object-oriented design principles

Happy coding! 🚀
