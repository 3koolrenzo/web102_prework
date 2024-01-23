/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        
        // create a new div element, which will become the game card
        const game = document.createElement("div");

        // add the class game-card to the list
        game.classList.add("game-card");

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game.innerHTML = `
            <img src="${games[i].img}" alt="${games[i].name}" class="game-img "/>
            <h3>${games[i].title} </h3>
            <p>${games[i].description}</p>
        `;
        
        // append the game to the games-container
        gamesContainer.appendChild(game);
    }
}
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
    addGamesToPage(GAMES_JSON)

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((accumulator, game) => accumulator + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<strong>${totalContributions.toLocaleString()}</strong> total contributions`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalAmountRaised = GAMES_JSON.reduce((accumulator, game) => accumulator + game.pledged, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `<strong>${totalAmountRaised.toLocaleString("en-US", { style: "currency", currency: "USD" })}</strong> total raised`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `<strong>${GAMES_JSON.length}</strong> games on the site`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    console.log("Unfunded Games:", unfundedGames);
    console.log("Number of Unfunded Games:", unfundedGames.length);


    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    console.log("funded Games:", fundedGames);
    console.log("Number of funded Games:", fundedGames.length);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// create a string that explains the number of unfunded games using the ternary operator
const unfundedGamesDescription = `A total of $${totalAmountRaised.toLocaleString()} has been rasied for
${GAMES_JSON.length} games. Currently, ${numUnfundedGames} games remain ${numUnfundedGames === 1 ? 'unfunded game' : 'unfunded'}. 
We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = unfundedGamesDescription;
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [topGame, runnerUpGame, ...restOfGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const displayGame = (game, container) => {
    const newElement = document.createElement("div");
    newElement.textContent = game.name;
    container.appendChild(newElement);
};

// do the same for the runner up item
displayGame(topGame, firstGameContainer);
displayGame(runnerUpGame, secondGameContainer);