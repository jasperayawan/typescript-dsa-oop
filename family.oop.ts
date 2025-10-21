class Person {
    public name: string;
    public age: number;
    public gender: 'male' | 'female'

    constructor(name: string, age: number, gender: 'male' | 'female'){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    introduce(): void {
        console.log(`Hi, I'm ${this.name} ${this.age} years old.`);
    }
}


class Parent extends Person {
    private occupation: string;
    private children: Child[] = [];

    constructor(name: string, age: number, gender: 'male' | 'female', occupation: string){
        super(name, age, gender);
        this.occupation = occupation
    }

    addChild(child: Child) {
        this.children.push(child);
        console.log(`${this.name} is now a part of parent ${child.name}.`);
    }

    listChildren(): void{
        if (this.children.length === 0){
            console.log(`${this.name} has no children yet.`);
            return
        }
        console.log(`${this.name}'s children:`);
        this.children.forEach((child) => console.log(`👶 ${this.name} (${child.age} years old)`));
    }

    work(): void{
        console.log(`${this.name} is working as a ${this.occupation}.`);
    }
}

class Child extends Person{
    private school: string;
    private hobby: string;

    constructor(name: string, age: number, gender: 'male' | 'female', school: string, hobby: string){
        super(name, age, gender);
        this.school = school;
        this.hobby = hobby
    }

    play(): void{
        console.log(`Hi, I'm ${this.name} I love playing ${this.hobby}`)
    }

    study(): void{
        console.log(`I love studying at ${this.school}`)
    }
}

class Family{
    private members: Person[] = [];
    
    addMember(member: Person): void{
        this.members.push(member)
    }

    showFamily(): void {
        console.log("\n Family Members:");
        this.members.forEach((member) => {
            console.log(`- ${member.name}, ${member.age} years old (${member.gender})`)
        })
    }
}


// --- 👨‍👩‍👧 Example usage ---
const father = new Parent("John", 40, "male", "Engineer");
const mother = new Parent("Maria", 38, "female", "Teacher");
const child1 = new Child("Alex", 10, "male", "Greenwood Elementary", "basketball");
const child2 = new Child("Ella", 7, "female", "Greenwood Elementary", "drawing");

const family = new Family();
family.addMember(father);
family.addMember(mother);
family.addMember(child1);
family.addMember(child2);

father.addChild(child1);
father.addChild(child2);

father.work();
mother.work();
child1.study();
child2.play();

family.showFamily();