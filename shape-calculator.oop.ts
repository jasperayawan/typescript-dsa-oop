// 🔷 SHAPE CALCULATOR SYSTEM - Abstract Methods & Interfaces Exercise
// Concepts: Abstract Classes, Interfaces, Method Overriding, Polymorphism

// Interface for shapes that can be drawn
interface Drawable {
    draw(): void;
    getDrawingInfo(): string;
}

// Interface for shapes that can be moved
interface Movable {
    move(x: number, y: number): void;
    getPosition(): { x: number; y: number };
}

// Abstract base class for all shapes
abstract class Shape implements Drawable {
    protected x: number;
    protected y: number;
    protected color: string;
    protected name: string;

    constructor(x: number, y: number, color: string, name: string) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.name = name;
    }

    // Abstract methods - must be implemented by subclasses
    public abstract getArea(): number;
    public abstract getPerimeter(): number;
    public abstract getType(): string;

    // Concrete methods
    public draw(): void {
        console.log(`🎨 Drawing ${this.name} at (${this.x}, ${this.y}) in ${this.color}`);
    }

    public getDrawingInfo(): string {
        return `${this.name} - Position: (${this.x}, ${this.y}), Color: ${this.color}`;
    }

    public getColor(): string {
        return this.color;
    }

    public setColor(color: string): void {
        this.color = color;
        console.log(`🎨 ${this.name} color changed to ${color}`);
    }

    public getName(): string {
        return this.name;
    }

    public getInfo(): string {
        return `
${this.getType()} - ${this.name}
  Position: (${this.x}, ${this.y})
  Color: ${this.color}
  Area: ${this.getArea().toFixed(2)}
  Perimeter: ${this.getPerimeter().toFixed(2)}
        `;
    }
}

// Rectangle class
class Rectangle extends Shape implements Movable {
    protected width: number;
    protected height: number;

    constructor(x: number, y: number, width: number, height: number, color: string, name: string) {
        super(x, y, color, name);
        this.width = width;
        this.height = height;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getPerimeter(): number {
        return 2 * (this.width + this.height);
    }

    public getType(): string {
        return "📐 Rectangle";
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        console.log(`📐 ${this.name} moved to (${x}, ${y})`);
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public setDimensions(width: number, height: number): void {
        this.width = width;
        this.height = height;
        console.log(`📐 ${this.name} dimensions changed to ${width}x${height}`);
    }

    public isSquare(): boolean {
        return this.width === this.height;
    }
}

// Circle class
class Circle extends Shape implements Movable {
    protected radius: number;

    constructor(x: number, y: number, radius: number, color: string, name: string) {
        super(x, y, color, name);
        this.radius = radius;
    }

    public getArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    public getPerimeter(): number {
        return 2 * Math.PI * this.radius;
    }

    public getType(): string {
        return "⭕ Circle";
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        console.log(`⭕ ${this.name} moved to (${x}, ${y})`);
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public getRadius(): number {
        return this.radius;
    }

    public setRadius(radius: number): void {
        this.radius = radius;
        console.log(`⭕ ${this.name} radius changed to ${radius}`);
    }

    public getDiameter(): number {
        return 2 * this.radius;
    }
}

// Triangle class
class Triangle extends Shape implements Movable {
    protected side1: number;
    protected side2: number;
    protected side3: number;

    constructor(x: number, y: number, side1: number, side2: number, side3: number, color: string, name: string) {
        super(x, y, color, name);
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
        
        // Validate triangle inequality
        if (!this.isValidTriangle()) {
            throw new Error('Invalid triangle: sum of any two sides must be greater than the third side');
        }
    }

    private isValidTriangle(): boolean {
        return (this.side1 + this.side2 > this.side3) &&
               (this.side1 + this.side3 > this.side2) &&
               (this.side2 + this.side3 > this.side1);
    }

    public getArea(): number {
        // Using Heron's formula
        const s = this.getPerimeter() / 2;
        return Math.sqrt(s * (s - this.side1) * (s - this.side2) * (s - this.side3));
    }

    public getPerimeter(): number {
        return this.side1 + this.side2 + this.side3;
    }

    public getType(): string {
        return "🔺 Triangle";
    }

    public move(x: number, y: number): void {
        this.x = x;
        this.y = y;
        console.log(`🔺 ${this.name} moved to (${x}, ${y})`);
    }

    public getPosition(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public getSides(): { side1: number; side2: number; side3: number } {
        return { side1: this.side1, side2: this.side2, side3: this.side3 };
    }

    public getTriangleType(): string {
        if (this.side1 === this.side2 && this.side2 === this.side3) {
            return "Equilateral";
        } else if (this.side1 === this.side2 || this.side2 === this.side3 || this.side1 === this.side3) {
            return "Isosceles";
        } else {
            return "Scalene";
        }
    }
}

// Shape Manager class
class ShapeManager {
    private shapes: Shape[] = [];
    private static instance: ShapeManager;

    private constructor() {}

    public static getInstance(): ShapeManager {
        if (!ShapeManager.instance) {
            ShapeManager.instance = new ShapeManager();
        }
        return ShapeManager.instance;
    }

    public addShape(shape: Shape): void {
        this.shapes.push(shape);
        console.log(`✅ Added ${shape.getName()} to shape manager`);
    }

    public removeShape(shapeName: string): boolean {
        const index = this.shapes.findIndex(shape => shape.getName() === shapeName);
        if (index === -1) {
            console.log(`❌ Shape '${shapeName}' not found`);
            return false;
        }
        this.shapes.splice(index, 1);
        console.log(`✅ Removed ${shapeName} from shape manager`);
        return true;
    }

    public getShape(shapeName: string): Shape | undefined {
        return this.shapes.find(shape => shape.getName() === shapeName);
    }

    public getAllShapes(): Shape[] {
        return [...this.shapes]; // Return copy
    }

    public getTotalArea(): number {
        return this.shapes.reduce((total, shape) => total + shape.getArea(), 0);
    }

    public getTotalPerimeter(): number {
        return this.shapes.reduce((total, shape) => total + shape.getPerimeter(), 0);
    }

    public drawAllShapes(): void {
        console.log("\n🎨 DRAWING ALL SHAPES:");
        this.shapes.forEach(shape => shape.draw());
    }

    public getShapesByType(shapeType: string): Shape[] {
        return this.shapes.filter(shape => shape.getType().includes(shapeType));
    }

    public getLargestShape(): Shape | null {
        if (this.shapes.length === 0) return null;
        return this.shapes.reduce((largest, current) => 
            current.getArea() > largest.getArea() ? current : largest
        );
    }

    public getSmallestShape(): Shape | null {
        if (this.shapes.length === 0) return null;
        return this.shapes.reduce((smallest, current) => 
            current.getArea() < smallest.getArea() ? current : smallest
        );
    }

    public getShapeStatistics(): string {
        const totalShapes = this.shapes.length;
        const totalArea = this.getTotalArea();
        const totalPerimeter = this.getTotalPerimeter();
        const largestShape = this.getLargestShape();
        const smallestShape = this.getSmallestShape();

        let stats = `
📊 SHAPE STATISTICS:
- Total Shapes: ${totalShapes}
- Total Area: ${totalArea.toFixed(2)}
- Total Perimeter: ${totalPerimeter.toFixed(2)}
- Largest Shape: ${largestShape ? largestShape.getName() : 'None'}
- Smallest Shape: ${smallestShape ? smallestShape.getName() : 'None'}

Shape Types:`;

        const types = [...new Set(this.shapes.map(shape => shape.getType()))];
        types.forEach(type => {
            const count = this.getShapesByType(type).length;
            stats += `\n  ${type}: ${count}`;
        });

        return stats;
    }
}

// 🚀 Example Usage
console.log("=== SHAPE CALCULATOR SYSTEM ===\n");

const shapeManager = ShapeManager.getInstance();

// Create different shapes
const rectangle1 = new Rectangle(10, 20, 30, 40, "red", "Red Rectangle");
const rectangle2 = new Rectangle(50, 60, 20, 20, "blue", "Blue Square");
const circle1 = new Circle(100, 100, 15, "green", "Green Circle");
const circle2 = new Circle(200, 200, 25, "yellow", "Yellow Circle");
const triangle1 = new Triangle(300, 300, 10, 10, 10, "purple", "Purple Triangle");
const triangle2 = new Triangle(400, 400, 15, 20, 25, "orange", "Orange Triangle");

// Add shapes to manager
shapeManager.addShape(rectangle1);
shapeManager.addShape(rectangle2);
shapeManager.addShape(circle1);
shapeManager.addShape(circle2);
shapeManager.addShape(triangle1);
shapeManager.addShape(triangle2);

// Show individual shape information
console.log("\n=== INDIVIDUAL SHAPE INFO ===");
shapeManager.getAllShapes().forEach(shape => {
    console.log(shape.getInfo());
});

// Demonstrate drawing
shapeManager.drawAllShapes();

// Demonstrate movement (for movable shapes)
console.log("\n=== MOVING SHAPES ===");
const movableShapes = shapeManager.getAllShapes().filter(shape => 'move' in shape) as (Shape & Movable)[];
movableShapes.forEach(shape => {
    const newX = Math.floor(Math.random() * 100);
    const newY = Math.floor(Math.random() * 100);
    shape.move(newX, newY);
});

// Show shape statistics
console.log(shapeManager.getShapeStatistics());

// Demonstrate specific shape operations
console.log("\n=== SPECIFIC SHAPE OPERATIONS ===");
console.log(`Is ${rectangle2.getName()} a square? ${rectangle2.isSquare()}`);
console.log(`${circle1.getName()} diameter: ${circle1.getDiameter()}`);
console.log(`${triangle1.getName()} type: ${triangle1.getTriangleType()}`);

// Demonstrate color changes
console.log("\n=== COLOR CHANGES ===");
rectangle1.setColor("pink");
circle1.setColor("cyan");

// Show updated information
console.log("\n=== UPDATED SHAPE INFO ===");
console.log(rectangle1.getInfo());
console.log(circle1.getInfo());
