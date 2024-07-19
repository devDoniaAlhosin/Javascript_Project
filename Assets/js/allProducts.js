// ========================================== Hanadling Nav login / logout All  ====================================
document.addEventListener("DOMContentLoaded", function () {
  // const usernavLogin = document.getElementById("usernavLogin");
  const navUsername = document.getElementById("navUsername");
  const showNavUser = document.getElementById("showNavUser");
  const profileLink = document.getElementById("profileLink"); // Added this line

  // Function to update the DOM with the username
  // function updateUsername(username) {
  //   usernavLogin.style.display = "none";
  //   navUsername.style.display = "inline";
  //   showNavUser.textContent = username;
  // }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    // Check local storage for user info
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username) {
      // updateUsername(storedUser.username);
    }
  }
  // function updateUsername(username) {
  //   showNavUser.textContent = username;
  //   navUsername.style.display = "block";
  //   usernavLogin.style.display = "none";
  // }

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
    if (localStorage.getItem("user")) {
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

// Styling Dropdown  Functionality
// #1
const searchInput = document.getElementById("search-input");
const searchDropDownBtn = document.getElementById("search-drop-text");
const searchList = document.getElementById("searchList");
const searchIcon = document.getElementById("search--icon");
const searchSpan = document.getElementById("search-span");
const priceFilter = document.getElementById("price-filter");
let selectedCategory = "All Categories";
let allProducts = [];
let cartItems = [];
const cartContainer = document.getElementById("cart-container");
const cartIconNotify = document.querySelector(".cart--icon--notify");
const cartIcon = document.querySelector(".fa-shopping-cart");
// Function to initialize the page with all products
function initializeProducts() {
  fetchProducts("Default");
}

// Function to display all products
function displayAllProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = createCard(product);
    productContainer.appendChild(card);
  });
}

// Function to populate the dropdown with categories from the API
async function populateCategories() {
  try {
    let response = await fetch("https://dummyjson.com/products/category-list");
    let categories = await response.json();

    categories.forEach((category) => {
      let listItem = document.createElement("li");
      listItem.className = "search-dropdown-list-item";
      listItem.innerText = category;
      searchList.appendChild(listItem);
    });

    let listItem = document.createElement("li");
    listItem.className = "search-dropdown-list-item";
    listItem.innerText = "All Categories";
    searchList.appendChild(listItem);

    // Re-select the dropdown items after they have been dynamically added
    let searchDropdownListItems = document.querySelectorAll(
      ".search-dropdown-list-item"
    );

    // Add event listeners to the newly created dropdown items
    searchDropdownListItems.forEach((item) => {
      item.onclick = function (e) {
        searchSpan.innerText = e.target.innerText;
        selectedCategory = e.target.innerText;
        if (selectedCategory === "All Categories") {
          searchInput.placeholder = "Search AnyThing ...";
        } else {
          searchInput.placeholder = "Search in " + selectedCategory + "...";
        }
        fetchProducts(priceFilter.value, selectedCategory);
      };
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// Function to fetch products from the API with sorting and category filtering
async function fetchProducts(sortOrder, category = "All Categories") {
  let apiUrl = "https://dummyjson.com/products";
  if (category !== "All Categories") {
    apiUrl += `/category/${category}`;
  }
  if (sortOrder === "asc") {
    apiUrl += "?sortBy=price&order=asc";
  } else if (sortOrder === "desc") {
    apiUrl += "?sortBy=price&order=desc";
  }

  try {
    let response = await fetch(apiUrl);
    let data = await response.json();
    const products = data.products;
    allProducts = products;
    localStorage.setItem("allProducts", JSON.stringify(products));
    displayAllProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

searchDropDownBtn.onclick = function () {
  if (searchList.classList.contains("show")) {
    searchIcon.style.transform = "rotate(0deg)";
  } else {
    searchIcon.style.transform = "rotate(-180deg)";
  }
  searchList.classList.toggle("show");
};

window.onclick = function (e) {
  if (
    e.target.id !== "search-drop-text" &&
    e.target.id !== "search-span" &&
    e.target.id !== "search--icon"
  ) {
    searchList.classList.remove("show");
    searchIcon.style.transform = "rotate(0deg)";
  }
};

// Event listener for search input
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.trim();
  if (searchTerm === "") {
    initializeProducts();
  } else {
    searchProducts(searchTerm);
  }
});

// Event listener for price filter
priceFilter.addEventListener("change", function () {
  const sortOrder = this.value;
  fetchProducts(sortOrder, selectedCategory);
});

// Fetch  Products on Products Page
function createCard(product) {
  const card = document.createElement("div");
  card.className = "excl--card";

  // Determine the text and background color based on product properties
  let productLabel;
  let backgroundColor;

  if (product.discountPercentage >= 15) {
    productLabel = "HOT";
    backgroundColor = "#ff324d";
  } else if (
    product.discountPercentage > 0 &&
    product.discountPercentage < 10
  ) {
    productLabel = "SALE";
    backgroundColor = "green";
  } else {
    productLabel = "NEW";
    backgroundColor = "orange";
  }

  card.innerHTML = `
    <div class="excl--card-image">
      <img src="${product.thumbnail}" alt="product">
      <div class="Excl--sign" style="background-color: ${backgroundColor};">
        <p>${productLabel}</p>
      </div>
      <div class="Excl--extras">
        <div class="Excl--extra">
          <button class="excl--extra--btn" onclick="addedToCart('${
            product.id
          }')">
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
        </div>
        <div class="Excl--extra">
          <button class="excl--extra--btn"><i class="fa-solid fa-magnifying-glass-plus"></i></button>
        </div>
        <div class="Excl--extra">
          <button class="excl--extra--btn"><i class="fa-solid fa-share-nodes"></i></button>
        </div>
        <div class="Excl--extra">
          <button class="excl--extra--btn"><i class="fa-solid fa-heart"></i></button>
        </div>
      </div>
      <div class="Excl--overlay"></div>
    </div>
    <div class="excl--card-content">
      <h6><a id=${product.id} onClick='saveItemData(${product.id})'>${
    product.title
  }</a></h6>
      <div class="Excl--productPrice">
        <span>$${product.price}</span>
        <del>$${(product.price * 1.2).toFixed(2)}</del>
        <div class="Excl--product-onsale">
          <span>${product.discountPercentage.toFixed(1)}% off</span>
        </div>
      </div>
      <div class="Excl--rating">
        <div class="ratingstars">
          ${'<i class="fa-solid fa-star"></i>'.repeat(
            Math.floor(product.rating)
          )}
          ${'<i class="fa-regular fa-star"></i>'.repeat(
            5 - Math.floor(product.rating)
          )}
        </div>
        <p>(${product.rating})</p>
      </div>
      <div class="Excl--colors">
        <div class="colorsPalllet" style="background-color: grey;"></div>
        <div class="colorsPalllet" style="background-color: green;"></div>
        <div class="colorsPalllet" style="background-color: red;"></div>
      </div>
    </div>
  `;

  return card;
}

// Added To cart
function addedToCart(productid) {
  console.log("Product ID:", productid);
  let chosenItem = allProducts.find((item) => item.id === Number(productid));
  if (chosenItem) {
    let cartItem = cartItems.find((item) => item.id === chosenItem.id);
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      cartItems.push({ ...chosenItem, quantity: 1 });
    }
    updateCartItems();
  } else {
    console.error("Product not found:", productid);
  }
  console.log("Chosen Item:", chosenItem);
  checkLoginUser();
}

function updateCartItems() {
  const cartItemsContainer = document.getElementById("cart-items-container");
  if (!cartItemsContainer || !cartIconNotify) {
    console.error("Cart items container or cart icon notify element not found");
    return;
  }

  cartItemsContainer.innerHTML = "";

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
        })"><i class="fa-solid fa-xmark"></i>Remove Item</button>
      `;
    cartItemsContainer.appendChild(itemDiv);

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
  });

  cartIconNotify.textContent = cartItems.length;

  cartContainer.style.display = "none";
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

function removeFromCart(productid) {
  cartItems = cartItems.filter((item) => item.id !== productid);
  updateCartItems();
}

function toggleCart() {
  var cartContainer = document.getElementById("cart-container");
  cartContainer.style.display =
    cartContainer.style.display === "none" ? "block" : "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const storedCartItems = JSON.parse(localStorage.getItem("productsInCart"));
  if (storedCartItems) {
    cartItems = storedCartItems;
    updateCartItems();
  } else {
    cartItems = [];
  }
});

// Initialize the page
window.onload = function () {
  initializeProducts();
  populateCategories();
};

const container = document.getElementById("product-container");
if (!container || !cartContainer || !cartIcon || !cartIconNotify) {
  console.error(
    "Product container, cart container, cart icon, or cart icon notify element not found"
  );
}

// Check if there are existing cart items in local storage on page load
const storedCartItems = JSON.parse(localStorage.getItem("productsInCart"));
if (storedCartItems) {
  cartItems = storedCartItems;
  updateCartItems();
}

// About cart Page
function navigateToCart() {
  window.location.href = "cartPage.html";
}

// Single Product Functionalities
function saveItemData(id) {
  localStorage.setItem("ProductDetailsId", id);
  window.location = "singleProductDetails.html";
}

// Search Functionality & Filter Functionalities

// Function to initialize the page with all products
function initializeProducts() {
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  displayAllProducts(allProducts);
}

// Function to display all products
function displayAllProducts(products) {
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = createCard(product);
    productContainer.appendChild(card);
  });
}

// Function to perform search
function searchProducts(title) {
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(title.toLowerCase())
  );
  displayAllProducts(filteredProducts);
}

// Event listener for search input of search
searchInput.addEventListener("input", function () {
  const searchTerm = this.value.trim();
  if (searchTerm === "") {
    initializeProducts();
  } else {
    searchProducts(searchTerm);
  }
});

function initializeProducts() {
  fetchProducts("Default");
}

// Function to display all products
function displayAllProducts(products) {
  console.log(products);
  const productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";
  products.forEach((product) => {
    const card = createCard(product);
    productContainer.appendChild(card);
  });
}

// #2
populateCategories();
initializeProducts();
