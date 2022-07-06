const loadingHTML =  `
<h2>Wczytywanie</h2>
<div class="loading-items">
    <div class="loading-item-1"></div>
    <div class="loading-item-2"></div>
    <div class="loading-item-3"></div>
    <div class="loading-item-4"></div>
    <div class="loading-item-5"></div>
    <div class="loading-item-6"></div>
    <div class="loading-item-7"></div>
    <div class="loading-item-8"></div>
</div>
`

var currentEl = null

export function show(el) {
    currentEl = document.createElement('div')
    currentEl.setAttribute('class', 'loading')
    currentEl.innerHTML = loadingHTML
    el.appendChild(currentEl)
    return currentEl;
}
export function destroy(loadingEl) {
    loadingEl?.remove()
}