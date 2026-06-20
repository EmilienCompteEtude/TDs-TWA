<template>
  <div class="app-container">
    
    <header>
      <h1>Gestionnaire de Stock</h1>
      <div class="search-container">
        <!-- Transforme l'input de l'user dans la barre de recherche en une variable avec v-model-->
        <input 
          type="text" 
          v-model="inputRech" 
          placeholder="Rechercher un produit...">
      </div>
    </header>

    <main class="main-container">
      
      <p v-if="listeProdFiltree.length === 0" class="no-result-message">
        Aucun produit ne correspond à votre recherche.
      </p>


      <!-- Affichage des produits en parcourant la liste filtrée avec v-for -->
      <div class="product-grid">
        <div v-for="prod in listeProdFiltree" :key="prod.id" class="product-card">
          <div class="product-number">{{ prod.id }}</div>

          <h2>{{ prod.titre }}</h2>
          <p class="desc">{{ prod.desc }}</p>
          <p class="prix">Prix : {{ prod.prix }}€</p>
          
          
          <span class="status-badge" :class="prod.status === 'en-stock' ? 'in-stock' : 'out-of-stock'"> <!-- CSS dynamique en fonction du stock -->
            Statut : {{ prod.status === 'en-stock' ? 'En stock' : 'Rupture de stock' }} <!-- Message dynamique en fonction du stock -->
          </span>
        </div>
      </div>

      <!-- Formulaire d'ajout d'un produit en utilisant v-model -->
      <div class="form-container">
        <h3>Ajouter un produit</h3>
        <form @submit.prevent="addProduct"> 
          <!-- @submit pour envoyer les données vers la méthode "addProduct", .prevent pour empecher de recharger la page après l'envoie -->
          
          <div class="form-group">
            <label for="new-titre">Nom du produit :</label>
            <input type="text" id="new-titre" v-model="newProd.titre" required>
          </div>
          
          <div class="form-group">
            <label for="new-desc">desc :</label>
            <input type="text" id="new-desc" v-model="newProd.desc" required>
          </div>
          
          <div class="form-group">
            <label for="new-prix">Prix (€) :</label>
            <input type="number" id="new-prix" v-model="newProd.prix" required>
          </div>
          
          <div class="form-group">
            <label for="new-status">Statut :</label>
            <select id="new-status" v-model="newProd.status">
              <option value="en-stock">En stock</option>
              <option value="rupture">Rupture de stock</option>
            </select>
          </div>
          
          <button type="submit" class="btn-submit">Ajouter au catalogue</button>

        </form>
      </div>

    </main>
  </div>
</template>

<script setup>
// import de ref pour la liste de produit, import de computed pour le filtrage dynamique
import { ref, computed } from 'vue';

// La liste initiale de produits
const listeProduits = ref([
  { id: 1, titre: 'Clavier mécanique', desc: 'Clavier RGB avec switches rapides pour gaming et bureautique.', prix: 79, status: 'en-stock' },
  { id: 2, titre: 'Souris ergonomique', desc: 'Souris sans fil avec précision haute performance.', prix: 39, status: 'rupture' },
  { id: 3, titre: 'Écran 24 pouces', desc: 'Écran Full HD idéal pour le travail et le multimédia.', prix: 149, status: 'en-stock' }
]);

// input dans la barre de recherche, convertit en une liste
const inputRech = ref('');

// form par défaut
const newProd = ref({
  titre: '',
  desc: '',
  prix: '',
  status: 'en-stock'
});

// Filtrage dynamique (grace à computed) en fonction de l'input 
const listeProdFiltree = computed(() => {
  return listeProduits.value.filter(product => 
    product.titre.toLowerCase().includes(inputRech.value.toLowerCase())
  );
});


const addProduct = () => {
  const nextId = listeProduits.value.length + 1;   // Calcul de l'ID (nombre de produit + 1)

  // Ajout du nouveau produit
  listeProduits.value.push({
    id: nextId,
    titre: newProd.value.titre,
    desc: newProd.value.desc,
    prix: newProd.value.prix,
    status: newProd.value.status
  });

  // Réinitialisation du form
  newProd.value = {
    titre: '',
    desc: '',
    prix: '',
    status: 'en-stock'
  };
};
</script>

<style scoped>
/* CSS généré par IA */

.app-container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f6f9; 
  color: #333;
  min-height: 100vh;
}

header {
  background-color: #1a438e;
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

header h1 {
  font-size: 24px;
  font-weight: 600;
  margin: 0;
}

.search-container input {
  padding: 8px 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 250px;
  font-size: 14px;
  outline: none;
}

.main-container {
  padding: 40px;
}

.no-result-message {
  text-align: center; 
  color: #666; 
  font-style: italic; 
  margin-bottom: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-card {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  padding: 25px;
  text-align: center;
  position: relative;
  border: 1px solid #eef2f5;
  transition: transform 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
}

.product-number {
  background-color: #d32f2f;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-card h2 {
  font-size: 18px;
  color: #222;
  margin-bottom: 12px;
}

.product-card .desc {
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin-bottom: 15px;
  height: 40px; 
}

.product-card .prix {
  font-weight: bold;
  color: #1a438e;
  font-size: 16px;
  margin-bottom: 20px;
}

.status-badge {
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 600;
}

.status-badge.in-stock {
  background-color: #def7ec;
  color: #03543f;
}

.status-badge.out-of-stock {
  background-color: #fde8e8;
  color: #9b1c1c;
}

.form-container {
  max-width: 500px; 
  margin: 40px auto; 
  background: white; 
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
}

.form-container h3 {
  margin-bottom: 15px;
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block; 
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.form-group input, .form-group select {
  width: 100%; 
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
}

.btn-submit {
  background: #1a438e; 
  color: white; 
  border: none; 
  padding: 10px 15px; 
  border-radius: 4px; 
  cursor: pointer; 
  width: 100%;
  font-weight: 600;
  margin-top: 5px;
}

.btn-submit:hover {
  background: #143572;
}
</style>