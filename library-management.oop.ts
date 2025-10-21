// 📚 LIBRARY MANAGEMENT SYSTEM - Advanced OOP Exercise
// Concepts: Interfaces, Abstract Classes, Composition, Error Handling

// Interface for items that can be borrowed
interface Borrowable {
    borrow(): void;
    return(): void;
    isAvailable(): boolean;
}

// Abstract base class for all library items
abstract class LibraryItem {
    protected id: string;
    protected title: string;
    protected isBorrowed: boolean = false;
    protected borrowDate?: Date;
    protected borrower?: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }

    // Abstract method - must be implemented by subclasses
    abstract getDescription(): string;

    // Concrete method
    public getInfo(): string {
        return `ID: ${this.id} | Title: ${this.title} | Available: ${!this.isBorrowed}`;
    }
}

// Book class implementing Borrowable interface
class Book extends LibraryItem implements Borrowable {
    private author: string;
    private pages: number;
    private genre: string;

    constructor(id: string, title: string, author: string, pages: number, genre: string) {
        super(id, title);
        this.author = author;
        this.pages = pages;
        this.genre = genre;
    }

    public getDescription(): string {
        return `Book: ${this.title} by ${this.author} (${this.pages} pages, ${this.genre})`;
    }

    public borrow(): void {
        if (this.isBorrowed) {
            throw new Error(`Book "${this.title}" is already borrowed`);
        }
        this.isBorrowed = true;
        this.borrowDate = new Date();
        console.log(`📖 Book "${this.title}" has been borrowed`);
    }

    public return(): void {
        if (!this.isBorrowed) {
            throw new Error(`Book "${this.title}" is not currently borrowed`);
        }
        this.isBorrowed = false;
        this.borrowDate = undefined;
        this.borrower = undefined;
        console.log(`📖 Book "${this.title}" has been returned`);
    }

    public isAvailable(): boolean {
        return !this.isBorrowed;
    }

    public getAuthor(): string {
        return this.author;
    }

    public getGenre(): string {
        return this.genre;
    }
}

// Magazine class implementing Borrowable interface
class Magazine extends LibraryItem implements Borrowable {
    private issueNumber: number;
    private publisher: string;

    constructor(id: string, title: string, issueNumber: number, publisher: string) {
        super(id, title);
        this.issueNumber = issueNumber;
        this.publisher = publisher;
    }

    public getDescription(): string {
        return `Magazine: ${this.title} - Issue #${this.issueNumber} (${this.publisher})`;
    }

    public borrow(): void {
        if (this.isBorrowed) {
            throw new Error(`Magazine "${this.title}" is already borrowed`);
        }
        this.isBorrowed = true;
        this.borrowDate = new Date();
        console.log(`📰 Magazine "${this.title}" has been borrowed`);
    }

    public return(): void {
        if (!this.isBorrowed) {
            throw new Error(`Magazine "${this.title}" is not currently borrowed`);
        }
        this.isBorrowed = false;
        this.borrowDate = undefined;
        this.borrower = undefined;
        console.log(`📰 Magazine "${this.title}" has been returned`);
    }

    public isAvailable(): boolean {
        return !this.isBorrowed;
    }
}

// Member class
class Member {
    private id: string;
    private name: string;
    private email: string;
    private borrowedItems: Borrowable[] = [];

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    public borrowItem(item: Borrowable): void {
        if (!item.isAvailable()) {
            throw new Error("Item is not available for borrowing");
        }
        if (this.borrowedItems.length >= 5) {
            throw new Error("Maximum borrowing limit reached (5 items)");
        }
        
        item.borrow();
        this.borrowedItems.push(item);
        console.log(`${this.name} borrowed an item`);
    }

    public returnItem(item: Borrowable): void {
        const itemIndex = this.borrowedItems.indexOf(item);
        if (itemIndex === -1) {
            throw new Error("Item not found in member's borrowed items");
        }
        
        item.return();
        this.borrowedItems.splice(itemIndex, 1);
        console.log(`${this.name} returned an item`);
    }

    public getBorrowedItems(): Borrowable[] {
        return [...this.borrowedItems]; // Return copy to prevent external modification
    }

    public getInfo(): string {
        return `Member: ${this.name} (${this.email}) - Borrowed: ${this.borrowedItems.length} items`;
    }
}

// Library class - manages the entire system
class Library {
    private items: LibraryItem[] = [];
    private members: Member[] = [];
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public addItem(item: LibraryItem): void {
        this.items.push(item);
        console.log(`✅ Added item: ${item.getDescription()}`);
    }

    public addMember(member: Member): void {
        this.members.push(member);
        console.log(`✅ Added member: ${member.getInfo()}`);
    }

    public searchByTitle(title: string): LibraryItem[] {
        return this.items.filter(item => 
            item.getInfo().toLowerCase().includes(title.toLowerCase())
        );
    }

    public getAvailableItems(): LibraryItem[] {
        return this.items.filter(item => 
            item instanceof Book && (item as Book).isAvailable() ||
            item instanceof Magazine && (item as Magazine).isAvailable()
        );
    }

    public getLibraryStats(): string {
        const totalItems = this.items.length;
        const availableItems = this.getAvailableItems().length;
        const totalMembers = this.members.length;
        
        return `
📊 ${this.name} Library Statistics:
- Total Items: ${totalItems}
- Available Items: ${availableItems}
- Borrowed Items: ${totalItems - availableItems}
- Total Members: ${totalMembers}
        `;
    }
}

// 🚀 Example Usage
console.log("=== LIBRARY MANAGEMENT SYSTEM ===\n");

const library = new Library("Central Public Library");

// Create books
const book1 = new Book("B001", "TypeScript Handbook", "Microsoft", 450, "Programming");
const book2 = new Book("B002", "Clean Code", "Robert Martin", 320, "Software Engineering");
const book3 = new Book("B003", "Design Patterns", "Gang of Four", 600, "Programming");

// Create magazines
const magazine1 = new Magazine("M001", "Tech Weekly", 42, "Tech Publications");
const magazine2 = new Magazine("M002", "Science Today", 15, "Science Press");

// Add items to library
library.addItem(book1);
library.addItem(book2);
library.addItem(book3);
library.addItem(magazine1);
library.addItem(magazine2);

// Create members
const member1 = new Member("M001", "Alice Johnson", "alice@email.com");
const member2 = new Member("M002", "Bob Smith", "bob@email.com");

// Add members to library
library.addMember(member1);
library.addMember(member2);

// Demonstrate borrowing
console.log("\n=== BORROWING ACTIVITIES ===");
member1.borrowItem(book1);
member1.borrowItem(magazine1);
member2.borrowItem(book2);

// Show library statistics
console.log(library.getLibraryStats());

// Search functionality
console.log("\n=== SEARCH RESULTS ===");
const searchResults = library.searchByTitle("TypeScript");
searchResults.forEach(item => console.log(item.getInfo()));

// Show member's borrowed items
console.log("\n=== MEMBER BORROWED ITEMS ===");
console.log(member1.getInfo());
console.log(member2.getInfo());

// Demonstrate returning items
console.log("\n=== RETURNING ITEMS ===");
member1.returnItem(book1);
console.log(member1.getInfo());
