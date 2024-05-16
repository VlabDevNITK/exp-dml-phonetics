let simsubscreennum = 0;
let currentCanvasNum = 0;
function nextCanvas() {
  hideCurrentCanvas();
  showNextCanvas();
}

function hideCurrentCanvas() {
  document.getElementById(`canvas${currentCanvasNum}`).style.visibility =
    "hidden";
}

function showNextCanvas() {
  currentCanvasNum++;
  document.getElementById(`canvas${currentCanvasNum}`).style.visibility =
    "visible";
}


function selectAlphabet(alphabet) {
  document.getElementById("outputValue2").innerHTML =
    "<span style='font-weight: bold;'>" + alphabet + "</span>";
}



function showImage(targetCanvas) {
  var alphabetsRadio = document.getElementById("alphabets");
  var figureCodeRadio = document.getElementById("figure-code");
  var nextImage = document.getElementById("nextImage");

  if ((alphabetsRadio.checked || figureCodeRadio.checked) && targetCanvas) {
    // If either radio button is selected and a target canvas is specified, show the image
    nextImage.style.display = "block";
  } else {
    // If neither radio button is selected or no target canvas, hide the image
    nextImage.style.display = "none";
  }

  // Store the target canvas in a data attribute of the image
  nextImage.dataset.targetCanvas = targetCanvas;
}


function redirectToCanvas() {
  var nextImage = document.getElementById("nextImage");
  var targetCanvas = nextImage.dataset.targetCanvas;
  
  // Check if a target canvas is defined
  if (targetCanvas) {
    // Hide the current canvas
    document.getElementById("canvas1").style.visibility = "hidden";

    // Show the target canvas
    document.getElementById(targetCanvas).style.visibility = "visible";

     // Make alpha-container visible slowly
     var alphaContainer = document.querySelector(".alpha-container");
     alphaContainer.classList.add("visible");
    
     //Make number-container visible slowly
     var numberContainer= document.querySelector(".number-container");
     numberContainer.classList.add("visible")
  }
}



function selectAlphabet(alphabet) {
  document.getElementById("outputValue2").innerHTML =
    " " + "<span style='font-weight: bold;'>" + alphabet + "</span>";
  document.getElementById("alphabetInput").value = alphabet; // Set the input value to the selected alphabet
  document.getElementById("outputValue2").style.display = "block";
  document.getElementById("errorMessage").style.visibility = "hidden";
  console.log("selected Alphabet is " +alphabet)
}



function selectNumber(value) {
  // Set the selected value in the input tag
  document.getElementById("numberInput").value = value;
  document.getElementById("numberInput2").textContent = value;
  document.getElementById("numberInput2").style.fontWeight = "bold";
  document.getElementById("numberInput2").style.display = "block";
  document.getElementById("errorMessage1").style.visibility = "hidden";
  document.getElementById("errorNum").style.visibility = "hidden";
  console.log("selected Number is "+value)
}


function submitForm(type) {
//   console.log("Hello");
  var StepTextElement = document.getElementById("StepText");

  if (type === "alphabet") {
    // Handle form submission for canvas2
    let input = document.getElementById("alphabetInput").value.trim().toUpperCase(); // Convert to uppercase

    // Check if the input is a valid alphabet
    if (/^[A-Z]$/.test(input)) {
      // If valid alphabet, navigate to canvas4

      simsubscreennum = 4;
      document.getElementById("canvas4").style.visibility = "visible";
      document.getElementById("canvas2").style.visibility = "hidden";

      // Display the selected alphabet and phonetics in canvas4
      document.getElementById("outputValue").innerHTML =
        "Selected alphabet: " +
        "<span style='font-weight: bold;'>" +
        input +
        "</span>";
      document.getElementById("phoneticsValue").textContent = getPhonetics("alphabet",input);
      

      // Clear the error message
      document.getElementById("errorMessage").innerHTML = "";

      // Set StepText based on the selected option
      StepTextElement.textContent =
        "\u00A0\u00A0Observe the phonetics, relevant to the option chosen by the user.";

      // Call the pronounce function after displaying the results
      showImage("canvas2"); // Added to show image on submission
    } else {
      // If not a valid alphabet, display an error message
      document.getElementById("errorMessage").style.visibility = "visible";
      // document.getElementById("errorAlpha").innerHTML = "Invalid input. Please enter a single alphabet (A-Z).";
      console.log("please select the valid Alphabet");
      document.getElementById("errorMessage").innerHTML =
        "Invalid input. Please enter a single alphabet (A-Z).";
    }
  } else if (type === "number") {
    // Handle form submission for canvas3
    let input = document.getElementById("numberInput").value;

    // Check if the input is a valid number
    if (/^[0-9]|0\.0|\.$/.test(input)) {
      // If valid number, navigate to canvas4
      simsubscreennum = 4;
      document.getElementById("canvas4").style.visibility = "visible";
      document.getElementById("canvas3").style.visibility = "hidden";

      // Display the selected number and phonetics in canvas4
      document.getElementById("outputValue").innerHTML =
        "Selected number: " +
        "<span style='font-weight: bold;'>" +
        input +
        "</span>";
      document.getElementById("phoneticsValue").textContent = getPhonetics(
        "number",
        input
      );

      // Clear the error message
      document.getElementById("errorMessage").innerHTML = "";

      // Set StepText based on the selected option
      StepTextElement.textContent =
        "\u00A0\u00A0Observe the figure code, relevant to the option chosen by the user.";

      // Call the pronounce function after displaying the results
      showImage("canvas3"); // Added to show image on submission
    } else {
      // If not a valid number, display an error message
      document.getElementById("errorNum").innerHTML =
        "Invalid input. Please enter a valid number.";
      document.getElementById("errorNum").style.color = "red";
      console.log("please select the valid number");
      document.getElementById("errorNum").style.visibility = "visible";
      // document.getElementById("errorNum").innerHTML="Invalid input. Please enter a valid number.";
    }
  }
}

function pronounce() {
  console.log("Pronounce function called.");
  // Hide the repeat button
  document.getElementById("repeatImage").style.visibility = "hidden";
  var pronounceButton = document.getElementById("pronounceButton");
  pronounceButton.style.display = "none";
 

  var phonetics = document.getElementById("phoneticsValue").textContent;
  var spokenValue = getSpokenValue();


  if (phonetics !== "Not Available") {
    var utterance = new SpeechSynthesisUtterance(phonetics);
    // var voices=speechSynthesis.getVoices();
    // utterance.voice = voices[2];
    // Display the spoken value before starting pronunciation
    displaySpokenValue(spokenValue);

    // Speech synthesis is asynchronous, so use a Promise to wait for it to complete
    var speakPromise = new Promise(function (resolve) {
      utterance.onend = resolve;
      speechSynthesis.speak(utterance);
    });

    // After the speech is completed, show the image and display the spoken value
    speakPromise.then(function () {
      showImage();
      // Show the repeat image after pronunciation is completed
      showRepeatImage();
      // Show the pronounce button again
      pronounceButton.style.display = "block";
      document.getElementById("repeatImage").style.visibility="visible";
    });
  }
}

function showRepeatImage() {
  // console.log('Show repeat image function called.');

  var repeatImage = document.getElementById("repeatImage");
  repeatImage.style.display = "block";
}

function repeatButtonClicked() {
  // var repeatImage = document.getElementById('repeatImage');
  // repeatImage.style.display = 'none';
  document.getElementById("outputValue2").style.display = "none";
  document.getElementById("numberInput2").style.display = "none";
  document.getElementById("numberInput").style.display = "none";
  document.getElementById("errorMessage1").value = "";

  document.getElementById("canvas4").style.visibility = "hidden";
  document.getElementById("canvas1").style.visibility = "visible";
  document.getElementById("numberInput").value = "";
  document.getElementById("repeatImage").style.visibility="hidden";

  // document.getElementById("outputValue2").style.visibility="hidden";

  // Uncheck radio buttons when going back to canvas1
  uncheckRadioButtons(document.getElementById("canvas1"));

  // Clear input fields
  clearInputFields(document.getElementById("canvas2"));

   // Reset visibility for alpha-container and number-container
   var alphaContainer = document.querySelector(".alpha-container");
   alphaContainer.classList.remove("visible");
 
   var numberContainer = document.querySelector(".number-container");
   numberContainer.classList.remove("visible");
 

  console.log("repeat function is called");

}


function uncheckRadioButtons(canvas) {
  var radioButtons = canvas.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(function (radio) {
    radio.checked = false;
  });
}

function clearInputFields(canvas) {
  var inputFields = canvas.querySelectorAll('input[type="text"]');
  inputFields.forEach(function (input) {
    input.value = "";
  });

  // Clear the spokenValueDisplay if it exists
  var spokenValueDisplay = document.getElementById("spokenValueDisplay");
  if (spokenValueDisplay) {
    spokenValueDisplay.parentNode.removeChild(spokenValueDisplay);
  }
}

function displaySpokenValue(spokenValue) {
  // Remove the existing spokenValueDisplay if it exists
  var spokenValueDisplay = document.getElementById("spokenValueDisplay");
  if (spokenValueDisplay) {
    spokenValueDisplay.parentNode.removeChild(spokenValueDisplay);
  }

  // Create a new spokenValueDisplay
  spokenValueDisplay = document.createElement("div");
  spokenValueDisplay.id = "spokenValueDisplay";

  // Create a span element for the outputValue and apply bold styling
  var outputSpan = document.createElement("span");
  outputSpan.style.fontWeight = "bold";
  outputSpan.style.display = "block";
  outputSpan.style.position="relative";
  // outputSpan.style.margin = "0 auto";
  outputSpan.style.marginRight="15px"
  
  
  document.body.appendChild(outputSpan);
  
  outputSpan.textContent = spokenValue;

  // Append the output span to the spokenValueDisplay
  spokenValueDisplay.appendChild(outputSpan);

  // Set additional styles
  spokenValueDisplay.style.position = "absolute";
  spokenValueDisplay.style.top = "75%";
  spokenValueDisplay.style.left = "50%";
  spokenValueDisplay.style.transform = "translate(-50%, -50%)";
  spokenValueDisplay.style.textAlign = "center";

  // Set the position of spokenValueDisplay below the "Keep sound on!" paragraph
  var keepSoundOn = document.querySelector(
    '#canvas4 p[style*="text-align:center"]'
  );
  keepSoundOn.parentNode.insertBefore(
    spokenValueDisplay,
    keepSoundOn.nextSibling
  );

  // Center the spokenValueDisplay horizontally
  spokenValueDisplay.style.margin = "auto";
  spokenValueDisplay.style.textAlign = "center";
}

// Function to get phonetics based on the type and value
function getPhonetics(type, value) {
  if (type === "alphabet") {
    // Add phonetics for alphabets as needed
    var alphabetPhonetics = {
      A: "Alfa",
      B: "Bravo",
      C: "Charlie",
      D: "Delta",
      E: "Echo",
      F: "Foxtrot",
      G: "Golf",
      H: "Hotel",
      I: "India",
      J: "Juliett",
      K: "Kilo",
      L: "Lima",
      M: "Mike",
      N: "November",
      O: "Oscar",
      P: "Papa",
      Q: "Quebec",
      R: "Romeo",
      S: "Sierra",
      T: "Tango",
      U: "Uniform",
      V: "Victor",
      W: "Whiskey",
      X: "X-ray",
      Y: "Yankee",
      Z: "Zulu",
      // Add other alphabet phonetics as needed
    };
    return alphabetPhonetics[value] || "Not Available";
  } else if (type === "number") {
    // Add phonetics for numbers as needed
    var numberPhonetics = {
      0: "Nadazero",
      1: "Unaone",
      2: "Bissotwo",
      3: "Terrathree",
      4: "Kartefour",
      5: "Pantafive",
      6: "Soxisix",
      7: "Setteseven",
      8: "Oktoeight",
      9: "Novenine",
      "0.0": "Decimal",
      ".": "Stop",
      // Add other number phonetics as needed
    };
    return numberPhonetics[value] || "Not Available";
  }
}

function getSpokenValue() {
  var type = document.getElementById("alphabets").checked
    ? "alphabet"
    : "number";
  var value;

  if (type === "alphabet") {
    value = document.getElementById("alphabetInput").value.trim().toUpperCase();
  } else {
    value = document.getElementById("numberInput").value;
  }

  if (type === "alphabet") {
    var alphabetSpokenValues = {
      A: "AL FAH",
      B: "BRAH VOH",
      C: "CHAR LEE",
      D: "DELL TAH",
      E: "ECK OH",
      F: "FOKS TROT",
      G: "GOLF",
      H: "HOH TELL",
      I: "IN DEE AH",
      J: "JEW LEE ETT",
      K: "KEY LOH",
      L: "LEE MAH",
      M: "MIKE",
      N: "NO VEM BER",
      O: "OSS CAH",
      P: "PAH PAH",
      Q: "KEH BECK",
      R: "ROW ME OH",
      S: "SEE AIR RAH",
      T: "TANG GO",
      U: "YOU NEE FORM",
      V: "VIK TAH",
      W: "WISS KEY",
      X: "ECKS RAY",
      Y: "YANG KEY",
      Z: "ZOO LOO",
      // ... (add other alphabet spoken values)
    };
    return alphabetSpokenValues[value] || "Not Available";
  } else if (type === "number") {
    var numberSpokenValues = {
      0: "NAH-DAH-ZAY-ROH",
      1: "OO-NAH-WUN",
      2: "BEES-SOH-TOO",
      3: "TAY-RAH-TREE",
      4: "KAR-TAY-FOWER",
      5: "PAN-TAH-FIVE",
      6: "SOK-SEE-SIX",
      7: "SAY-TAY-SEVEN",
      8: "OK-TOH-AIT",
      9: "NO-VAY-NINER",
      "0.0": "DAY-SEE-MAL",
      ".": "STOP",
    };
    return numberSpokenValues[value] || "Not Available";
  }
}
