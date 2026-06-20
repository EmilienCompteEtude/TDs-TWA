document.addEventListener('DOMContentLoaded', () => {
    // recupere les elements de HTML
    const form = document.getElementById('security-form');
    const tableBody = document.querySelector('table tbody');

    // Ajout d'une ligne avec le Form
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // empeche la pache de reload quand on envoie le form

        // recupere information entrée par l'user
        const ipSource = document.getElementById('ip-source').value;
        const type = document.getElementById('type-alerte').value;
        const severite = document.getElementById('severite-alerte').value;

        const nextId = (tableBody.rows.length + 1).toString().padStart(3, '0'); // calcule l'ID en ajoutant 1 et en commencant à 3
        
        const dateJour = new Date().toLocaleDateString('fr-FR'); // date du jours 

        // Création de la ligne avec les inputs
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${nextId}</td>
            <td>${dateJour}</td>
            <td>${ipSource}</td>
            <td>${type}</td>
            <td>${severite}</td>
        `;

        // ajout de la ligne à la table
        tableBody.appendChild(newRow);

        // reset du Form
        form.reset();
        alert("Alerte ajoutée avec succès !");
    });
});