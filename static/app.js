// js app core

const cursor = document.getElementById("cursor");
const h = cursor.offsetHeight - 2;
var sc = true;
var menu_open = false;
var theme = 'black';

const isMobile = () => { // return if the device is mobile
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
var t1;
window.addEventListener('load', () => {

  t1 = new TimelineMax({
    paused: true
  });
  t1.to(".bg", 0.3, {
    top: "-10vh",
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: 0,
    opacity: 1,
  });
  t1.to(".bg2", 0.6, {
    top: "-10vh",
    opacity: 1,
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: -0.3
  });
  t1.to(".bg_sec", 0.8, {
    top: "-10vh",
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: -0.5
  });

  t1.reverse();

  if (isMobile()) {
    window.setTimeout(() => {
      document.getElementById('cursor').style.display = "none";
    }, 1)

  }

  if (window.localStorage) {
    theme = window.localStorage.getItem('theme');
    if (theme == 'black')
      document.getElementsByClassName('area')[0].classList.add('goBlack')
    else
      document.getElementsByClassName('area')[0].classList.remove('goBlack')
  }
})


const menu = () => {
  menu_open = !menu_open;
  t1.reversed(!t1.reversed());
  cursor.classList.toggle("cursor_invert");
  var i = 0;
  var load = setInterval(function () { // menu items loader
    document
      .getElementsByClassName("menu_item")[i].classList.toggle("menu_item_active");
    i++;
    if (i == document
      .getElementsByClassName("menu_item").length) {
      clearInterval(load);
    }
  }, 100);
  if (menu_open) {
    setTimeout(() => {
      document.body.classList.toggle('stable_bg');
    }, 200)
  } else {
    document.body.classList.toggle('stable_bg')
  }
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

const goBlack = () => {
  if (theme == 'black') {
    theme = 'white';
  } else {
    theme = 'black'
  }
  document.getElementsByClassName('area')[0].classList.toggle('goBlack')
  window.localStorage.setItem('theme', theme);
}