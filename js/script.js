
/* This function takes a list and a page number,then it iterates through list
   adding the html snippets to the page.
*/
function showPage(list, page) {
   const startIndex = (page * 9) - 9;
   const endIndex = page * 9;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (i = 0; i < list.length; i++) {
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
   for (i=1; i < numOfPages; i++) {
      const button = `
      <li>
         <button type="button">${i}</button>
      </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }
   // Gets first button and sets it's class to active.
   document.querySelector('.pagination button').className = 'active';
   
   // Event Listener for the buttons
   linkList.addEventListener('click', (e) => {
     if (e.target.tagName === 'BUTTON') {
         document.querySelector('.active').className = '';
         e.target.className = 'active';
         showPage(list, e.target.textContent);
     }
   })
};


// Call functions
showPage(data,1 );
addPagination(data);

