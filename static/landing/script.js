window.onload = () => {
  Array.from(document.getElementsByClassName('nav')[0].getElementsByTagName('a')).forEach(el => {
    el.style.animation = 'pageLoadLinks 0.2s';
  });
  Array.from(document.getElementsByClassName('contacts')[0].getElementsByTagName('a')).forEach(el => {
    el.style.animation = 'pageLoadLinks 0.2s';
  });
  Array.from(document.getElementsByClassName('title-medium')).forEach(el => {
    el.style.animation = 'pageLoadText 0.2s';
  })
}