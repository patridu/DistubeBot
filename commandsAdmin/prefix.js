'use strict'
const Discord = require('discord.js')
const Distube = require('distube')
const Database = require('../util/database')

/**
 * Set the prefix for executing music commands
 * @param {Distube.DisTube} distube 
 * @param {Discord.Message} message 
 * @param {string} argument 
 * @param {Database.StorageObject} settings 
 */
module.exports = (distube, message, argument, settings) => {

	if (argument.length !== 1) return

	settings.prefix = argument.substring(0, 1)

	message.channel.send(`Das Präfix wurde zu "${settings.prefix}" geändert`)
}