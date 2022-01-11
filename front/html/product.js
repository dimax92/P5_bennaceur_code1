//Recuperation Parametres Url
let searchParams = new URLSearchParams(window.location.search);
let idProduit;
for (let p of searchParams) {
    idProduit=searchParams.get("id");
};
//Recuperation donnees API
fetch("http://localhost:3001/api/products/"+idProduit)
.then(response => response.json())
.then(response => {
//Recuperation Donnees Elements
    function recuperationDonneesElement(objetapi){
        //for(i=0; i<=objetapi.length-1; i++){
            if(objetapi._id === idProduit){
                let image=document.querySelector(".item__img img");
                let titre=document.querySelector("#title");
                let prix=document.querySelector("#price");
                let description=document.querySelector("#description");
                image.src=objetapi.imageUrl;
                image.alt=objetapi.altTxt;
                titre.textContent=objetapi.name;
                prix.textContent=objetapi.price;
                description.textContent=objetapi.description;
                for(let j in objetapi.colors){
                    let couleurs=document.querySelector("#colors");
                    let option=document.createElement("option");
                    couleurs.appendChild(option);
                    option.value=objetapi.colors[j];
                    option.textContent=objetapi.colors[j];
                }
            }
        //}
    }
    recuperationDonneesElement(response)

} )
//Enregistrement du choix
let nom=document.querySelector("#title");
let quantite=document.querySelector("#quantity");
let couleur=document.querySelector("#colors");
let bouton=document.querySelector("#addToCart");

function enregistrementChoix(){
    bouton.addEventListener("click", ()=>{
        if(localStorage.panier===undefined){
            localStorage.panier=JSON.stringify([[nom.textContent, quantite.value, couleur.value, idProduit]]);
        }else{
            let panier=JSON.parse(localStorage.panier);
            panier.push([nom.textContent, quantite.value, couleur.value, idProduit]);
            localStorage.panier=JSON.stringify(panier);
        };
    
        let panier=JSON.parse(localStorage.panier);
        for(let i in panier){
            for(let j in panier){
                if(panier[i][0]===panier[j][0] & panier[i][2]===panier[j][2]){
                    if(i!==j){
                        panier[i][1]=parseInt(panier[i][1])+parseInt(panier[j][1]);
                        panier.splice(j, 1);
                        localStorage.panier=JSON.stringify(panier);
                    }
                }
            }
        }
    })
}
enregistrementChoix()