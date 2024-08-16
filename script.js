    // DOM Elements
    const searchInput = document.querySelector('search-input');
    const searchButton = document.querySelector('search-button');
    const searchResults = document.querySelector('.search-results');
    const catCollection = document.querySelector('.art-favorites');
    
    // Local Storage Key
    const CAT_KEY = 'catCollection';

    // Fetch books from local storage
    function getCollectionFromLocalStorage() {
        return JSON.parse(localStorage.getItem(CAT_KEY)) || [];
    }

    // Save books to local storage
    function saveCollectionToLocalStorage(books) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    }

    //Render library
    function renderCollection() {
      let cats = getCollectionFromLocalStorage();
      
      //sort pinned images
      cats = cats.sort((a, b) =>(b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

      catCollection.innerHTML = '';
      cats.forEach((cat, index) => {
       
        catCollection.innerHTML +=
        `<figure>
        <img src='${cat.url}'/>
        <button data-index="${index}" class="pin-btn">
        ${cat.pinned ? 'Unpin' : 'Pin'}
        </button>
        <button data-index="${index}" class="remove-btn">
        Remove
        </button>
        </figure>`;
        
      });
    }
    
    //Add image to cat collection
    function addCat (image){
    
      const cats = getCollectionFromLocalStorage();
      cats.push({ image, pinned: false });
      saveCollactionToLocalStorage(books);
      renderLibrary();
 
    }
    
    // Toggle the pinned status
    function togglePinnedImg(index) {
      const cats = getCollectionFromLocalStorage();
      cats[index].pinned = !cats[index].pinned; 
      saveCollectionToLocalStorage(books);
      renderCollection();
  }

    ArtImg();
     //Fetch random 10 cat images
     async function catImg() {
           let cats = await fetchCat();
          
          cats.forEach(cat => {
            searchResults.innerHTML += `  <figure>
                                           <img src='${cat.url}'/>
                                          <button data-title="${cat.url}"class="save-button">Save</button>
                                          </figure>`
          });
         }

    async function fetchCat() {
   try {
     let response = await fetch("https://api.thecatapi.com/v1/images/search?limit=9");
     let data = await response.json();
     return data;
   } catch (error) {
     console.log(error);
   }
 }

