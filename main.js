#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 10000;
let myPin = 1234;
console.log(chalk.blue("\n \tWelcome to Saman Khan Bank Atm Account.....\n"));
//PIN
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: chalk.yellow("\n Enter your pin code: "),
        type: "number",
    },
]);
//pinAnswer
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("\nCorrect pin code, Login Succesfully!\n"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            message: chalk.yellow("\nPlease select any one option ?"),
            type: "list",
            choices: ["Withdraw", "Check Balance"],
        },
    ]);
    // WITHDRAW:
    if (operationAns.operation === "Withdraw") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawmethod",
                type: "list",
                message: chalk.yellow("\nSelect a withdrawl method ?"),
                choices: ["Fast Cash", "Enter Amount"]
            }
        ]);
        if (withdrawAns.withdrawmethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastcash",
                    message: chalk.yellow("\nSelect your amount?"),
                    type: "list",
                    choices: [1000, 2000, 5000, 10000]
                },
            ]);
            if (fastCashAns.fastcash > myBalance) {
                console.log(chalk.red("Insufficient Balance"));
            }
            else {
                myBalance -= fastCashAns.fastcash;
                console.log(chalk.green("\nWithdraw Succesfully !\n")),
                    console.log(chalk.greenBright("\nYour remaining balance is:\n" + myBalance));
            }
        }
        else if (withdrawAns.withdrawmethod === "Enter Amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    message: chalk.yellow("\nEnter your amount?"),
                    type: "number",
                },
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("\nInsufficient Balance\n"));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(chalk.gray("Your remaining balance is:" + myBalance));
                console.log(chalk.green("\nWithdraw Succesfully !\n"));
            }
        }
    }
    // CHECK BALANCE :
    else if (operationAns.operation === "Check Balance")
        console.log(chalk.blue("Your Account Balance is :" + myBalance));
}
else {
    console.log(chalk.red("\nALERT !!! ,Incorrect pin number\n"));
}
