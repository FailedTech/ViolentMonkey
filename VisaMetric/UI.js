const modal = $('<div>', {
    'class': 'modal fade',
    'id': 'myModal',
    'tabindex': '-1',
    'aria-labelledby': 'exampleModalLabel',
    'aria-hidden': 'true',
    'html': '<div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header night-mode"><h5 class="modal-title night-mode" id="exampleModalLabel">Night Mode Modal</h5><button type="button" class="btn-close btn-close-dark" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body night-mode"><p class="night-mode">This is the content of the night mode modal.</p></div><div class="modal-footer night-mode"><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Save changes</button></div></div></div>'
});

// Append the modal to the body
$('body').append(modal);

// Initialize the Bootstrap modal
$('#myModal').modal();

// Add a class to the body to enable dark mode
$('body').addClass('dark');

// Apply custom CSS styles for the lighter dark mode
$('body.dark .modal-content').css({
    'background-color': '#2a2e36', // Lighter background color
    'color': '#fff' // Light text color
});

$('body.dark .modal-content .modal-header, body.dark .modal-content .modal-footer').css({
    'border-color': '#424242' // Border color
});

$('body.dark .form-control').css({
    'background-color': '#282d36', // Form control background color
    'border-color': '#282d36' // Form control border color
});

// Wait for the DOM to be ready
$(document).ready(function() {
    // Attach a click event listener to elements with class .footer-logo
    $('.footer-logo').click(function() {
        // Trigger the Bootstrap modal with a specific ID when .footer-logo is clicked
        $('#myModal').modal('show');
    });
});