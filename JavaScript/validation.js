

function validateForm(formType) {
    event.preventDefault(event)
    let isValid = true;

    if (formType === 'signup') {
        const username = document.getElementById('signup-username').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const rePassword = document.getElementById('signup-re-password').value;
        const phone = document.getElementById('signup-phone').value;
        const photoInput = document.getElementById('photo');
        const specialization = document.getElementById('signup-specialization').value;

        const usernameError = document.getElementById('signup-username-error');
        const emailError = document.getElementById('signup-email-error');
        const passwordError = document.getElementById('signup-password-error');
        const rePasswordError = document.getElementById('signup-re-password-error');
        const phoneError = document.getElementById('signup-phone-error');
        const specializationError = document.getElementById('signup-specialization-error');

        usernameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';
        rePasswordError.textContent = '';
        phoneError.textContent = '';

        const usernameRE = /^[a-zA-Z\s]{2,20}$/;
        if (!usernameRE.test(username)) {
            usernameError.textContent = "Username must be 2 to 20 alphabetic characters.";
            isValid = false;
        }

        const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRE.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        }

        if (password !== rePassword) {
            rePasswordError.textContent = "Passwords do not match.";
            isValid = false;
        }

        const phoneRE = /^[0-9]{11}$/;
        if (!phoneRE.test(phone)) {
            phoneError.textContent = "Phone number must be an 11-digit number.";
            isValid = false;
        }
        if (!specialization) {
            specializationError.textContent = "Please select a specialization.";
            isValid = false;
        } else {
            specializationError.textContent = '';
        }
        if(isValid)
            {

            var newDoctor = {
                UserName : username,
                Email : email,
                Password : password,
                Phone : phone,
                PersonalPhoto : photoInput,
                Specialization : specialization
            };
            console.log(newDoctor);
            var xhr = new XMLHttpRequest();
            xhr.open("POST","https://clinic-system-80ce9-default-rtdb.firebaseio.com/Doctors.json")
            xhr.setRequestHeader('Content-Type','application/json')
            xhr.send(JSON.stringify(newDoctor))
            xhr.addEventListener('readystatechange',function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log(JSON.parse(xhr.responseText));
                  
                        window.location.reload();
                 
                }
                
            })
        }
    }

    if (formType === 'login') {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const emailError = document.getElementById('login-email-error');
        const passwordError = document.getElementById('login-password-error');

        emailError.textContent = '';
        passwordError.textContent = '';

        const emailRE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRE.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (password.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters long.";
            isValid = false;
        }
        if (isValid) {
            // Fetch users from Firebase
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "https://clinic-system-80ce9-default-rtdb.firebaseio.com/Doctors.json", true);
            xhr.send();
    
            xhr.addEventListener('readystatechange', function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const users = JSON.parse(xhr.responseText);
    
                    if (!users) {
                        console.log( "No users registered yet.");
                        return;
                    }
    
                    let userFound = false;
    
                    for (const key in users) {
                        const user = users[key];
    
                        if (user.Email === email && user.Password === password) {
                            userFound = true;
                            window.location.href = "index.html";
                            break;
                        }
                    }
    
                    if (!userFound) {
                        alert("User not found! Invalid email or password!");
                    }
                }
            });
        }
    }

    return isValid;
}
