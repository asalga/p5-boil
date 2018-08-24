
// tool to get the sequence of the timings
// of the rats popping out the holes.

// sample:
// [0, 0.773, 1.15, 1.541, 2.485, 3.988, 4.661, 5.438, 7.966, 8.183, 10.728, 11.159, 12.158, 12.591, 12.727, 14.896, 15.743, 16.952, 17.256, 18.864, 19.529, 20.314, 22.617, 22.961, 23.961, 25.225, 25.553, 28.315, 28.971, 30.258, 30.818, 30.987, 33.092, 34.41, 35.452, 36.572, 36.731, 38.187, 38.851, 39.515, 41.468]

var times = [];
var startTime;

window.addEventListener('mousedown', function(){
  if(!startTime){
    startTime = new Date().getTime();
	times.push(0);
  }
  else{
    times.push( (new Date().getTime() - startTime)/1000 );
  }
});