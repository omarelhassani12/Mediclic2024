// Sélection de l'élément select
const selectElement = document.getElementById("NbrS");

// Ajout des options de 1 à 10
for (let i = 1; i <= 10; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectElement.appendChild(option);
}