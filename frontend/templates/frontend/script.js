function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


        
buildList();
function buildList(){
    var wrapper = document.getElementById("list-wrapper")
    wrapper.innerHtml = ''
    var url = 'http://127.0.0.1:8000/api/task-list/'

    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        console.log('Data:', data);

        var list = data
        for(var i in list){
            var item=`
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:10">
                        <span class="title">${list[i].title}</span>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-info edit">Edit</button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-dark delete">-</button> 
                    </div>
                </div>
            `

            wrapper.innerHTML += item 
        }
    })
}    

var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    console.log('form submited')

    var url = 'http://127.0.0.1:8000/api/task-create/'

    var title = document.getElementById('title').value

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-type': 'application/json',
        },
        body:JSON.stringify({'title':title})
    }
    ).then( function (response) {
        buildList()
    })

})