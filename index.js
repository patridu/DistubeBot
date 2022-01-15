'use strict'

console.log(`Running DistubeBot ${require('./package.json').version}`)

require('dotenv').config()

const Discord = require('discord.js')
const Distube = require('distube')
const CommandHolder = require('./util/commandHolder')
const StatusMessage = require('./util/statusMessage')
const Filters = require('./util/filters')
const Database = require('./util/database')

// Load the commands
const cmdHolder = new CommandHolder('commands')
const adminCmdHolder = new CommandHolder('commandsAdmin')

// Generate a client
const client = new Discord.Client({ intents: [ 'GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MESSAGES' ] })
const distube = new Distube.default(client, {
	customFilters: Filters.get(),
	leaveOnEmpty: true,
	leaveOnFinish: true,
	leaveOnStop: true
})

client.once('ready', () => {
	console.log('Connected to Discord')
})

client.on('messageCreate', async (message) => {

	if (message.author.bot) return

	let settings = (await Database.get(message.guildId)) ?? new Database.StorageObject()
	let args = message.content.slice(1).trim().split(' ')
	let keyword = args.shift().toLowerCase()

	if (!message.content.startsWith(settings.prefix)) return

	let adminCommand = adminCmdHolder.commands[keyword]
	if (adminCommand) {
		adminCommand(distube, message, args.join(' '), settings)
		await Database.set(message.guildId, settings)
		return
	}

	if (settings.channel && message.channelId !== settings.channel) return

	let cmd = cmdHolder.commands[keyword]
	if (!cmd) return
	cmd(distube, message, args.join(' '))

	message.delete()
})

// Setup Distube events
distube.on('addSong', (queue, song) => {
	StatusMessage.getInstance(queue)?.update(queue)
}).on('addList', (queue, list) => {
	StatusMessage.getInstance(queue)?.update(queue)
}).on('playSong', (queue, song) => {
	Filters.apply(queue, song)
	StatusMessage.getInstance(queue)?.update(queue)
}).on('disconnect', (queue) => {
	StatusMessage.destroyInstance(queue)
}).on('error', (channel, error) => {
	console.error(error)
	channel.send(`Es ist ein Fehler aufgetreten: ${error.name}`.slice(0, 1500))
})

client.login(process.env.TOKEN)