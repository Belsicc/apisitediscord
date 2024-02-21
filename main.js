const webhookURL = "https://discord.com/api/webhooks/1209908254373711903/knK8b_n6LS2q-h4RISvtMpeJ1oFE0C489n-Ab8btUqi3VSuRQ7XBFtkieCJEdoWV5aVL";

const getIpAddress = async () => {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
};

const sendWebhookOnce = async () => {
    // Vérifie si le message a déjà été envoyé en utilisant le stockage local
    if (!localStorage.getItem("webhookSent")) {
        const ipAddress = await getIpAddress();

        // Vérifie que l'adresse IP n'est pas votre propre adresse IP du serveur
        if (ipAddress !== "votre_adresse_ip") {
            const embed = {
                title: "<:FakeNitroEmoji:1209487670561210419> Nouveau membre rejoint le site!",
                description: `**Un nouveau membre a rejoint le site!\nAdresse IP: || ${ipAddress} ||**`,
                color: 0x00ff00
            };

            const payload = {
                embeds: [embed]
            };

            // Envoie du message via le webhook Discord
            await fetch(webhookURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            // Marque le message comme déjà envoyé
            localStorage.setItem("webhookSent", "true");
        }
    }
};

// Appelle la fonction au chargement de la page
sendWebhookOnce();
