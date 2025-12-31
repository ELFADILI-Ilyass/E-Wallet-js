import { FindTransaction, FindUser } from "../Model/data.js";

const welcome_message=document.getElementById("welcome_message");
const montant=document.getElementById("balance");
const date=document.getElementById("date");
const transac=document.getElementById("transactions");
const filterS=document.getElementById("filterX");
const transfer=document.getElementById("transferer");
const payerbtn=document.getElementById("payer");


const user = JSON.parse(sessionStorage.getItem("user"));
welcome_message.textContent ="Bonjour " + user.nom;
montant.textContent=user.balance+"  MAD";

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
 
    
    
    //payer



payerbtn.addEventListener("click",()=>{
    const isHidden = paymentContainer.style.display === "none";
    paymentContainer.style.display = isHidden ? "block" : "none";

})

const confirmBtn =document.getElementById("Confirm");
const status = document.getElementById("paymentStatus");

const checkSolde=(prix)=>{
  return new Promise((resolve,reject)=>{
    if(user.balance>=prix && prix>0){
      resolve('Success');
    }
    else if (prix <= 0) {
            reject("Montant invalide");
        } else {
            reject("Solde insuffisant");
        }
  })
}


const checkUser=(inputPassword)=>{
   return new Promise ((resolve,reject)=>{
    setTimeout(()=>{

      if(!user){
          reject(" Utulisateur introuvable");
      }
      else if(inputPassword!==user.password)
      {
        reject("Mot de pass incorrect");
          
      }
      else{
        resolve("Bonjour "+user.nom);
      }
   },1000)
    })  
  
  }

  const updateData = (amount) => {
    user.balance -= amount;

    const newT = {
        date:"2025-12-31" ,
        description: "Paiement Service",
        type: "-",
        montant: amount
    };
    user.transaction.push(newT);
    sessionStorage.setItem("user", JSON.stringify(user));

    montant.textContent = user.balance + " MAD";
    
    returnF(user.transaction); 
};

confirmBtn.addEventListener("click",()=>{
  const montant= parseFloat(document.getElementById("prixInput").value);
  const pass= document.getElementById("passInput").value;

  status.textContent="Verification...."
  status.style.color="orange";

  checkUser(pass)
    .then((message)=>{
      status.textContent=message+"  Verification du solde...";
      return checkSolde(montant);
    })
    .then(() => {

            updateData(montant);

            status.textContent = "Paiement réussi !";
            status.style.color = "green";
        })
        .catch((error) => {
            status.textContent = error;
            status.style.color = "red";
        });

});







//     function updateClock() {
//     const now = new Date();
//     // Formats time as HH:MM:SS
//     date.textContent = now.toLocaleTimeString(); 
// }

// // Start the timer
// setInterval(updateClock, 1000);
// updateClock();
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
function updateDate() {
    const now = new Date();
    
    // Options to make it look clean: e.g., "29 décembre 2025"
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    
    // Use 'fr-FR' for French or 'en-GB' for English
    date.textContent = now.toLocaleDateString('fr-FR', options); 
}updateDate();
