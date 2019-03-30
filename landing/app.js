function menu() {
  document.getElementsByClassName('bg_sec')[0].classList.toggle("mobile_menu_active")
  document.getElementsByClassName('bg')[0].classList.toggle("mobile_menu_active")
  document.getElementsByClassName('bg2')[0].classList.toggle("mobile_menu_active")
  var i = 0;
  var load = setInterval(function () {
    document.getElementsByClassName('menu_skill')[i].classList.toggle("menu_item_active")
    i++
    if (i == 4) {
      clearInterval( load );
    }
  }, 70)

}
