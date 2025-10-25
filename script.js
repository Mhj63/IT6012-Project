// scripts.js - Beans World
document.addEventListener('DOMContentLoaded', function(){

  // Show welcome name if saved
  const savedName = localStorage.getItem('bw_firstName');
  if(savedName){
    const nameSpans = document.querySelectorAll('.bw-username');
    nameSpans.forEach(s => s.textContent = savedName);
  }

  // Registration form validation on home page
  const regForm = document.getElementById('registerForm');
  if(regForm){
    regForm.addEventListener('submit', function(e){
      e.preventDefault();
      clearMessages();
      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const mobile = document.getElementById('mobileNo').value.trim();
      const email = document.getElementById('email').value.trim();

      let errors = [];

      if(firstName.length < 3) errors.push('First Name must be at least 3 characters.');
      if(lastName.length < 3) errors.push('Last Name must be at least 3 characters.');
      if(!/^\d{8}$/.test(mobile)) errors.push('Mobile No. must contain exactly 8 digits.');
      if(!/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid E-mail address.');

      const errorBox = document.getElementById('regErrors');
      const successBox = document.getElementById('regSuccess');

      if(errors.length){
        errorBox.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
        errorBox.classList.remove('d-none');
        return;
      }

      // Success
      successBox.innerHTML = `Thanks ${firstName}! Your interest has been registered.`;
      successBox.classList.remove('d-none');

      // Save first name to localStorage for subpages
      localStorage.setItem('bw_firstName', firstName);

      // Optionally reset form
      regForm.reset();
    });
  }

  function clearMessages(){
    const errorBox = document.getElementById('regErrors');
    const successBox = document.getElementById('regSuccess');
    if(errorBox){ errorBox.innerHTML=''; errorBox.classList.add('d-none'); }
    if(successBox){ successBox.innerHTML=''; successBox.classList.add('d-none'); }
  }

});
