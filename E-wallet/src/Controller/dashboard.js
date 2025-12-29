import { FindTransaction } from "../Model/data.js";
const welcome_message=document.getElementById("welcome_message");
const montant=document.getElementById("balance");
const date=document.getElementById("date");
const transac=document.getElementById("transactions");
const filterS=document.getElementById("filterX");

const user = JSON.parse(sessionStorage.getItem("user"));
welcome_message.textContent ="Bonjour " + user.nom;
montant.textContent=user.balance+"  MAD";
// user.transaction.forEach(t => {
//     const tr = document.createElement("tr");
//     tr.innerHTML = `
//         <td>${t.date}</td>
//         <td>${t.description}</td>
//         <td>${t.type}</td>
//         <td>${t.montant}</td>
//     `;

//     transactions.appendChild(tr);
// });
const allTransactions=user.transaction;

function returnF(tab) {
    if (!tab) return; 
    transac.innerHTML = ""; 
    
    tab.forEach(t => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${t.date}</td>
            <td>${t.description}</td>
            <td>${t.type}</td>
            <td>${t.montant}</td>
        `;
        transac.appendChild(tr);
    });
}
returnF(allTransactions);

filterS.addEventListener("change",()=>{

    if(filterS.value==="E"){

        const crediter=FindTransaction(user,"+");
        returnF(crediter);

    }
      if(filterS.value==="S"){

      const debiter=FindTransaction(user,"-");
      returnF(debiter);

      }
      if(filterS.value==="T"){
        returnF(allTransactions);
        
      }
    });


//     function updateClock() {
//     const now = new Date();
//     // Formats time as HH:MM:SS
//     date.textContent = now.toLocaleTimeString(); 
// }

// // Start the timer
// setInterval(updateClock, 1000);
// updateClock();

function updateDate() {
    const now = new Date();
    
    // Options to make it look clean: e.g., "29 décembre 2025"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    // Use 'fr-FR' for French or 'en-GB' for English
    date.textContent = now.toLocaleDateString('fr-FR', options); 
}updateDate();