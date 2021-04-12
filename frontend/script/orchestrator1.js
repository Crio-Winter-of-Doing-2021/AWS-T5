function alllist() {
    document.getElementById('list').innerHTML='';
    let list_html = '';
    for(let i=0;i<data.length;i++)
    {
        list_html = list_html + `<div id="item${i}" onclick="showitem(${i})" class="list-text-wrapper">
            <div class="list-text">${data[i].name}</div>
        </div>`;
    }
    document.getElementById('list').innerHTML=list_html;
    showitem(0);
}



function showitem(index) {
    document.getElementById('list_item').innerHTML=`<div class="right-text-head">Id : <span class="right-text-body"> ${data[index].id}</span></div>
    <div class="right-text-head">Status : <span class="right-text-body"> ${data[index].status} </span></div>
    <div class="right-text-head">invoke time : <span class="right-text-body"> ${data[index].invoke_time}</span></div>
    <div id="url-list"></div>
    <button class="cancel-button" onclick="cancelorchestration(${data[index].id})">Cancel</button>
    <button class="modify-button" onclick="openmodifyform(${index})">Modify</button>`;
    let urllist = data[index].orchestratorlist;
    // console.log(urllist)
    let url_html = ``;
    urllist=urllist.replace(/\s+/g, '').split('|');
    // console.log(urllist);
    let n=urllist.length;
    n--;
    n/=3;
    url_html = url_html + `<div class="right-text-head">First URL : <span class="right-text-body"> ${urllist[0]}</span></div>`;
    for(let i=0;i<n;i++)
    {
        url_html = url_html + `<div class="right-text-head">Condition URL ${i+1} : <span class="right-text-body"> ${urllist[3*i+1]}</span></div>`;
        url_html = url_html + `<div class="right-text-head">Success URL ${i+1} : <span class="right-text-body"> ${urllist[3*i+2]}</span></div>`;
        url_html = url_html + `<div class="right-text-head">Failure URL ${i+1} : <span class="right-text-body"> ${urllist[3*i+3]}</span></div>`;
    }
    document.getElementById('url-list').innerHTML = url_html;
}

function getitem() {
    let xhr = new XMLHttpRequest();
    let id=localStorage.getItem('id');
    let email = localStorage.getItem('email');
    let userid = id+email;
    let requrl = 'http://localhost:8081/getorchetration/'+userid;
    xhr.open('GET',requrl);
    xhr.responseType='json';
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
        console.log(xhr.response);
        data=xhr.response;
        alllist();
    }
    xhr.send();
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

checklogin();