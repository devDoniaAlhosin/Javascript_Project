
// document.querySelector('.login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const loginemail = document.getElementById("loginEmail").value;
//     const loginpass = document.getElementById("loginPass").value;

//     if (loginemail === "" || loginpass === "") {
//         alert("Please fill all the requirements");
//         return;
//     }

//     const getloginEmail = localStorage.getItem("email");
//     const getloginpass = localStorage.getItem("password");

//     if (loginemail === getloginEmail && loginpass === getloginpass) {
//         alert("You are logged in with local storage");
//         return;
//     }

//     // Fetch all users from the API
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(data => {
//             const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
//             if (user) {
//                 // Store the user data in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 alert('Login successful with API');
//                 // Redirect to another page if needed
//                 // window.location.href = 'index.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred');
//         });
// });

// document.querySelector('.login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const loginemail = document.getElementById("loginEmail").value;
//     const loginpass = document.getElementById("loginPass").value;

//     if (loginemail === "" || loginpass === "") {
//         alert("Please fill all the requirements");
//         return;
//     }

//     const getloginEmail = localStorage.getItem("email");
//     const getloginpass = localStorage.getItem("password");

//     if (loginemail === getloginEmail && loginpass === getloginpass) {
//         alert("You are logged in with local storage");
//         return;
//     }

//     // Fetch all users from the API
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(data => {
//             const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
//             if (user) {
//                 // Store the user data in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 alert('Login successful with API');
//                 // Redirect to another page if needed
//                 window.location.href = 'profile.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred');
//         });
// });

// document.querySelector('.login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const loginemail = document.getElementById("loginEmail").value;
//     const loginpass = document.getElementById("loginPass").value;

//     if (loginemail === "" || loginpass === "") {
//         alert("Please fill all the requirements");
//         return;
//     }

//     const getloginEmail = localStorage.getItem("email");
//     const getloginpass = localStorage.getItem("password");

//     if (loginemail === getloginEmail && loginpass === getloginpass) {
//         const localUser = {
//             username: localStorage.getItem("username"),
//             firstName: localStorage.getItem("firstName"),
//             lastName: localStorage.getItem("lastName"),
//             email: getloginEmail,
//             image: localStorage.getItem("image") || 'default-profile.png'
//         };
//         localStorage.setItem('user', JSON.stringify(localUser));
//         alert("You are logged in with local storage");
//         window.location.href = 'profile.html';
//         return;
//     }

//     // Fetch all users from the API
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(data => {
//             const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
//             if (user) {
//                 // Store the user data in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 alert('Login successful with API');
//                 window.location.href = 'profile.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred');
//         });
// });


// document.querySelector('.login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const loginemail = document.getElementById("loginEmail").value;
//     const loginpass = document.getElementById("loginPass").value;

//     if (loginemail === "" || loginpass === "") {
//         alert("Please fill all the fields");
//         return;
//     }

//     // Retrieve the user object from local storage
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     if (storedUser && loginemail === storedUser.email && loginpass === storedUser.password) {
//         alert("You are logged in with local storage");
//         // window.location.href = 'profile.html';
//         return;
//     }

//     // Fetch all users from the API
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(data => {
//             const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
//             if (user) {
//                 // Store the user data in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 alert('Login successful with API');
//                 window.location.href = 'profile.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred');
//         });
// });

// ====
// document.querySelector('.login-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const loginusername=document.getElementById("loginusername").value
//     const loginemail = document.getElementById("loginEmail").value;
//     const loginpass = document.getElementById("loginPass").value;

//     if (loginemail === "" || loginpass === "" || loginusername==="") {
//         alert("Please fill all the fields");
//         return;
//     }

//     // Check local storage first
//     const storedUser = JSON.parse(localStorage.getItem('user'));

//     if (storedUser && loginemail === storedUser.email && loginusername ===storedUser.username && loginpass === storedUser.password) {
//         alert("Login successful with local storage");
//         localStorage.setItem('isLoggedIn', 'true');
//         window.location.href = 'profile.html';
//         return;
//     }

//     // Fetch all users from the API
//     fetch('https://dummyjson.com/users')
//         .then(response => response.json())
//         .then(data => {
//             const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
//             if (user) {
//                 // Store the user data in local storage
//                 localStorage.setItem('user', JSON.stringify(user));
//                 localStorage.setItem('isLoggedIn', 'true');
//                 alert('Login successful with API');
//                 window.location.href = 'profile.html';
//             } else {
//                 alert('Invalid email or password');
//             }
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('An error occurred');
//         });
// });

document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const loginusername = document.getElementById("loginusername").value;
    const loginemail = document.getElementById("loginEmail").value;
    const loginpass = document.getElementById("loginPass").value;

    if (loginemail === "" || loginpass === "" || loginusername === "") {
        alert("Please fill all the fields");
        return;
    }

    // Check local storage first
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser && loginemail === storedUser.email && loginusername === storedUser.username && loginpass === storedUser.password) {
        alert("Login successful with local storage");
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'profile.html';
        return;
    }

    // Fetch all users from the API
    fetch('https://dummyjson.com/users')
        .then(response => response.json())
        .then(data => {
            const user = data.users.find(user => user.email === loginemail && user.password === loginpass);
            if (user) {
                // Store the user data in local storage
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('isLoggedIn', 'true');
                alert('Login successful with API');
                window.location.href = 'profile.html';
            } else {
                alert('Invalid email or password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
        });
});


