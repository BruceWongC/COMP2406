//Array of item names that we will create buttons and textnodes (labels)
let items =["item 1", "item 2", "item 3"]

//When the index.html loads and the button.js script file is loaded by the index.html 
//then create some buttons
window.addEventListener('load', (event) => {
    createButtons()
})

//Will create the buttons and append them to the itemsAndButton div tag on the
//index.html page.
function createButtons(){
        //Get access to the div tag with the id named "itemsAndButtons"
        let buttonLocation = document.getElementById("itemsAndButtons")

        //Loop through the array of items and create a button and textnode and 
        //append to the parent div tag (itemsAndButtons)
        // <div>
        //   <input type='button' value='itemInTheItemsArray' id='itemInTheItemsArray'>
        //     itemInTheItemsArrayText
        // </div>
        items.forEach(item =>{

            let newDiv = document.createElement("div");

            //Create and add the new buttons
            let newItem = document.createElement("input");
            newItem.type = "button";
            newItem.value = item;
            newItem.id = item;
            //set the onclick event listener for each button to the function pressedButton
            newItem.onclick = pressedButton;
            newDiv.appendChild(newItem);
        
            //Create and add the new text node (the item name)
            let text = document.createTextNode(item);
            newDiv.appendChild(text);
        
            //Add newly created div to children of itemsAndButtons div
            buttonLocation.appendChild(newDiv);
        })
}

//This function is called whenever a button is clicked.
function pressedButton(event){
    //this.id refers to the button id that you added in the createButtons function
    //this.id is for the specific button pressed.
    console.log('button clicked', this.id);
    alert("Button: " + this.id + " pressed.");
}