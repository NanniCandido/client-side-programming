/*let sentence1 = "Eu gosto de programar, mas orientação à objetos é um pouco demais para mim.";
let frase = "eu, de, gosto, de, de, programar!"

console.log(frase.split(", ").filter((commas) => commas !== "de"));

sentence1 = sentence1.split(" ");

console.log(sentence1);

// slice é inclusive, exclusive, ou seja, 
//pega o primeiro elemento mencionado, 
//mas para no imediatamente anterior ao segundo elemento mencionado
// seinforma apenas um dos elementos, ele pega todo os elementos a partir do elemento mencionado
console.log(sentence1.slice(0, 5));
console.log(sentence1.slice(1, 3));
console.log(sentence1.slice(1, 2));
console.log(sentence1.slice(0, 1)); // pega apenas o elemento 0
console.log(sentence1.slice(1)); // pega todos os elementos a partir do índice 1
console.log(sentence1.slice(-2)); //pega os dois últimos elementos do array

//console.log(sentence.filter((characters) => characters !== ",").join(" "));

//const novaFrase = 'thisismyawesomestringandIwanttochopitup';

//const novaFrase2 = novaFrase.split("");
//console.log(novaFrase2);
*/
const sentence  = "Thisisareallyawesomesentence";

const chunkList = sentence.split("").reduce((accum, character, i) => {
    if (i % 2 == 0) {
        accum.push(character);
        return accum;
    } 
        accum[accum.length - 1] += character;
        return accum;
},[]);

console.log(chunkList);








