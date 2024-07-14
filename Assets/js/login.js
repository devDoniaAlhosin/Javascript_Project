document
  .querySelector(".login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const loginusername = document.getElementById("loginusername").value;
    const loginemail = document.getElementById("loginEmail").value;
    const loginpass = document.getElementById("loginPass").value;

    if (loginemail === "" || loginpass === "" || loginusername === "") {
      alert("Please fill all the fields");
      return;
    }

    // Check local storage first
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (
      storedUser &&
      loginemail === storedUser.email &&
      loginusername === storedUser.username &&
      loginpass === storedUser.password
    ) {
      alert("Login successful with local storage");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "profile.html";
      return;
    }

    // Fetch all users from the API
    fetch("https://dummyjson.com/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.users.find(
          (user) => user.email === loginemail && user.password === loginpass
        );
        if (user) {
          // Store the user data in local storage
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("isLoggedIn", "true");
          alert("Login successful with API");
          window.location.href = "profile.html";
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred");
      });
  });
