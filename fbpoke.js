var fs = require('fs');

// TODO: Update the filepath to your config file.
var content = fs.read('config.json');
var config = JSON.parse(content);

var page    = require('webpage').create(),
    system  = require('system'),
    loadInProgress = false,
    index   = 0; 

page.onConsoleMessage = function(msg) {
   console.log(msg);
};

page.onLoadStarted = function() {
  loadInProgress = true;
};

page.onLoadFinished = function() {
  loadInProgress = false;
};

var getRandomArbitrary = function(min, max) {
    return Math.random() * (max - min) + min;
}

// Open Facebook
var openFB = function(){
	console.log("Opening facebook page...");
	page.open("http://facebook.com");
}

// Login to Facebook
var loginFB = function(){
	console.log("Logging into facebook...");
	page.evaluate(
		function(fbEmail, fbPass) {
		  	var frm = document.getElementById("login_form");
		    frm.elements["email"].value = fbEmail;
		    frm.elements["pass"].value = fbPass;
		    frm.submit();
  		}, 
  		config.fbEmail, 
  		config.fbPass
  	);
}

var pokeFB = function() {
	var doThePoke = function() {
		page.open("http://www.facebook.com/pokes", function(status) {
			page.evaluate(function() {
		        
		        // Grab all links in the content area
		        var links = document.querySelector("#contentArea").querySelectorAll('a.selected');
		        
		        // Select all pokebacks
		        var pokeBacks = [];
		        for (var i = 0; i < links.length; ++i) {
		        	var text = links[i].innerHTML;
		        	if (text.indexOf('Poke Back') > 0) {
		        		pokeBacks.push(links[i]);
		        	}
		        }

		        // If there are people to poke, do it
		        if (pokeBacks.length) {
		            for (var i = 0; i < pokeBacks.length; i++) {
		     				// Init new mouse event
		     				var evt = document.createEvent('MouseEvents');
		            		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		     				pokeBacks[i].dispatchEvent(evt);
		     				
		     				// Print info about poke
		     				var parent = pokeBacks[i].parentElement.parentElement.parentElement;
		     				var person = parent.querySelectorAll('a')[2].innerHTML;
		     				var times  = parent.querySelectorAll('div._6a')[1].querySelectorAll('div')[1].innerHTML;
		     				var time   = new Date().toLocaleString();
		     				console.log(time + ": PokeBot just poked " + person + " (" + times + ").");  	
		            }
		        } else {
					var time = new Date().toLocaleString();
					console.log(time + ": PokeBot has no new pokes.");
		        }
	        });
		});	
	};

	console.log("Looking for pokes...");

	// Call the poking function in some randomly generated time interval
	(function loop() {
		var min = config.minTime * 60 * 1000;
		var max = config.maxTime * 60 * 1000;
    	var rand = getRandomArbitrary(min, max);
    	var minutes = rand / (60 * 1000);
    	console.log("\nWill check for pokes in " + minutes + " minutes.")
    	setTimeout(function() {
            doThePoke();
            loop();  
    	}, rand);
	}());
}

var steps = [openFB, loginFB, pokeFB];

// Heading
console.log("*** Pokebot for " + config.fbEmail + " started ***\n");

// Set interval to account for page load in between steps
interval = setInterval(function() {

	// If we have a function, run it and increment index
	if (!loadInProgress && typeof steps[index] == "function") {
	    steps[index]();
	    index++;
	  }

	// Once we have ran all the steps, just clear this interval
	if (typeof steps[index] != "function") {
	    clearInterval(interval);
	}

}, 50);


