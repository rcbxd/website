// js app core


const cursor = document.getElementById("cursor");
const h = cursor.offsetHeight - 2;
var sc = true;

const menu = () => {
  document
    .getElementsByClassName("bg_sec")[0]
    .classList.toggle("mobile_menu_active");
  document
    .getElementsByClassName("bg")[0]
    .classList.toggle("mobile_menu_active");
  document
    .getElementsByClassName("bg2")[0]
    .classList.toggle("mobile_menu_active");
  cursor.classList.toggle("cursor_invert");
  var i = 0;
  var load = setInterval(function () { // menu items loader
    document
      .getElementsByClassName("menu_item")[i].classList.toggle("menu_item_active");
    i++;
    if (i == 3) {
      clearInterval(load);
    }
  }, 100);
};

const cursorHighlight = s => { // highlight the cursor if not a link, expand if a link
  if (s) {
    cursor.classList.add("expand");
  }
  cursor.classList.add("cursor_highlight");
};

const cursorBack = () => { // get the cursor to its inial state
  cursor.classList.remove("expand");
  cursor.classList.remove("cursor_highlight");
};

document.addEventListener("mousemove", e => { // cursor movement
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - h / 2) + "px; left: " + (e.pageX - h / 2) + "px"
  );
});

document.addEventListener("click", () => { // cursor expand on click
  cursor.classList.add("expand");
  window.setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

window.addEventListener("load", () => { // put the cursor in the middle of the screen onload
  cursor.setAttribute(
    "style",
    "top: " +
    (window.innerHeight / 2 - h / 2) +
    "px; left: " +
    (window.innerWidth / 2 - h / 2 + "px")
  );
});

window.addEventListener("scroll", (e) => { // mobile menu on scroll to the top
  if (sc && window.scrollY == 0 && isMobile()) {
    menu()
    sc = false;
  }
})

const isMobile = () => { // return if the device is mobile
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}