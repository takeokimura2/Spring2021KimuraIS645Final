//const { parse } = require("dotenv");

const formElement = document.querySelector("form");

function sumofincrements(startNumber, endNumber, increment) {

  let sumofSeries = 0;
  let newIncrement = increment;

  for (let i = startNumber; i <= endNumber; i += increment) {
    sumofSeries += i

  }
  return `The sum of the numbers from ${startNumber} to ${endNumber} increamented by ${increment} is ${sumofSeries}`
}

formElement.addEventListener("submit", e => {

  e.preventDefault();

  const startElement = parseInt(e.target.elements.startnumber.value);
  const endElement = parseInt(e.target.elements.endnumber.value);
  const incrementElement = parseInt(e.target.elements.increment.value);

  console.log(startElement);
  console.log(endElement);
  console.log(incrementElement);

  if (startElement >= endElement) {

    showResult = document.getElementById("output");
    userValue = document.createElement("p");
    userValue.innerText = "Ending number must be greater than starting number";
    showResult.appendChild(userValue)

  }
  else {
    result = sumofincrements(startElement, endElement, incrementElement)

    console.log(result);

    showResult = document.getElementById("output");
    userValue = document.createElement("p");
    userValue.innerText = result;
    showResult.appendChild(userValue)
  }
})




