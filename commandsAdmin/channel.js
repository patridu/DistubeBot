'use strict'
const Discord = require('discord.js')
const Distube = require('distube')
const Database = require('../util/database')

/**
 * Set the channel for executing music commands
 * @param {Distube.DisTube} distube 
 * @param {Discord.Message} message 
 * @param {string} argument 
 * @param {Database.StorageObject} settings 
 */
module.exports = (distube, message, argument, settings) => {

	settings.channel = argument === 'all' ? null : message.channelId

	settings.channel && message.channel.send('Dieser Kanal wurde als Musik-Chat festgelegt')
}