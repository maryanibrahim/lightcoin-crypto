// Account class - This represents a bank account
class Account {
  
  constructor() {
    this.transactions = []; // This will hold all transactions for this account
  }

  // getter method to calculate the balance
  get balance() {
    let balance = 0; 
    for (let transaction of this.transactions) {
      balance += transaction.value; // For each transaction, we adjust the balance
    }
    return balance; // We return the calculated balance
  }
  
  addTransaction(transaction) {
    this.transactions.push(transaction); // We add new transaction to this account's transactions array
  }
}

// Transaction class - This is a base class for specific transaction types
class Transaction {
  
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }

  // When we commit a transaction, we add it to the account
  commit() {
    if (!this.isAllowed()) return false; // Check if the transaction is allowed
    this.time = new Date(); // Record the time of the transaction
    this.account.addTransaction(this); // Add the transaction to the account
    return true; // Indicate the transaction was successful
  }
}

// Withdrawal class - This class represents a withdrawal transaction
class Withdrawal extends Transaction {
  
  get value() {
    return -this.amount; // Withdrawals decrease the account balance
  }

  // Check if the withdrawal is allowed
  isAllowed() {
    return (this.account.balance - this.amount >= 0); // Make sure the account has enough balance to cover the withdrawal
  }
}

// Deposit class - This class represents a deposit transaction
class Deposit extends Transaction {
  
  get value() {
    return this.amount; // Deposits increase the account balance
  }

  // Deposits are always allowed
  isAllowed() {
    return true;
  }
}

// Now, we can test our code

const myAccount = new Account(); // Create a new account

// Try to withdraw money
const t1 = new Withdrawal(100.00, myAccount);
console.log(t1.commit()); // This should fail because the account has no money yet

// Now, deposit some money and try again
const t2 = new Deposit(200.00, myAccount);
console.log(t2.commit()); // This should succeed

// Now, try the withdrawal again
const t3 = new Withdrawal(100.00, myAccount);
console.log(t3.commit()); // This should now succeed

// Print the final account balance
console.log('Final account balance is: ', myAccount.balance);
