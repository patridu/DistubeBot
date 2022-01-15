'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

/** 
 * @param {Distube.DisTube} distube
 * @param {Discord.Message} message
 * @param {string} argument
 */
module.exports = (distube, message, argument) => {
	
	if (argument) {

		distube.play(message.member.voice.channel, argument, {
			member: message.member,
			textChannel: message.channel,
			message
		}).catch(e => {
			console.log(`play.js: ${e.name}`);
		})

	} else {

		// If queue is paused, resume playback
		let queue = distube.getQueue(message)

		if (queue?.paused) {

			queue.resume()
			queue.emit('addSong', queue, null) // There is no specific event for resuming, but this should do
		}
	}
}