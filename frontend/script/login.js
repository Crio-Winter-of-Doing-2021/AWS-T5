function checklogout() {
    if(localStorage.getItem('id')!=null)
    {
        // console.log('Hello');
        window.location.replace("http://localhost:3000/index.html");
    }
}
checklogout();