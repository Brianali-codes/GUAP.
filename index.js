const triggerElement = document.getElementById("NAVBAR")
const NAV2 = document.getElementById("NAV2")
const NAV3 = document.getElementById("NAV3")


//sorting controls//
let defaultSort = "giveaways"
let platform = ""


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      NAV2.style.display = 'flex'; // Show search bar

    } else {
      NAV2.style.display = 'none'; // Hide search bar

    }
  });
});

observer.observe(triggerElement);

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


async function getVideoGames() {


  const corsProxyUrl = "https://corsproxy.io/?"
  const url = 'https://www.gamerpower.com/api/giveaways?'
  const PF = platform;

  const finishedUrl = corsProxyUrl + url
  try {
    const response = await fetch(finishedUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const gameCardsContainer = document.getElementById("IMAGES-GIVE-AWAY"); // Choose this container consistently

    data.forEach(game => {
      const card = document.createElement('div');
      card.classList.add('Game-card');

      const image = document.createElement('img');
      const button = document.createElement('button');
      const gameLink = document.createElement('a');

      // Set button text content (optional)
      button.textContent = "Get Now"; // Adjust as needed

      // Apply styles (assuming these are the desired styles)
      button.style.backgroundColor = 'transparent';
      button.style.color = 'white';
      button.style.borderWidth = '1px'
      button.style.borderColor = "white"
      button.style.padding = '15px 32px';
      button.style.textAlign = 'center';
      button.style.textDecoration = 'none';
      button.style.display = 'inline-block';
      button.style.fontSize = '16px';
      button.style.margin = '4px 2px';
      button.style.cursor = 'pointer';
      button.style.borderRadius = '12px';
      button.style.transition = 'background-color 0.3s ease-in-out, transform 0.2s ease-in-out';
      image.src = game.image || game.thumbnail; // Use image if available, fallback to thumbnail
      image.alt = game.title;
      image.className = 'game-card-image';
      image.style.objectFit = "cover"; // Add for image scaling
      image.style.height = "50%"
      const description = document.createElement('p');
      const AccessInfo = document.createElement('p');
      const AcessDiv = document.createElement('div');
      const Worth = document.createElement('p');
      const GameTitle = document.createElement('p');

      GameTitle.textContent = game.title
      GameTitle.style.color = "pink"
      GameTitle.style.textTransform = "uppercase"
      GameTitle.style.fontFamily = "impact"
      GameTitle.style.fontSize = "20px"

      AccessInfo.textContent = game.type;

      if (AccessInfo.textContent.trim() === "Early Access") {
        AcessDiv.backgroundColor = "red";
        AccessInfo.style.fontSize = "15px";
      } else if (AccessInfo.textContent.trim() === "Game") {
        AcessDiv.backgroundColor = "green";
      } else if (AccessInfo.textContent.trim() === "DLC") {
        AcessDiv.backgroundColor = "pink";
      }
      console.log(game.type)


      Worth.style.position = "absolute"
      Worth.style.top = "0"
      Worth.style.fontSize = "20px"
      Worth.style.right = "0"
      Worth.style.backgroundColor = "pink"
      Worth.textContent = `Save ${game.worth}`
      Worth.style.padding = "5px"
      Worth.style.fontFamily = "Josefin sans"

      AcessDiv.style.display = "flex"
      AcessDiv.style.flexDirection = "row"
      AcessDiv.style.justifyContent = "space-between"
      AcessDiv.style.alignItems = "center"
      AcessDiv.style.width = "100%"
      AcessDiv.style.border = "solid"
      AcessDiv.style.borderRadius = "10px"
      AcessDiv.style.borderWidth = "1px"
      AccessInfo.style.padding = '15px 32px';
      AccessInfo.style.margin = '4px 2px';
      AccessInfo.style.cursor = 'pointer';
      AccessInfo.style.borderRadius = '12px';



      
      AccessInfo.textContent = game.type;

      if (AccessInfo.textContent.trim() === "Early Access") {
        AcessDiv.backgroundColor = "red";
        AccessInfo.style.fontSize = "15px";
      } else if (AccessInfo.textContent.trim() === "Game") {
        AcessDiv.backgroundColor = "green";
      } else if (AccessInfo.textContent.trim() === "DLC") {
        AcessDiv.backgroundColor = "pink";
      }
      console.log(game.type)

      AccessInfo.style.backgroundColor = "rgba(255, 100, 150, 0.7)"
      description.textContent = game.description;
      description.id = 'game-description';
      description.className = "descr";
      description.style.fontFamily = "Josefin sans, monospace"
      description.style.color = "white"

      // ... other elements for duration, end date, worth

      card.appendChild(image);
      card.appendChild(GameTitle);
      card.appendChild(description);
      card.appendChild(AcessDiv);

      AcessDiv.appendChild(AccessInfo);
      AcessDiv.appendChild(gameLink);

      // Create link element and append button within it
      gameLink.href = game.open_giveaway_url;
      gameLink.target = "_blank"
      gameLink.appendChild(button); // Append button inside the link

      card.appendChild(AcessDiv);
      card.appendChild(Worth);


      gameCardsContainer.appendChild(card);



      card.style.width = "90%"
      card.style.display = "flex";
      card.style.gap = "10px";
      card.style.height = "fit-content";
      card.style.justifyContent = "space-between";
      card.style.padding = "5px"
      card.style.height = "450px"
      card.style.overflowY = "scroll"
      card.style.scrollbarWidth = "none"
      card.style.position = "relative"
      console.log(game)
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
      console.log("content loaded");
    };
  } else {
    console.error("Either LOADER or MAIN element not found!");
  }
  let timeoutId = setTimeout(() => {
    loader.style.display = "none";
    console.log("Content loaded after timeout");
  }, 1000);

  targetImg.onload = function () {
    clearTimeout(timeoutId); // most useless inmplementation to make the user think they have fast internet
    loader.style.display = "none";
    console.log("Content loaded");
  };
});

let isContactsVisible = false;

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


