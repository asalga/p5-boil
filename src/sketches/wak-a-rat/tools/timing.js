// tool to get the sequence of the timings
// of the rats popping out the holes.
var times = [];
var startTime;

window.addEventListener('mousedown', function(){
  if(!startTime){
    startTime = new Date().getTime();
	times.push(0);
  }
  else{
    times.push(new Date().getTime() - startTime);
  }
});