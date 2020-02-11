// js app core

const isMobile = () => {
  // return if the device is mobile
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

if (isMobile()) {
  window.setTimeout(() => {
    document.getElementsByClassName("cursor")[0].style.display = "none";
  }, 1);
}

window.addEventListener("load", () => {
  const cursor = document.querySelector(".cursor");
  const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
  };
  window.addEventListener("mousemove", editCursor);
});

var url = document.URL;
var hid = url.substring(url.lastIndexOf("#") + 1);
if (hid.indexOf("timeline") == 0) {
  window.scrollTo(0, document.getElementById("timeline").offsetTop + document.getElementById(hid).offsetTop - 50);
}
else {
  window.scrollTo(0, document.getElementById(hid).offsetTop - 50);
}

