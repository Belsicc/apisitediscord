const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/submit-email', async (req, res) => {
    const userEmail = req.body.email;

    // Construire l'objet d'embed Discord
    const embed = {
        title: 'Nouvelle adresse e-mail VIP',
        description: `**Adresse e-mail :** ${userEmail}`,
        color: 0x00ff00, // Couleur verte
    };

    // Construire le payload à envoyer au webhook Discord
    const payload = {
        embeds: [embed],
    };

    // URL du webhook Discord
    const webhookURL = 'https://discord.com/api/webhooks/1209948501979430972/Xtp3uES-Pb7ZsCRXWVqUuDMB_g1S3BtfMYIGjLcy2UlbIyN9Syep6bDxchpg0XOj62jj';

    try {
        // Envoyer le payload au webhook Discord
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            console.log('Webhook Discord envoyé avec succès.');
            res.json({ message: 'Adresse e-mail reçue avec succès' });
        } else {
            console.error('Échec de l\'envoi du webhook Discord.', response.statusText);
            res.status(500).json({ error: 'Erreur lors de l\'envoi du webhook Discord' });
        }
    } catch (error) {
        console.error('Erreur lors de l\'envoi du webhook Discord.', error.message);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du webhook Discord' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
