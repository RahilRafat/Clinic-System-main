var profileDoc=document.getElementById("profile");
console.log(profileDoc);


var xhr = new XMLHttpRequest()
xhr.open('get', "data.json")
xhr.send()
xhr.addEventListener('readystatechange', function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        var response = JSON.parse(xhr.response);
          
        var prams = new URLSearchParams(window.location.search);

            var docName=prams.get('doctor');
              
                         for (const element of response["medicalSpecializations"]) {
                           for (const doctor of element.doctors) {
                           if (doctor.name==docName) {
                            profileDoc.innerHTML=
                            ` <img src="${doctor.imageUrl}" alt="${doctor.name}">
                                <h1>${doctor.name}</h1>
                                <p><strong>Specialization:</strong> ${doctor.specialized}</p>
                                <p>${doctor.description}</p>
                                <p><strong>Location:</strong> ${doctor.location}</p>
                                <button onclick="goBack()">Back to All Doctors</button> `;

                          

                           }
                        }
                    }
                    
                  
                      
                    }
            
   
                })

                function goBack() {
                    window.location.href = "Doctors.html";
                  }