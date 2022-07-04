const saveBtn = document.getElementById('save_button')
const myForm = document.forms['my_form']
const firstName = myForm.elements.first_name;
const lastName = myForm.elements.last_name;
const email = myForm.elements.email;
const description = myForm.elements.description;
const gender = myForm.elements.gender;

saveBtn.addEventListener("click", (event)=>{
    const elem = document.getElementById("data");
    if(elem){
        elem.innerHTML = "";
    }
    if(checkForm()){
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
        document.body.appendChild(el);
        myForm.reset();
    }else{
        alert("Niepoprawne dane!");
    };
    
})

function checkForm(){
    const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const nameRegExp = /^[a-zA-Z]+$/;
    if(!firstName.value.trim() || !lastName.value.trim() || !description.value.trim() || !emailRegExp.test(email.value) || !nameRegExp.test(firstName.value) || !nameRegExp.test(lastName.value)){ 
        return false;
    };
    return true;
}
