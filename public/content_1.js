// functionality for chrome extension
//  alert("You've successfully used cloud extension, congratz!");

// var enterBtn = document.getElementsByClassName("gLFyf");
// document.getElementsByClassName("")
// alert("Accessed the DOM");
function overlayOn(){
    document.getElementById("overlay").style.display = "block";
}

function overlayOff(){
    document.getElementById("overlay").style.display = "none";
}

searchArr = document.getElementsByClassName("gLFyf");

// prompts user when pressing enter
document.getElementById("tsf").addEventListener("submit", 

    event => { alert("stop pressing the button"),
    alert(searchArr[0].value),
    // overlayOn()
    document.getElementById("overlay").style.display = "block",
    event.preventDefault()

});


// console.log(searchArr[0].value);
// chrome.tabs.query
