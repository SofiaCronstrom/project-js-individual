    // DOM Elements
    const searchInput = document.querySelector('search-input');
    const searchButton = document.querySelector('search-button');
    const searchResults = document.querySelector('.search-results');
    const library = document.querySelector('.art-favorites');
    
    // Local Storage Key
    const STORAGE_KEY = 'artCollection';

    // Fetch books from local storage
    function getLibraryFromLocalStorage() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    // Save books to local storage
    function saveLibraryToLocalStorage(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }
    
    ArtImg();

     async function ArtImg() {
           let arts = await fetchArt();
          
          arts.forEach(art => {
            searchResults.innerHTML += `  <figure>
                                           <img src='${art.url}'/>
                                          <button class="save-button">Save</button>
                                          </figure>`
          });
         }

    async function fetchArt() {
   try {
     let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=9");
     let data = await response.json();
     return data;
   } catch (error) {
     console.log(error);
   }
 }

