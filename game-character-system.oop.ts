// 🎮 GAME CHARACTER SYSTEM - Static Methods & Advanced OOP Exercise
// Concepts: Static Methods, Getters/Setters, Singleton Pattern, Factory Pattern, Observer Pattern

// Game Statistics Manager (Singleton)
class GameStats {
    private static instance: GameStats;
    private totalCharactersCreated: number = 0;
    private totalBattlesFought: number = 0;
    private totalExperienceGained: number = 0;

    private constructor() {}

    public static getInstance(): GameStats {
        if (!GameStats.instance) {
            GameStats.instance = new GameStats();
        }
        return GameStats.instance;
    }

    public incrementCharactersCreated(): void {
        this.totalCharactersCreated++;
    }

    public incrementBattlesFought(): void {
        this.totalBattlesFought++;
    }

    public addExperienceGained(amount: number): void {
        this.totalExperienceGained += amount;
    }

    public getStats(): string {
        return `
📊 GAME STATISTICS:
- Total Characters Created: ${this.totalCharactersCreated}
- Total Battles Fought: ${this.totalBattlesFought}
- Total Experience Gained: ${this.totalExperienceGained}
        `;
    }
}

// Equipment interface
interface Equipment {
    name: string;
    attackBonus: number;
    defenseBonus: number;
    durability: number;
    getInfo(): string;
}

// Weapon class
class Weapon implements Equipment {
    public name: string;
    public attackBonus: number;
    public defenseBonus: number;
    public durability: number;

    constructor(name: string, attackBonus: number, defenseBonus: number, durability: number) {
        this.name = name;
        this.attackBonus = attackBonus;
        this.defenseBonus = defenseBonus;
        this.durability = durability;
    }

    public getInfo(): string {
        return `${this.name} (ATK: +${this.attackBonus}, DEF: +${this.defenseBonus}, DUR: ${this.durability})`;
    }

    public use(): void {
        this.durability = Math.max(0, this.durability - 1);
    }

    public isBroken(): boolean {
        return this.durability <= 0;
    }
}

// Armor class
class Armor implements Equipment {
    public name: string;
    public attackBonus: number;
    public defenseBonus: number;
    public durability: number;

    constructor(name: string, attackBonus: number, defenseBonus: number, durability: number) {
        this.name = name;
        this.attackBonus = attackBonus;
        this.defenseBonus = defenseBonus;
        this.durability = durability;
    }

    public getInfo(): string {
        return `${this.name} (ATK: +${this.attackBonus}, DEF: +${this.defenseBonus}, DUR: ${this.durability})`;
    }

    public use(): void {
        this.durability = Math.max(0, this.durability - 1);
    }

    public isBroken(): boolean {
        return this.durability <= 0;
    }
}

// Character base class
abstract class Character {
    protected id: string;
    protected name: string;
    protected level: number;
    protected health: number;
    protected maxHealth: number;
    protected attack: number;
    protected defense: number;
    protected experience: number;
    protected experienceToNextLevel: number;
    protected weapon: Weapon | null = null;
    protected armor: Armor | null = null;
    protected isAlive: boolean = true;

    constructor(id: string, name: string, level: number = 1) {
        this.id = id;
        this.name = name;
        this.level = level;
        this.maxHealth = 100 + (level - 1) * 20;
        this.health = this.maxHealth;
        this.attack = 10 + (level - 1) * 5;
        this.defense = 5 + (level - 1) * 3;
        this.experience = 0;
        this.experienceToNextLevel = level * 100;
        
        // Register character creation
        GameStats.getInstance().incrementCharactersCreated();
    }

    // Getters
    public getId(): string { return this.id; }
    public getName(): string { return this.name; }
    public getLevel(): number { return this.level; }
    public getHealth(): number { return this.health; }
    public getMaxHealth(): number { return this.maxHealth; }
    public getAttack(): number { return this.attack; }
    public getDefense(): number { return this.defense; }
    public getExperience(): number { return this.experience; }
    public getIsAlive(): boolean { return this.isAlive; }

    // Setters
    public setHealth(health: number): void {
        this.health = Math.max(0, Math.min(health, this.maxHealth));
        if (this.health <= 0) {
            this.isAlive = false;
        }
    }

    public setWeapon(weapon: Weapon): void {
        this.weapon = weapon;
        console.log(`⚔️ ${this.name} equipped ${weapon.name}`);
    }

    public setArmor(armor: Armor): void {
        this.armor = armor;
        console.log(`🛡️ ${this.name} equipped ${armor.name}`);
    }

    // Abstract methods
    public abstract getCharacterType(): string;
    public abstract specialAttack(target: Character): void;

    // Concrete methods
    public getTotalAttack(): number {
        const weaponBonus = this.weapon ? this.weapon.attackBonus : 0;
        return this.attack + weaponBonus;
    }

    public getTotalDefense(): number {
        const armorBonus = this.armor ? this.armor.defenseBonus : 0;
        return this.defense + armorBonus;
    }

    public attackTarget(target: Character): void {
        if (!this.isAlive || !target.isAlive) {
            console.log("❌ Cannot attack - character is dead");
            return;
        }

        const damage = Math.max(1, this.getTotalAttack() - target.getTotalDefense());
        target.takeDamage(damage);
        
        console.log(`⚔️ ${this.name} attacks ${target.name} for ${damage} damage!`);
        
        // Use equipment
        if (this.weapon) {
            this.weapon.use();
            if (this.weapon.isBroken()) {
                console.log(`💔 ${this.weapon.name} broke!`);
                this.weapon = null;
            }
        }

        // Gain experience
        this.gainExperience(10);
    }

    public takeDamage(damage: number): void {
        this.setHealth(this.health - damage);
        if (!this.isAlive) {
            console.log(`💀 ${this.name} has been defeated!`);
        }
    }

    public gainExperience(amount: number): void {
        this.experience += amount;
        GameStats.getInstance().addExperienceGained(amount);
        
        if (this.experience >= this.experienceToNextLevel) {
            this.levelUp();
        }
    }

    private levelUp(): void {
        this.level++;
        const oldMaxHealth = this.maxHealth;
        this.maxHealth = 100 + (this.level - 1) * 20;
        this.health += this.maxHealth - oldMaxHealth; // Heal on level up
        this.attack += 5;
        this.defense += 3;
        this.experience -= this.experienceToNextLevel;
        this.experienceToNextLevel = this.level * 100;
        
        console.log(`🎉 ${this.name} leveled up to level ${this.level}!`);
    }

    public heal(amount: number): void {
        if (!this.isAlive) {
            console.log("❌ Cannot heal dead character");
            return;
        }
        this.setHealth(this.health + amount);
        console.log(`💚 ${this.name} healed for ${amount} HP`);
    }

    public getInfo(): string {
        const weaponInfo = this.weapon ? `\n  Weapon: ${this.weapon.getInfo()}` : '';
        const armorInfo = this.armor ? `\n  Armor: ${this.armor.getInfo()}` : '';
        
        return `
${this.getCharacterType()} - ${this.name} (Level ${this.level})
  HP: ${this.health}/${this.maxHealth}
  ATK: ${this.getTotalAttack()} (Base: ${this.attack})
  DEF: ${this.getTotalDefense()} (Base: ${this.defense})
  EXP: ${this.experience}/${this.experienceToNextLevel}${weaponInfo}${armorInfo}
  Status: ${this.isAlive ? 'Alive' : 'Dead'}
        `;
    }
}

// Warrior class
class Warrior extends Character {
    constructor(id: string, name: string, level: number = 1) {
        super(id, name, level);
        this.attack += 5; // Warriors have higher base attack
    }

    public getCharacterType(): string {
        return "⚔️ Warrior";
    }

    public specialAttack(target: Character): void {
        if (!this.isAlive || !target.isAlive) {
            console.log("❌ Cannot use special attack - character is dead");
            return;
        }

        const damage = Math.max(1, this.getTotalAttack() * 2 - target.getTotalDefense());
        target.takeDamage(damage);
        
        console.log(`🔥 ${this.name} uses POWER STRIKE on ${target.name} for ${damage} damage!`);
        this.gainExperience(20);
    }
}

// Mage class
class Mage extends Character {
    private mana: number;
    private maxMana: number;

    constructor(id: string, name: string, level: number = 1) {
        super(id, name, level);
        this.maxMana = 50 + (level - 1) * 10;
        this.mana = this.maxMana;
        this.defense -= 2; // Mages have lower defense
    }

    public getMana(): number { return this.mana; }
    public getMaxMana(): number { return this.maxMana; }

    public getCharacterType(): string {
        return "🧙 Mage";
    }

    public specialAttack(target: Character): void {
        if (!this.isAlive || !target.isAlive) {
            console.log("❌ Cannot use special attack - character is dead");
            return;
        }

        if (this.mana < 20) {
            console.log("❌ Not enough mana for special attack");
            return;
        }

        this.mana -= 20;
        const damage = Math.max(1, this.getTotalAttack() * 3 - target.getTotalDefense());
        target.takeDamage(damage);
        
        console.log(`⚡ ${this.name} casts FIREBALL on ${target.name} for ${damage} damage!`);
        this.gainExperience(25);
    }

    public getInfo(): string {
        return super.getInfo() + `\n  Mana: ${this.mana}/${this.maxMana}`;
    }
}

// Archer class
class Archer extends Character {
    private accuracy: number;

    constructor(id: string, name: string, level: number = 1) {
        super(id, name, level);
        this.accuracy = 80 + (level - 1) * 5; // Accuracy percentage
    }

    public getAccuracy(): number { return this.accuracy; }

    public getCharacterType(): string {
        return "🏹 Archer";
    }

    public specialAttack(target: Character): void {
        if (!this.isAlive || !target.isAlive) {
            console.log("❌ Cannot use special attack - character is dead");
            return;
        }

        const hitChance = Math.random() * 100;
        if (hitChance > this.accuracy) {
            console.log(`❌ ${this.name}'s PRECISION SHOT missed!`);
            return;
        }

        const damage = Math.max(1, this.getTotalAttack() * 2.5 - target.getTotalDefense());
        target.takeDamage(damage);
        
        console.log(`🎯 ${this.name} uses PRECISION SHOT on ${target.name} for ${damage} damage!`);
        this.gainExperience(15);
    }

    public getInfo(): string {
        return super.getInfo() + `\n  Accuracy: ${this.accuracy}%`;
    }
}

// Character Factory
class CharacterFactory {
    public static createCharacter(type: 'warrior' | 'mage' | 'archer', id: string, name: string, level: number = 1): Character {
        switch (type) {
            case 'warrior':
                return new Warrior(id, name, level);
            case 'mage':
                return new Mage(id, name, level);
            case 'archer':
                return new Archer(id, name, level);
            default:
                throw new Error('Invalid character type');
        }
    }
}

// Battle Manager
class BattleManager {
    public static fight(character1: Character, character2: Character): Character | null {
        console.log(`\n⚔️ BATTLE: ${character1.getName()} vs ${character2.getName()}`);
        console.log("=" * 50);
        
        let round = 1;
        const maxRounds = 20;
        
        while (character1.getIsAlive() && character2.getIsAlive() && round <= maxRounds) {
            console.log(`\n--- Round ${round} ---`);
            
            // Character 1 attacks
            character1.attackTarget(character2);
            if (!character2.getIsAlive()) break;
            
            // Character 2 attacks
            character2.attackTarget(character1);
            if (!character1.getIsAlive()) break;
            
            round++;
        }
        
        GameStats.getInstance().incrementBattlesFought();
        
        if (character1.getIsAlive()) {
            console.log(`\n🏆 ${character1.getName()} wins!`);
            return character1;
        } else if (character2.getIsAlive()) {
            console.log(`\n🏆 ${character2.getName()} wins!`);
            return character2;
        } else {
            console.log("\n💀 It's a draw - both characters died!");
            return null;
        }
    }
}

// 🚀 Example Usage
console.log("=== GAME CHARACTER SYSTEM ===\n");

// Create characters using factory
const warrior = CharacterFactory.createCharacter('warrior', 'C001', 'Thorin', 3);
const mage = CharacterFactory.createCharacter('mage', 'C002', 'Gandalf', 2);
const archer = CharacterFactory.createCharacter('archer', 'C003', 'Legolas', 4);

// Create equipment
const sword = new Weapon('Excalibur', 15, 2, 100);
const staff = new Weapon('Staff of Power', 8, 5, 80);
const bow = new Weapon('Elven Bow', 12, 1, 90);
const plateArmor = new Armor('Plate Mail', 0, 20, 120);
const robe = new Armor('Mage Robe', 2, 8, 60);
const leatherArmor = new Armor('Leather Armor', 1, 12, 100);

// Equip characters
warrior.setWeapon(sword);
warrior.setArmor(plateArmor);
mage.setWeapon(staff);
mage.setArmor(robe);
archer.setWeapon(bow);
archer.setArmor(leatherArmor);

// Show character info
console.log(warrior.getInfo());
console.log(mage.getInfo());
console.log(archer.getInfo());

// Battle 1: Warrior vs Mage
const winner1 = BattleManager.fight(warrior, mage);

// Heal characters for next battle
warrior.heal(50);
mage.heal(50);

// Battle 2: Winner vs Archer
if (winner1) {
    const finalWinner = BattleManager.fight(winner1, archer);
    console.log(`\n🎊 FINAL CHAMPION: ${finalWinner ? finalWinner.getName() : 'No one'}`);
}

// Show game statistics
console.log(GameStats.getInstance().getStats());
