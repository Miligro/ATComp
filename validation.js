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
    if(regex){
        if(!elem.value.trim() || !regex.test(elem.value)){
            return false;
        }
    } else if(!elem.value.trim()){
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