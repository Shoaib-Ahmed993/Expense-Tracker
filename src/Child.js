import React, { useContext, useState } from 'react';
import { TransactionContext } from './TransactionContext';

export default function Child() {
    let { transactions, addTransaction } = useContext(TransactionContext);
    let [newDesc, setDesc] = useState('');
    let [newAmount, setAmount] = useState(0);


    const handleAddition = (event) => {
        event.preventDefault();
        if (Number(newAmount) === 0){
            alert('Please enter some value');
            return false;
        }
        addTransaction({
            amount: Number(newAmount),
            desc: newDesc
        })
        setDesc('');
        setAmount('')
    }

    const getIncome = () => {
        let income = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount > 0) {
                income += transactions[i].amount
            }
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0;
        for (var i = 0; i < transactions.length; i++) {
            if (transactions[i].amount < 0) {
                expense += transactions[i].amount
            }
        }
        return expense;
    }

    return (
        <div className="container">
            <h1>Expense Tracker</h1>

            <h3>Your Balance <br /> ${ getIncome() + getExpense()} </h3>

            <div className="income_expense">
                <h3>Income <br /> {getIncome()} </h3>
                <h3>Expense <br /> {getExpense()} </h3>
            </div>

            <h2>History</h2>
            <hr />
            <ul className="list">
                {transactions.map((transaction, index) => {
                    return (
                        <li key={index}>
                            <span>{transaction.desc}</span>
                            <span>${transaction.amount}</span>
                        </li>
                    )
                })}

            </ul>

            <h2>Add new ransaction</h2>
            <hr />
            <form className="trans_form" onSubmit={handleAddition}>
                <label>
                    Text <br />
                    <input type="text" value={newDesc} placeholder="Enter text..." required onChange={(event) => setDesc(event.target.value)} />
                </label>
                <br />
                <label>
                    Amount <br />
                    (negative - expense, positive - income)
                    <input type="number" value={newAmount} placeholder="Enter amount..." required onChange={(event) => setAmount(event.target.value)} />
                </label>
                <br />

                <input type="submit" value="Add Transaction" className="btn" />

            </form>
        </div>
    )
}
