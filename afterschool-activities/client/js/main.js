let app = new Vue({
  el: "#app",
  data: {
    lessons: [],
    cart: [],
    isCartPage: false,
    sortKey: "title",
    sortOrder: '',
    name: "",
    phone: "",
    searchQuery: "",
    icons: {
      coding: 'fa-laptop-code',
      kungfu: 'fa-fist-raised',
      karate: 'fa-hand-rock',
      art: 'fa-palette',
      robotics: 'fa-robot',
      tennis: 'fa-tennis',
      guitar: 'fa-guitar',
      piano: 'fa-music',
      drama: 'fa-theater-masks',
      photography: 'fa-camera-retro',
    },
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
    },
    cartItemCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0);
    },
    canCheckout() {
      return this.cart.length > 0;
    },
    sortedLessons() {
      return this.lessons
      .filter(lesson => 
        lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.price.toString().toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        lesson.spaces.toString().toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        let result = 0;
        if (a[this.sortKey] < b[this.sortKey]) result = -1;
        if (a[this.sortKey] > b[this.sortKey]) result = 1;
        return this.sortOrder === 'asc' ? result : -result;
      });
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
    toggleCartPage() {
      if (this.cart.length > 0 || this.isCartPage) {
        this.isCartPage = !this.isCartPage;
      }
    },
    validateName() {
      const namePattern = /^[A-Za-z\s]+$/;
      return namePattern.test(this.name);
    },
    validatePhone() {
      const phonePattern = /^[0-9]{10}$/;
      return phonePattern.test(this.phone);
    },
    submitOrder() {
      if (!this.validateName()) {
        alert("Please enter a valid name.");
        return;
      }
      if (!this.validatePhone()) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }
      alert(`Order submitted by ${this.name}. Total: $${this.cartTotal}`);
      this.cart = [];
    },
    toggleTheme() {
      document.body.classList.toggle("dark-theme");
    },
  },
  mounted() {
    this.loadLessons();
  },
});