export function validateInputs(toValid){
    for(key in toValid) {
        let el = toValid[key]
        if(!checkFunction(el.elem,el.regex)){
            errorDialog(`Podano niepoprawne ${el.label}!`);
            return false;   
        }
    }
    return true;
}

export function validatePesel(pesel){
    if(pesel.length !== 11){
        errorDialog(`Podano niepoprawny pesel!`);
        return false
    }
    let sum = 0;
    for(let i = 0; i < 10; i++){
        if(i % 4 == 0){
            sum += (+pesel[i] * 1) % 10;
        } else if(i % 4 == 1){
            sum += (+pesel[i] * 3) % 10;
        } else if(i % 4 == 2){
            sum += (+pesel[i] * 7) % 10;
        } else{
            sum += (+pesel[i] * 9) % 10;
        }
    }
    sum %= 10;
    checkNumber = 10 - sum;
    if(+pesel[10] !== checkNumber || +pesel.slice(4,6) > 31 || +pesel.slice(2,4) % 20 > 12){
        errorDialog(`Podano niepoprawny pesel!`);
        return false
    }
    return true;
}

export function validateListener(toValid){
    ['keyup', 'focusout'].forEach(ev =>{
        for(key in toValid) {
            let el = toValid[key]
            el.elem.addEventListener(ev, ()=>{
                if(!checkFunction(el.elem,el.regex)){
                    el.invalid.style.display = 'block'
                    el.elem.style.border = '1px solid red';
                }else{
                    el.invalid.style.display = 'none'
                    el.elem.style.border = '1px solid black'; 
                }
            })
        }
    });
}

function checkFunction(elem, regex){
    let value = elem.value || ''
    if(regex){
        if(!value.trim() || !regex.test(value)){
            return false;
        }
    } else if(!value.trim()){
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
    closeBtn.setAttribute('id', 'close-btn');
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