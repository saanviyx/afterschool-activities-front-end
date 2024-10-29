let app = new Vue({
  el: "#app",
  data: {
    lessons: [],
    cart: [],
    isCartPage: false,
    sortKey: "",
    sortOrder: "",
    name: "",
    phone: "",
    searchQuery: "",
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, item) => total + item.price, 0);
    },
    cartItemCount() {
      return this.cart.length;
    },
    canCheckout() {
      return this.cart.length > 0;
    },
    filteredLessons() {
      let filtered = [];
      for (let lesson of this.lessons) {
        if (
          lesson.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          lesson.location.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          lesson.price.toString().includes(this.searchQuery) ||
          lesson.spaces.toString().includes(this.searchQuery)
        ) {
          filtered.push(lesson);
        }
      }
      if (this.sortKey && this.sortOrder) {
        filtered.sort((a, b) => {
          let result = 0;
          if (a[this.sortKey] < b[this.sortKey]) result = -1;
          if (a[this.sortKey] > b[this.sortKey]) result = 1;
          return this.sortOrder === "asc" ? result : -result;
        });
      }
      return filtered;
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
      this.cart.push({ ...lesson, cartId: Date.now() });
      lesson.spaces--;
    },
    removeFromCart(item) {
      this.cart = this.cart.filter(cartItem => cartItem.cartId !== item.cartId);
      const originalLesson = this.lessons.find(lesson => lesson.id === item.id);
      if (originalLesson) originalLesson.spaces++;
    },
    sortLessons() {
      if (this.sortOrder && this.sortKey) this.filteredLessons();
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
      if (this.validateName() && this.validatePhone()) {
        alert(`Order submitted by ${this.name}. Total: $${this.cartTotal}`);
        this.cart = [];
        this.name = "";
        this.phone = "";
      } else {
        alert("Please complete the form correctly.");
      }
    },
    toggleTheme() {
      document.body.classList.toggle("dark-theme");
    },
    getStars(rating) {
      const fullStars = Math.floor(rating);
      const halfStar = rating % 1 >= 0.5;
      const stars = [];

      for (let i = 0; i < fullStars; i++) {
        stars.push('<i class="fas fa-star"></i>');
      }

      if (halfStar) {
        stars.push('<i class="fas fa-star-half-alt"></i>');
      }

      while (stars.length < 5) {
        stars.push('<i class="far fa-star"></i>');
      }
      return stars.join(" ");
    },
  },
  mounted() {
    this.loadLessons();
  },
});
