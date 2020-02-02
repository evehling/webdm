// functionality for chrome extension

function getSearchQuery() {
   let input = document.getElementsByClassName("gLFyf")[0];
 
   if(input.value.length) {
     // create a new div element 
     let newDiv = document.createElement("div"); 
     let newContent = document.createTextNode(input.value); 
 
     newDiv.appendChild(newContent);  
     newDiv.style.position = "absolute";
     newDiv.style.height = "100vh";
     newDiv.style.width = "100vw";
     newDiv.style.background = "black";
 
      console.log("making api call");
     //document.getElementsByTagName("body")[0].appendChild(newContent);
      fetch("https://73f816ea.ngrok.io",
        {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, *cors, same-origin
          credentials: 'same-origin', // include, *same-origin, omit
          headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'text'
            //'Content-Type': 'application/x-www-form-urlencoded',
          },
          //body: JSON.stringify({"input": "Itchy skin"})
          //body: "{\"input\": \"Itchy skin\"}"
          //body: "hi"
        })
        .then(res => {console.log(res); return res.json()})
        .then(data => console.log(data))
        .catch(err => console.log(err));

   }
 }
 getSearchQuery();

// Gets current window url
/*chrome.tabs.query({
    currentWindow: true,
    active: true
  }, foundTabs => {
    let url = foundTabs[0].url;
    if(url == "https://www.google.com/") {
      alert("https://www.google.com/");
    }
  });
*/
