class BankAccount {
    constructor(account, owner) {
        this.account = account;
        this.owner = owner;
        this.transactions = [];
    }

    balance() {
        return this.transactions.reduce((s, v) => s + v.amt, 0);
    }

    deposit(amt) {
        if (amt > 0) this.transactions.push(new Transaction(amt, 'Deposit'));
    }

    charge(amt, payee) {
        if (amt > 0 && amt <= this.balance()) this.transactions.push(new Transaction(-amt, payee));
    }
}

class Transaction {
    constructor(amt, payee) {
        this.amt = amt;
        this.payee = payee;
        this.date = new Date();
    }
}

class SavingsAccount extends BankAccount {
    constructor(account, owner, interestRate) {
        super(account, owner);
        this.interestRate = interestRate;
    }

    accrueInterest() {
        this.transactions.push(new Transaction(this.balance() * this.interestRate, 'Interest'));
    }
}

const acc = new SavingsAccount(12345, 'Bob', 0.02);
acc.deposit(100);
acc.deposit(200);
acc.deposit(0); // skipped
acc.deposit(-100); // skipped
acc.charge(100, 'H-E-B');
acc.charge(50, 'Target');
acc.charge(0, 'Walmart'); // skipped
acc.charge(-100, 'CVS'); // skipped
acc.accrueInterest();
acc.accrueInterest();

console.table(acc.transactions);
console.log(`Balance: ${acc.balance()}`);
