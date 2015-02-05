# pokebot
Javascrtipt FB PokeBot built using PhantomJS (http://phantomjs.org/)

## Usage
Pokebot is extremely easy to use. Simply install the required dependencies, edit the provided configuration file, and run a single command to get poking.

### Dependencies
The only dependency for this project is PhantomJS, a "headless Webkit scriptable with a JavaScript API." To install PhantomJS, visit their [Github repository](https://github.com/ariya/phantomjs). 

### Configuration File
You must use a [JSON](json.org) configuration file to store your FB email, password, and desired poke intervals. An example configuration file, ``example-config.json`` has been included for your reference. You must also edit fbpoke.js and update the file path to your configuration file.

### Running the Pokebot
Once you have installed PhantomJS and updated your configuration file, you are ready to run the bot. I recommend creating a [screen instance](http://linux.die.net/man/1/screen) on a server and allowing the bot to run from there. Once you are ready to run the bot, simply enter the following command:
	$ phantomjs fbpoke.js 
	

## Disclaimers
Note that you are storing your FB password in plaintext in the configuration file. I haven't had to time to implement a more secure solution and I do not assume any responsibility for lost or stolen passwords. 