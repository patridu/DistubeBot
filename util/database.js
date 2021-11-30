'use strict'
const Discord = require('discord.js')
const Distube = require('distube')
const Level = require('level')

const db = Level('database')

/**
 * Get a storage object from database
 * @param {!string} key
 * @returns {?StorageObject}
 */
module.exports.get = async (key) => {

	return await db.get(key)
	.then(str => JSON.parse(str))
	.catch(e => {
		return null
	})
}

/**
 * Save a storage object to database
 * @param {!string} key 
 * @param {!StorageObject} value 
 */
module.exports.set = async (key, value) => {

	await db.put(key, JSON.stringify(value))
	.catch()
}

class StorageObject {

	constructor() {

		this.prefix = '.'
		this.channel = null
	}
}

module.exports.StorageObject = StorageObject