document.getElementById('vipForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupère l'adresse e-mail fournie par l'utilisateur
    const userEmail = document.getElementById('email').value;

    // Envoie l'adresse e-mail au serveur (backend)
    fetch('/submit-email', {
        method: 'POST',
        body: JSON.stringify({ email: userEmail }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        // Gère la réponse du serveur
        console.log(data);

        // Affiche un message de remerciement
        document.getElementById('confirmationMessage').innerText = "Merci! Vous serez VIP après la réouverture du site.";
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de l\'adresse e-mail:', error);

        // Gère l'erreur
        document.getElementById('confirmationMessage').innerText = "Une erreur s'est produite. Veuillez réessayer plus tard.";
    });
});
