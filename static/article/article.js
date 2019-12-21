t1 = new TimelineMax({
    paused: true
});

t1.fromTo("#heart", 0.5, {
    top: "50%",
    scale: "2.5",
    ease: Back.easeOut.config(1.7),
    delay: 0,
    color: "white"
}, {
    top: "50%",
    scale: "3",
    ease: Back.easeOut.config(1.7),
    delay: 0,
    color: "red"
});

t1.fromTo(".likebtn", 0.2, {
    background: "red",
    ease: Back.easeOut.config(1.7),
    delay: -0.3,
}, {
    background: "white",
    ease: Back.easeOut.config(1.7),
    delay: -0.3,
});

t1.to("#heart", 0.2, {
    top: "50%",
    scale: "2.5",
    color: "red",
    delay: 0,
    ease: Back.easeOut.config(1.7),
});

t1.reverse();
t1.reversed(!t1.reversed());

var b_elements = Array.from(document.getElementsByTagName('strong'));

b_elements.forEach(b => {
    query = b.innerHTML;
    b.setAttribute('search-query', query);
    b.onclick = gotoDefiniton;
})

if (localStorage.getItem('liked_posts')) {
    likedposts = JSON.parse(localStorage.getItem('liked_posts'));
} else {
    likedposts = [];
}

function isLikedPost(post_id) {
    if (likedposts.length == 0)
        return false;

    for (post in likedposts) {
        if (likedposts[post].post == post_id)
            return true;
    }
    return false;
}

function findLikedPostIndex(post_id) {
    for (post in likedposts) {
        if (likedposts[post].post == post_id)
            return post;
    }
    return -1;
}

var post_id = document.getElementsByClassName('likebtn')[0].getAttribute('post_id');
var post_title = document.getElementsByClassName('likebtn')[0].getAttribute('post_title');
if (isLikedPost(post_id))
    t1.reversed(!t1.reversed());

document.getElementsByClassName('likebtn')[0].addEventListener('click', () => {
    var liked_post = {
        post: post_id,
        title: post_title,
    }
    if (!isLikedPost(post_id)) {
        likedposts.push(liked_post);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `/blog/post/${liked_post.post}/like/`, true);
        xhr.send();
        document.getElementById('like-count').innerHTML = parseInt(document.getElementById('like-count').innerHTML) + 1;
    } else {
        likedposts.splice(findLikedPostIndex(post_id), 1);
        var xhr = new XMLHttpRequest();
        xhr.open('POST', `/blog/post/${liked_post.post}/unlike/`, true);
        xhr.send();
        document.getElementById('like-count').innerHTML -= 1;
    }
    localStorage.setItem('liked_posts', JSON.stringify(likedposts));
    t1.reversed(!t1.reversed());
})

var entries = document.getElementsByTagName('h2');
var entries = Array.from(entries);
var id = 0;

var commentForm = document.getElementById('comment-form');
commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    var xhr = new XMLHttpRequest();
    var name = document.getElementById('form-name-field').value;
    var body = document.getElementById('form-text-field').value;
    var date = new Date();
    var params = `name=${name}&body=${body}`;
    xhr.open("POST", `/blog/post/${document.getElementsByClassName('likebtn')[0].getAttribute('post_id')}/comment/`, true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onload = function () {
        if (this.responseText == 'Done') {
            console.log('Comment Submitted');
            var new_comment = document.createElement('div');
            new_comment.classList.add('comment');
            var new_comment_title = document.createElement('h3');
            new_comment_title.innerText = name;
            var new_comment_dateholder = document.createElement('p');
            var new_comment_date = document.createElement('span');
            new_comment_date.classList.add('month');
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            new_comment_date.innerHTML = `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`;
            new_comment_dateholder.appendChild(new_comment_date);
            var new_comment_body = document.createElement('p');
            new_comment_body.innerHTML = body;
            new_comment.appendChild(new_comment_title);
            new_comment.appendChild(new_comment_dateholder);
            new_comment.appendChild(new_comment_body);
            var hr = document.createElement('hr');
            console.log(document.getElementsByClassName('comments')[0]);
            document.getElementsByClassName('comments')[0].insertBefore(new_comment, document.getElementsByClassName('comments')[0].childNodes[0]);
            document.getElementsByClassName('comments')[0].insertBefore(hr, new_comment);
        } else {
            alert('Failed to comment.');
        }
    };
    xhr.send(params);

})

entries.forEach(e => {
    e.innerHTML = `<a href="#${id}">#</a>${e.innerHTML}`;
    e.id = id;
    id++;
})

var url = document.URL;
var hid = url.substring(url.lastIndexOf('#') + 1);
window.scrollTo(0, document.getElementById(hid).offsetTop);

function gotoDefiniton(event) {
    var url = `https://google.com/search?q=${event.target.getAttribute('search-query')}`;
    window.location.href = url;
}