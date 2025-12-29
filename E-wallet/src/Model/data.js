




let users = [
   {
    balance: 30000,
    email: "ilyass@gmail.com" , 
    password: "2004",
    nom: "Ilyass",
    transaction:[
        {date: "2025-10-23",description: "Salaire",type: "+",montant: 19000},
        { date: "2025-11-05",description: "tv",type: "-",montant: 5000}
    ]

   },
   {
    balance:20000,
    email : "ahmed@gmail.com" , 
    password: "1234",
    nom: "Ahmed",
    transaction:[
        {date: "2024-12-02",description: "Salaire",type: "-",montant: 12000},
        { date: "2025-02-09",description: "mouse",type: "-",montant: 100}
    ]

   },

]
function FindUser(email,password){
     let user = null;
     user = users.find((u)=>u.email === email && u.password === password);
     return user ;
 }

 function FindTransaction(user,sign){
    let trans=null;
    trans=user.transaction.filter((u)=>u.type==sign);
    // console.log(trans);
    return trans;
 }

export{FindTransaction};
export{FindUser};