var response;
var divHovers = document.querySelectorAll(".divHover");
var divHovers = ""
var buttonHovers = document.querySelectorAll(".buttonHoverBase");

var clinicList = document.getElementById('clinicsList')

var spansCity = document.getElementsByTagName('span')

var doctors = document.getElementById('doctors-list')
var clinicSelected;
var citySelected;

var doctorLink=document.getElementById("doctorlink")




var xhr = new XMLHttpRequest()
xhr.open('get', "data.json")
xhr.send()
xhr.addEventListener('readystatechange', function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        var response = JSON.parse(xhr.response);
     
       //! fill up clinics  DropDown List 
        for (const element of response["medicalSpecializations"]) {
            clinicList.innerHTML += `<option value=${element.name}>${element.name}</option>`;

        }  
        
        //! get doctors depend on clinics selected 
        var prams = new URLSearchParams(window.location.search);

        if (prams.size != 0) {
            clinicSelected = prams.get('specilized');
            clinicList.value = clinicSelected
            for (const element of response["medicalSpecializations"]) {
                if (element.name == clinicSelected ) {
                  
                    
                   for (var doctor of element.doctors) {
                     //! Get Doctors on Specific Clinic
                  if ( doctor.specialized==clinicSelected) {
                    doctors.innerHTML += 
                    `
                     <div class="divHover" doctor="${doctor.name}" >
                    <img src=${doctor.imageUrl}
                        style="border: 3px solid white;width: 90%;height:130px;box-shadow: 0px 0px 7px rgb(216, 213, 213);">
                    <p style="margin-top: 12px;margin-bottom:7px;">${doctor.name}</p>
                    
                    <p style="margin-top: 12px;margin-bottom:7px;">${doctor.specialized}</p>
                    
                   <form method="get" action="Booking.html"> 
                   <input  value=${doctor.specialized} name="specilized" hidden></input>
                     
                   <input  value=${doctor.name} name="doctor" hidden></input>
                     
                      <button type="submit" class="buttonHoverBase">
                      Book Appointment
                       </button>
                   </form>
                   </form>
                </div>`
                   }
              
                  
                    }
                    GetDoctorProfile()
                    Book()
           
                }}
        }
        else  //! get all doctors
        {
            for (const element of response["medicalSpecializations"]) {
                        for (var doctor of element.doctors) {
                        doctors.innerHTML += 
                        `
                     <div class="divHover" doctor="${doctor.name}" >
                    <img src=${doctor.imageUrl}
                        style="border: 3px solid white;width: 90%;height:130px;box-shadow: 0px 0px 7px rgb(216, 213, 213);">
                    <p style="margin-top: 12px;margin-bottom:7px;">${doctor.name}</p>
                    
                    <p style="margin-top: 12px;margin-bottom:7px;">${doctor.specialized}</p>
                    
                   <form method="get" action="Booking.html"> 
                   <input  value=${doctor.specialized} name="specilized" hidden></input>
                     
                   <input  value=${doctor.name} name="doctor" hidden></input>
                     
                      <button type="submit" class="buttonHoverBase">
                      Book Appointment
                       </button>
                   </form>
                </div>`
                        }
         }
            }   
                    
            GetDoctorProfile()
            Book()
   
                }
  

})



// // //! Fill Up Clinics DropDown List 
var xhrDoc = new XMLHttpRequest()
xhrDoc.open('get', "data.json")
xhrDoc.send()
xhrDoc.addEventListener('readystatechange', function () {
    if (xhrDoc.status == 200 && xhrDoc.readyState == 4) {
        var response = JSON.parse(xhrDoc.response);


        //! select spans of cities
        var currentSpan = spansCity[0]
        for (let index = 0; index < spansCity.length; index++) {
            spansCity[index].addEventListener('click', function () {
                citySelected = spansCity[index].getAttribute('value');

                currentSpan.style.borderBottom = "none";
                currentSpan.style.color = "#000";


                // Update the current span and add border
                currentSpan = spansCity[index];
                currentSpan.style.borderBottom = "2px solid #0c6e45";
                currentSpan.style.color = "#0c6e45";
                doctors.innerHTML=""
               
                //! filter with city selected 
                for (const element of response["medicalSpecializations"]) {

                    for (const doctor of element.doctors) {
                        if (doctor.location == citySelected) {
                            //  console.log("hello");


                            doctors.innerHTML += 
                            `
                            <div class="divHover" doctor="${doctor.name}" 
                          >
                           <img src=${doctor.imageUrl}
                               style="border: 3px solid white;width: 90%;height:130px;box-shadow: 0px 0px 7px rgb(216, 213, 213);">
                           <p style="margin-top: 12px;margin-bottom:7px;">${doctor.name}</p>
                           
                           <p style="margin-top: 12px;margin-bottom:7px;">${doctor.specialized}</p>
                           
                          <form method="get" action="Booking.html"> 
                          <input  value=${doctor.specialized} name="specilized" hidden></input>
                            
                          <input  value=${doctor.name} name="doctor" hidden></input>
                            
                             <button type="submit" class="buttonHoverBase">
                             Book Appointment
                              </button>
                          </form>
                       </div>`
                        } else{
                            doctors.innerHTML += 
                            `
                            <div class="divHover" doctor="${doctor.name}" 
                          >
                           <img src=${doctor.imageUrl}
                               style="border: 3px solid white;width: 90%;height:130px;box-shadow: 0px 0px 7px rgb(216, 213, 213);">
                           <p style="margin-top: 12px;margin-bottom:7px;">${doctor.name}</p>
                           
                           <p style="margin-top: 12px;margin-bottom:7px;">${doctor.specialized}</p>
                           
                          <form method="get" action="Booking.html"> 
                          <input  value=${doctor.specialized} name="specilized" hidden></input>
                            
                          <input  value=${doctor.name} name="doctor" hidden></input>
                            
                             <button type="submit" class="buttonHoverBase">
                             Book Appointment
                              </button>
                          </form>
                       </div>`
                        }
        
                    }


                }

                GetDoctorProfile()
                Book()

            })
        }
      


        //! filter with Clinic drop down 
        clinicList.addEventListener('change', function (e) {
            clinicSelected = e.target.value;

            doctors.innerHTML=""
            for (const element of response["medicalSpecializations"]) {
                if (element.name == clinicSelected) {
                    for (const doctor of element.doctors) {
                        doctors.innerHTML += 
                        `
                        <div class="divHover" doctor="${doctor.name}" 
                       >
                       <img src=${doctor.imageUrl}
                           style="border: 3px solid white;width: 90%;height:130px;box-shadow: 0px 0px 7px rgb(216, 213, 213);">
                       <p style="margin-top: 12px;margin-bottom:7px;">${doctor.name}</p>
                       
                       <p style="margin-top: 12px;margin-bottom:7px;">${doctor.specialized}</p>
                       
                      <form method="get" action="Booking.html"> 
                      <input  value=${doctor.specialized} name="specilized" hidden></input>
                        
                      <input  value=${doctor.name} name="doctor" hidden></input>
                        
                         <button type="submit" class="buttonHoverBase">
                         Book Appointment
                          </button>
                      </form>
                   </div>`
                    }
                } 
               

            }

            GetDoctorProfile()
            Book()
        }
        )

      
    }

})



function GetDoctorProfile(){
    var cards=document.querySelectorAll(".divHover");
    for(var i =0; i<cards.length; i++)
    {
        let card= cards[i]
        card.addEventListener('click',function(){
            var docName=card.getAttribute('doctor');
            window.location.href = `profile.html?doctor=${docName}`;
    
        })
    }
}


function Book(){
    divHovers=document.querySelectorAll(".divHover");
buttonHovers=document.querySelectorAll(".buttonHoverBase");


for (let i = 0; i < divHovers.length; i++) {
  divHovers[i].addEventListener('mouseover',function(){
   
  buttonHovers[i].style.display="inline-block"
  })
}
for (let i = 0; i < divHovers.length; i++) {
  divHovers[i].addEventListener('mouseout',function(){
   
  buttonHovers[i].style.display="none"
  })
}
}


