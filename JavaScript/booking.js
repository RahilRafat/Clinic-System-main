// إنشاء طلب HTTP باستخدام XMLHttpRequest
const xhr = new XMLHttpRequest();
xhr.open('GET', "data.json", true);  // استخدام GET لجلب البيانات من ملف JSON
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);  // تحويل النص إلى كائن JSON
    populateSpecialties(data); // تعبئة خيارات التخصصات بناءً على البيانات من ملف JSON
  }
};
xhr.send(); // إرسال الطلب
 
// دالة لتعبئة خيارات التخصصات بناءً على البيانات من ملف JSON
function populateSpecialties(data) {
  const specialtySelect = document.getElementById('specialty');
 
  // الحصول على أسماء التخصصات من البيانات
  const specialties = Object.keys(data["medicalSpecializations"]);
  
var dataS=data["medicalSpecializations"];
 console.log(dataS);
 
  // تعبئة التخصصات في القائمة المنسدلة
  data["medicalSpecializations"].forEach(specialty => {
    const option = document.createElement('option');
    option.value = specialty.name;  // التخصص بالإنجليزية
    option.textContent = specialty.name;  // التخصص بالإنجليزية
    specialtySelect.appendChild(option);
  });
 
  // إضافة حدث تغيير للتخصص لعرض الأطباء بناءً على التخصص
  specialtySelect.addEventListener('change', function () {
    const selectedSpecialty = specialtySelect.value;
    console.log(selectedSpecialty);
    
    var doctors;
   for (const element of dataS) {
    
    if (selectedSpecialty== element.name) {
      doctors=element.doctors
      
    }
   }

 
    // تحديث قائمة الأطباء بناءً على التخصص
    populateDoctorOptions(doctors);
  });

 
  // تفعيل التغيير المبدئي لعرض الأطباء للتخصص الأول
  specialtySelect.dispatchEvent(new Event('change'));
}
 
// دالة لتعبئة خيارات الأطباء بناءً على التخصص المختار
function populateDoctorOptions(doctors) {
  const doctorSelect = document.getElementById('doctor');
 
  // مسح الخيارات الحالية للأطباء
  doctorSelect.innerHTML = '';
 
  // تعبئة الأطباء بناءً على التخصص المختار
  doctors.forEach(doctor => {
    const option = document.createElement('option');
    option.value = doctor.name;
    option.textContent = doctor.name;
    doctorSelect.appendChild(option);
  });
}
// عند إرسال النموذج، نقوم بتخزين البيانات في localStorage
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
  event.preventDefault();
 
  // جمع بيانات النموذج
  const visitType = document.getElementById('visitType').value;
  const specialty = document.getElementById('specialty').value;
  const doctor = document.getElementById('doctor').value;
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
 
  if (!visitType || !specialty || !doctor || !name || !email || !phone) {
    alert('Please fill out all fields.');
    return;
  }
 
  // إعداد بيانات الموعد الجديد
  const newAppointment = { visitType, specialty, doctor, name, email, phone };
 
  // استرجاع البيانات المخزنة مسبقًا من localStorage
  const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
 
  // إضافة الموعد الجديد إلى قائمة المواعيد
  storedAppointments.push(newAppointment);
 
  // إعادة تخزين البيانات المحدثة في localStorage
  localStorage.setItem('appointments', JSON.stringify(storedAppointments));
 
  // الانتقال إلى صفحة التأكيد
  window.location.href = 'confirmation.html';
});
 
 
 
// search by phone
document.getElementById('search-button').addEventListener('click', function () {
  const phoneSearch = document.getElementById('phone-search').value;
  const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
 
  // البحث عن الموعد باستخدام رقم الهاتف
  const appointment = storedAppointments.find(app => app.phone === phoneSearch);
 
  if (appointment) {
    // ملء النموذج بالبيانات المخزنة
    document.getElementById('name').value = appointment.name;
    document.getElementById('email').value = appointment.email;
    document.getElementById('phone').value = appointment.phone;
    document.getElementById('visitType').value = appointment.visitType;
    document.getElementById('specialty').value = appointment.specialty;
 
    // تحديث قائمة الأطباء
    const specialtySelect = document.getElementById('specialty');
    specialtySelect.dispatchEvent(new Event('change')); // تحديث قائمة الأطباء
    document.getElementById('doctor').value = appointment.doctor;
  } else {
    alert("No appointment found for this phone number.");
  }
});
 