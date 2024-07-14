// ========================================== Hanadling Nav login / logout All  ====================================
document.addEventListener("DOMContentLoaded", function () {
  const usernavLogin = document.getElementById("usernavLogin");
  const navUsername = document.getElementById("navUsername");
  const showNavUser = document.getElementById("showNavUser");
  const profileLink = document.getElementById("profileLink"); // Added this line

  // Function to update the DOM with the username
  function updateUsername(username) {
    usernavLogin.style.display = "none";
    navUsername.style.display = "inline";
    showNavUser.textContent = username;
  }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    // Check local storage for user info
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      updateUsername(storedUser.username);
    }
  }
  function updateUsername(username) {
    showNavUser.textContent = username;
    navUsername.style.display = "block";
    usernavLogin.style.display = "none";
  }

  // Handle profile link click - Added this section
  profileLink.addEventListener("click", function (event) {
    event.preventDefault();
    if (localStorage.getItem("isLoggedIn") === "true") {
      window.location.href = "profile.html";
    } else {
      window.location.href = "login.html";
    }
  });
});
function handleUserAuthentication(action) {
  if (action === "checkLogin") {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      console.log("User is logged in. Proceeding to add to cart.");
    } else {
      localStorage.removeItem("productsInCart");
      window.alert("Please log in to add items to cart.");
      window.location.href = "login.html";
      return;
    }
  } else if (action === "logout") {
    localStorage.removeItem("productsInCart");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
  }
}

// ================================= Funtion Login of cart ==============================
// Check login status before adding to cart
function checkLoginUser() {
  handleUserAuthentication("checkLogin");
}
// ===================== Logout fun of Cart =================================================
document.getElementById("logout").addEventListener("click", function (event) {
  event.preventDefault();
  handleUserAuthentication("logout");
});
// ========================================== Hanadling Nav login / logout All  ====================================
// ================================ Nav Functionalities ====================================

// Nav Functionalities
const menu = document.querySelector(".menu");
const menuMain = menu.querySelector(".menu-main");
const goBack = menu.querySelector(".go-back");
const menuTrigger = document.querySelector(".mobile-menu-trigger");
const closeMenu = menu.querySelector(".mobile-menu-close");
let subMenu;
menuMain.addEventListener("click", (e) => {
  if (!menu.classList.contains("active")) {
    return;
  }
  if (e.target.closest(".menu-item-has-children")) {
    const hasChildren = e.target.closest(".menu-item-has-children");
    showSubMenu(hasChildren);
  }
});
goBack.addEventListener("click", () => {
  hideSubMenu();
});
menuTrigger.addEventListener("click", () => {
  toggleMenu();
});
closeMenu.addEventListener("click", () => {
  toggleMenu();
});
document.querySelector(".menu-overlay").addEventListener("click", () => {
  toggleMenu();
});
function toggleMenu() {
  menu.classList.toggle("active");
  document.querySelector(".menu-overlay").classList.toggle("active");
}
function showSubMenu(hasChildren) {
  subMenu = hasChildren.querySelector(".sub-menu");
  subMenu.classList.add("active");
  subMenu.style.animation = "slideLeft 0.5s ease forwards";
  const menuTitle =
    hasChildren.querySelector("i").parentNode.childNodes[0].textContent;
  menu.querySelector(".current-menu-title").innerHTML = menuTitle;
  menu.querySelector(".mobile-menu-head").classList.add("active");
}

function hideSubMenu() {
  subMenu.style.animation = "slideRight 0.5s ease forwards";
  setTimeout(() => {
    subMenu.classList.remove("active");
  }, 300);
  menu.querySelector(".current-menu-title").innerHTML = "";
  menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.onresize = function () {
  if (this.innerWidth > 991) {
    if (menu.classList.contains("active")) {
      toggleMenu();
    }
  }
};

let allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];
let cartItems = [];

function addedToCart(productId) {
  console.log("Product ID:", productId);
  let chosenItem = allProducts.find((item) => item.id === Number(productId));

  if (chosenItem) {
    let cartItem = cartItems.find((item) => item.id === chosenItem.id);

    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      chosenItem.quantity = 1;
      cartItems.push({ ...chosenItem, quantity: 1 });
    }

    // Store the updated cart items in local storage
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

    // Update cart display
    updateCartItems();
    checkLoginUser(); // Check user login status before adding to cart
  } else {
    console.error("Product not found:", productId);
  }

  console.log("Chosen Item:", chosenItem); // Debugging line to check the chosen item
}

// =========================== Nav Cart =================================
const cartContainer = document.getElementById("cart-container");
const cartIcon = document.querySelector(".fa-shopping-cart");
const cartIconNotify = document.querySelector(".cart--icon--notify");

function updateCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (!cartItemsContainer || !cartIconNotify) {
    console.error("Cart items container or cart icon notify element not found");
    return;
  }

  // Clear previous items
  cartItemsContainer.innerHTML = "";
  const cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

  cartItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "nav--cart--items-list";
    // Truncate the title if needed
    const truncatedTitle =
      item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title;
    itemDiv.innerHTML = `
        <h6>${truncatedTitle} <span> x${item.quantity} </span></h6>
        <p>Price: $${item.price * item.quantity}</p>
        <button class="delete-btn--product" onclick="removeFromCart(${
          item.id
        })">
          <i class="fa-solid fa-xmark"></i>Remove Item</button>
      `;
    cartItemsContainer.appendChild(itemDiv);
  });

  // Update cart icon notification count
  cartIconNotify.textContent = cartItems.length;

  // Show/Hide the cart container when items are added
  cartContainer.style.display = cartItems.length > 0 ? "block" : "none";
}

function createCartList(product) {
  const cartList = document.createElement("div");
  cartList.className = "product-card";
  cartList.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <button class="excl--extra--btn" onclick="addedToCart(${product.id})">
        <i class="fa-solid fa-cart-shopping"></i> Add to Cart
      </button>
    `;
  return cartList;
}

function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];
  cartItems = cartItems.filter((item) => item.id !== productId);
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  updateCartItems();
}
// Call updateCartItems to initialize the cart items display
document.addEventListener("DOMContentLoaded", function () {
  updateCartItems();
});

function toggleCart() {
  var cartContainer = document.getElementById("cart-container");
  cartContainer.style.display =
    cartContainer.style.display === "none" ? "block" : "none";
}

// Check if there are existing cart items in local storage on page load
document.addEventListener("DOMContentLoaded", function () {
  const storedCartItems = JSON.parse(localStorage.getItem("productsInCart"));
  if (storedCartItems) {
    cartItems = storedCartItems;
    updateCartItems(); // Update the cart with stored items
  } else {
    // Initialize cart items if not found in local storage
    cartItems = [];
  }
});

// Ensure the script runs after the DOM content is fully loaded
const container = document.getElementById("product-container");
if (!container || !cartContainer || !cartIcon || !cartIconNotify) {
  console.error(
    "Product container, cart container, cart icon, or cart icon notify element not found"
  );
}

// Check if there are existing cart items in local storage on page load
function navigateToCart() {
  window.location.href = "cartPage.html";
}

// Check if there are existing cart items in local storage on page load
const storedCartItems = JSON.parse(localStorage.getItem("productsInCart"));
if (storedCartItems) {
  cartItems = storedCartItems;
  updateCartItems(); // Update the cart with stored items
}

// =================================  NAV END ================================== //

// Single Product Functionality
document.addEventListener("DOMContentLoaded", function () {
  const localStorageKey = "ProductDetailsId";
  const predefinedProductId = 2; // Default product ID to load initially

  function fetchProduct(productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        document.title = product.title;
        document.getElementById("product-image").src = product.thumbnail;
        document.getElementById("product-title").textContent = product.title;
        document.getElementById("product-description").textContent =
          product.description;
        document
          .getElementById("product-price")
          .querySelector("span").textContent = product.price;
        document.getElementById(
          "product-rating"
        ).innerHTML = `Rating: <span>(${product.rating})</span>`;
        document.getElementById(
          "product-category"
        ).textContent = `Category: ${product.category}`;
        document.getElementById(
          "product-discountPercentage"
        ).innerHTML = `Discount: <span>${product.discountPercentage}%</span>`;
        document.getElementById(
          "product-stock"
        ).textContent = `Stock: ${product.stock}`;
        document.getElementById(
          "product-brand"
        ).textContent = `Brand: ${product.brand}`;
        document.getElementById(
          "product-sku"
        ).textContent = `SKU: ${product.sku}`;
        document.getElementById(
          "product-weight"
        ).textContent = `Weight: ${product.weight}`;
        document.getElementById(
          "product-dimensions-width"
        ).textContent = `Width: ${product.dimensions.width}`;
        document.getElementById(
          "product-dimensions-height"
        ).textContent = `Height: ${product.dimensions.height}`;
        document.getElementById(
          "product-dimensions-depth"
        ).textContent = `Depth: ${product.dimensions.depth}`;
        document.getElementById(
          "product-warrantyInformation"
        ).textContent = `Warranty Information: ${product.warrantyInformation}`;
        document.getElementById(
          "product-shippingInformation"
        ).textContent = `Shipping Information: ${product.shippingInformation}`;
        document.getElementById(
          "product-availabilityStatus"
        ).textContent = `Availability Status: ${product.availabilityStatus}`;
        document.getElementById(
          "product-returnPolicy"
        ).textContent = `Return Policy: ${product.returnPolicy}`;

        fetchReviews(productId);

        const mainImage = document.getElementById("product-image");
        mainImage.src = product.thumbnail;

        const additionalImagesContainer =
          document.getElementById("additional-images");
        additionalImagesContainer.innerHTML = ""; // Clear any existing images
        product.images.forEach((image) => {
          const imgElement = document.createElement("img");
          imgElement.src = image;
          imgElement.alt = "Product Image";
          imgElement.addEventListener("click", () => {
            console.log("Image clicked:", image);
            mainImage.src = image;
          });
          additionalImagesContainer.appendChild(imgElement);
        });

        // Set the onclick attribute for the add to cart button
        document
          .querySelector(".button")
          .setAttribute("onclick", `addedToCart(${productId})`);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }

  function fetchReviews(productId) {
    const allProducts = JSON.parse(localStorage.getItem("allProducts")) || [];

    // Find the product by the given productId
    const product = allProducts.find((prod) => prod.id === productId);

    if (!product || !product.reviews) {
      console.error("Product not found or no reviews available");
      return;
    }

    const reviews = product.reviews;

    const reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = ""; // Clear previous reviews

    const ul = document.createElement("ul");

    reviews.forEach((review) => {
      const li = document.createElement("li");

      const rating = document.createElement("p");
      rating.textContent = `Rating:  ${review.rating}</i> `;

      const comment = document.createElement("p");
      comment.textContent = `Comment: ${review.comment}`;

      const date = document.createElement("p");
      date.textContent = `Date: ${new Date(review.date).toLocaleDateString()}`;

      const reviewerName = document.createElement("p");
      reviewerName.textContent = `Name: ${review.reviewerName}`;

      const reviewerEmail = document.createElement("p");
      reviewerEmail.textContent = `Email: ${review.reviewerEmail}`;

      li.appendChild(rating);
      li.appendChild(comment);
      li.appendChild(date);
      li.appendChild(reviewerName);
      li.appendChild(reviewerEmail);

      ul.appendChild(li);
    });

    reviewsList.appendChild(ul);
  }

  // Get product ID from local storage or use the predefined one
  const storedProductId = localStorage.getItem(localStorageKey);
  const productIdToFetch = storedProductId
    ? parseInt(storedProductId, 10)
    : predefinedProductId;

  // Fetch the initial product
  fetchProduct(productIdToFetch);
  fetchReviews(productIdToFetch);
});
