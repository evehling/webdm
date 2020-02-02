// functionality for chrome extension

function getSearchQuery() {
  let form = document.getElementById("tsf");
  let input = document.getElementsByClassName("gLFyf")[0];
      
  form.addEventListener("submit", e => {
      e.preventDefault();
      // create a new div element 
      let newDiv = document.createElement("div"); 
      let newContent = document.createTextNode(input.value); 

      newDiv.appendChild(newContent);  
      document.getElementsByTagName("body")[0].appendChild(newContent);
  });
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
