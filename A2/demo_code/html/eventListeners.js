


document.addEventListener('DOMContentLoaded', function() {
  //This is called after the browser has loaded the web page

  //add mouse down listener to our canvas object
  document.getElementById('canvas1').addEventListener('mousedown', handleMouseDown)

  //add listener to get and solve button
  document.getElementById('get').addEventListener('click', getPuzzle)
  document.getElementById('solve').addEventListener('click', solvePuzzle)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keydown', handleKeyDown)
  document.addEventListener('keyup', handleKeyUp)

  randomizeWordArrayLocations(words) 

  drawCanvas()
})
