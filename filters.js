const filterBtn = document.createElement('button');
const resetFilterBtn = document.createElement('button');
const sortOrderBtn = document.createElement('button');
let sortEl = null
const formEl = document.createElement('form');

let inputs = []
let storage = "";

const changeSort = () => {
    if (formEl['sortOrder'].value === 'asc'){
        formEl['sortOrder'].innerHTML = "<i class='fa-solid fa-arrow-down-long'></i>";
        formEl['sortOrder'].value = 'desc';
    } else{
        formEl['sortOrder'].value = 'asc';
        formEl['sortOrder'].innerHTML = "<i class='fa-solid fa-arrow-up-long'></i>"
    };
}

let filterReq = new CustomEvent('filter', {})

export function checkStorage(){
    for(let input of inputs) {
        let value = localStorage.getItem(`${storage}_${input.id}`);
        if(value !== null){
            formEl[input.id].value=value
        }   
    }
    formEl['sortOrder'].value === 'asc' ? formEl['sortOrder'].innerHTML = "<i class='fa-solid fa-arrow-up-long'></i>" : formEl['sortOrder'].innerHTML = "<i class='fa-solid fa-arrow-down-long'></i>"
    window.parent.document.dispatchEvent(filterReq);
}

filterBtn.addEventListener('click', ()=>{
    for(let input of inputs) {
        localStorage.setItem(`${storage}_${input.id}`, formEl[input.id].value)
    }
    window.parent.document.dispatchEvent(filterReq);
})

sortOrderBtn.addEventListener('click', ()=>{
    changeSort()
    localStorage.setItem(`${storage}_sortOrder`, formEl['sortOrder'].value);
    window.parent.document.dispatchEvent(filterReq);
})

resetFilterBtn.addEventListener('click', ()=>{
    for(let input of inputs){
        localStorage.setItem(`${storage}_${input.id}`, '')
    }
    localStorage.setItem(`${storage}_sort`, 'title');
    localStorage.setItem(`${storage}_sortOrder`, 'asc');
    checkStorage();
})

function filterByText(toFilter, filterEl, filterBy){
    toFilter = toFilter.filter((el) => el[filterEl].toLowerCase().search(filterBy.toLowerCase()) >= 0);
    return toFilter;
}

function filterByNum(toFilter, filterEl, filterBy){
    if(filterBy !== ''){
        toFilter = toFilter.filter((el) => el[filterEl].toString() === filterBy.toString());
    }
    return toFilter;
}

export function onFilter(toFilter){
    for(let input of inputs){
        if(input.type === 'text'){
            toFilter = filterByText(toFilter, input.id, formEl[input.id].value);
        }else if(input.type === 'number'){
            toFilter = filterByNum(toFilter, input.id, formEl[input.id].value);
        }
    }

    if(sortEl){
        toFilter = toFilter.sort((a, b) => {
            if(formEl['sortOrder'].value === 'desc'){
                return a[sortEl.value] >= b[sortEl.value] ? 1 : -1;
            }else{
                return a[sortEl.value] <= b[sortEl.value] ? 1 : -1;
            }
        })
    }
    return toFilter;
}

export function createFilters(filters, storageName){
    storage = storageName;
    let rowEl = document.createElement('div');
    rowEl.setAttribute('class', 'row');

    for(let filter of filters){
        if(['number','text'].includes(filter.type)){
            const el = document.createElement('input');
            el.setAttribute('id', filter.id);
            el.setAttribute('placeholder', filter.placeholder);
            el.setAttribute('type', filter.type);

            inputs.push(el);

            if(rowEl.childElementCount < 3){
                rowEl.appendChild(el);

                if(rowEl.childElementCount === 3){
                    formEl.appendChild(rowEl);
                    rowEl = document.createElement('row')
                    rowEl.setAttribute('class', 'row');
                }
            }

        }else if(filter.type === 'select'){
            const el = document.createElement('select');
            el.setAttribute('id', filter.id);
            for(let option of filter.options){
                const optionEl = document.createElement('option');
                optionEl.setAttribute('value', option.value);
                optionEl.innerText = option.text;
                el.appendChild(optionEl);
            }
            inputs.push(el);
            if(filter.id === 'sort'){
                sortEl = el;
            }else{
                rowEl.appendChild(el);
                if(rowEl.childElementCount === 3){
                    formEl.appendChild(rowEl);
                    rowEl = document.createElement('row')
                    rowEl.setAttribute('class', 'row');
                }   
            }
        }
    }

    if(rowEl.childElementCount !== 0){
        formEl.appendChild(rowEl);
    }

    rowEl = document.createElement('row')
    rowEl.setAttribute('class', 'row');

    
    filterBtn.setAttribute('type', 'button');
    filterBtn.setAttribute('id', 'filter_button');
    filterBtn.setAttribute('class', 'filter_button');
    filterBtn.innerText = "Filtruj";
    rowEl.appendChild(filterBtn);

    resetFilterBtn.setAttribute('type', 'button');
    resetFilterBtn.setAttribute('id', 'reset_filter_button');
    resetFilterBtn.setAttribute('class', 'reset_filter_button');
    resetFilterBtn.innerText = "Resetuj filtry";
    rowEl.appendChild(resetFilterBtn);

    if(sortEl){
        rowEl.appendChild(sortEl);
        sortOrderBtn.setAttribute('type', 'button');
        sortOrderBtn.setAttribute('id', 'sortOrder');
        sortOrderBtn.setAttribute('class', 'sortOrder');
        sortOrderBtn.setAttribute('value', 'desc');
        sortOrderBtn.innerHTML = "<i class='fa-solid fa-arrow-up-long'></i>";
        inputs.push(sortOrderBtn);
        rowEl.appendChild(sortOrderBtn);
    }
    formEl.appendChild(rowEl);
    document.getElementById('filter_con').appendChild(formEl);
}