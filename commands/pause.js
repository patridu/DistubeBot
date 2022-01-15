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

	if (!queue) return

	queue.pause()
	queue.emit('addSong', queue, null) // There is no specific event for pausing, but this should do
}