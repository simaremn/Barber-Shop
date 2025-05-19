// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('header nav');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active'); 
    document.body.classList.toggle('menu-open'); 
});

// Book button navigation
document.getElementById('book-button')?.addEventListener('click', function() {
    window.location.href = 'html/appointment.html';
});


if (window.location.pathname.includes('contact.html') || window.location.pathname.includes('gallery.html') || window.location.pathname.includes('appointment.html')) {
  document.body.style.overflowY = 'auto';
} else {
  document.body.style.overflow = 'hidden';
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = item.querySelector('img');
        item.style.setProperty('--img-url', `url('${img.src}')`);
    });
    item.addEventListener('mouseleave', function() {
        item.style.removeProperty('--img-url');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Set min date/time to now, rounded up to next hour
    const dtInput = document.getElementById('datetime');
    if (dtInput) {
        const now = new Date();
        now.setMinutes(0,0,0);
        now.setHours(now.getMinutes() > 0 ? now.getHours() + 1 : now.getHours());
        dtInput.min = now.toISOString().slice(0,16);
    }

    // Set min date to today
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;

        // Disable Sundays
        dateInput.addEventListener('input', function() {
            const selected = new Date(this.value);
            if (selected.getDay() === 0) { // Sunday
                alert('Sorry, we are closed on Sundays. Please select another day.');
                this.value = '';
                timeInput.innerHTML = '<option value="" disabled selected>Select a time</option>';
                return;
            }
            populateTimeSlots(selected);
        });
    }

    function populateTimeSlots(date) {
        if (!timeInput) return;
        let slots = [];
        if (date.getDay() === 6) { // Saturday
            slots = ['09:00','10:00','11:00','12:00','13:00','14:00'];
        } else {
            slots = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
        }
        timeInput.innerHTML = '<option value="" disabled selected>Select a time</option>';
        slots.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeInput.appendChild(option);
        });
    }

    // Set min date on load and populate time if date is already set
    if (dateInput && dateInput.value) {
        const selected = new Date(dateInput.value);
        if (selected.getDay() !== 0) {
            populateTimeSlots(selected);
        }
    }

    // Appointment form submit
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('You successfully booked an appointment!');
            form.reset();
            if (timeInput) {
                timeInput.innerHTML = '<option value="" disabled selected>Select a time</option>';
            }
        });
    }

    // Contact form submit alert
    const contactForm = document.getElementById('C-Form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Message sent!');
            contactForm.reset();
        });
    }
});
