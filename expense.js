const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const transactionList = document.getElementById('transactionList');
const balanceEl = document.getElementById('balance');
const incomeEl = document.getElementById('income');
const expenseEl = document.getElementById('expense');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(type) {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (description && amount > 0) {
        transactions.push({ id: Date.now(), description, amount, type });
        saveTransactions();
        updateUI();
        descriptionInput.value = '';
        amountInput.value = '';
    }
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    updateUI();
}

function updateUI() {
    transactionList.innerHTML = '';
    
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        const li = document.createElement('li');
        li.className = `transaction-item ${transaction.type}`;
        li.innerHTML = `
            <div class="transaction-info">
                <div class="desc">${transaction.description}</div>
                <div class="type">${transaction.type}</div>
            </div>
            <span class="transaction-amount">${transaction.type === 'income' ? '+' : '-'}₹${transaction.amount}</span>
            <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
        `;
        transactionList.appendChild(li);
    });

    const balance = totalIncome - totalExpense;
    balanceEl.textContent = `₹${balance}`;
    incomeEl.textContent = `₹${totalIncome}`;
    expenseEl.textContent = `₹${totalExpense}`;
}

incomeBtn.addEventListener('click', () => addTransaction('income'));
expenseBtn.addEventListener('click', () => addTransaction('expense'));

updateUI();