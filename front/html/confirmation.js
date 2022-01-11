//Recuperation Parametres Url
let searchParams = new URLSearchParams(window.location.search);
let idProduit;
for (let p of searchParams) {
    idProduit=searchParams.get("id");
};
//Affichage du numero de commande
let commande=document.querySelector(".confirmation p");
let numero=idProduit;
commande.textContent=commande.textContent+numero;