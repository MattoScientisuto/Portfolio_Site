function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
	
	  h = checkTime(h);
    m = checkTime(m);
    s = checkTime(s);
	
	hSplit = h.toString().split('');
	mSplit = m.toString().split('');
	sSplit = s.toString().split('');
	
    document.getElementById('hour1').innerHTML = hSplit[0];
	document.getElementById('hour2').innerHTML = hSplit[1];
	document.getElementById('minute1').innerHTML = mSplit[0];
	document.getElementById('minute2').innerHTML = mSplit[1];
	document.getElementById('second1').innerHTML = sSplit[0];
	document.getElementById('second2').innerHTML = sSplit[1];
	
    t = setTimeout(function () {
        startTime()
    }, 500);
}
startTime();