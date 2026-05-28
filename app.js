const form = document.getElementById("transactionForm");
const transactionList = document.getElementById("transactionList");
const categorySelect =
document.getElementById("category");

const newCategoryInput =
document.getElementById("newCategory");

const balance = document.getElementById("balance");
const incomeTotal = document.getElementById("incomeTotal");
const expenseTotal = document.getElementById("expenseTotal");

const themeButton = document.getElementById("toggleTheme");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];
let customCategories =
JSON.parse(
localStorage.getItem("customCategories")
) || [];
function loadCustomCategories(){

    customCategories.forEach(category=>{

        const option =
        document.createElement("option");

        option.textContent = category;
        option.value = category;

        categorySelect.insertBefore(
            option,
            categorySelect.lastElementChild
        );

    });

}
categorySelect.addEventListener(
"change",
()=>{

    if(categorySelect.value === "nueva"){

        newCategoryInput.style.display =
        "block";

    }else{

        newCategoryInput.style.display =
        "none";

    }

});
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

    let category = categorySelect.value;

if(category === "nueva"){

    const nuevaCategoria =
    newCategoryInput.value.trim();

    if(!nuevaCategoria){

        alert(
        "Escribe el nombre de la categoría"
        );

        return;
    }

    category = nuevaCategoria;

    if(
    !customCategories.includes(category)
    ){

        customCategories.push(category);

        localStorage.setItem(
        "customCategories",
        JSON.stringify(customCategories)
        );

        const option =
        document.createElement("option");

        option.textContent = category;
        option.value = category;

        categorySelect.insertBefore(
        option,
        categorySelect.lastElementChild
        );

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
    newCategoryInput.style.display = "none";

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
loadCustomCategories();
