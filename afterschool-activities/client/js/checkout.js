
function validateInput(name, phone) {
    const nameRegex = /^[a-zA-Z\s]+$/; 
    const phoneRegex = /^[0-9]+$/; 
    return nameRegex.test(name) && phoneRegex.test(phone);
}

function clearCart() {
    cart = []; 
    updateCartDisplay(); 
}

function submitOrder() {
    const name = document.getElementById('nameInput').value;
    const phone = document.getElementById('phoneInput').value;

    if (validateInput(name, phone)) {
        const orderDetails = {
            name: name,
            phone: phone,
            cart: cart,
        };

        fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); 
            clearCart(); 
        })
        .catch(error => console.error('Error during checkout:', error));
    } else {
        alert('Invalid input. Please check your name and phone number.'); // Alert on invalid input
    }
}

function validateInput(name, phone) {
    const nameRegex = /^[a-zA-Z\s]+$/; 
    const phoneRegex = /^[0-9]+$/; 
    return nameRegex.test(name) && phoneRegex.test(phone);
}

function clearCart() {
    cart = []; 
    updateCartDisplay();
}
