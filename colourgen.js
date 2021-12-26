let hexValuesInitial = [];
let hexValuesFinal = [];
let decimalValuesInitial = [];
let decimalValuesFinal = [];
let resultantGradient = [];

const title = document.getElementById('resultTitle');
const codes = document.getElementById('resultCodes');
const btn = document.getElementById("submit");
const reveal = document.getElementById('show/hide');


//seperate initial hexadecimal colour code into its constituent parts and convert them to decimal values.
function parseHexInput(initial, final) {
  for (let i=1; i<4; i++) {
    hexValuesInitial.push(initial.slice(((2*i) - 1), ((2*i) + 1)));
    };
  for (let i=1; i<4; i++) {
    hexValuesFinal.push(final.slice(((2*i) - 1), ((2*i) + 1)));
  };
  for (let i = 0; i<3; i++) {
    let decimalInitial = parseInt(hexValuesInitial[i], 16);
    decimalValuesInitial[i] = decimalInitial;
    let decimalFinal = parseInt(hexValuesFinal[i], 16);
    decimalValuesFinal[i] = decimalFinal;
  };
  return true;
};

function parseRGBInput(initial, final) {
  let dataI = initial.slice(1, (initial.length - 1));
  let dataF = final.slice(1, (final.length - 1));
  decimalValuesInitial = dataI.split(',');
  decimalValuesFinal = dataF.split(',');
  for (let i=0; i<3; i++) {
    decimalValuesInitial.splice(i, 1, parseInt(decimalValuesInitial[i], 10));
    decimalValuesFinal.splice(i, 1, parseInt(decimalValuesFinal[i], 10));
  };
  return true;
};

function parseToHex (array) {
  for (let i=0; i<array.length; i++) {
    array[i] = array[i].toString(16);
  };
  return array;
};

function parseToDecimal (array) {

}


function generateGradient (resolution, initial, final) {
  let difference = final - initial;
  let length = Math.floor(Math.abs(difference)/resolution);
  let gradientValues = [initial];
  if (difference > 0) {
    for (let i=0; i<length; i++) {
      gradientValues.push(initial + (i+1)*(resolution))
    };
  } else if (difference < 0) {
    for (let i=0; i<length; i++) {
      gradientValues.push(initial - (i+1)*(resolution))
    };
  }
  gradientValues.push(final);
  return gradientValues;
};

function sort (desiredLength, array) {
  let difference = desiredLength - array.length;
  let step = Math.ceil((array.length - 1)/difference);
  let n = step;
    for (let i=0; i<difference; i++) {
      //split the array into two halves at each step, insert a value between the two, 
      //then concatenate them and repeat until it reaches the desired length
      let firstHalf = array.slice(0,n);
      let secondHalf = array.slice(n);
      let avg = (array[n-1] + array[n])/2;
      firstHalf.push(Math.round(avg));
      array = firstHalf.concat(secondHalf);
      n = n + step;
    };
  return array;
};

function max(array) {
  let longest = 0;
  for (let i=0; i<array.length; i++) {
    if (array[i].length > longest) {
      longest = array[i].length;
    };
  };
  return longest;
};

function gradientsFromValues (resolution) {
  let r = generateGradient(resolution, decimalValuesInitial[0], decimalValuesFinal[0]);
  let g = generateGradient(resolution, decimalValuesInitial[1], decimalValuesFinal[1]);
  let b = generateGradient(resolution, decimalValuesInitial[2], decimalValuesFinal[2]);
  let meta = [r,g,b];
  //find longest array and use sort() to insert values to make the others match its length
  let longest = max(meta);
  for (let i=0; i<3; i++) {
    meta[i] = sort(longest, meta[i]);
    meta[i] = parseToHex(meta[i]);
  };
  //add all colour arrays together into usable hexadecimal codes once more
  for (let i=0; i<longest; i++) {
    resultantGradient.push(`#${meta[0][i]}` + `${meta[1][i]}` + `${meta[2][i]}`)
  };
  console.log(resultantGradient)
};

function run(resolution, initial, final, inputType) {
  if (inputType === 'hex') {
    parseHexInput(initial, final);
    gradientsFromValues(resolution);
  } else if (inputType === 'rgb') {
    parseRGBInput(initial, final);
    gradientsFromValues(resolution);
  } else {
    console.log('ERROR: Please enter inputType of "hex" or "rgb" corresponding to the initial and final values\' types.')
  };
  const housing = document.getElementById('gradient-housing')
  for (let i=0; i<resultantGradient.length; i++) {
    let div = document.createElement("div");
    div.id = `gradLine${i}`;
    div.class = 'gradient';
    housing.appendChild(div);
    let divId = document.getElementById(`gradLine${i}`);
    divId.style.background = `${resultantGradient[i]}`;
    }
  appendInitFinal();
  printResults();
  resetForm();
};  

function appendInitFinal() {
  const initHouse = document.getElementById('initial-housing');
  const finalHouse = document.getElementById('final-housing');
  let divInit = document.createElement('div');
  let divFinal = document.createElement('div');
  divInit.id = 'initial';
  divFinal.id = 'final';
  divInit.style.background = `${resultantGradient[0]}`
  divFinal.style.background = `${resultantGradient[resultantGradient.length-1]}`
  initHouse.appendChild(divInit);
  finalHouse.appendChild(divFinal);
};

function printResults() {
  title.innerText = 'The colour codes for your resultant gradient are:';
  let resultString = resultantGradient.toString().replaceAll(',', ', ')
  codes.classList.add('hidden');
  codes.innerText = `${resultString}`
  console.log(resultString);
};

function clearResults () {
    let oldGradient = document.getElementById('gradient-housing');
    let oldCodes = document.getElementById('resultCodes');
    let oldInitialHouse = document.getElementById('initial-housing');
    let oldFinalHouse = document.getElementById('final-housing');
    while (oldGradient.firstElementChild) {
      oldGradient.removeChild(oldGradient.lastElementChild);
    };
    resultantGradient = [];
    oldCodes.innerText = '';
    if (document.getElementById('final') !== null && document.getElementById('initial') !== null) {
      let oldFinal = document.getElementById('final');
      let oldInitial = document.getElementById('initial');
      oldInitialHouse.removeChild(oldInitial);
      oldFinalHouse.removeChild(oldFinal);
    };
    hideCodes();
};

function resetForm() {
  let initial = document.getElementById('valueOne');
  let final = document.getElementById('valueTwo');
  let type = document.getElementById('inputType');
  let resolution = document.getElementById('resolution');
  initial.value = '';
  final.value = '';
  type.value = 'hex';
  resolution.value = 1;
}

function errorText(type, place) {
  if (type === 'both') {
    place.innerText = 'Please enter initial and final values.'
  } else if (type === 'final') {
    place.innerText = 'Please enter a final value.'
  } else if (type === 'initial') {
    place.innerText = 'Please enter an initial value.'
  }
}

function readForm() {
  hexValuesInitial = [];
  hexValuesFinal = [];
  decimalValuesInitial = [];
  decimalValuesFinal = [];
  resultantGradient = [];
  let initial = document.getElementById('valueOne').value;
  let final = document.getElementById('valueTwo').value;
  let type = document.getElementById('inputType').value;
  let resolution = document.getElementById('resolution').value;
  const results = document.getElementById('results')
  const place = document.getElementById('error-text');
  if (initial === "" && final === "") {
    errorText('both', place);
  } else if (final === "") {
    errorText('final', place);
  } else if (initial === "") {
    errorText('initial', place);
  } else {
    place.innerText = '';
    clearResults();
    results.classList.remove('hideResults');
    setTimeout(run(resolution, initial, final, type), 20);
  };
};

function hideCodes() {
  reveal.innerText = 'Show';
  codes.classList.add('hidden');
};

function revealCodes() {
  reveal.innerText = 'Hide';
  codes.classList.remove('hidden');
};

function checkBtn() {
  if (codes.classList.contains('hidden') === true) {
    revealCodes();
  } else {
    hideCodes();
  };
};

function listen() {
  btn.addEventListener('click', readForm);
  reveal.addEventListener('click', checkBtn);
};

listen();

//make decimal output type
//fix reset?
//fix zeros
//append initial and final colour labels
