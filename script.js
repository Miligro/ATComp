const saveBtn = document.getElementById('save_button')
const myForm = document.forms['my_form']
const firstName = myForm.elements["first_name"];
const lastName = myForm.elements["last_name"];
const email = myForm.elements["email"];
const description = myForm.elements["description"];
const gender = myForm.elements["gender"];

saveBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    const el = document.getElementById("data");
    el.innerHTML = "";
    if(checkForm()){
        el.innerHTML = `<p>Imię: ${firstName.value}</p>
        <p>Nazwisko: ${lastName.value}</p>
        <p>Email: ${email.value}</p>
        <p>Opis: ${description.value}</p>
        <p>Płeć: ${gender.value === "man" ? "Mężczyzna" : "Kobieta"}</p>`;
        document.body.appendChild(el);
        myForm.reset();
    }else{
        alert("Niepoprawne dane!");
    };
    
})

function checkForm(){
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let nameRegex = /^[a-zA-Z]+$/;
    const emailRegExp = new RegExp(emailRegex);
    const nameRegExp = new RegExp(nameRegex);
    if(firstName.value.trim() === "" || lastName.value.trim() === "" || description.value.trim() === "" || !emailRegExp.test(email.value) || !nameRegExp.test(firstName.value) || !nameRegExp.test(lastName.value)){ 
        return false;
    };
    return true;
}
