// 🛒 E-COMMERCE SYSTEM - Composition & Aggregation Exercise
// Concepts: Composition, Aggregation, Static Methods, Getters/Setters, Design Patterns

// Value Object for Money
class Money {
    private amount: number;
    private currency: string;

    constructor(amount: number, currency: string = 'USD') {
        if (amount < 0) throw new Error('Amount cannot be negative');
        this.amount = amount;
        this.currency = currency;
    }

    public getAmount(): number {
        return this.amount;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add different currencies');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    public subtract(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot subtract different currencies');
        }
        if (this.amount < other.amount) {
            throw new Error('Insufficient funds');
        }
        return new Money(this.amount - other.amount, this.currency);
    }

    public multiply(factor: number): Money {
        return new Money(this.amount * factor, this.currency);
    }

    public toString(): string {
        return `${this.currency} ${this.amount.toFixed(2)}`;
    }
}

// Product class
class Product {
    private id: string;
    private name: string;
    private description: string;
    private price: Money;
    private stock: number;
    private category: string;

    constructor(id: string, name: string, description: string, price: Money, stock: number, category: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.category = category;
    }

    // Getters
    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getDescription(): string { return this.description; }
    public getPrice(): Money { return this.price; }
    public getStock(): number { return this.stock; }
    public getCategory(): string { return this.category; }

    // Setters
    public setPrice(price: Money): void {
        this.price = price;
    }

    public setStock(stock: number): void {
        if (stock < 0) throw new Error('Stock cannot be negative');
        this.stock = stock;
    }

    public reduceStock(quantity: number): void {
        if (quantity > this.stock) {
            throw new Error('Insufficient stock');
        }
        this.stock -= quantity;
    }

    public addStock(quantity: number): void {
        if (quantity < 0) throw new Error('Cannot add negative stock');
        this.stock += quantity;
    }

    public isInStock(): boolean {
        return this.stock > 0;
    }

    public getInfo(): string {
        return `${this.name} - ${this.price.toString()} (Stock: ${this.stock})`;
    }
}

// Cart Item class (Composition - Cart owns CartItem)
class CartItem {
    private product: Product;
    private quantity: number;

    constructor(product: Product, quantity: number) {
        this.product = product;
        this.quantity = quantity;
    }

    public getProduct(): Product {
        return this.product;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        if (quantity < 0) throw new Error('Quantity cannot be negative');
        this.quantity = quantity;
    }

    public getTotalPrice(): Money {
        return this.product.getPrice().multiply(this.quantity);
    }

    public getInfo(): string {
        return `${this.product.getName()} x${this.quantity} = ${this.getTotalPrice().toString()}`;
    }
}

// Shopping Cart class
class ShoppingCart {
    private items: CartItem[] = [];
    private customerId: string;

    constructor(customerId: string) {
        this.customerId = customerId;
    }

    public addItem(product: Product, quantity: number): void {
        if (!product.isInStock()) {
            throw new Error('Product is out of stock');
        }
        if (quantity > product.getStock()) {
            throw new Error('Insufficient stock');
        }

        // Check if item already exists in cart
        const existingItem = this.items.find(item => item.getProduct().getId() === product.getId());
        if (existingItem) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            this.items.push(new CartItem(product, quantity));
        }

        console.log(`✅ Added ${quantity}x ${product.getName()} to cart`);
    }

    public removeItem(productId: string): void {
        const index = this.items.findIndex(item => item.getProduct().getId() === productId);
        if (index === -1) {
            throw new Error('Item not found in cart');
        }
        this.items.splice(index, 1);
        console.log(`❌ Removed item from cart`);
    }

    public updateQuantity(productId: string, quantity: number): void {
        const item = this.items.find(item => item.getProduct().getId() === productId);
        if (!item) {
            throw new Error('Item not found in cart');
        }
        item.setQuantity(quantity);
        console.log(`🔄 Updated quantity for ${item.getProduct().getName()}`);
    }

    public getTotalPrice(): Money {
        return this.items.reduce((total, item) => {
            return total.add(item.getTotalPrice());
        }, new Money(0));
    }

    public getItems(): CartItem[] {
        return [...this.items]; // Return copy to prevent external modification
    }

    public getItemCount(): number {
        return this.items.reduce((total, item) => total + item.getQuantity(), 0);
    }

    public clear(): void {
        this.items = [];
        console.log('🛒 Cart cleared');
    }

    public getCartInfo(): string {
        if (this.items.length === 0) {
            return '🛒 Cart is empty';
        }

        let info = `🛒 Shopping Cart (${this.getItemCount()} items):\n`;
        this.items.forEach((item, index) => {
            info += `${index + 1}. ${item.getInfo()}\n`;
        });
        info += `Total: ${this.getTotalPrice().toString()}`;
        return info;
    }
}

// Customer class
class Customer {
    private id: string;
    private name: string;
    private email: string;
    private address: string;
    private cart: ShoppingCart; // Composition - Customer owns Cart
    private orderHistory: Order[] = []; // Aggregation - Customer has Orders

    constructor(id: string, name: string, email: string, address: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.cart = new ShoppingCart(id);
    }

    // Getters
    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getEmail(): string { return this.email; }
    public getAddress(): string { return this.address; }
    public getCart(): ShoppingCart { return this.cart; }

    // Setters
    public setAddress(address: string): void {
        this.address = address;
    }

    public addToCart(product: Product, quantity: number): void {
        this.cart.addItem(product, quantity);
    }

    public getOrderHistory(): Order[] {
        return [...this.orderHistory]; // Return copy
    }

    public addOrder(order: Order): void {
        this.orderHistory.push(order);
    }

    public getInfo(): string {
        return `Customer: ${this.name} (${this.email}) - Orders: ${this.orderHistory.length}`;
    }
}

// Order class
class Order {
    private id: string;
    private customerId: string;
    private items: CartItem[];
    private totalAmount: Money;
    private status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    private orderDate: Date;

    constructor(id: string, customerId: string, items: CartItem[]) {
        this.id = id;
        this.customerId = customerId;
        this.items = [...items]; // Copy items
        this.totalAmount = items.reduce((total, item) => {
            return total.add(item.getTotalPrice());
        }, new Money(0));
        this.status = 'pending';
        this.orderDate = new Date();
    }

    public getId(): string { return this.id; }
    public getCustomerId(): string { return this.customerId; }
    public getItems(): CartItem[] { return [...this.items]; }
    public getTotalAmount(): Money { return this.totalAmount; }
    public getStatus(): string { return this.status; }
    public getOrderDate(): Date { return this.orderDate; }

    public updateStatus(status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'): void {
        this.status = status;
        console.log(`📦 Order ${this.id} status updated to: ${status}`);
    }

    public getOrderInfo(): string {
        let info = `📦 Order #${this.id} (${this.status})\n`;
        info += `Date: ${this.orderDate.toLocaleDateString()}\n`;
        info += `Items:\n`;
        this.items.forEach((item, index) => {
            info += `  ${index + 1}. ${item.getInfo()}\n`;
        });
        info += `Total: ${this.totalAmount.toString()}`;
        return info;
    }
}

// E-commerce Store class
class ECommerceStore {
    private products: Product[] = [];
    private customers: Customer[] = [];
    private orders: Order[] = [];
    private static orderCounter: number = 1; // Static variable

    // Static method
    public static generateOrderId(): string {
        return `ORD-${String(this.orderCounter++).padStart(6, '0')}`;
    }

    public addProduct(product: Product): void {
        this.products.push(product);
        console.log(`✅ Added product: ${product.getInfo()}`);
    }

    public addCustomer(customer: Customer): void {
        this.customers.push(customer);
        console.log(`✅ Added customer: ${customer.getInfo()}`);
    }

    public getProduct(id: string): Product | undefined {
        return this.products.find(product => product.getId() === id);
    }

    public getCustomer(id: string): Customer | undefined {
        return this.customers.find(customer => customer.getId() === id);
    }

    public searchProducts(query: string): Product[] {
        return this.products.filter(product => 
            product.getName().toLowerCase().includes(query.toLowerCase()) ||
            product.getDescription().toLowerCase().includes(query.toLowerCase()) ||
            product.getCategory().toLowerCase().includes(query.toLowerCase())
        );
    }

    public createOrder(customerId: string): Order {
        const customer = this.getCustomer(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }

        const cart = customer.getCart();
        if (cart.getItemCount() === 0) {
            throw new Error('Cart is empty');
        }

        // Check stock availability
        for (const item of cart.getItems()) {
            if (item.getQuantity() > item.getProduct().getStock()) {
                throw new Error(`Insufficient stock for ${item.getProduct().getName()}`);
            }
        }

        // Create order
        const order = new Order(ECommerceStore.generateOrderId(), customerId, cart.getItems());
        this.orders.push(order);
        customer.addOrder(order);

        // Update stock
        for (const item of cart.getItems()) {
            item.getProduct().reduceStock(item.getQuantity());
        }

        // Clear cart
        cart.clear();

        console.log(`✅ Order created: ${order.getId()}`);
        return order;
    }

    public getStoreStats(): string {
        const totalProducts = this.products.length;
        const totalCustomers = this.customers.length;
        const totalOrders = this.orders.length;
        const totalRevenue = this.orders.reduce((total, order) => {
            return total.add(order.getTotalAmount());
        }, new Money(0));

        return `
📊 E-COMMERCE STORE STATISTICS:
- Total Products: ${totalProducts}
- Total Customers: ${totalCustomers}
- Total Orders: ${totalOrders}
- Total Revenue: ${totalRevenue.toString()}
        `;
    }
}

// 🚀 Example Usage
console.log("=== E-COMMERCE SYSTEM ===\n");

const store = new ECommerceStore();

// Create products
const product1 = new Product("P001", "Laptop", "High-performance laptop", new Money(999.99), 10, "Electronics");
const product2 = new Product("P002", "Mouse", "Wireless mouse", new Money(29.99), 50, "Electronics");
const product3 = new Product("P003", "Book", "Programming book", new Money(49.99), 25, "Books");
const product4 = new Product("P004", "Headphones", "Noise-cancelling headphones", new Money(199.99), 15, "Electronics");

// Add products to store
store.addProduct(product1);
store.addProduct(product2);
store.addProduct(product3);
store.addProduct(product4);

// Create customers
const customer1 = new Customer("C001", "John Doe", "john@email.com", "123 Main St");
const customer2 = new Customer("C002", "Jane Smith", "jane@email.com", "456 Oak Ave");

// Add customers to store
store.addCustomer(customer1);
store.addCustomer(customer2);

// Customer 1 shopping
console.log("\n=== CUSTOMER 1 SHOPPING ===");
customer1.addToCart(product1, 1);
customer1.addToCart(product2, 2);
customer1.addToCart(product3, 1);

console.log(customer1.getCart().getCartInfo());

// Create order for customer 1
const order1 = store.createOrder("C001");
order1.updateStatus('confirmed');
order1.updateStatus('shipped');

// Customer 2 shopping
console.log("\n=== CUSTOMER 2 SHOPPING ===");
customer2.addToCart(product4, 1);
customer2.addToCart(product2, 1);

console.log(customer2.getCart().getCartInfo());

// Create order for customer 2
const order2 = store.createOrder("C002");
order2.updateStatus('confirmed');

// Show order details
console.log("\n=== ORDER DETAILS ===");
console.log(order1.getOrderInfo());
console.log("\n" + order2.getOrderInfo());

// Search products
console.log("\n=== PRODUCT SEARCH ===");
const searchResult = store.searchProducts("electronics");
searchResult.forEach(product => console.log(product.getInfo()));

// Show store statistics
console.log(store.getStoreStats());
