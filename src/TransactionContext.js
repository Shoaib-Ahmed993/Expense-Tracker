import { createContext, useReducer } from "react";
import { TransactionReducer } from "./TransactionReducer";

const initialTransactions = [
    { amount: -550, desc: 'Food' },
    { amount: -50, desc: 'Water' },
    { amount: -100, desc: 'Electricity' },
    { amount: +2500, desc: 'Salary' },
]

export const TransactionContext = createContext(initialTransactions);

export const TransactionProvider = ({ children }) => {
    let [state, dispatch] = useReducer(TransactionReducer, initialTransactions);
    function addTransaction(transObj) {
        dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                amount: transObj.amount,
                desc: transObj.desc
            }
        })
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state,
            addTransaction // same as "addTransaction: addTransaction"
        }}>
            {children}
        </TransactionContext.Provider>
    )
}