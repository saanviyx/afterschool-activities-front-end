var cartModal = document.getElementById("cart-modal");
var checkoutModal = document.getElementById("checkout-modal");

var cartBtn = document.getElementById("cart-btn");
var closeCartBtn = document.getElementById("close-cart-btn");
var closeCheckoutBtn = document.getElementById("close-checkout-btn");
var checkoutBtn = document.getElementById("checkout-btn");
var cartCount = document.getElementById("cart-count");
var cartItemsContainer = document.getElementById("cartItems");

function updateCart(lesson) {
    const existingLesson = cart.find(item => item.id === lesson.id);
    if (existingLesson) {
        existingLesson.quantity++;
    } else {
        cart.push({ ...lesson, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; 
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <p>${item.title} - $${item.price} x ${item.quantity}</p>
            <input type="button" value="Remove" onclick="removeFromCart(${item.id})" />
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);

    checkoutBtn.disabled = cart.length === 0;
}

function removeFromCart(lessonId) {
    const index = cart.findIndex(item => item.id === lessonId);
    if (index > -1) {
        const lesson = cart[index];
        if (lesson.quantity > 1) {
            lesson.quantity--;
        } else {
            cart.splice(index, 1); 
        }
        updateCartDisplay();
    }
}

cartBtn.onclick = function() {
    cartModal.style.display = "block"; // Display the cart modal
    updateCartDisplay();
}

closeCartBtn.onclick = function() {
    cartModal.style.display = "none"; // Hide the cart modal
}

checkoutBtn.onclick = function() {
    cartModal.style.display = "none"; // Hide the cart modal when checking out
    checkoutModal.style.display = "block"; // Show the checkout modal
}

closeCheckoutBtn.onclick = function() {
    checkoutModal.style.display = "none"; // Hide the checkout modal
}

window.onclick = function(event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none"; // Close if user clicks outside of the cart modal
    }
    if (event.target == checkoutModal) {
        checkoutModal.style.display = "none"; // Close if user clicks outside of the checkout modal
    }
}
