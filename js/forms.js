document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const fd = new FormData(form);
      // build subject and body
      let subj = fd.get('subject') || fd.get('type') || (form.id === 'contactForm' ? 'Hope Paws Contact' : 'Hope Paws Enquiry');
      let body = '';
      for (let pair of fd.entries()){
        body += pair[0] + ': ' + pair[1] + '\n';
      }
      const mailto = `mailto:02obed11@gmail.com?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
      // open mail client
      window.location.href = mailto;
      // show inline message
      const resp = form.querySelector('.response') || document.getElementById('responseMessage');
      if (resp) {
        resp.textContent = ' Message sent successfully.';
        resp.style.color = 'green';
      } else {
        alert('Message prepared — please finish sending in your email client.');
      }
      form.reset();
    });
  });
});
