function updateCart(lesson) {
    const existingLesson = cart.find(item => item.id === lesson.id);
    if (existingLesson) {
        existingLesson.quantity++;
    } else {
        cart.push({ ...lesson, quantity: 1 });
    }
    updateCartDisplay();
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