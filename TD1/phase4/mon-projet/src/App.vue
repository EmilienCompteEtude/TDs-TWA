<template>
    <div class="titre">
        <h1>Serveur Sécurité - Monitoring</h1>
    </div>

     <h2>Alertes de sécurité</h2>

    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>IP Source</th>
          <th>Type</th>
          <th>Sévérité</th>
        </tr>
      </thead>

      <!-- lecture dynamique des lignes via v-for -->
      <tbody>
        <tr v-for="l in liste" :key="l.id">
          <td>{{ l.id }}</td>
          <td>{{ l.date }}</td>
          <td>{{ l.ip }}</td>
          <td>{{ l.type }}</td>
          <td>{{ l.severite }}</td>
        </tr>
      </tbody>

    </table>


    <h2>Ajouter une règle</h2>
      <!-- @submit pour envoyer les données vers la méthode "addAlert", .prevent pour empecher de recharger la page direct -->
       <!-- Utilise v-model pour recolter informations du Form -->
      <form id="security-form" @submit.prevent="addAlert">
        <label>Port : </label>
        <input type="text" id="port-source" v-model="newAlert.port"><br>
        
        <label>IP Source</label>
        <input type="text" id="ip-source" v-model="newAlert.ip" required><br>
        
        <label>Type</label>
        <select id="type-alerte" v-model="newAlert.type">
          <option>Intrusion</option>
          <option>Scan de port</option>
        </select><br>
        
        <label>Sévérité</label>
        <select id="severite-alerte" v-model="newAlert.severite">
          <option>Faible</option>
          <option>Moyenne</option>
          <option>Élevée</option>
        </select>
        <br><br>
        
        <label>Action</label><br><br>
        <div>
          <!-- meme nom d'action pour deviur faire un choix entre les 2 -->
          <input type="radio" name="action" value="autoriser" v-model="newAlert.action"> Autoriser
          <input type="radio" name="action" value="bloquer" v-model="newAlert.action"> Bloquer
        </div>
        <input type="submit" value="Ajouter" class="add">
      </form>

  <br>
  <h2>Veille sécurité</h2>
  <article>
    <h3>Nouvelle faille détectée</h3>
    <p>Une vulnérabilité critique a été identifiée sur certains serveurs web.</p>
    <a href="https://www.google.com">Lire le rapport</a>
  </article>

  <article>
    <h3>Mise à jour de sécurité</h3>
    <br>
    <p>Un correctif important est disponible pour les systèmes Linux</p>
    <a href="https://www.google.com">Voir les détails</a>
  </article>
</template>

<script setup>
import { ref } from 'vue';

// lignes initiales 
const liste = ref([
  { id: '001', date: '03/05/2026', ip: '192.168.1.10', type: 'Intrusion', severite: 'Élevée' },
  { id: '002', date: '03/05/2026', ip: '10.0.0.5', type: 'Scan de port', severite: 'Moyenne' }
]);

// valeur par defaut d'une ligne 
const newAlert = ref({
  port: '',
  ip: '',
  type: 'Intrusion',
  severite: 'Moyenne',
  action: 'autoriser'
});

// méthode ajout de ligne
const addAlert = () => {
  // Génération d'un ID (commence à partir de 3 car lignes initiales)
  const nextId = String(liste.value.length + 1).padStart(3, '0');
  
  // Récupération de la date du jour
  const today = new Date().toLocaleDateString('fr-FR');

  // Ajout de la nouvelle ligne à la liste
  liste.value.push({
    id: nextId,
    date: today,
    ip: newAlert.value.ip,
    type: newAlert.value.type,
    severite: newAlert.value.severite
  });

  // Réinitialisation du formulaire
  newAlert.value = {
    port: '',
    ip: '',
    type: 'Intrusion',
    severite: 'Moyenne',
    action: 'autoriser'
  };
};
</script>

<style>
body {
    background-color: rgba(210, 210, 210, 0.727);
}

h1 {
    color: white
}

.titre {
    background-color: rgb(45, 63, 79);
    display: flex;
    flex-direction: row-reverse; 
    justify-content: left;
}

h1 {
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 30px;
    margin-left: 5%;
}

thead {
    background-color: rgb(234, 234, 234);
    text-align: center;
}

tbody {
    background-color: white;
    text-align: center;
}

article {
    background-color: white;
    padding: 10px;
    margin-top: 20px;
}

.add {
    background-color: rgb(45, 145, 210)
}

table {
    border-collapse: collapse;
    width: 100%;
}
</style>