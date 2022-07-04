const saveBtn = document.getElementById('save_button')
const myForm = document.forms['my_form']
const firstName = myForm.elements.first_name;
const lastName = myForm.elements.last_name;
const email = myForm.elements.email;
const description = myForm.elements.description;
const gender = myForm.elements.gender;
const alertDialog = document.getElementById('alertDialog');
const closeDialogBtn = document.getElementById('closeDialogBtn');
const main = document.getElementById('main');

saveBtn.addEventListener("click", ()=>{
    const elem = document.getElementById("data");
    if(elem){
        elem.remove();
    }
    if(checkForm()){
        appendData();
        myForm.reset();
    }
    
})

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