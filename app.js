const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");

const balance = document.getElementById("balance");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");

const themeButton = document.getElementById("toggleTheme");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

function saveData(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function updateUI(){

    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction,index)=>{

        if(transaction.type==="income"){
            income += transaction.amount;
        }else{
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.classList.add(
            "transaction",
            transaction.type
        );

        li.innerHTML = `
            <div>
                <strong>${transaction.description}</strong>
                <br>
                <small>${transaction.category}</small>
            </div>

            <div>
                <span class="${
                    transaction.type==="income"
                    ? "amount-income"
                    : "amount-expense"
                }">

                ${
                    transaction.type==="income"
                    ? "+"
                    : "-"
                }

                $${transaction.amount}

                </span>

                <button
                class="delete-btn"
                onclick="deleteTransaction(${index})">

                ✕
                </button>
            </div>
        `;

        transactionList.appendChild(li);

    });

    incomeTotal.textContent =
        "$" + income.toLocaleString();

    expenseTotal.textContent =
        "$" + expense.toLocaleString();

    balance.textContent =
        "$" + (income-expense).toLocaleString();

    saveData();
}

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const description =
        document.getElementById("description").value;

    const amount =
        Number(
            document.getElementById("amount").value
        );

    const type =
        document.getElementById("type").value;

    let category =
document.getElementById("category").value;

if(category === "nueva"){
    const nuevaCategoria = prompt(
        "Nombre de la nueva categoría:"
    );

    if(
        nuevaCategoria &&
        nuevaCategoria.trim() !== ""
    ){
        category = nuevaCategoria.trim();

        const select =
        document.getElementById("category");

        const option =
        document.createElement("option");

        option.textContent = category;
        option.value = category;

        select.insertBefore(
            option,
            select.lastElementChild
        );

        select.value = category;
    }else{
        return;
    }
}

    transactions.push({
        description,
        amount,
        type,
        category
    });

    saveData();
    updateUI();
    form.reset();

});

function deleteTransaction(index){

    transactions.splice(index,1);

    saveData();
    updateUI();

}

themeButton.addEventListener("click",()=>{

    document.body.classList.toggle("light");

});

updateUI();
