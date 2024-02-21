const webhookURL = "https://discord.com/api/webhooks/1209908254373711903/knK8b_n6LS2q-h4RISvtMpeJ1oFE0C489n-Ab8btUqi3VSuRQ7XBFtkieCJEdoWV5aVL";

const getIpAddress = async () => {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
};

const isYourGmail = (email) => {
    // Adresse e-mail associée à votre compte Gmail
    const yourGmailEmail = "yianis.nn@gmail.com";
    return email.toLowerCase() === yourGmailEmail.toLowerCase();
};

const sendWebhookOnce = async () => {
    const ipAddress = await getIpAddress();

    // Vérifie que l'adresse IP n'est pas votre propre adresse IP du serveur
    const isNotYourIPAddress = ipAddress !== "192.168.1.83";

    // Obtient l'adresse e-mail de la personne qui a rejoint le site
    const email = "email_de_la_personne@example.com";  // Remplacez par la vraie méthode pour obtenir l'adresse e-mail

    // Vérifie que l'adresse e-mail n'est pas associée à votre compte Gmail
    const isNotYourGmail = !isYourGmail(email);

    if (isNotYourIPAddress && isNotYourGmail) {
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
    }
};

// Appelle la fonction au chargement de la page
sendWebhookOnce();
