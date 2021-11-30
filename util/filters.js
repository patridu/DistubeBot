'use strict'
const Discord = require('discord.js')
const Distube = require('distube')
const IsArray = require('isarray')

/**
 * Apply the effects specified in the song to the queue
 * @param {Distube.Queue} queue 
 * @param {Distube.Song} song 
 */
module.exports.apply = (queue, song) => {

	// Check song's filter list format
	if (song.filters && IsArray(song.filters)) {

		let toRemove = queue.filters.filter(val => !song.filters.includes(val))
		let toAdd = song.filters.filter(val => !queue.filters.includes(val))

		let result = toRemove.concat(toAdd)
		if (result.length === 0) return

		console.log(`Set filters: ${queue.setFilter(result)}`)
	} else if (queue.filters.length !== 0) {

		queue.setFilter(false)
		console.log('Removed all filters');
	}
}

/**
 * Get custom filters
 * @returns {Object.<string, string>}
 */
module.exports.get = () => {

	return {
		'earrape': 'volume=20, bass=g=10',
		'wobble': 'vibrato=f=3:d=1'
	}
}