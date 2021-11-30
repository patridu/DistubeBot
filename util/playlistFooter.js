'use strict'
const Distube = require('distube')
const IsArray = require('isarray')

/**
 * Shorten a string to a specific length
 * @param {string} value 
 * @param {number} length 
 * @returns {string} The shortened string
 */
const shortenString = (value, length) => {

	if (value.length > length) {
		return value.substring(0, length - 3) + '...'
	}

	return value
}

/**
 * @param {number} value 
 * @returns {string} Formatted time
 */
const formatTime = (value) => {

	let hours = Math.floor(value / 3600),
	minutes = Math.floor((value % 3600) / 60).toString(),
	seconds = Math.floor(value % 60).toString().padStart(2, '0')

	return hours === 0 ? `${minutes}:${seconds}` : `${hours}:${minutes.padStart(2, '0')}:${seconds}`
}

const numberEmojis = [ '▶️', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣' ]

/**
 * Get a string representing the playlist of the specified queue, intended for use in an embed footer
 * @param {Distube.Queue} queue
 * @returns {string} An embed footer
 */
module.exports = (queue) => {

	// Show the playlist as far as possible until the char limit is reached
	let footer = ''
	queue.previousSongs.concat(queue.songs).every(s => {

		if (!(s.name && s.uploader.name)) return false

		let playingIndex = queue.songs.indexOf(s)
		let emoji = (playingIndex < 0 || playingIndex >= numberEmojis.length) ? '*️⃣' : numberEmojis[playingIndex]
		emoji += ' ' + s.filters?.length > 0 ? '⚡' : '\u2800'.repeat(2)

		let duration = s.duration === 0 ? 'LIVE' : formatTime(s.duration)

		let toAdd = `\n${emoji}` + shortenString(`[${duration}] ${s.name}`, 45)
		if (footer.length + toAdd.length > 2000) return false

		footer += toAdd
		return true
	})

	return footer
}