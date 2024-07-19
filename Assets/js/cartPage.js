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
// ===================== Logout fun of Cart ===========================
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

// Nav Cart
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
        })"><i class="fa-solid fa-xmark"></i>Remove Item</button>
      `;
    cartItemsContainer.appendChild(itemDiv);
  });

  // Update cart icon notification count
  cartIconNotify.textContent = cartItems.length;

  // Store cart items in local storage (outside the forEach loop)
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  // Show/Hide the cart container when items are added
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

function removeFromCart(productId) {
  // Parse cartItems from local storage
  let cartItems = JSON.parse(localStorage.getItem("productsInCart")) || [];

  // Filter out the item with the matching productId
  cartItems = cartItems.filter((item) => item.id !== productId);

  // Update local storage with the filtered cartItems
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));

  // Update the cart items display
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

// About cart Page

function navigateToCart() {
  window.location.href = "cartPage.html";
}

// Cart Page  Functionalities

// Get and Check Data From Cart in Local storage

let productsInCart = localStorage.getItem("productsInCart");

if (productsInCart && JSON.parse(productsInCart).length > 0) {
  let items = JSON.parse(productsInCart);
  drawCartProductsUI(items);
} else {
  drawEmptyCartUI();
}

function drawCartProductsUI(products) {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = `
      <section class="cartPage--container">
        <div class="cartPage--box">
          <div class="cartPage--table-content">
          <div class="cartPage--table-content-h1"><h1>  # Cart </h1> </div>
          
            <table width="100%">
              <thead>
                  <tr>
                      <td>Image</td>
                      <td>Product Name</td>
                      <td>Price</td>
                      <td>Quantity</td>
                      <td>SubTotal</td>
                      <td>Remove</td>
                  </tr>
              </thead>
              <tbody>
                ${products
                  .map(
                    (product, index) => `
                  <tr>
                    <td><img src="${product.images[0]}" alt="${
                      product.title
                    }"></td>
                    <td><h6>${product.title}</h6></td>
                    <td>$${product.price.toFixed(2)} </td>
                    <td>
                      <input type="number" name="cartQuantity" id="cartQuantity-${index}" value="${
                      product.quantity
                    }" min="1" max="${product.stock}" data-index="${index}">
                    </td>
                    <td id="subtotal-${index}">$${(
                      product.price * product.quantity
                    ).toFixed(2)}</td>
                    <td>
                      <a href="#" data-index="${index}" onclick="removeProduct(${index})">
                        <i class="fa-solid fa-xmark"></i>
                      </a>
                    </td>
                  </tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
          <div id="card-add" class="cartPage--2nd">
            <div id="cart-coupon" class="cartPage-copoun">
              <h3>Apply Coupon</h3>
              <div class="coupon-form">
                <input type="text" placeholder="Enter Your Coupon" name="" id="">
                <button class="coupon-btn">Apply</button>
              </div>
            </div>
            <div id="subtotal" class="cartPage--total">
              <h3>Total Cart </h3>
              <table> 
                <tr>
                  <td>Cart Subtotal</td>
                  <td id="cartSubtotal"> $${calculateSubtotal(products).toFixed(
                    2
                  )}</td>
                </tr>
                <tr>
                  <td>Shipping</td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td id="cartTotal"><strong> $${calculateSubtotal(
                    products
                  ).toFixed(2)}</strong></td>
                </tr>
              </table>
            </div>
            <button class="checkout-btn">
              <a href="#">CheckOut</a>
            </button>
          </div>
        </div>
      </section>
    `;

  // Add event listeners to quantity inputs
  products.forEach((product, index) => {
    document
      .getElementById(`cartQuantity-${index}`)
      .addEventListener("input", (event) => {
        updateQuantity(event, index, product.price, product.stock);
      });
  });
}

function drawEmptyCartUI() {
  const cartContainer = document.getElementById("cartContainer");
  cartContainer.innerHTML = `
      <div class="cart--Container">
        <div class="cart--Empty--container">
          <i class="fa-solid fa-cart-shopping"></i>
          <h1>Empty Cart</h1>
          <p>The cart is empty. Start shopping now!</p>
          <button class="empty-cart-btn">
            <a href="products.html">Back To The Store</a>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    `;
}

function calculateSubtotal(products) {
  return products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
}

function updateQuantity(event, index, price, stock) {
  let quantity = event.target.value;

  if (quantity < 1) {
    quantity = 1;
    event.target.value = 1;
  }

  if (quantity > stock) {
    quantity = stock;
    event.target.value = stock;
  }

  let subtotalElement = document.getElementById(`subtotal-${index}`);
  let newSubtotal = (price * quantity).toFixed(2);
  subtotalElement.innerText = newSubtotal;

  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  productsInCart[index].quantity = parseInt(quantity);
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

  let cartSubtotal = calculateSubtotal(productsInCart).toFixed(2);
  document.getElementById("cartSubtotal").innerText = cartSubtotal;
  document.getElementById("cartTotal").innerText = cartSubtotal;
}

function removeProduct(index) {
  let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  productsInCart.splice(index, 1);
  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  cartIconNotify.textContent = productsInCart.length;
  updateCartItems();

  if (productsInCart.length > 0) {
    drawCartProductsUI(productsInCart);
  } else {
    drawEmptyCartUI();
  }
}
