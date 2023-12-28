const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require("discord.js");

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma Linguagem selecionada")
            .addOptions(
            {
                label:"javascript",
                description: "Veja a documentação do Java Script",
                value:"javascript"
            },
            {
                label:"python",
                description: "Veja a documentação do Pyhton",
                value:"python"
            },
            {
                label:"C#",
                description: "Veja a documentação do C#",
                value:"csharp"
            },
            {
                label:"discord.js",
                description: "Veja a documentação do discord.js",
                value:"discordjs"
            },
            
            )

    )

module.exports = {
    data: new SlashCommandBuilder()
        .setName("docs")
        .setDescription("Acesse a documentação de qualquer tecnologia que quiser"),

    async execute(interaction) {
        await interaction.reply({content: "Selecione uma das techs abaixo", components: [row]})
    }
}

