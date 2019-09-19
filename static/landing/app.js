// js app core

var sc = true;
var menu_open = false;
var theme = "black";

const isMobile = () => {
  // return if the device is mobile
  return (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
};
var t1;
window.addEventListener("load", () => {
  t1 = new TimelineMax({
    paused: true
  });
  t1.to(".bg", 0.3, {
    top: "0%",
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: 0,
    opacity: 1
  });
  t1.to(".bg2", 0.6, {
    top: "0%",
    opacity: 1,
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: -0.3
  });
  t1.to(".bg_sec", 0.8, {
    top: "0%",
    borderRadius: 0,
    ease: Expo.easeInOut,
    delay: -0.5
  });

  t1.reverse();

  if (isMobile()) {
    window.setTimeout(() => {
      document.getElementsByClassName("cursor")[0].style.display = "none";
    }, 1);
  }

  if (window.localStorage) {
    theme = window.localStorage.getItem("theme");
    if (theme == "white")
      document.getElementsByClassName("area")[0].classList.remove("goBlack");
    else document.getElementsByClassName("area")[0].classList.add("goBlack");
  }
});

const menu = () => {
  menu_open = !menu_open;
  t1.reversed(!t1.reversed());
  var i = 0;
  var load = setInterval(function () {
    // menu items loader
    document
      .getElementsByClassName("menu_item")[i].classList.toggle("menu_item_active");
    i++;
    if (i == document.getElementsByClassName("menu_item").length) {
      clearInterval(load);
    }
  }, 150);
  if (menu_open) {
    setTimeout(() => {
      document.body.classList.toggle("stable_bg");
    }, 200);
  } else {
    document.body.classList.toggle("stable_bg");
  }
};

window.addEventListener("scroll", e => {
  // mobile menu on scroll to the top
  if (sc && window.scrollY == 0 && isMobile()) {
    menu();
    sc = false;
  }
});

const goBlack = () => {
  if (theme == "black") {
    theme = "white";
  } else {
    theme = "black";
  }
  document.getElementsByClassName("area")[0].classList.toggle("goBlack");
  window.localStorage.setItem("theme", theme);
};

window.addEventListener('load', () => {
  let link = Array.from(document.querySelectorAll('a'));
  //remove all menu links
  link = link.slice(4, link.length)
  const cursor = document.querySelector('.cursor');

  const animateit = function (e) {
    const a = this;
    const {
      offsetX: x,
      offsetY: y
    } = e, {
      offsetWidth: width,
      offsetHeight: height
    } = this,
    move = 25,
      xMove = x / width * (move * 2) - move,
      yMove = y / height * (move * 2) - move;
    a.style.transform = `translate(${xMove}px, ${yMove}px)`;
    if (e.type === 'mouseleave') a.style.transform = '';
  };
  const editCursor = e => {
    const {
      clientX: x,
      clientY: y
    } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
  };
  link.forEach(b => b.addEventListener('mousemove', animateit));
  link.forEach(b => b.addEventListener('mouseleave', animateit));
  window.addEventListener('mousemove', editCursor);
})