//KEY CODES
//should clean up these hard-coded key codes
const ENTER = 13
const RIGHT_ARROW = 39
const LEFT_ARROW = 37
const UP_ARROW = 38
const DOWN_ARROW = 40


function handleKeyDown(e) {

  let keyCode = e.which
  if (keyCode == UP_ARROW | keyCode == DOWN_ARROW) {
    //prevent browser from using these with text input drop downs
    e.stopPropagation()
    e.preventDefault()
  }

}

function handleKeyUp(e) {
  //  console.log("key UP: " + e.which)
  if (e.which == ENTER) {
    getPuzzle() //treat ENTER key like you would a submit
    document.getElementById('userTextField').value = ''

  }

  e.stopPropagation()
  e.preventDefault()

}



function getPuzzle() {

  let userText = document.getElementById('userTextField').value
  if (userText && userText != '') {

    let textDiv = document.getElementById("text-area")
    textDiv.innerHTML = `<p> ${userText}</p>`

    let userRequestObj = {
      text: userText
    }
    let userRequestJSON = JSON.stringify(userRequestObj)
    document.getElementById('userTextField').value = ''

    let xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        //we are expecting the response text to be a JSON string
        let responseObj = JSON.parse(this.responseText)

        puzzleName = userText
        words = [] //clear words on canvas

        if (responseObj.puzzleLines) {

          for (line of responseObj.puzzleLines) {
            lineWords = line.split(" ")
            let colour = getRandomColor();
            for (w of lineWords) {
              let word = {
                word: w
              }
              word.colour = colour
              assignRandomIntCoords(word, canvas.width, canvas.height)
              randomizePos(word)
            }
          }
        }

        drawCanvas()
      }

    }
    xhttp.open("POST", "userText") //API .open(METHOD, URL)
    xhttp.send(userRequestJSON) //API .send(BODY)
  }


}

function solvePuzzle() {
  if (words.length != 0) {
    let textDiv = document.getElementById("text-area")

    textDiv.innerHTML = ''
    for(let i = 0; i < words.length; i++){

      textDiv.innerHTML += '<p id="wrong">' +  words[i].word +'</p>'
    }
  }
}

//sort array to get order of words placed then compare with txt file
function sortWord(word) {

  let temp = [] //store array of sorted items
  let counter = 0;

  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if(words[i].x <= word.x && word.y < words[i].y + 20){
        break
      }
      counter++
    }
  }



}

function randomizePos(word){ //randomize postion of words in array
  let num = Math.floor(Math.random() * (words.length + 1));

  for(let i = words.length; i > num; i--){
    words[i] = words[i - 1]
  }

  words[num] = word
}