
/* This function takes a list and a page number,then it iterates through list
   adding the html snippets to the page.
*/

function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for ( let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         const studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class="email">${list[i].email}</span>
               </div>
               <div class="joined-details">
                  <span class="date">${list[i].registered.date}</span>
               </div>
            </li>
         `;

         studentList.insertAdjacentHTML('beforeend', studentItem);
      }
   }
};



/*
This function will create and insert/append the elements needed for the pagination buttons.
It will also create a event listener for the buttons to navigate to the according page
when clicked.
*/
function addPagination (list) {
   const numOfPages = Math.ceil(list.length/9);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
      for (let i=1; i <= numOfPages; i++) {
         let button = `
            <li>
               <button type="button">${[i]}</button>
            </li>
            `;
         // Only displays button if there are more than 1 page needed
         if (numOfPages >= 2) {
            linkList.insertAdjacentHTML('beforeend', button);
            // Gets first button and sets it's class to active.
            document.querySelector('.pagination button').className = 'active';
         }
      }
   
   
   // Event Listener for the buttons
   linkList.addEventListener('click', (e) => {
     if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
     }
   })
};


// Search bar Feature
const header = document.querySelector('.header');
const searchBar = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
`;

header.insertAdjacentHTML('beforeend', searchBar);

//search function
const search = document.querySelector('#search');
//no matches variables
document.querySelector('.header').insertAdjacentHTML('afterend',`<div id="noresults"><h2>No results found.</h2><p>Try again.</p></div>`);
document.querySelector('#noresults').style.display = 'none';
function searchName (input) {
   //set input to lowercase 
   let newInput = input.toString().toLowerCase();
   //create new list 
   let newList = [];
   //loop through data and find matches
   //if matches first or last name, push that student to the new students list
   for (let i = 0; i < data.length ; i++) {
      let firstName = data[i].name.first.toLowerCase();
      let lastName = data[i].name.last.toLowerCase();
      if (firstName.indexOf(newInput) !== -1) {
         newList.push(data[i]);
      } else if (lastName.indexOf(newInput) !== -1) {
         newList.push(data[i]);
      } 
   }
   
   if (newList.length < 1) {
      document.querySelector('#noresults').style.display = 'block';
   } else {document.querySelector('#noresults').style.display = 'none';}
   // function calls for search input
   addPagination(newList);
   showPage(newList,1);
};

//event listener for keyup on search bar
search.addEventListener('keyup', (e) => {
  let name = e.target.value;
  searchName(name);
});

//event listener on submit button click
const searchButton = search.nextElementSibling;
searchButton.addEventListener('click', () => {
      let name = search.value;
      searchName(name);
});

// Call functions
showPage(data,1 );
addPagination(data);