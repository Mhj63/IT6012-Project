// scripts.js - Beans World (compat wrapper)
// Improved validation + cross-page greeting handling
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
      const firstNameEl = document.getElementById('firstName');
      const lastNameEl = document.getElementById('lastName');
      const mobileEl = document.getElementById('mobileNo');
      const emailEl = document.getElementById('email');

      const firstName = (firstNameEl && firstNameEl.value) ? firstNameEl.value.trim() : '';
      const lastName = (lastNameEl && lastNameEl.value) ? lastNameEl.value.trim() : '';
      const mobile = (mobileEl && mobileEl.value) ? mobileEl.value.trim() : '';
      const email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';

      let errors = [];

      if(firstName.length < 3) errors.push('First Name must be at least 3 characters.');
      if(lastName.length < 3) errors.push('Last Name must be at least 3 characters.');
      if(!/^\d{8}$/.test(mobile)) errors.push('Mobile No. must contain exactly 8 digits.');
      if(!/^\S+@\S+\.\S+$/.test(email)) errors.push('Please enter a valid E-mail address.');

      const errorBox = document.getElementById('regErrors');
      const successBox = document.getElementById('regSuccess');

      if(errors.length){
        // show all errors as a dismissible Bootstrap alert and indicate which fields
        const listHtml = '<ul class="mb-0">' + errors.map(e => `<li>${e}</li>`).join('') + '</ul>';
        errorBox.innerHTML = listHtml + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
        errorBox.classList.remove('d-none');
        errorBox.classList.remove('fade','show');
        errorBox.classList.add('alert','alert-danger','alert-dismissible','fade','show');
        errorBox.setAttribute('role','alert');

        // focus the first invalid field
        if(firstName.length < 3 && firstNameEl) firstNameEl.focus();
        else if(lastName.length < 3 && lastNameEl) lastNameEl.focus();
        else if(!/^\d{8}$/.test(mobile) && mobileEl) mobileEl.focus();
        else if(!/^\S+@\S+\.\S+$/.test(email) && emailEl) emailEl.focus();
        // also show a concise popup summary of errors
        try{
          window.alert('Please fix the following errors:\n\n' + errors.join('\n'));
        }catch(e){ /* ignore if alert blocked */ }
        return;
      }

      // Success (dismissible alert)
      const successMsg = `Thanks ${firstName}! Your interest has been registered.`;
      successBox.innerHTML = successMsg + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>';
      successBox.classList.remove('d-none');
      successBox.classList.add('alert','alert-success','alert-dismissible','fade','show');
      successBox.setAttribute('role','status');
      // also show a popup confirmation
      try{ window.alert(successMsg); }catch(e){ /* ignore */ }

      // Save first name to localStorage for subpages
      localStorage.setItem('bw_firstName', firstName);

      // update any open page greeting immediately
      const nameSpans = document.querySelectorAll('.bw-username');
      nameSpans.forEach(s => s.textContent = firstName);

      // Optionally reset form but keep localStorage
      regForm.reset();
    });
  }

  function clearMessages(){
    const errorBox = document.getElementById('regErrors');
    const successBox = document.getElementById('regSuccess');
    if(errorBox){ 
      errorBox.innerHTML=''; 
      errorBox.classList.remove('alert','alert-danger','alert-dismissible','fade','show');
      errorBox.classList.add('d-none'); 
      errorBox.removeAttribute('role');
    }
    if(successBox){ 
      successBox.innerHTML=''; 
      successBox.classList.remove('alert','alert-success','alert-dismissible','fade','show');
      successBox.classList.add('d-none'); 
      successBox.removeAttribute('role');
    }
  }

});
