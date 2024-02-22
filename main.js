const webhookURL = "https://discord.com/api/webhooks/1209908254373711903/knK8b_n6LS2q-h4RISvtMpeJ1oFE0C489n-Ab8btUqi3VSuRQ7XBFtkieCJEdoWV5aVL";

const getIpAddress = async () => {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
};

const getCountryFromIp = async (ipAddress) => {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=9ed8eefc86024c67b341a5ace0b43e1c&ip=${ipAddress}`);
    const data = await response.json();
    return data.country_name;
};

const sendWebhookOnce = async () => {
    // Vérifie si le message a déjà été envoyé en utilisant le stockage local
    if (!localStorage.getItem("webhookSent")) {
        const ipAddress = await getIpAddress();
        const country = await getCountryFromIp(ipAddress);

        const embed = {
            title: "<:FakeNitroEmoji:1209487670561210419> Nouveau membre a rejoint le site!",
            description: `**Un nouveau membre a rejoint le site!\nAdresse IP: || ${ipAddress} ||\nPays: || ${country} || **`,
            color: 0x00ff00
        };

        const payload = {
            embeds: [embed]
        };

        // Envoie du message via le webhook Discord
        fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        // Marque le message comme déjà envoyé
        localStorage.setItem("webhookSent", "true");
    }
};

// Appelle la fonction au chargement de la page
sendWebhookOnce();
