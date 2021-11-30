'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

/** 
 * @param {Distube.DisTube} distube
 * @param {Discord.Message} message
 * @param {string} argument
 */
module.exports = (distube, message, argument) => {
	
	let queue = distube.getQueue(message)

	// If argument can be parsed to an int without compromise, set it as number of songs to skip
	let amount = /^\d+$/.test(argument) && parseInt(argument) > 0 ? parseInt(argument) : 1;

	queue?.jump(amount).catch(e => {

		// Probably here because there are no more songs to be played
		queue.stop().catch(e => console.error(`skip.js: ${e.name}`))
	})
}