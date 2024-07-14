document.getElementById('registersubmit').addEventListener('click', function(event) {
    event.preventDefault();
    
    // Get form values
    const registername = document.getElementById('registername').value;
    const registeremail = document.getElementById('registerEmail').value;
    const registerpassword = document.getElementById('registerPass').value;
    const registerconfirmPassword = document.getElementById('registerchpass').value;

    // Get error message div
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.style.display = 'none';  // Hide error message div initially

    // Validate empty fields
    if (registername === "" || registeremail === "" || registerpassword === "" || registerconfirmPassword === "") {
        errorMessageDiv.innerHTML = "Please fill all the fields";
        errorMessageDiv.style.display = 'block';  // Show error message div
        return;
    }

    // Validate username length
    if (registername.length <= 3) {
        errorMessageDiv.innerHTML = "Username must contain more than 3 characters";
        errorMessageDiv.style.display = 'block';  // Show error message div
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registeremail)) {
        errorMessageDiv.innerHTML = "Please enter a valid email address";
        errorMessageDiv.style.display = 'block';  // Show error message div
        return;
    }
    
    // Validate passwords match
    if (registerpassword !== registerconfirmPassword) {
        errorMessageDiv.innerHTML = 'Passwords do not match';
        errorMessageDiv.style.display = 'block';  // Show error message div
        return;
    }

    // Create user object
    const user = {
        username: registername,
        email: registeremail,
        password: registerpassword
    };

    // Store user object as JSON string in local storage
    localStorage.setItem('user', JSON.stringify(user));

    // Redirect to login page
    window.location = "login.html";
});
