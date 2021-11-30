'use strict'
const Discord = require('discord.js')
const Distube = require('distube')

const playlistFooter = require('./playlistFooter')

/** @type {Object.<string, StatusMessage>} */
const messages = {}

class StatusMessage {

	/** @param {!Distube.Queue} queue */
	constructor(queue) {

		// Create a new status message
		queue.textChannel?.send(`Wird geladen...`).then(msg => {
			this.message = msg
			this.update(queue)
		})
	}

	/**
	 * 
	 * @param {Distube.Queue} queue A queue of songs to be played
	 * @returns 
	 */
	update(queue) {
		
		if (!this.message) return

		let song = queue.songs.length > 0 ? queue.songs[0] : null

		let description = song?.uploader.name ?? ''
		description += '\n' + '\u2800'.repeat(40) // Force the embed to full width

		/** @type {Discord.MessageEmbed} */
		let panel = {
			color: 0x0099ff,
			title: song?.name ?? 'Keine Wiedergabe',
			description: description,
			thumbnail: {
				url: song?.thumbnail ?? 'https://www.freevector.com/uploads/vector/preview/14310/FreeVector-Music-Icon.jpg'
			},
			footer: {
				text: playlistFooter(queue)
			}
		}

		this.message.edit({ content: null, embeds: [ panel ]}).catch(e => {
			console.error('Error when trying to edit text, creating new message');
			messages[queue.id] = new StatusMessage(queue)
		})
	}

	/** 
	 * @param {Distube.Queue} queue
	 * @returns {StatusMessage}
	 */
	static getInstance(queue) {

		if (!queue?.textChannel || queue.textChannel === undefined) return

		if (!(queue.id in messages)) {

			messages[queue.id] = new StatusMessage(queue)
		}

		return messages[queue.id]
	}

	/** @param {Distube.Queue} queue */
	static destroyInstance(queue) {

		if (queue.id in messages) delete messages[queue.id]
	}
}

module.exports = StatusMessage