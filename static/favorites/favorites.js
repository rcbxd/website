var liked_posts = [];
if (localStorage.getItem("liked_posts")) {
  liked_posts = JSON.parse(localStorage.getItem("liked_posts"));
}
var favs = document.getElementById("favorites");
liked_posts.forEach(post => {
  var postholder = document.createElement("div");
  postholder.classList.add("post");
  var el = document.createElement("a");
  el.classList.add("title");
  el.setAttribute("href", `/blog/post/${post.post}`);
  el.innerHTML = post.title;
  postholder.appendChild(el);
  favs.appendChild(postholder);
});
