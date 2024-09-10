const triggerElement = document.getElementById("NAVBAR")
const triggerElement2 = document.getElementById("CONTENT")
const NAV2 = document.getElementById("NAV2")
const NAV3 = document.getElementById("NAV3")
const upToTop = document.getElementById("UPTOP")

//     ["?sort-by=value","?sort-by=date","?sort-by=popularity"]    //  the main sorting choices
let choice = "?sort-by=date"
//sorting controls//
let defaultSort = "giveaways"
let platform = ""


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      NAV2.style.display = 'flex'; // Show navbar
      upToTop.style.display = 'flex';//show up to top button when user goes down
    } else {
      NAV2.style.display = 'none'; // Hide navbar
      upToTop.style.display = 'flex';//hide uptotop button.
    } 
  });
});

observer.observe(triggerElement);




const myElement = document.getElementById("NAVBAR");
const myButton = document.getElementById('UPTOP');

let isShown = false;

window.addEventListener('scroll', () => {
  const elementRect = myElement.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (elementRect.top < windowHeight && !isShown) {
    myButton.style.display = 'block';
    isShown = true;
  } else if (window.scrollY === 0) {
    myButton.style.display = 'none';
    isShown = false;
  }
});


let isNavbarVisible = false;

function toggleNavbar() {
  let popup1 = document.getElementById("menupop1");
  let popup2 = document.getElementById("menupop2");

  if (isNavbarVisible) {
    popup1.style.display = "none";
    popup2.style.display = "none";
    isNavbarVisible = false;
  } else {
    popup1.style.display = "flex";
    popup2.style.display = "flex";
    isNavbarVisible = true;
  }
}
//added event listeners for collapsing the popup after its clicked
let popup1 = document.getElementById("menupop1");
let popup2 = document.getElementById("menupop2");
popup1.addEventListener('click', toggleNavbar)
popup2.addEventListener('click', toggleNavbar)


async function getVideoGames() {


  const corsProxyUrl = "https://corsproxy.io/?"
  const url = 'https://www.gamerpower.com/api/giveaways'
  

  const finishedUrl = corsProxyUrl + url + choice

  try {
    const response = await fetch(finishedUrl,{ cache: 'no-cache' }); 

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const gameCardsContainer = document.getElementById("IMAGES-GIVE-AWAY"); 
    

    data.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('Game-card');
      
      const image = document.createElement('img');
      const button = document.createElement('button');
button.classList.add('Game-button');

const gameLink = document.createElement('a');  

// Set button text content (optional)
button.textContent = "Get Now"; 

// Add event listener for mouseover
button.addEventListener('mouseover', () => {
  button.style.backgroundColor = "#008B8B";
  button.style.color = "black"
  button.style.width = "100%"
  button.textContent = "Get now →"; 
});

button.addEventListener('mouseout', () => {
  button.style.backgroundColor = ""; // Reset to default color
  button.style.color = "white"
  button.textContent = "Get Now"; 
});

//variables declarations//
const description = document.createElement('p');
const AccessInfo = document.createElement('p');
const AcessDiv = document.createElement('div');
const Worth = document.createElement('p');
const GameTitle = document.createElement('p');


      button.style.backgroundColor = 'transparent';
      button.style.color = 'white';
      button.style.borderWidth = '2px'
      button.style.width = "100%"
      button.style.borderColor = "#008B8B"
      button.style.padding = '15px 32px';
      button.style.textAlign = 'center';
      button.style.textDecoration = 'none';
      button.style.display = 'inline-block';
      button.style.fontSize = '12px';
      button.style.margin = '4px 2px';
      button.style.cursor = 'pointer';
      button.style.borderRadius = '12px';
      button.style.transition = 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out';
      image.src = game.image || game.thumbnail; // I Used the image if available if not fallback to thumbnail
      image.alt = game.title;
      image.className = 'game-card-image';
      image.style.objectFit = "cover"; // Added for better image scaling
      image.style.height = "50%"
      GameTitle.textContent = game.title
      GameTitle.style.color = "cyan"
      GameTitle.style.textTransform = "uppercase"
      GameTitle.style.fontFamily = "impact"
      GameTitle.style.fontSize = "20px"
      Worth.style.position = "absolute"
      Worth.style.top = "0"
      Worth.style.fontSize = "15px"
      Worth.style.right = "0"
      Worth.style.backgroundColor = "cyan"
      Worth.textContent = `Was ${game.worth} now $0`
      Worth.style.padding = "5px"
      Worth.style.fontFamily = "Josefin sans"
      AcessDiv.style.display = "flex"
      AcessDiv.style.flexDirection = "row"
      AcessDiv.style.justifyContent = "space-between"
      AcessDiv.style.alignItems = "center"
      AcessDiv.style.width = "100%"
      AccessInfo.style.padding = '15px 32px';
      AccessInfo.style.margin = '4px 2px';
      AccessInfo.style.cursor = 'pointer';
      AccessInfo.style.borderRadius = '12px';
      AccessInfo.textContent = game.type;
      AccessInfo.style.fontSize = "12px"
      AccessInfo.style.backgroundColor = "#008B8B"
      description.textContent = game.description;
      description.id = 'game-description';
      description.className = "descr";
      description.style.fontFamily = "Josefin sans, monospace"
      description.style.color = "white"
      description.style.cursor = "auto"
      // ... other elements for duration, end date, worth
      card.appendChild(image);
      card.appendChild(GameTitle);
      card.appendChild(description);
      card.appendChild(AcessDiv);
      AcessDiv.appendChild(AccessInfo);
      AcessDiv.appendChild(gameLink);
      gameLink.href = game.open_giveaway_url;
      gameLink.target = "_blank"
      gameLink.appendChild(button); // Append button inside the link
      card.appendChild(AcessDiv);
      card.appendChild(Worth);
      gameCardsContainer.appendChild(card);
      card.style.width = "90%"
      card.style.display = "flex";
      card.style.gap = "10px";
      card.style.justifyContent = "space-between";
      card.style.padding = "5px"
      function adjustCardHeight() {
        if (window.innerWidth < 768) {
          card.style.height = "fit-content"; 
        } else {
          card.style.height = "500px"; 
        }
      }
      adjustCardHeight();
      window.addEventListener("resize", adjustCardHeight);
      card.style.overflowY = "scroll" 
      card.style.scrollbarWidth = "none"
      card.style.position = "relative"
      card.style.border = "none"
      card.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.9)"
      card.style.backgroundColor = "#2F2D2E"

      card.addEventListener('mouseover', () => {
        card.style.backgroundColor = "#3b3a3b"
        card.style.boxShadow = "0px 4px 5px 1px #008B8B, 0px 6px 20px 10px rgba(255, 255, 255, 0.15)" 
      });
      card.addEventListener('mouseout', () => {
        card.style.backgroundColor = "#2F2D2E"
        card.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.9)" 
      });      
    });
  } catch (error) {
    console.error('Error fetching Giveaways:', error);

  }





}



document.addEventListener("DOMContentLoaded", getVideoGames);

//function for disappearing loading screen after website launch
document.addEventListener("DOMContentLoaded", function () {
  let loader = document.getElementById("LOADER");
  let targetImg = document.getElementById("MAIN1");

  if (loader && targetImg) {
    targetImg.onload = function () {
      loader.style.display = "none";
    };
  } else {
    console.error
  }
  let timeoutId = setTimeout(() => {
    loader.style.display = "none";
  }, 1000);

  targetImg.onload = function () {
    clearTimeout(timeoutId); // most useless inmplementation to make the user think they have fast internet
    loader.style.display = "none";
  };
});

let isContactsVisible = true;

function toggleContacts() {
  let contactPop = document.getElementById("contacts");
  let close = document.getElementById("closebutton");

  if (isContactsVisible) {
    contactPop.style.display = "flex";
    close.style.display = "flex"
    isContactsVisible = false;
  }
  else {
    contactPop.style.display = "none";
    isContactsVisible = true;
    close.style.display = "none"
  }
}


async function EstimateWorth(){

  let WorthMessage = document.getElementById("games-worth")
  let NoOfGiveaways = document.getElementById("games-no")

  const url = 'https://gamerpower.com/api/worth/'
  const corsProxyUrl = "https://api.codetabs.com/v1/proxy?quest="
  const finishedUrl = corsProxyUrl+url

  try {

    const response = await fetch(finishedUrl,{ cache: 'no-cache' }); 
    const data = await response.json();
    WorthMessage.textContent = `Save on a total of $ ${data.worth_estimation_usd}`
    WorthMessage.style.color = "black"
    WorthMessage.style.fontFamily = "josefin sans, impact, monospace"
    WorthMessage.style.fontSize = "30px"
    

    NoOfGiveaways.textContent = `Active giveaways Today: ${data.active_giveaways_number}.`
    NoOfGiveaways.style.color = "black"
    NoOfGiveaways.style.fontFamily = "josefin sans, impact, monospace"
    NoOfGiveaways.style.fontSize = "30px"


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    
  } catch (error) {
    console.error('Error fetching games worth:', error);

  }

}
EstimateWorth()



let isSortAvail = true; // I Initially set it to true to mimic an already true state for the sort button.

function toggleSorter() {
  let sort = document.getElementById("game-sorter");

  if (isSortAvail) {
    sort.style.display = "flex";
    isSortAvail = false;
  } else {
    sort.style.display = "none";
    isSortAvail = true;
  }
}

function sortBydate(){
    document.getElementById("IMAGES-GIVE-AWAY").innerHTML = ""
    choice = "?sort-by=date";
    getVideoGames();
}
function sortByValue(){
    document.getElementById("IMAGES-GIVE-AWAY").innerHTML = ""
    choice = "?sort-by=value";
    getVideoGames();
}
function sortByPopularity(){
    document.getElementById("IMAGES-GIVE-AWAY").innerHTML = ""
    choice = "?sort-by=popularity";
    getVideoGames();
}
function sortByAll(){
  document.getElementById("IMAGES-GIVE-AWAY").innerHTML = ""
  choice = "";
  getVideoGames();
}

function toggleCookieBar(){
    document.querySelector(".COOKIE_BAR").style.display = "none"
}



