'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

/** 
 * @param {Distube.DisTube} distube
 * @param {Discord.Message} message
 * @param {string} argument
 */
module.exports = (distube, message, argument) => {

	// Search song manually to intercept the process and add the tag

	distube.search(argument).then(results => {

		let songResult = new Distube.Song(results[0], message.member)
		songResult.filters = [ 'earrape' ]
		
		distube.play(message, songResult).catch(e => {
			console.log(`earrape.js: ${e.name}`);
		})
	}).catch(e => {
		console.log(`earrape.js: ${e.name}`);
	})
}