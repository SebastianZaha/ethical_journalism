function filterProducts(input, _event) {
    var str = input.value,
        rows = window.document.querySelectorAll("tr")
    
    for (let r of rows) {
        if (!r.id || (r.id.toLowerCase().indexOf(str.toLowerCase().trim()) != -1)) {
            r.style.display = 'table-row';
        } else {
            r.style.display = 'none';
        }
    }
}
