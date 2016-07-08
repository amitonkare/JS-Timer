(function() {
	// Stopwatch
	var h1 = document.getElementById('stopwatchTimer'),
		start = document.getElementById('startSW'),
		stop = document.getElementById('stopSW'),
		clear = document.getElementById('resetSW'),
		switch_sw = document.getElementById('stopwatchBtn'),
		switch_cd = document.getElementById('countdownBtn'),
		msecs = 0, minutes = 0, secs = 0, t,
		stopwatchDiv = document.getElementById('stopwatch'),
		countdownDiv = document.getElementById('countdown');

	var cdt, h2 = document.getElementById('countdownTimer'),
		startcd = document.getElementById('startCD'),
		pausecd = document.getElementById('pauseCD'),
		stopcd = document.getElementById('stopCD');


	function add() {
		msecs++;
		if (msecs >= 100) {
			msecs = 0;
			secs++;
			if (secs >= 60) {
				secs = 0;
				minutes++;
			}
		}

		h1.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (msecs > 9 ? msecs : "0" + msecs);

		timer();
	}
	function timer() {
		t = setTimeout(add, 10);
	}
	/* Start button */
	start.onclick = timer;

	/* Stop button */
	stop.onclick = function() {
		clearTimeout(t);
	}

	/* Clear button */
	clear.onclick = function() {
		clearTimeout(t);
		h1.textContent = "00:00:00";
		msecs = 0; minutes = 0; secs = 0;
	}

	switch_sw.onclick = function(){ // switch to stopwatch 
		countdownDiv.style.display = "none";
		stopwatchDiv.style.display = "block";
		switch_cd.classList.remove("active");
		switch_sw.classList.add("active");
		msecs = 0; minutes = 0; secs = 0;
		clearTimeout(cdt);
		clearTimeout(t);
	}

	switch_cd.onclick = function(){ // switch to countdown timer
		countdownDiv.style.display = "block";
		stopwatchDiv.style.display = "none";
		switch_sw.classList.remove("active");
		switch_cd.classList.add("active");
		msecs = 0; minutes = 0; secs = 0;
		clearTimeout(cdt);
		clearTimeout(t);
	}

	var checkCountDownTime = function(time){ // validate countdown timer with regex
		var re = /^(0[0-9]|10):(59|[0-5][0-9]):([0-9][0-9])?$/g;
		// regex allows max 10 mins, max 59 secs, and max 99 msecs 
		return re.test(time);
	}

	// Countdown Timer

	function subtract(){
		var callAgain = true;
		msecs--;
		if (msecs <= 0) {
			msecs = 100;// set to 100 per sec as the timeout in the cdtimer() has been set to 10msecs.
			secs--;
			if (secs <= 0) {
				secs = 60;
				minutes--;
				if(minutes <= 0){
					clearTimeout(cdt);
					setCDTime();
					callAgain = false;
				}
			}
		}

		h2.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (secs ? (secs > 9 ? secs : "0" + secs) : "00") + ":" + (msecs > 9 ? msecs : "0" + msecs);
		if(callAgain){
			cdtimer();
		}
		else{
			alert("Time up!!");
		}
	}

	function cdtimer(){
		cdt = setTimeout(subtract, 10);// updates timer every 10 msecs
	}

	function setCDTime(){ // get input from text box and parse it as mins, secs, msecs
		var timeInp = document.getElementById('cdTime');
		if(checkCountDownTime(timeInp.value)){
			var digs = timeInp.value.trim().toString().split(":");
			msecs = parseInt(digs[2]);
			secs = parseInt(digs[1]);
			minutes = parseInt(digs[0]);
			return true;
		}
		else{
			alert("Invalid time. Max 10 minutes countdown allowed. Max mins: 10, Max secs: 59, Max msecs: 99 ");
			return false;
		}
	}

	startcd.onclick = function(){ // start countdown click handler
		if(setCDTime()){
			cdtimer();
		}
	}

	pausecd.onclick = function(){ // pause countdown click handler
		clearTimeout(cdt);
	}

	stopcd.onclick = function(){ // stop/reset countdown click handler
		clearTimeout(cdt);
		h2.textContent = "00:00:00";
		msecs = 0; minutes = 0; secs = 0;
		setCDTime();
	}

})();