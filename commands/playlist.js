const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a melhor playlist do spotify"),

    async execute(interaction) {
        await interaction.reply("https://www.youtube.com/watch?v=CocEMWdc7Ck&list=RDCocEMWdc7Ck")
    }
}

