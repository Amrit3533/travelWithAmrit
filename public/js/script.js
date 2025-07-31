

document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert.fade');
    alerts.forEach(alert => {
      setTimeout(() => {
        if (!alert.classList.contains('show')) {
          alert.classList.add('show');
        }
      }, 50);
    });

    (() => {
        'use strict';
        const forms = document.querySelectorAll('.needs-validation');
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    })();
});