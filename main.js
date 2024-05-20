import inquirer from "inquirer";
// bank account class
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit money
    withdraw(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(`SUCCESSFULLY WITHDRAW OF:$${amount}. REMAINING BALANCE IS:$${this.balance}`);
        }
        else {
            console.log("INSUFFICENT BALANCE");
        }
    }
    // deposit of money 
    deposit(amount) {
        if (amount > 100) {
            amount -= 1; //$1 fee charge of deposit when deposit is more than 100 
            console.log("$1 DEDUCTED FOR MORE THAN $100 DEPOSIT");
        }
        this.balance += amount;
        console.log(`SUCCESSFULLY DEPOSIT OF:$${amount}\n REMAINIG BALANCE:$${this.balance}`);
    }
    // check balance
    checkBalance() {
        console.log(` YOUR CURRENT BALANCE IS:$${this.balance}`);
    }
}
class customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// create customers
const accounts = [
    new BankAccount(1122, 750),
    new BankAccount(1133, 1000),
    new BankAccount(1144, 2500)
];
// creat customers
const customers = [
    new customer("Moiz", "Ali", "male", 18, 32677889900, accounts[0]),
    new customer("Hina", "Ali", "female", 18, 33677889900, accounts[1]),
    new customer("Syeda", "Zoha", "female", 18, 31677889900, accounts[2])
];
// function to interact with accounts
async function services() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountnumber",
            message: "ENTER YOUR ACCOUNT NUMBER",
            type: "number"
        });
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountnumber);
        if (customer) {
            console.log(`WELCOME,${customer.firstName}${customer.lastName}!.`);
            const ans = await inquirer.prompt({
                name: "operation",
                message: "WHAT WOULD YOU LIKE TO DO ?",
                type: "list",
                choices: ["WITHDRAWAL", "DEPOSIT", "CHECK BALANCE", "EXIT"]
            });
            switch (ans.operation) {
                case "WITHDRAWAL":
                    const Withdrawans = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "\nENTER WITHDRAW AMOUNT."
                    });
                    customer?.account.withdraw(Withdrawans.amount);
                    break;
                case "DEPOSIT":
                    const depositAns = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: "\nENTER DEPOSIT AMOUNT."
                    });
                    customer?.account.deposit(depositAns.amount);
                    break;
                case "CHECK BALANCE":
                    customer?.account.checkBalance();
                    break;
                case "EXIT":
                    console.log("EXITNIG BANK!!\n THANK YOU FOR USING OUR SERVICES");
                    return;
            }
        }
    } while (true);
}
services();
