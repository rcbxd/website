var entries = document.getElementsByTagName("h2");
var entries = Array.from(entries);
var id = 0;

entries.forEach(e => {
  e.innerHTML = `<a href="#${id}">#</a>${e.innerHTML}`;
  e.id = id;
  id++;
});
