//Recuperation donnees API
fetch("http://localhost:3001/api/products")
.then(response => response.json())
.then(response => {
    let panier=JSON.parse(localStorage.panier);
    let section=document.querySelector("#cart__items");
//Affichage de produits selectionnees
    function affichageProduits(objetapi){
        for(let i in panier){
            for(let j in objetapi){
                if(panier[i][0]===objetapi[j].name){
                    section=document.querySelector("#cart__items");
                    produit=document.createElement("article");
                    produit.className="cart__item";
                    produit.dataset.id=objetapi[j]._id;
                    section.appendChild(produit);
                      divImage=document.createElement("div");
                      divImage.className="cart__item__img";
                      produit.appendChild(divImage);
                        image=document.createElement("img");
                        image.src=objetapi[j].imageUrl;
                        image.alt=objetapi[j].altTxt;
                        divImage.appendChild(image);
                      divContenu=document.createElement("div");
                      divContenu.className="cart__item__content";
                      produit.appendChild(divContenu);
                        divTitre=document.createElement("div");
                        divTitre.className="cart__item__content__titlePrice";
                        divContenu.appendChild(divTitre);
                          nom=document.createElement("h2");
                          nom.textContent=objetapi[j].name +" "+ JSON.parse(localStorage.panier)[i][2];
                          divTitre.appendChild(nom);
                          prix=document.createElement("p");
                          prix.textContent=objetapi[j].price+" €";
                          divTitre.appendChild(prix);
                        divSettings=document.createElement("div");
                        divSettings.className="cart__item__content__settings";
                        divContenu.appendChild(divSettings);
                          divQuantite=document.createElement("div");
                          divQuantite.className="cart__item__content__settings__quantity";
                          divSettings.appendChild(divQuantite);
                            pQuantite=document.createElement("p");
                            pQuantite.textContent="Qté : ";
                            divQuantite.appendChild(pQuantite);
                            quantite=document.createElement("input");
                            quantite.dataset.id=i;
                            quantite.type="number";
                            quantite.className="itemQuantity";
                            quantite.name="itemQuantity";
                            quantite.min=1;
                            quantite.max=100;
                            quantite.value=JSON.parse(localStorage.panier)[i][1];
                            divQuantite.appendChild(quantite);
                          divDelete=document.createElement("div");
                          divDelete.className="cart__item__content__settings__delete";
                          divSettings.appendChild(divDelete);
                            pDelete=document.createElement("p");
                            pDelete.dataset.id=i;
                            pDelete.textContent="Supprimer";
                            pDelete.className="deleteItem";
                            divDelete.appendChild(pDelete);
                }
            }
        }
    };
    affichageProduits(response)
//Modification de la quantite des produits
    function modificationQuantite(){
        if(section.children.length>=2){
            for(i=0; i<=section.children.length-1; i++){
                let input=section.children[i].children[1].children[1].children[0].children[1];
                let valeur=i;
                input.addEventListener("input",()=>{
                    panier[valeur][1]=input.value;
                    localStorage.panier=JSON.stringify(panier);
                })
            }
        }else if(section.children.length===1){
            let input=section.children[0].children[1].children[1].children[0].children[1];
            input.addEventListener("input",()=>{
                panier[0][1]=input.value;
                localStorage.panier=JSON.stringify(panier);
            })
        }
    }
    modificationQuantite()
//Affichage du total de tous les produits
    function total(){
        let quantiteTotal=document.querySelector("#totalQuantity");
        let prixTotal=document.querySelector("#totalPrice");
        let totalQuantite=0;
        let totalPrix=0;
        for(i=0; i<=section.children.length-1; i++){
            let quantite=parseInt(section.children[i].children[1].children[1].children[0].children[1].value);
            totalQuantite=totalQuantite+quantite;
            totalPrix=totalPrix+(quantite*parseInt(section.children[i].children[1].children[0].children[1].textContent));
        };
        quantiteTotal.textContent=totalQuantite;
        prixTotal.textContent=totalPrix;
    }

    total()
//Mise a jour du total a chaque modification de la quantite
    function miseJourTotal(){
        for(i=0; i<=section.children.length-1; i++){
            let input=section.children[i].children[1].children[1].children[0].children[1];
            input.addEventListener("input",()=>{
                total();
            })
        }
    }

    miseJourTotal()

//Suppression du produit et mise a jour du total des produits
    function suppression(){
        for(i=0; i<=section.children.length-1; i++){
            let supprimer = section.children[i].children[1].children[1].children[1].children[0];
            let valeur=i;
            supprimer.addEventListener("click", ()=>{
                if(section.children.length>=2){
                    section.children[valeur].remove();
                    panier.splice(valeur, 1);
                    localStorage.panier=JSON.stringify(panier);
                    total()
                }else{
                    section.children[0].remove();
                    panier.splice(0, 1);
                    localStorage.panier=JSON.stringify(panier);
                    total()
                }
            })
        }
    }

    suppression()
//Mise a jour du local storage a chaque modification ou suppression
    function miseJourLocalStorage(){
        for(i=0; i<=panier.length-1; i++){
            for(j=0; j<=panier.length-1; j++){
                if(panier[i][0]===panier[j][0] & panier[i][2]===panier[j][2]){
                    if(i!==j){
                        panier[i][1]=parseInt(panier[i][1])+parseInt(panier[j][1]);
                        panier.splice(j, 1);
                        localStorage.panier=JSON.stringify(panier);
                    }
                }
            }
        }
    }

    miseJourLocalStorage()

})

let prenom=document.querySelector("#firstName")
let prenomErreur=document.querySelector("#firstNameErrorMsg")
let nomFamille=document.querySelector("#lastName")
let nomFamilleErreur=document.querySelector("#lastNameErrorMsg")
let addresse=document.querySelector("#address")
let ville=document.querySelector("#city")
let email=document.querySelector("#email")
let emailErreur=document.querySelector("#emailErrorMsg")
let commander=document.querySelector("#order")
let formulaire=document.querySelector("form")
//Suppression du rechargement de la page a la soumission du formulaire
formulaire.addEventListener("submit",(e)=>{
    e.preventDefault()
})
//Envoi des donnees du formulaire a l'API 
function envoiDesDonnees(){
    commander.addEventListener("click", ()=>{
        let prenomValeur=prenom.value;
        let nomValeur=nomFamille.value;
        let addresseValeur=addresse.value;
        let villeValeur=ville.value;
        let emailValeur=email.value;
        let products=[];
        let panier=JSON.parse(localStorage.panier);
        for(i=0; i<=panier.length-1; i++){
            products.push(panier[i][3]);
        };
        const init ={
            method: "POST",
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify(
                {
                    contact: {
                        firstName: prenomValeur,
                        lastName: nomValeur,
                        address: addresseValeur,
                        city: villeValeur,
                        email: emailValeur,
                    },
                    products: products
                }
            ),
            mode: "cors",
            credentials: "same-origin",
        }
        if(prenomValeur.match(/[\W 0-9]/i) || 
        !prenomValeur.match(/[a-z]/i) || 
        nomValeur.match(/[\W 0-9]/i) || 
        !nomValeur.match(/[a-z]/i) || 
        !emailValeur.match(/[\w]+[@]+[\w]+[.]+[a-z]/)){
            resultat="mauvais"
        }else{
            resultat="bien"
        }
    
        if(resultat==="bien"){
            fetch("http://localhost:3001/api/products/order", init)
            .then(response => response.json())
            .then(response => {
                window.location.href="confirmation.html?id="+response.orderId
            })
        }else{
            if(prenomValeur.match(/[\W 0-9]/i)){
                prenomErreur.textContent="Erreur";
            }
            if(nomValeur.match(/[\W 0-9]/i)){
                nomFamilleErreur.textContent="Erreur";
            }
            if(!emailValeur.match(/[\w]+[@]+[\w]+[.]+[a-z]/)){
                emailErreur.textContent="Erreur";
            }
    
            if(!prenomValeur.match(/[\W 0-9]/i)){
                prenomErreur.textContent="";
            }
            if(!nomValeur.match(/[\W 0-9]/i)){
                nomFamilleErreur.textContent="";
            }
            if(emailValeur.match(/[\w]+[@]+[\w]+[.]+[a-z]/)){
                emailErreur.textContent="";
            }
        }
    })
}

envoiDesDonnees()