module.exports = class {

	/**
	 * Read a list of methods from a folder
	 * @param {string} folderName 
	 */
	constructor(folderName) {

		// Load all the commands into an object
		this.commands = {}

		require('fs').readdir(`./${folderName}/`, (err, files) => {

			if (err) return console.log('Could not find any commands')
		
			files.filter(f => f.endsWith('js')).forEach(file => {
		
				console.log(`Found ${file}`);
				this.commands[file.split('.')[0]] = require(`../${folderName}/${file}`)
			})
		})
	}
}