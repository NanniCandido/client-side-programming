const apiURL = 'https://date.nager.at/api/v3/publicholidays/2024/BR';

async function displayBRData() {
    const response = await fetch(apiURL);
    const data = await response.json();

      // Data lines
      let htmlText = "<ul>";
      data.forEach(holiday => {

        htmlText += `<li>${holiday.date + "   -   " + holiday.name+ "   -   " + holiday.localName}</li>`;     

      });
    htmlText += "</ul>"; 
    apiDiv.innerHTML += htmlText;
}

const apiDiv = document.getElementById("api-demo");
apiDiv.innerHTML += "<h2>Data Here</h2>";
displayBRData();