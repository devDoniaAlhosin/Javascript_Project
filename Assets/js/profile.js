document.addEventListener("DOMContentLoaded", function() {
    console.log('Document loaded');

    // Try to get the user data from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
        // Redirect to login page if user data is not found in local storage
        console.log('No user found in local storage, redirecting to login page');
        window.location.href = 'login.html';
    } else {
        // Populate the profile page with user data from local storage
        console.log('User found in local storage:', user);
        document.getElementById('profileImage').src = user.image || 'default-profile.png'; // Placeholder image if not available
        document.getElementById('profileusername').value = user.username || '';
        document.getElementById('profilefname').value = user.firstName || '';
        document.getElementById('profilelname').value = user.lastName || '';
        document.getElementById('profileemail').value = user.email || '';
    }

    // Logout functionality
    document.getElementById('profilelogout').addEventListener('click', function(event) {
        event.preventDefault();
        console.log('Logout link clicked');
        localStorage.removeItem('user');
        alert('You have been logged out.');
        window.location.href = 'login.html';
    });
});




