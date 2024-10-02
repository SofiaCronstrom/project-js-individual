// DOM Elements
const searchButton = document.querySelector(".search-button");
const searchResults = document.querySelector(".search-results");
const catCollection = document.querySelector(".cat-favorites");

// Local Storage Key
const CAT_KEY = "catCollection";

// Fetch cats from local storage
function getCollectionFromLocalStorage() {
  return JSON.parse(localStorage.getItem(CAT_KEY)) || [];
}

// Save cats to local storage
function saveCollectionToLocalStorage(cats) {
  localStorage.setItem(CAT_KEY, JSON.stringify(cats));
}

//Render collection
function renderCollection() {
  let cats = getCollectionFromLocalStorage();

  //sort pinned images
  cats = cats.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  catCollection.innerHTML = "";
  cats.forEach((cat, index) => {
    catCollection.innerHTML += `<figure>
        <img src='${cat.image}'/>
        <button data-index="${index}" class="pin-btn">
        ${cat.pinned ? "Unpin" : "Pin"}
        </button>
        <button data-index="${index}" class="remove-btn">
        Remove
        </button>
        </figure>`;
  });
}

//Add image to cat collection
function addCat(image) {
  const cats = getCollectionFromLocalStorage();
  cats.push({ image, pinned: false });
  saveCollectionToLocalStorage(cats);
  renderCollection();
}

// Toggle the pinned status
function togglePinnedImg(index) {
  const cats = getCollectionFromLocalStorage();
  cats[index].pinned = !cats[index].pinned;
  saveCollectionToLocalStorage(cats);
  renderCollection();
}

// Remove a cat image from the collection
function removeCat(index) {
  const cats = getCollectionFromLocalStorage();
  cats.splice(index, 1);
  saveCollectionToLocalStorage(cats);
  renderCollection();
}

//Fetch random 10 cat images
async function catImg(cats) {
  searchResults.innerHTML = "";
  console.log(cats);
  cats.forEach((cat) => {
    searchResults.innerHTML += `  <figure>
                                           <img src='${cat.url}'/>
                                          <button data-title="${cat.url}"class="save-btn">Save</button>
                                          </figure>`;
  });
}

async function fetchCat() {
  await fetch("https://api.thecatapi.com/v1/images/search?limit=9")
    .then((response) => response.json())
    .then((data) => catImg(data))
    .catch((error) => console.error("Error fetching books:", error));
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchCat();
});

searchResults.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("save-btn")) {
    const image = e.target.getAttribute("data-title");
    addCat(image);
  }
});

catCollection.addEventListener("click", (e) => {
  e.preventDefault();
  const index = e.target.getAttribute("data-index");

  if (e.target.classList.contains("remove-btn")) {
    removeCat(index);
  } else if (e.target.classList.contains("pin-btn")) {
    togglePinnedImg(index);
  }
});

// Initial render of the collection
renderCollection();
