const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
//dotenv
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

//importação dos comandos
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    }
    else {
        console.log(`Esse comando em ${filePath} esta com "data" ou "execute" ausentes`)
    }

}

console.log(client.commands)

//Login do bot
client.once(Events.ClientReady, readyClient => {
    console.log(`Pronto! Login realizado como ${readyClient.user.tag}`);
});
client.login(TOKEN);

//Listener de interçãoes com o bot
client.on(Events.InteractionCreate, async interaction => {
    if (interaction.isStringSelectMenu()) {
        const selected = interaction.values[0]
        if (selected == "javascript") {
            await interaction.reply("Documentação do JavaScript: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript")
        }

        if (selected == "python") {
            await interaction.reply("Documentação do Python: https://www.python.org/doc/")
        }
        if (selected == "csharp") {
            await interaction.reply("Documentação do C#: https://learn.microsoft.com/pt-br/dotnet/csharp/tour-of-csharp/")
        }

        if (selected == "discordjs") {
            await interaction.reply("Documentação do DiscordJS: https://discordjs.guide/")
        }
    }



    if (!interaction.isChatInputCommand()) return;
const command = interaction.client.commands.get(interaction.commandName);
if (!command) {
    console.error("Comando não encontrado");
    return;
}

try {
    await command.execute(interaction);
}
catch (error) {
    console.error(error);
    interaction.reply("Houve um erro ao executar esse comando");
}
})