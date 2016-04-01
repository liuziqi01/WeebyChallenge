document.title = "DOM is working";
alert("DOM ");
//3D AI  underconstruction 
function AI(grid) {
  this.grid = grid;
}

// static evaluation function
AI.prototype.eval = function() {
  var emptyCells = this.grid.availableCells().length;

  var smoothWeight = 0.1,
      //monoWeight   = 0.0,
      //islandWeight = 0.0,
      mono2Weight  = 1.0,
      emptyWeight  = 3.7,
      maxWeight    = 1.0;
    if(this.grid.maxValue < 128)
    {
	mono2Weight = mono2Weight /3;
	smoothWeight = smoothWeight *5;
    }

  return this.grid.smoothness() * smoothWeight
       //+ this.grid.monotonicity() * monoWeight
       //- this.grid.islands() * islandWeight
       + this.grid.monotonicity2() * mono2Weight
       + Math.log(emptyCells) * emptyWeight
       + this.grid.maxValue() * maxWeight;
};

//document.getElementById("test").innerHTML="hello";