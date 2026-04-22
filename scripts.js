/**
 * Data Catalog Project Starter Code - SEA Stage 2
 *
 * This file is where you should be doing most of your work. You should
 * also make changes to the HTML and CSS files, but we want you to prioritize
 * demonstrating your understanding of data structures, and you'll do that
 * with the JavaScript code you write in this file.
 *
 * The comments in this file are only to help you learn how the starter code
 * works. The instructions for the project are in the README. That said, here
 * are the three things you should do first to learn about the starter code:
 * - 1 - Change something small in index.html or style.css, then reload your
 *    browser and make sure you can see that change.
 * - 2 - On your browser, right click anywhere on the page and select
 *    "Inspect" to open the browser developer tools. Then, go to the "console"
 *    tab in the new window that opened up. This console is where you will see
 *    JavaScript errors and logs, which is extremely helpful for debugging.
 *    (These instructions assume you're using Chrome, opening developer tools
 *    may be different on other browsers. We suggest using Chrome.)
 * - 3 - Add another string to the titles array a few lines down. Reload your
 *    browser and observe what happens. You should see a fourth "card" appear
 *    with the string you added to the array, but a broken image.
 *
 * **/

// This is an array of the recipes & current recipies (have JSON data to use)
let recipes = [];
let currentRecipes = [];

// Loading JSON data 
async function loadRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    recipes = await response.json(); 
    currentRecipes = [...recipes];
    showCards(); 
  } catch (error) {
    console.error("Failed to load JSON data", error)
  }
}

// This function adds cards the page to display the data in the array
function showCards() {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const templateCard = document.getElementById("template-card");

  for (let i = 0; i < currentRecipes.length; i++) {
    let recipe = currentRecipes[i];

    const card = templateCard.cloneNode(true); //copying template card
    card.style.display = "block";
    card.removeAttribute("id"); 

    editCardContent(card, recipe); // Edit title and image
    cardContainer.appendChild(card); // Add new card to the container
  }
}

//Editing the card content
function editCardContent(card, recipe) {

  card.querySelector("h2").textContent = recipe.name; 

  const cardImage = card.querySelector("img");
  cardImage.src = recipe.image;
  cardImage.alt = recipe.name;

  card.querySelector(".price").textContent = 
  "Price: " + recipe.price + "Bells";

  const list = card.querySelector(".ingredients");
  list.innerHTML = "";

  for (let i = 0; i < recipe.iingredients.length; i++){
    const li = document.createElement("li");
    li.textContent = recipe.ingredients[i].label;
    list.appendChild(li);
  }
}

// filters 
function showAll() {
  currentRecipes = [...recipes];
  showCards(); 
}

function showOfficial() {
  currentRecipes = recipes.filter(r => r.section !== "fanmade");
}

function showFanmade() {
  currentRecipes = recipes.filter(r => r.section === "fanmade");
}

//removing lastcard
function removeLastCard() {
  currentRecipes.pop(); // Remove last item in titles array
  showCards(); // Call showCards again to refresh
}


//loads page, calls loadRecipes() when user first enters page
document.addEventListener("DOMContentLoaded", loadRecipes);

