const triggerElement = document.getElementById("NAVBAR")
const NAV2 = document.getElementById("NAV2")
const NAV3 = document.getElementById("NAV3")

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
  const url = 'https://www.gamerpower.com/api/giveaways';

  try {
    const response = await fetch(url);

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
      button.style.backgroundColor = 'rgb(248, 114, 136)';
      button.style.color = 'white';
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

      const description = document.createElement('p');
      description.textContent = game.description;
      description.id = 'game-description';

      // ... other elements for duration, end date, worth

      card.appendChild(image);
      card.appendChild(description);

      // Create link element and append button within it
      gameLink.href = game.open_giveaway_url;
      gameLink.appendChild(button); // Append button inside the link

      card.appendChild(gameLink);
      gameCardsContainer.appendChild(card);
      card.style.width = "90%"
      card.style.display = "flex"; 
      card.style.gap = "10px";
      card.style.height = "fit-content";
      card.style.justifyContent = "space-between";
      card.style.padding = "5px"
    });
  } catch (error) {
    console.error('Error fetching Giveaways:', error);
  }
}


document.addEventListener("DOMContentLoaded", getVideoGames);

