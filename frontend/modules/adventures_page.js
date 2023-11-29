
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const urlParams = new URLSearchParams(search);
  const cityId = urlParams.get("city");
  return cityId;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  try {
    // Display loading indicator here if applicable
    const response = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch adventures. Status: ${response.status}`);
    }
    const data = await response.json();
    // Hide loading indicator here if applicable
    return data;
  } catch (error) {
    // console.error("Error fetching adventures:", error);
   return null // Rethrow the error for the calling code to handle
  }return null
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
    // Get the parent container where adventure cards will be added
    const adventureContainer = document.getElementById("data");

    // Loop through the list of adventures
    adventures.forEach(adventure => {
      // Create a card element
      const card = document.createElement("div");
      card.classList.add("activity-card");
  
      // Create a link element for each card
      const link = document.createElement("a");
      link.href = `detail/?adventure=${adventure.id}`;
      link.setAttribute("id", adventure.id);
      link.classList.add("activity-card-link");
  
      // Create an image element and set its source
      const image = document.createElement("img");
      image.src = adventure.image;
      image.alt = adventure.name; // Add alt text for accessibility
      image.classList.add("activity-card-img");

  
      // Create a category banner
      const categoryBanner = document.createElement("div");
      categoryBanner.classList.add("category-banner");
      categoryBanner.innerText = adventure.category;
  
      // Create a div for adventure details
      const details = document.createElement("div");
      details.classList.add("activity-card-details");
  
      // Populate adventure details
      details.innerHTML = `
        <h2>${adventure.name}</h2>
        <p>${adventure.duration} | $${adventure.costPerHead}</p>
      `;
  
      // Append elements to the card
      link.appendChild(image);
      card.appendChild(link);
      card.appendChild(categoryBanner);
      card.appendChild(details);
  
      // Append the card to the adventure container
      adventureContainer.appendChild(card);
    });
   

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // : MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => adventure.duration > low && adventure.duration <= high);
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // : MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure => categoryList.includes(adventure.category));
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // : MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let filteredList = list;

  if (filters.duration != null && filters.duration !== "") {
    const [low, high] = filters.duration.split("-");
    filteredList = filterByDuration(list, parseInt(low), parseInt(high));
  }

  if (filters.category != null && filters.category.length !== 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem("filters"))

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM


function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const pillsParent = document.getElementById("category-list");
  filters.category.forEach(categoryStr => {
  const pill = document.createElement("div");
  pill.className = "category-filter";
  pill.textContent = categoryStr;
  pillsParent.append(pill);
})
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
