var catalogue = [];

function executerRequete(fonction_A_requete) {
    // on vérifie si le catalogue a déjà été chargé pour n'exécuter la requête AJAX qu'une seule fois
    if (catalogue.length === 0) {
        // on récupère un objet XMLHttpRequest
        var xhr = getXMLHttpRequest();
        // on réagit à l'événement onreadystatechange
        xhr.onreadystatechange = function() {
            // test du statut de retour de la requête AJAX
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
                // on sauvegarde le catalogue dans une variable
                catalogue = JSON.parse(xhr.responseText);
                // on lance la fonction de fonction_A_requete avec le catalogue récupéré
                fonction_A_requete();
            }
        }
        // la requête AJAX : lecture de fromages.json
        xhr.open("GET", "json/fromages.json", true);
        xhr.send();
    } else {
        // on lance la fonction de fonction_A_requete avec le catalogue déjà récupéré précédemment
        fonction_A_requete();
    }
}
function placeDiv() {
    for (let i=0; i<catalogue.length; i++){
        let position = i+1
        let note = "";
        for (let j=0; j<catalogue[i].classement; j++){
            note +="☆"
        }
        document.querySelector("#menu").insertAdjacentHTML("beforeend",`<div id="from${i}"></div>`);
        document.querySelector("#from"+i).insertAdjacentHTML("beforeend",`
        <h3><strong>${catalogue[i].nom}</strong></h3>
        <p>${note}</p>
        <p>Type : ${catalogue[i].type} / Pays : ${catalogue[i].pays}</p>`);
        document.querySelector("#from"+i).onclick = function(){
            this.style.background = "rgb(255, 200, 168)";
            this.style.marginLeft = " 10%" ;
            document.querySelector("article").style.background = " url('fromage"+i+".jpg') no-repeat";
            document.querySelector("article").style.backgroundSize = " cover ";
            setTimeout(fond,10000);
        }
    }
}
function fond(){
    let div = document.querySelectorAll("#menu>div");
    for (let i=0;i<div.length;i++){
        div[i].style.background = "white";
        div[i].style.marginLeft = " 20%" ;
    }
    document.querySelector("article").style.background = " url('fromage.jpg') no-repeat";
    document.querySelector("article").style.backgroundSize = " cover ";
}
// on initialise la lecture au premier élément
executerRequete(placeDiv);
