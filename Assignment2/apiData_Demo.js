 /*
Author:
Date: 1/29/2024
Description: Get date from an API of the 
https://github.com/toddmotto/public-apis/blob/master/README.md

API used from URL: https://date.nager.at/
API URL: https://date.nager.at/api/v3/publicholidays/2024/BR
*/

const URL = 'https://date.nager.at/api/v3/publicholidays/2024/BR';
        
xmlHttpReq = () => {
    console.log('XMLHttpRequest');

    function reqListener () {
        let names = mapNames(JSON.parse(this.responseText)); 
        console.log(names.name);
        listAll(names);
    };

    let req = new XMLHttpRequest();
    req.onload = reqListener;
    req.open("get", URL, true);
    req.send();
}

fetchAPI = () => {
    console.log('fetchAPI');

    fetch(URL)
        .then((resp) => resp.json())
        .then(function(response) {
            let names = mapNames(response);           

            listAll(names);       

            return response;
        })
        .catch(function(error) {
            console.log(error)
        });
}

createNode = (parent, id, text) => {
    let li = document.createElement("li");
    
    li.appendChild(document.createTextNode(text));
    li.setAttribute("id", id);

    return li;
}

listAll = (result) => {
    let ul = document.getElementById("holidays");

    clearItems();

    for (let index = 0; index < result.length; index++) {
        let li = createNode(ul, index, result[index]);

        ul.appendChild(li);
    }       
}

function main() {

clearItems = () => holidays.innerHTML = "";

mapNames = (list) => list.map((item) => item.date+" - "+item.localName+" - "+item.name);

}
 // Call the fetchData function when the page loads
 window.onload = fetchAPI;
main();