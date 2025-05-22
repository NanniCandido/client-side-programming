 /*
Author:
Date: 1/29/2024
Description: Get date from an API of the 
https://github.com/toddmotto/public-apis/blob/master/README.md

API used from URL: https://date.nager.at/
API URL: https://date.nager.at/api/v3/publicholidays/2024/BR
*/

 // API endpoint for retrieving data (e.g., objects from the American Decorative Arts collection)
 const apiURL = 'https://date.nager.at/api/v3/publicholidays/2024/BR';

 // Function to get data from API
 async function fetchData() {
   try {
     const response = await fetch(apiURL);
     const data = await response.json();
     displayData(data);
   } catch (error) {
     console.error('Error to get data from API:', error);
   }
 }

   // Function to display data on HTML page
   function displayData(data) {
    const holidaysContainer = document.getElementById('holidays-container');

    if (data && data.length > 0) {
      const table = document.createElement('table');
      table.border = '1';

      // Header of the table
      const headerRow = table.insertRow();
      ['Date', 'Local Name','Name', 'Type'].forEach(headerText => {
        const header = document.createElement('th');
        header.appendChild(document.createTextNode(headerText));
        headerRow.appendChild(header);
      });

      // Data lines
      data.forEach(holiday => {
        const row = table.insertRow();
        const dateCell = row.insertCell(0);
        const localCell = row.insertCell(1);
        const nameCell = row.insertCell(2);
        const typeCell = row.insertCell(3);        

        dateCell.appendChild(document.createTextNode(holiday.date));
        localCell.appendChild(document.createTextNode(holiday.localName));        
        nameCell.appendChild(document.createTextNode(holiday.name));
        typeCell.appendChild(document.createTextNode(holiday.types));
      });

      holidaysContainer.appendChild(table);
    } else {
      holidaysContainer.innerHTML = '<p>No data available.</p>';
    }
  }

 // Call the fetchData function when the page loads
 window.onload = fetchData;