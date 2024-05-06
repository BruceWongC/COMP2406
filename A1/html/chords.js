/*
These functions handle parsing the chord-pro text format
*/

function parseChordProFormat(chordProLinesArray) {
  //parse the song lines with embedded
  //chord pro chords and add them to DOM

  console.log('type of input: ' + typeof chordProLinesArray)

  //add the lines of text to html <p> elements
  let textDiv = document.getElementById("text-area")
  textDiv.innerHTML = '' //clear the html

  for (let i = 0; i < chordProLinesArray.length; i++) {
    let line = chordProLinesArray[i]

    let newChord = ""

    if(transposedByNSemitones == 0){ //0 means no shifting
      newChord = '<pre><span class="chord">'
    }
    else{ //span is given the 'transposed' text changes
      newChord = '<pre><span class="chordShift">'
    }

    let newLyric = ""
    let waitCount = 0;

    for(let j = 0; j < line.length; j++){
      if(line[j] == "["){
        let counter = 1

        while (true){
          if (line[j + counter] == "]"){
            newChord += " "
            break
          }
          if(line[j + counter + 1] == 'b' || line[j + counter + 1] == '#'){ //if next space is a flat or shard, otherwise it's null
            newChord += transposeKeys(line[j + counter] + line[j + counter + 1])

            if(transposeKeys(line[j + counter] + line[j + counter + 1]).length == 2){//
              waitCount++ //if sharp or flat, wait so no extra empty line is entered
            }

            j++ //skip over flat or sharp

          }
          else{
            newChord += transposeKeys(line[j + counter])
            if(transposeKeys(line[j + counter]).length == 2){
              waitCount++
            }
          }

          counter++

        }
        waitCount += counter 
        j += counter //sets correct index to continue adding to lyric

      }
      else {
        if (waitCount == 0){//deals with chords being ahead of lyrics, until it's alined 
          newChord += " "
        }
        else{
          waitCount--;
        }

        newLyric += line[j]

      }
    }
    console.log(line)

    if(newLyric.startsWith("{title: ")){ //when given this format, set title to header 1
      let counter = 8;
      newLyric = ""
      while(counter < line.length - 1){
        newLyric += line[counter]
        counter++
      }
      textDiv.innerHTML += '<h1>' + newLyric + '</h1>'
    }
    else if(line != ""){ //covers empty lines to not be printed
      textDiv.innerHTML += newChord + '</span> <br>' + newLyric + '</pre>'
    } 

  }
}

function transposeKeys(key){
  //holds all notes to allow math to find correct note
  let sharp = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#']
  let flat = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab']

  if(sharp.indexOf(key) != -1){
    return sharp[(sharp.indexOf(key) + transposedByNSemitones) % 12] 
  }
  else if(flat.indexOf(key) != -1){
    return flat[(flat.indexOf(key) + transposedByNSemitones) % 12] 
  }
  else{ //if note in arrays then give it back
    return key
  }


}


