const form = document.getElementById('contact-form');
function sendcontactinfo() {
    event.preventDefault(event)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    var newMessage = {
        UserName : name,
        Email : email,
        Message : message,
        timestamp: new Date().toISOString()
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://clinic-system-80ce9-default-rtdb.firebaseio.com/Messages.json")
    xhr.setRequestHeader('Content-Type','application/json')
    xhr.send(JSON.stringify(newMessage))
    xhr.addEventListener('readystatechange',function () {
        if (xhr.readyState == 4 && xhr.status == 200)
             {
            console.log(JSON.parse(xhr.responseText));
          
                window.location.reload();
         
    }
})
}