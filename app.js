
const products = [
    { id: 1, name: "Blue Shoe", price: 9500, image: "./img/close-up-blue-container.png" },
    { id: 2, name: "Brown Leather Shoes", price: 23500, image: "./img/pair-brown-shoes-with-black-leather.png" },
    { id: 3, name: "Classic Black Shoe", price: 1500, image: "./img/shoe black.png" },
    { id: 4, name: "Shoe Model 1", price: 2000, image: "./img/shoe1.jpeg" },
    { id: 5, name: "Futuristic Sneakers", price: 55000, image: "./img/futuristic-sneakers.png" },
    { id: 6, name: "Premium Sneaker", price: 52500, image: "./img/shoe8.jpeg" },
    { id: 7, name: "Stylish Sneaker", price: 22500, image: "./img/shoe5.jpeg" },
    { id: 8, name: "Budget Friendly Shoe", price: 500, image: "./img/shoe6.jpeg" }
  ];
  
  let cart = JSON.parse(localStorage.getItem('stoesCart')) || [];
  
  
  function updateCart() {
    document.getElementById('cart-count').textContent = cart.length;
    
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="text-gray-500">Your cart is empty</p>';
      cartTotal.textContent = '0';
      return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
      total += item.price;
      return `
        <div class="flex justify-between items-center py-2 border-b">
          <div>
            <p class="font-medium">${item.name}</p>
            <p class="text-sm text-gray-600">$${item.price}</p>
          </div>
          <button onclick="removeFromCart(${index})" class="bg-red-500 text-white px-2 py-1 rounded text-xs">Remove</button>
        </div>
      `;
    }).join('');
    
    cartTotal.textContent = total;
  }
  
 
  function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    localStorage.setItem('stoesCart', JSON.stringify(cart));
    updateCart();
  }
  

  function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('stoesCart', JSON.stringify(cart));
    updateCart();
  }
  

  function clearCart() {
    cart = [];
    localStorage.setItem('stoesCart', JSON.stringify(cart));
    updateCart();
  }
  
 
  function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    cartSection.classList.toggle('hidden');
    updateCart();
  }
  

  document.addEventListener('DOMContentLoaded', function() {
    updateCart();
  
    const buttons = document.querySelectorAll('#collection .group button');
    buttons.forEach(function(button, index) {
      button.addEventListener('click', function() {
        addToCart(index + 1);
      });
    });
    
   
    document.getElementById('cart-btn').addEventListener('click', toggleCart);
    
   
    const closeBtn = document.getElementById('close-cart');
    if (closeBtn) {
      closeBtn.addEventListener('click', toggleCart);
    }
  });