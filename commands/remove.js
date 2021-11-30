'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

/** 
 * @param {Distube.DisTube} distube
 * @param {Discord.Message} message
 * @param {string} argument
 */
module.exports = (distube, message, argument) => {
	
	let index = parseInt(argument.substring(0, 1))
	let queue = distube.getQueue(message)

	if (!Number.isInteger(index) || index < 1 || index >= Math.min(queue.songs.length, 10)) return

	queue.songs.splice(index, 1)
	queue.emit('addSong', queue, null) // There is no specific event for removing a song, but this should do
}