function createTimer(onTick, onTimeup) {
	var time;
	var id = null;

	function start(timeout) {
		time = timeout;
		id = setInterval( increment, 1000 );
	}

	function stop() {
		clearInterval(id);
		time = 0;
	}

	function getTime() {
		return time;
	}

	function increment() {
		if (time > 0) {
			time = time - 1;
			onTick();
		} else {
			stop();
			onTimeup();
		}	
	}

	return {
		start: start,
		stop: stop,
		getTime: getTime
	};
}
	
export default createTimer;