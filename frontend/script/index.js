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
        <label>Name : <input type="text" id="input-name" class="input-text input-name"></label><br>
        <label>Trigger Url : <input type="text" id="input-url" class="input-text input-url"></label><br>
        <label>Payload Data : <input type="text" id="input-payload" class="input-text input-data"></label><br>
        <label>Delay( in ms ) : <input type="number" id="input-delay" class="input-text input-date"></label><br>
        <button onclick="taskSchedule()" class="btn-submit">Submit</button><br></br>
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
        if(dummy_data[i].status==status)
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
function showitem(index) {
    document.getElementById('list_item').innerHTML=`<div class="right-text-head">Id : <span class="right-text-body"> ${dummy_data[index].id}</span></div>
    <div class="right-text-head">URL or ARN : <span class="right-text-body">${dummy_data[index].urlorarn}</span></div>
    <div class="right-text-head">Status : <span class="right-text-body"> ${dummy_data[index].status} </span></div>
    <div class="right-text-head">invoke time : <span class="right-text-body"> ${dummy_data[index].invoke_time}</span></div>
    <button class="cancel-button" onclick="canceltask(${dummy_data[index].id})">Cancel</button>`;
}

function getitem() {
    let xhr = new XMLHttpRequest();
    let id=localStorage.getItem('id');
    let email=localStorage.getItem('email');
    let userid = id+email;
    let requrl = 'http://localhost:8081/alltasks/' + userid;
    xhr.open('GET',requrl);
    xhr.responseType='json';
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
        console.log(xhr.response);
        dummy_data=xhr.response;
        alllist();
    }
    xhr.send();
}
function taskSchedule() {
    // console.log('Hello');
    document.getElementById('extra-text').innerText="";
    let name=document.getElementById('input-name').value;
    let url=document.getElementById('input-url').value;
    let payload = document.getElementById('input-payload').value;
    let delay = document.getElementById('input-delay').value;
    if(name==="")
    {
        document.getElementById('extra-text').innerText="Please Enter Name";
    }
    else if(url==="")
    {
        document.getElementById('extra-text').innerText="Please Enter URL";
    }
    else if(delay==="")
    {
        document.getElementById('extra-text').innerText="Please Enter Delay";
    }
    else {
        console.log(url);
        let data = {
            "userid" : localStorage.getItem('id')+localStorage.getItem('email'),
            "name" : name,
            "url" : url,
            "delay" : delay,
            "payload" : payload
        }
        let xhr = new XMLHttpRequest();
        xhr.open('POST','http://localhost:8081/scheduletask',true);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.responseType = 'json';
        xhr.onload = () => {
            console.log(xhr.status)
            if(xhr.status<300)
            {
                console.log(xhr.response);
                if(xhr.response)
                {
                    alert("Task Scheduled");
                    window.location.reload();
                }
                else
                {
                    alert("Task Scheduling Failed !! Try again Later");
                }
            }
            else
            {
                alert("Task Scheduling Failed !! Try again Later");
            }
        }
        xhr.send(JSON.stringify(data));
    }
}
function canceltask(id) {
    let data ={
        id
    }
    let xhr=new XMLHttpRequest();
    xhr.open('POST','http://localhost:8081/canceltask',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType='json';
    xhr.onload = () => {
        if(xhr.status<300)
        {
            if(xhr.response)
            {
                alert('Task Cancelled');
                window.location.reload();
            }
            else{
                alert("Task Cancelling Failed !! Try again Later");
            }
        }
        else
        {
            alert("Task Cancelling Failed !! Try again Later");
        }
    }
    xhr.send(JSON.stringify(data));
}

function checklogin() {
    if(localStorage.getItem('id')===null)
    {
        window.location.replace("http://localhost:3000/login.html");
    }
    else
    {
        getitem();
    }
}
function logout() {
    localStorage.clear();
    window.location.replace("http://localhost:3000/login.html");
}
checklogin();