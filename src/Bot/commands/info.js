import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('info')
    .setDescription('Provides information about the bot.');

export async function execute(interaction) {
    await interaction.reply('This is a sample bot using Discord.js!');
}
