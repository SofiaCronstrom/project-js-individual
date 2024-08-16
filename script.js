    // DOM Elements
    const searchInput = document.querySelector('search-input');
    const searchButton = document.querySelector('search-button');
    const searchResults = document.querySelector('search-results');
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
    
    fetchArt();

    // async function ArtImg() {
    //        let arts = await fetchArt();
    //        console.log(arts)
    //        let objectId = await arts.objectIDs; 
    //       objectId.forEach(art => {
    //         console.log(art)
    //       });
    //      }

    async function fetchArt() {
   try {
     let response = await fetch("https://api.artic.edu/api/v1/artworks/search?query[term][is_public_domain]=true&limit=2&fields=id,title,image_id");
     let data = await response.json();
     console.log(data.image_id);
   } catch (error) {
     console.log(error);
   }
 }

