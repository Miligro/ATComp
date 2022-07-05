import {validateListener, validateInputs} from "./validation";
const saveBtn = document.getElementById('save_button')
const myForm = document.forms['my_form']
const firstName = myForm.elements.first_name;
const lastName = myForm.elements.last_name;
const email = myForm.elements.email;
const description = myForm.elements.description;
const pesel = myForm.elements.pesel;
const formMain = document.getElementById('form_main');

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
        regex: /^[0-9]/,
        invalid: invalidPesel,
    }
]
validateListener(toValid);

saveBtn.addEventListener("click", ()=>{
    const elem = document.getElementById("data");
    const elCheckNum = document.getElementById("check_number");
    if(elem){
        elem.remove();
    }
    if(elCheckNum){
        elCheckNum.remove();
    }
    if(validateInputs(toValid)){
        getPeselData();
        appendData();
        myForm.reset();
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
    formMain.appendChild(el);
}


