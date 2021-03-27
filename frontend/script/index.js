function closeform() {
    console.log('closeform');
    document.getElementById('form').innerHTML='';
}
function openform() {
    console.log('openform');
    document.getElementById('form').innerHTML=`<div class="form-wrapper">
    <div class="close-btn">
        <span onclick="closeform()" class="fa fa-times"></span>
    </div>
    <div class="form">
        <div class="form-title">Schedule New Lambda Function</div>
        <label>Name : <input type="text" class="input-text input-name"></label><br>
        <label>Trigger Url : <input type="text" class="input-text input-url"></label><br>
        <label>Payload Data : <input type="text" class="input-text input-data"></label><br>
        <label>Invoke Time : <input type="datetime-local" class="input-text input-date"></label><br>
        <button class="btn-submit">Submit</button>
    </div>
</div>`;
}