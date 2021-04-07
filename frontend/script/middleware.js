function fetchlogin() {
    fetch('http://localhost:8081/success')
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('email',data.emails[0].value);
        localStorage.setItem('id',data.id);
        localStorage.setItem('display_name',data.displayName);
        window.location.replace("http://localhost:3000/index.html");
    });
}
fetchlogin();