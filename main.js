const inputSlider = document.querySelector("[data-lengthSlider]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");

const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");

const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");

const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '!@#$%^&*(){}:"<>';

let passwordLength = 10 ;
let password = '';
let count = 0; 


// slider
function slider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    let min = inputSlider.min;
    let max = inputSlider.max;
    inputSlider.style.backgroundSize = (passwordLength/(max-min+1)*100)+"%";
}
slider();

setIndicator("#fff")

inputSlider.addEventListener('input', function(eve){
    passwordLength = eve.target.value
    slider();
})

async function copyPassword() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied";
    }
    catch(e) {
        copyMsg.innerText = "Failed";
    }
    //to make copy span visible
    copyMsg.classList.add("active");

    setTimeout( () => {
        copyMsg.classList.remove("active");
    },2000);
}

copyBtn.addEventListener('click', () => {
    if(passwordDisplay.value)
        copyPassword();
})

//for generating Random numbers
function getRandom(min , max){
    return Math.floor(Math.random() * (max - min)) + min 
}

function getRandomUppercase(){
    return String.fromCharCode(getRandom(65 , 90))
}

function getRandomLowercase(){
    return String.fromCharCode(getRandom(97 , 122))
}

function getRandomInterger(){
    return getRandom(0 , 9)
}

function getRandomSymbol(){
    let random = getRandom(0 , symbols.length)
    return symbols.charAt(random)
}

//to set color of indicator
function setIndicator(color) {
    indicator.style.innerText = 'po'
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

//For checking password strength
function passwordStrength(){
    let hasUpper = uppercaseCheck.checked;
    let hasLower = lowercaseCheck.checked;
    let hasSymbol = symbolsCheck.checked;
    let hasNumber = numbersCheck.checked;

    if(hasUpper && hasLower && (hasSymbol || hasNumber) && passwordLength >=8) {
        setIndicator("#0f0")
    } else if((hasUpper || hasLower) && (hasNumber || hasSymbol) && passwordLength >=6) {
        setIndicator("#ff0")
    } else {
        setIndicator("#f00")
    }
}

allCheckBox.forEach( (checkbox) => {
    checkbox.addEventListener('change', passwordStrength);
})

function createPassword(){
    let arrFunction = [];
    password = ''
    if(uppercaseCheck.checked){
        arrFunction.push(getRandomUppercase)
    }
    if(lowercaseCheck.checked){
        arrFunction.push(getRandomLowercase)
    }
    if(numbersCheck.checked){
        arrFunction.push(getRandomInterger)
    }
    if(symbolsCheck.checked){
        arrFunction.push(getRandomSymbol)
    }

    //for default password
    for(let i = 0 ; i < arrFunction.length ; i++){
        password += arrFunction[i]()
    }

    if (passwordLength > arrFunction.length){
        for (let i = 0; i < passwordLength - arrFunction.length; i++) {
            let random = getRandom(0 , arrFunction.length)
            password += arrFunction[random]()
        }
        passwordLength = passwordLength;
    }
    else{
        passwordLength = arrFunction.length;
    }
    //for shuffle password
    password = password.split('').sort(()=> Math.random() * 0.5).join('')

    //to return password
    slider();
    passwordStrength()
    passwordDisplay.value = password
}

generateBtn.addEventListener('click' , ()=>{
    createPassword();
})