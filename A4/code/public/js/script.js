function getSong() {

    let songTitle = document.getElementById('songTitleTextField').value.trim()
    console.log('songTitle: ' + songTitle)
    if(songTitle === '') {
        return alert('Please enter a Song Title')
    }


    let resultsHeading = document.getElementById('resultsHeading')
    resultsHeading.innerHTML = 'Songs matching: '

    let resultsTable = document.getElementById('resultsTable')

    let playlistTable = document.getElementById('playlistTable')

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let response = JSON.parse(xhr.responseText)
          //console.log(response.results[0])
          //console.log(response)

          if(response.resultCount != 0) {
            resultsTable.innerHTML = ''
          
            playlistTable.innerHTML += `
            <tr> 
              <td class="center">  &#8208; &#128316; &#128317; </td>
              <td> `+  response.results[0].trackName +`</td>
              <td> `+ response.results[0].artistName +`</td>
              <td> <img src="` + response.results[0].artworkUrl30 +`" width="30" height="30"></td>
            </tr> 
            `
  
            for(let i = 0; i < response.resultCount && i < 20;i++) {
              resultsTable.innerHTML += `
            <tr> 
              <td class="center"> &#43; </td>
              <td> `+ response.results[i].trackName +`</td>
              <td> `+ response.results[i].artistName +`</td>
              <td> <img src="` + response.results[i].artworkUrl30 +`" width="30" height="30"></td>
  
            </tr>          
            `
          }
          
          }
      }
    }
    xhr.open('GET', `/songs?title=${songTitle}`, true)
    xhr.send()
}

function addSong(songInfo) {

  let playlistTable = document.getElementById('playlistTable')

  playlistTable.innerHTML += `
  <tr> 
    <td class="center">  &#8208; &#128316; &#128317; </td>
    <td> `+ songInfo.trackName +`</td>
    <td> `+ songInfo.artistName +`</td>
    <td> <img src="` + songInfo.artworkUrl30 +`" width="30" height="30"></td>
  </tr> 
`


}

function removeSong() {

}

function up() {

}

function down() {

}

//Attach Enter-key Handler
const ENTER=13

function handleKeyUp(event) {
event.preventDefault()
   if (event.keyCode === ENTER) {
      document.getElementById("submit_button").click()
  }
}


document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('submit_button').addEventListener('click', getSong)

  //add key handler for the document as a whole, not separate elements.
  document.addEventListener('keyup', handleKeyUp)
  
})
