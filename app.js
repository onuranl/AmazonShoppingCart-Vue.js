window.addEventListener("load", () => {
  window.vue = new Vue({
    el: "#app",
    name: "Main",
    data: {
      isLoading : true,
      cart: [],
      saved: []
    },
    methods: {
      removeFromCart(index) {
        this.cart.splice(index, 1);
      },
      removeFromSaved(index){
        this.saved.splice(index, 1);
      },
      saveForLater(index){
        const item = this.cart.splice(index, 1);
        this.saved.push(item[0]);
      },
      moveToCart(index) {
        const item = this.saved.splice(index, 1);
        this.cart.push(item[0]);
      }
    },
    computed: {
      totalCart (){
        let total = 0 ;
        this.cart.forEach(item => {
          total += parseFloat(item.price);         
        });
        return total.toFixed(2);
      }
    },
    created() {
       fetch ("./data.json")
       .then((response) => response.json())
       .then((response) => {
         this.isLoading = false;
        this.cart = response.cart;
        this.saved = response.saved;
       })
    }
  })
});