class Account {
    private balance: number;
    public readonly accountNumber: string;
    public status: 'active' | 'frozen' | 'closed';

    constructor(accountNumber: string, initialBalance = 0){
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.status = 'active'
    }

    public deposit(amount: number){
        if(amount <= 0) throw new Error('Invalid amount');
        if (this.status !== 'active') throw new Error('Account not active');
        this.balance += amount;
    }

    public withdraw(amount: number){
        if(this.balance <= 0) throw new Error('Invalid amount');
        if(this.status !== 'active') throw new Error('Accout not active');
        if(amount > this.balance) throw new Error('Insufficient funds');
        this.balance -= amount;
    }    

    public getBalance(): number{
        return this.balance
    } 
}

class Bank {
    private accounts: Account[] = [];

    public createAccount(accountNumber: string, initialBalance: number = 0): Account {
        const account = new Account(accountNumber, initialBalance);
        this.accounts.push(account);
        console.log(`✅ Account ${accountNumber} created with ₱$${initialBalance}`)
        return account
    }

    public getAccount(accountNumber: string): Account | undefined {
        return this.accounts.find(acc => acc.accountNumber === accountNumber);
    }
}

const bank = new Bank();
const acc1 = bank.createAccount('001', 500);
acc1.deposit(200);
acc1.withdraw(100);

console.log("Final balance:", acc1.getBalance());

