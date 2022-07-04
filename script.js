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
const confirmPeselBtn = document.getElementById('confirm_pesel');

saveBtn.addEventListener("click", ()=>{
    const elem = document.getElementById("data");
    if(elem){
        elem.remove();
    }
    if(checkForm()){
        appendData();
        myForm.reset();
    }
    
});


confirmPeselBtn.addEventListener("click", ()=>{
    const elem = document.getElementById("check_number");
    if(elem){
        elem.remove();
    }
    const peselRegExp = /^[0-9]/;
    if(!peselRegExp.test(pesel.value) || pesel.value.length != 11){
        return;
    };

    born.value = "";
    const yearTemp = +pesel.value.slice(0,2);
    let year = 1900 + yearTemp + (Math.floor(+pesel.value.slice(2,3)/2) * 100);
    let month = +pesel.value.slice(2,4);
    month = month > 20 ? month - 20 : month;
    const day = pesel.value.slice(4,6);
    born.value += `Data urodzenia: ${day}-${month < 10 ? '0' + month : month}-${year}`;

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
});

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
    const genderEl = document.createElement("p");
    genderEl.innerText = `Płeć: ${gender.value === "man" ? "Mężczyzna" : "Kobieta"}`
    el.appendChild(firstNameEl);
    el.appendChild(lastNameEl);
    el.appendChild(emailEl);
    el.appendChild(descriptionEl);
    el.appendChild(genderEl);
    main.appendChild(el);
}

function checkForm(){
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegExp = /^[a-zA-Z]+$/;
    if(!firstName.value.trim() || !nameRegExp.test(firstName.value)){
        errorDialog("Podano niepoprawne imię!");
        return false;
    }
    if(!lastName.value.trim() || !nameRegExp.test(lastName.value)){
        errorDialog("Podano niepoprawne nazwisko!");
        return false;
    }
    if(!email.value.trim() || !emailRegExp.test(email.value)){
        errorDialog("Podano niepoprawny email!");
        return false;
    }
    if(!description.value.trim()){
        errorDialog("Podano niepoprawny opis!");
        return false;
    }
    return true;
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