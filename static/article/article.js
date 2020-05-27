t1 = new TimelineMax({
  paused: true
});

t1.fromTo(
  "#heart",
  0.5,
  {
    top: "50%",
    scale: "2.5",
    ease: Back.easeOut.config(1.7),
    delay: 0,
    color: "white"
  },
  {
    top: "50%",
    scale: "3",
    ease: Back.easeOut.config(1.7),
    delay: 0,
    color: "red"
  }
);

t1.fromTo(
  ".likebtn",
  0.2,
  {
    background: "red",
    ease: Back.easeOut.config(1.7),
    delay: -0.3
  },
  {
    background: "white",
    ease: Back.easeOut.config(1.7),
    delay: -0.3
  }
);

t1.to("#heart", 0.2, {
  top: "50%",
  scale: "2.5",
  color: "red",
  delay: 0,
  ease: Back.easeOut.config(1.7)
});

t1.reverse();
t1.reversed(!t1.reversed());

var b_elements = Array.from(document.getElementsByTagName("strong"));

b_elements.forEach(b => {
  query = b.innerHTML;
  b.setAttribute("search-query", query);
  b.onclick = gotoDefiniton;
});

var entries = document.getElementsByTagName("h2");
var entries = Array.from(entries);
var id = 0;

entries.forEach(e => {
  e.innerHTML = `<a href="#${id}">#</a>${e.innerHTML}`;
  e.id = id;
  id++;
});

var url = document.URL;
var hid = url.substring(url.lastIndexOf("#") + 1);
window.scrollTo(0, document.getElementById(hid).offsetTop);

function gotoDefiniton(event) {
  var url = `https://google.com/search?q=${event.target.getAttribute(
    "search-query"
  )}`;
  window.location.href = url;
}
