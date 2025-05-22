const apiURL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/1';

async function displayData() {
    const response = await fetch(apiURL);
    const data = await response.json();

      // Data lines
    let htmlText = "<ul>";
    htmlText += `<li><b>Department:</b> ${data.department}</li>`;
    htmlText += `<li><b>Object Name:</b> ${data.objectName}</li>`;
    htmlText += `<li><b>Object Title:</b> ${data.title}</li>`;
    htmlText += `<li><b>Artist Name:</b> ${data.artistDisplayName}</li>`;
    htmlText += `<li><b>Artist Bio:</b> ${data.artistDisplayBio}</li>`;
    htmlText += `<li><b>Role:</b> ${data.constituents[0].role}</li>`;
    htmlText += `<li><b>Name:</b> ${data.constituents[0].name}</li>`;
    htmlText += `<li><b>URL:</b> ${data.constituents[0].constituentULAN_URL}</li>`;
    htmlText += `<li><b>Wiki URL:</b> ${data.constituents[0].constituentWikidata_URL}</li>`;
    htmlText += "</ul>"; 
    apiDiv.innerHTML += htmlText;
}

const apiDiv = document.getElementById("api-demo");
apiDiv.innerHTML += "<h2>Api Data</h2>";
displayData();