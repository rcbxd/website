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
  var load = setInterval(function () {
    document
      .getElementsByClassName("menu_item")[i].classList.toggle("menu_item_active");
    i++;
    if (i == 3) {
      clearInterval(load);
    }
  }, 100);
};

const cursorHighlight = s => {
  if (s) {
    cursor.classList.add("expand");
  }
  cursor.classList.add("cursor_highlight");
};

const cursorBack = () => {
  cursor.classList.remove("expand");
  cursor.classList.remove("cursor_highlight");
};

document.addEventListener("mousemove", e => {
  cursor.setAttribute(
    "style",
    "top: " + (e.pageY - h / 2) + "px; left: " + (e.pageX - h / 2) + "px"
  );
});

document.addEventListener("click", () => {
  cursor.classList.add("expand");
  window.setTimeout(() => {
    cursor.classList.remove("expand");
  }, 500);
});

window.addEventListener("load", () => {
  cursor.setAttribute(
    "style",
    "top: " +
    (window.innerHeight / 2 - h / 2) +
    "px; left: " +
    (window.innerWidth / 2 - h / 2 + "px")
  );
});



window.addEventListener("wheel", (e) => {
  if (e.deltaY < 0 && sc && window.scrollY == 0) {
    sc = false;
    menu()
  }
})


window.addEventListener("scroll", (e) => {
  if (sc && window.scrollY == 0 && isMobile()) {
    menu()
    sc = false;
  }
})

const isMobile = () => {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}