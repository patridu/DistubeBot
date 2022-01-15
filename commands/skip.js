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
	let amount = parseInt(argument)

	if (!Number.isInteger(amount) || amount <= 0) amount = 1

	queue?.jump(amount).catch(e => {

		// Probably here because there are no more songs to be played
		queue.stop().catch(e => console.error(`skip.js: ${e.name}`))
	})
}