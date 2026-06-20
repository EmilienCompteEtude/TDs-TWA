// Selection element
const searchInput = document.querySelector('#search-input');
const productGrid = document.querySelector('#product-grid');
const addProductForm = document.querySelector('#add-product-form');

// ajout produit Form
addProductForm.addEventListener('submit', function(event) {

    event.preventDefault(); // evite relance

    // Récupération des données
    const name = document.querySelector('#new-name').value;
    const desc = document.querySelector('#new-desc').value;
    const price = document.querySelector('#new-price').value;
    const status = document.querySelector('#new-status').value;

    const nextNumber = document.querySelectorAll('.product-card').length + 1; // calcul d'ID

    let statusText = "";
    let statusClass = "";

    if (status === "en-stock") {
        statusText = "Statut : En stock";
        statusClass = "status-badge in-stock";
    } else {
        statusText = "Statut : Rupture de stock";
        statusClass = "status-badge out-of-stock";
    }

    // Nouveau produit 
    const newCard = document.createElement('div');
    newCard.className = 'product-card';

    newCard.innerHTML = `
        <div class="product-number">${nextNumber}</div>
        <h2>${name}</h2>
        <p class="description">${desc}</p>
        <p class="price">Prix : ${price}€</p>
        <span class="${statusClass}">${statusText}</span>
    `;

    productGrid.appendChild(newCard);

    // Réinitialisation du form
    addProductForm.reset();
});

// Recherche
searchInput.addEventListener('input', function() {
    const filterText = searchInput.value.toLowerCase();
    
    const cards = document.querySelectorAll('.product-card');
    let visibleCardsCount = 0;

    // boucle for, compare si l'input de l'user correspond au titre de la carte (h2), sinon on le retire (filtre)
    cards.forEach(function(card) {
        const productTitle = card.querySelector('h2').textContent.toLowerCase();

        if (productTitle.includes(filterText)) {
            card.style.display = ""; 
            visibleCardsCount++;    
        } else {
            card.style.display = "none"; // Produit masquée
        }
    });
});