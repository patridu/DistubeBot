'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

/** 
 * @param {Distube.DisTube} distube
 * @param {Discord.Message} message
 * @param {string} argument
 */
module.exports = (distube, message, argument) => {
	
	if (!argument) return

	distube.play(message, argument).catch(e => {
		console.log(`play.js: ${e.name}`);
	})
}