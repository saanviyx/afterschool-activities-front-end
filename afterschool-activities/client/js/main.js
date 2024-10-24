let app = new Vue({
    el: "#app",
    data: {
      lessons: [],
      cart: [],
      isCartModalVisible: false,
      isCheckoutModalVisible: false,
      sortKey: "title",
      sortOrder: false,
      name: "",
      email: "",
      searchQuery: "",
    },
    computed: {
      cartTotal() {
        return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
      canCheckout() {
        return this.cart.length > 0;
      },
      sortedLessons() {
        return this.lessons
        .filter(lesson => lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase())) // Filter based on searchQuery
        .sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
          return this.sortOrder ? result * -1 : result;
        });
      },
      cartButtonLabel() {
        return this.isCartModalVisible ? "Close Cart" : "Shopping Cart";
      },
    },
    methods: {
      async loadLessons() {
        try {
          const response = await fetch("/data");
          this.lessons = await response.json();
        } catch (error) {
          console.error("Error loading lessons:", error);
        }
      },
      addToCart(lesson) {
        const cartItem = this.cart.find((item) => item.id === lesson.id);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          this.cart.push({ ...lesson, quantity: 1 });
        }
        lesson.spaces--;
      },
      removeFromCart(item) {
        const lesson = this.cart.find(cartItem => cartItem.id === item.id);
        if (lesson.quantity > 1) {
            lesson.quantity--;
        } else {
            this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
        }
        const originalLesson = this.sortedLessons.find(lesson => lesson.id === item.id);
        if (originalLesson) {
            originalLesson.spaces++;
        }
      },
      toggleCartModal() {
        this.isCartModalVisible = !this.isCartModalVisible;
      },
      openCheckoutModal() {
        this.isCartModalVisible = false;
        this.isCheckoutModalVisible = true;
      },
      toggleCheckout() {
        this.isCheckoutModalVisible = !this.isCheckoutModalVisible;
      },
      submitOrder() {
        alert(`Order submitted by ${this.name}. Total: $${this.cartTotal}`);
        this.cart = [];  // Clear the cart after submission
        this.isCheckoutModalVisible = false;
      },
      toggleTheme() {
        document.body.classList.toggle("dark-theme");
      },
    },
    mounted() {
      this.loadLessons();
    },
  });
  