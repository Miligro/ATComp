const saveBtn = document.getElementById('save_button')
const myForm = document.forms['my_form']
const firstName = myForm.elements.first_name;
const lastName = myForm.elements.last_name;
const email = myForm.elements.email;
const description = myForm.elements.description;
const gender = myForm.elements.gender;
const pesel = myForm.elements.pesel;
const alertDialog = document.getElementById('alertDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const main = document.getElementById('main');

const born = document.getElementById('born');
const peselGender = document.getElementById('pesel_gender');
const peselData = document.getElementById('pesel_data');

const invalidFirstName = document.getElementById('invalid_first_name');
const invalidLastName = document.getElementById('invalid_last_name');
const invalidEmail = document.getElementById('invalid_email');
const invalidDescription = document.getElementById('invalid_description');
const invalidPesel = document.getElementById('invalid_pesel');

const toValid = [
    {
        label: 'imie',
        elem: firstName,
        regex: /^[a-zA-Z]+$/,
        invalid: invalidFirstName,
    },
    {
        label: 'nazwisko',
        elem: lastName,
        regex: /^[a-zA-Z]+$/,
        invalid: invalidLastName,
    },
    {
        label: 'email',
        elem: email,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        invalid: invalidEmail,
    },
    {
        label: 'description',
        elem: description,
        regex: "",
        invalid: invalidDescription,
    },
    {
        label: 'pesel',
        elem: pesel,
        regex: "",
        invalid: invalidPesel,
    }
]

saveBtn.addEventListener("click", ()=>{
    const elem = document.getElementById("data");
    const elCheckNum = document.getElementById("check_number");
    if(elem){
        elem.remove();
    }
    if(elCheckNum){
        elCheckNum.remove();
    }
    if(validateInputs()){
        getPeselData();
        appendData();
        myForm.reset();
    }
    
});

function checkFunction(elem, regex){
    if(regex){
        if(!elem.value.trim() || !regex.test(elem.value)){
            return false;
        }
    } else if(!elem.value.trim()){
        return false;
    }
    return true;
}

function validateInputs(){
    for(key in toValid) {
        let el = toValid[key]
        if(!checkFunction(el.elem,el.regex)){
            errorDialog(`Podano niepoprawne ${el.label}!`);
            return false;   
        }
    }
    return true;
}

['keyup', 'focusout'].forEach(ev =>{
    for(key in toValid) {
        let el = toValid[key]
        if(!checkFunction(el.elem,el.regex)){
            el.invalid.style.display = 'block'
            el.elem.style.border = '1px solid red';
        }else{
            el.invalid.style.display = 'none'
            el.elem.style.border = '1px solid black'; 
        }
    }
});

function getPeselData(){
    born.value = "";
    const yearTemp = +pesel.value.slice(0,2);
    let year = 1900 + yearTemp + (Math.floor(+pesel.value.slice(2,3)/2) * 100);
    let month = +pesel.value.slice(2,4);
    month = month > 20 ? month - 20 : month;
    const day = pesel.value.slice(4,6);
    born.value = `Data urodzenia: ${day}-${month < 10 ? '0' + month : month}-${year}`;

    peselGender.value = `Płeć: ${+pesel.value.slice(9,10) % 2 == 0 ? "Kobieta" : "Mężczyzna"}`;

    let sum = 0;
    for(let i = 0; i < 10; i++){
        if(i % 4 == 0){
            sum += (+pesel.value[i] * 1) % 10;
        } else if(i % 4 == 1){
            sum += (+pesel.value[i] * 3) % 10;
        } else if(i % 4 == 2){
            sum += (+pesel.value[i] * 7) % 10;
        } else{
            sum += (+pesel.value[i] * 9) % 10;
        }
    }
    sum %= 10;
    checkNumber = 10 - sum;

    checkNumberEl = document.createElement('p');
    checkNumberEl.setAttribute('id', 'check_number');
    checkNumberEl.innerText = `Suma kontrolna: ${checkNumber}`;
    peselData.appendChild(checkNumberEl);
}

function appendData(){
    const el = document.createElement("div");
    el.setAttribute('id', 'data');
    
    const firstNameEl = document.createElement("p")
    firstNameEl.innerText = `Imię: ${firstName.value}`;
    const lastNameEl = document.createElement("p")
    lastNameEl.innerText = `Nazwisko: ${lastName.value}`;
    const emailEl = document.createElement("p")
    emailEl.innerText = `Email: ${email.value}`;
    const descriptionEl = document.createElement("p")
    descriptionEl.innerText = `Opis: ${description.value}`
    el.appendChild(firstNameEl);
    el.appendChild(lastNameEl);
    el.appendChild(emailEl);
    el.appendChild(descriptionEl);
    main.appendChild(el);
}

function errorDialog(msg){
    const alertDialog = document.createElement("div");
    alertDialog.setAttribute('class', 'alert-dialog');
    alertDialog.setAttribute('id', 'alert-dialog');
    
    window.onclick = function(event) {
        if (event.target == alertDialog) {
            alertDialog.remove();
        }
    } 
    
    const alertContent = document.createElement("div");
    alertContent.setAttribute('class', 'alert-content');

    const errorIcon = document.createElement("span");
    errorIcon.setAttribute('class', 'error-icon');
    errorIcon.innerText = "!";

    const messagePara = document.createElement("p");
    messagePara.innerText = msg;

    const closeBtn = document.createElement("button");
    closeBtn.setAttribute('id', 'close-dialog-btn');
    closeBtn.innerText = "Zamknij";

    closeBtn.addEventListener('click', ()=>{
        alertDialog.remove();
    })

    alertContent.appendChild(errorIcon);
    alertContent.appendChild(messagePara);
    alertContent.appendChild(closeBtn);
    alertDialog.appendChild(alertContent);
    document.body.appendChild(alertDialog);
}