let numberofurl=1;

let data =[{
    "id" : 1,
    "name" : "orchestrator 1",
    "status" : "completed",
    "invoke_time" : "hellol",
    "payload" : "{}"
}]


function openform() {
    numberofurl=1;
    // console.log('openform');
    document.getElementById('form').innerHTML=`<div class="form-wrapper">
    <div class="close-btn">
        <span onclick="closeform()" class="fa fa-times"></span>
    </div>
    <div class="form">
        <div class="form-title">Schedule New Orchestration</div>
        <label>Name : <input type="text" id="input-name" class="input-text input-name"></label><br>
        <label>Payload Data : <input type="text" id="input-payload" class="input-text input-data"></label><br>
        <label>Delay( in ms ) : <input type="number" id="input-delay" class="input-text input-date"></label><br>
        <label>Trigger Url : <input type="text" id="input-url" class="input-text input-url"></label><span id="plus-0"><span class="add-btn"><span onclick="add_url()" class="fa fa-plus"></span></span></span><br>
        <div class="urladd" id="urladd">

        </div><br>
        <button onclick="scheduleorchestrator()" class="btn-submit">Submit</button><br></br>
        <span class="extra-text" id="extra-text"></span>
    </div>
</div>`;
}


function scheduleorchestrator() {
    document.getElementById('extra-text').innerText="";
    let name = document.getElementById('input-name').value;
    let payload = document.getElementById('input-payload').value;
    let delay = document.getElementById('input-delay').value;
    let url = "";
    if(document.getElementById('input-name').value=="")
    {
        document.getElementById('extra-text').innerText="Please Enter Name";
        return ;
    }
    if(document.getElementById('input-delay').value=="")
    {
        document.getElementById('extra-text').innerText="Please Enter delay";
        return ;
    }
    if(document.getElementById('input-url').value == "")
    {
        document.getElementById('extra-text').innerText="Please Enter Trigger Url";
        return ;
    }
    url = url + document.getElementById('input-url').value;
    for(let i=1;i<numberofurl;i++)
    {
        let conditionurl = document.getElementById(`input-condition-${i}`).value;
        let successurl = document.getElementById(`input-success-${i}`).value;
        let failureurl = document.getElementById(`input-failure-${i}`).value;
        if(conditionurl=="")
        {
            document.getElementById('extra-text').innerText=`Please Enter Condition Url ${i}`;
            return ;
        }
        if(successurl=="")
        {
            document.getElementById('extra-text').innerText=`Please Enter Success Url ${i}`;
            return ;
        }
        if(failureurl=="")
        {
            document.getElementById('extra-text').innerText=`Please Enter Failure Url ${i}`;
            return ;
        }
        url=url+`|${conditionurl}|${successurl}|${failureurl}`;
    }
    let data;
    let userid = localStorage.getItem('id')+localStorage.getItem('email');
    if(payload == "")
    {
        data = {
            userid,
            name,
            delay,
            url
        }
    }
    else
    {
        data = {
            userid,
            name,
            delay,
            url,
            payload
        }
    }
    let xhr = new XMLHttpRequest();
    xhr.open('POST','http://localhost:8081/orchestrate',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        if(xhr.status<300)
        {
            // console.log(xhr.response);
            if(xhr.response.result)
            {
                alert("Task Orchestrated");
                window.location.reload();
            }
            else
            {
                alert("Task Orchestration Failed !! Try again Later");
            }
        }
        else
        {
            alert("Task Scheduling Failed !! Try again Later");
        }
    }
    xhr.send(JSON.stringify(data));
}

function cancelorchestration(id)
{
    let data = {
        id
    }
    let xhr=new XMLHttpRequest();
    xhr.open('POST','http://localhost:8081/cancelorchestration',true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        console.log(xhr.response);
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
function openmodifyform(index) {
    console.log(index);
    document.getElementById('form').innerHTML=`<div class="form-wrapper">
    <div class="close-btn">
        <span onclick="closeform()" class="fa fa-times"></span>
    </div>
    <div class="form">
        <div class="form-title">Modify Lambda function</div>
        <label>Id : <input type="text" id="input-id" class="input-text input-id-modify" value="${data[index].id}" readonly></label><br>
        <label>Name : <input type="text" id="input-name" class="input-text input-name" value="${data[index].name}" readonly></label><br>
        <label>Delay( in ms ) : <input type="number" id="input-delay-modify" class="input-text input-date"></label><br>
        <button onclick="modifyorchestrator(${data[index].id})" class="btn-submit">Submit</button><br></br>
        <span class="extra-text" id="extra-text"></span>
    </div>
</div>`;
}

function modifyorchestrator(id) {
    let delay = document.getElementById('input-delay-modify').value;
    let data = {
        id,
        delay
    }
    let xhr=new XMLHttpRequest();
    xhr.open('POST','http://localhost:8081/modifydelay',true);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.responseType = 'json';
    xhr.onload = () => {
        if(xhr.status<300)
        {
            console.log(xhr.response);
            if(xhr.response)
            {
                alert("Orchestration Modified");
                window.location.reload();
            }
            else
            {
                alert("Orchestration Modification Failed !! Try again Later");
            }
        }
        else
        {
            alert("Orchestration Modification Failed !! Try again Later");
        }
    }
    xhr.send(JSON.stringify(data));
}

function closeform() {
    // console.log('closeform');
    document.getElementById('form').innerHTML='';
}


function add_url() {
    // console.log('hello');
    let addurl_html = document.getElementById('urladd').innerHTML;
    addurl_html = addurl_html + `<label>Condition Url ${numberofurl} : <input type="text" id="input-condition-${numberofurl}" class="input-text input-url-1"></label><br>
    <label>Success Url ${numberofurl} : <input type="text" id="input-success-${numberofurl}" class="input-text input-url-2"></label><br>
    <label>Failure Url ${numberofurl} : <input type="text" id="input-failure-${numberofurl}" class="input-text input-url-3"></label><span id="plus-${numberofurl}"></span><br>`;
    console.log(numberofurl-1);
    document.getElementById('urladd').innerHTML=addurl_html;
    document.getElementById(`plus-${numberofurl-1}`).innerHTML=``;
    document.getElementById(`plus-${numberofurl}`).innerHTML=`<span class="add-btn"><span onclick="add_url()" class="fa fa-plus"></span></span>`;
    numberofurl++;
}


function scheduler() {
    window.location.replace('http://localhost:3000/index.html')
}


function logout() {
    localStorage.clear();
    window.location.replace("http://localhost:3000/login.html");
}