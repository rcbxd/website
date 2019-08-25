var b_elements = Array.from(document.getElementsByTagName('b'));

var entries = document.getElementsByTagName('h2');
var entries = Array.from(entries);
var id = 0;
entries.forEach(e => {
    e.innerHTML = `<a href="#${id}">#</a>${e.innerHTML}`;
    e.id = id;
    id++;
})
var url = document.URL
var hid = url.substring(url.lastIndexOf('#') + 1);
window.scrollTo(0, document.getElementById(hid).offsetTop)

function gotoDefiniton(event) {
    var url = `https://google.com/search?q=${event.target.getAttribute('search-query')}`
    window.location.href = url;
}

b_elements.forEach(b => {
    query = b.innerHTML;
    b.setAttribute('search-query', query)
    b.onclick = gotoDefiniton;
})