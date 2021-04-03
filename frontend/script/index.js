function closeform() {
    // console.log('closeform');
    document.getElementById('form').innerHTML='';
}
function openform() {
    // console.log('openform');
    document.getElementById('form').innerHTML=`<div class="form-wrapper">
    <div class="close-btn">
        <span onclick="closeform()" class="fa fa-times"></span>
    </div>
    <div class="form">
        <div class="form-title">Schedule New Lambda Function</div>
        <label>Name : <input type="text" class="input-text input-name"></label><br>
        <label>Trigger Url : <input type="text" class="input-text input-url"></label><br>
        <label>Payload Data : <input type="text" class="input-text input-data"></label><br>
        <label>Delay( in ms ) : <input type="number" class="input-text input-date"></label><br>
        <button class="btn-submit">Submit</button><br></br>
        <span class="extra-text" id="extra-text"></span>
    </div>
</div>`;
}
let dummy_data = [{
    "id" : 1,
    "name" : "schedule 1",
    "url" : "asdhka",
    "Status" : "Scheduled",
    "invoke_time" : "15:15:1515"
},{
    "id" : 2,
    "name" : "schedule 2",
    "url" : "asdhkaaa",
    "Status" : "Canceled",
    "invoke_time" : "15:15:1515"
},{
    "id" : 3,
    "name" : "schedule 3",
    "url" : "asdhka",
    "Status" : "Completed",
    "invoke_time" : "15:15:1515"
},{
    "id" : 4,
    "name" : "schedule 4",
    "url" : "asdhka",
    "Status" : "Failed",
    "invoke_time" : "15:15a:1515"
},{
    "id" : 5,
    "name" : "schedule 5",
    "url" : "asdhka",
    "Status" : "Scheduled",
    "invoke_time" : "15:15:1515"
}];
function alllist() {
    document.getElementById('list').innerHTML='';
    let list_html = ``;
    for(let i=0;i<dummy_data.length;i++)
    {
        list_html = list_html + `<div id="item${i}" onclick="showitem(${i})" class="list-text-wrapper">
            <div class="list-text">${dummy_data[i].name}</div>
        </div>`;
    }
    document.getElementById('list').innerHTML=list_html;
    showitem(0);
}
function custom_list(status) {
    let isfirst=true;
    let list_html=``;
    for(let i=0;i<dummy_data.length;i++)
    {
        if(dummy_data[i].Status==status)
        {
            list_html = list_html + `<div id="item${i}" onclick="showitem(${i})" class="list-text-wrapper">
                <div class="list-text">${dummy_data[i].name}</div>
            </div>`;
            if(isfirst)
            {
                isfirst=false;
                showitem(i);
            }
        }
    }
    document.getElementById('list').innerHTML=list_html;
}
function optionchange() {
    let option = document.getElementById('option_select').value;
    if(option=='All')
    {
        alllist();
    }
    else 
    {
        custom_list(option);
    }
}
alllist();
function showitem(index) {
    document.getElementById('list_item').innerHTML=`<div class="right-text-head">Id : <span class="right-text-body"> ${dummy_data[index].id}</span></div>
    <div class="right-text-head">URL or ARN : <span class="right-text-body">${dummy_data[index].url}</span></div>
    <div class="right-text-head">Status : <span class="right-text-body"> ${dummy_data[index].Status} </span></div>
    <div class="right-text-head">invoke time : <span class="right-text-body"> ${dummy_data[index].invoke_time}</span></div>
    <button class="cancel-button">Cancel</button>`;
}