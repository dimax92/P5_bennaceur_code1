//requete API
fetch("http://localhost:3001/api/products")
.then(response => response.json())
.then(response =>{
//Creation Elements
    function creationElements(objetapi){
        for(let i in objetapi){
            produit=document.createElement("a");
            items.appendChild(produit);
            article=document.createElement("article");
            produit.appendChild(article);
            image=document.createElement("img");
            article.appendChild(image);
            titre=document.createElement("h3");
            titre.className="productName";
            article.appendChild(titre);
            description=document.createElement("p");
            description.className="productDescription";
            article.appendChild(description);
        }
    }
    creationElements(response)
//Insertion des donnees dans les elements
    function insertionDonnees(objetapi){
        for(i=0; i<=items.children.length-1; i++){
            let items=document.querySelector("#items");
            let produit=document.querySelector("#items").children[i];
            let article=document.querySelector("#items").children[i].children[0];
            let image=document.querySelector("#items").children[i].children[0].children[0];
            let titre=document.querySelector("#items").children[i].children[0].children[1];
            let description=document.querySelector("#items").children[i].children[0].children[2];
            produit.href="product.html?id="+objetapi[i]._id;
            image.alt=objetapi[i].altTxt;
            image.src=objetapi[i].imageUrl;
            titre.textContent=objetapi[i].name;
            description.textContent=objetapi[i].description;
        }
    }
    insertionDonnees(response)
})
.catch(error => console.log("Erreur : " + error));