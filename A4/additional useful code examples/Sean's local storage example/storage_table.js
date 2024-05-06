//When the index.html loads and the storage_table.js script file is loaded by the index.html 
let tableDiv
let fname = ''
let lname = ''
let x = 0;

window.addEventListener('load', (event) => {

    tableDiv = document.getElementById("nameTable")

    document.getElementById('nameButton').addEventListener("click", pressedButton)
    createTable("List of name")
    loadDataToTable()

})


function createTable(title) {

    // creates a <table> element and a <tbody> element
    let tbl = document.createElement('table');

    //Create the title of the table
    let tblheader = document.createElement('thead');
    let thtitle = document.createElement('th')
    thtitle.innerHTML = title
    tblheader.appendChild(thtitle)
    thtitle.setAttribute('colspan', '2')
    tbl.appendChild(tblheader)

    let tblBody = document.createElement('tbody');
    tblBody.id = "tableBody"


    let titlerow = document.createElement('tr');
    tblBody.appendChild(titlerow)
    let celltitle1 = document.createElement('td')
    celltitle1.innerHTML = "First Name"
    let celltitle2 = document.createElement('td')
    celltitle2.innerHTML = "Last Name"
    celltitle1.setAttribute('style', 'border:none;')
    celltitle2.setAttribute('style', 'border:none;')

    titlerow.appendChild(celltitle1)
    titlerow.appendChild(celltitle2)
  
    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    tableDiv.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "2");
  }

function loadDataToTable(){
    let numOfStoreItems = window.localStorage.length/2
    x = numOfStoreItems
    for (let i = 0; i < numOfStoreItems; i++) {

        addRow(localStorage.getItem("firstname"+i), localStorage.getItem("lastname"+i))

    }

}  

function addRow(fname,lname) {
    let body = document.getElementById("tableBody")
    console.log(body)
    let contentrow = document.createElement('tr');
    let cellfname = document.createElement('td')
    cellfname.innerHTML = fname
    let celllname = document.createElement('td')
    celllname.innerHTML = lname
 
    body.appendChild(contentrow)

    contentrow.appendChild(cellfname)
    contentrow.appendChild(celllname)

}

//This function is called whenever a button is clicked.
function pressedButton(){
    
    fname = document.getElementById('fname').value
    lname = document.getElementById('lname').value

    if (fname !== '' && lname !== ''){

        document.getElementById('fname').value = ''
        document.getElementById('lname').value = ''

        localStorage.setItem("firstname" + x, fname);
        localStorage.setItem("lastname" + x, lname);
        x++;
        
        addRow(fname, lname)
    }

}