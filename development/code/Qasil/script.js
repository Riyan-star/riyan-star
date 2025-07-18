let cart = [];

function addToCart(productName, productPrice) {
  const existing = cart.find(item => item.name === productName);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name: productName, price: productPrice, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - Ksh ${item.price} x ${item.quantity}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

function submitOrder(event) {
  event.preventDefault();

  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const notes = document.getElementById('order-notes').value;

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const total = document.getElementById('cart-total').textContent;
  const orderData = {
    customer: name,
    phone: phone,
    notes: notes,
    items: cart,
    total: parseInt(total)
  };

  fetch("http://localhost:3000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(orderData)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Order saved to server:", data);
      alert("Order submitted successfully!");
      cart = [];
      updateCart();
      document.querySelector("form").reset();
    })
    .catch(error => {
      console.error("Failed to submit order:", error);
      alert("Failed to submit order. Please try again.");
    });
}

function sendOrderViaWhatsApp() {
  const name = document.getElementById('customer-name').value;
  const phone = document.getElementById('customer-phone').value;
  const notes = document.getElementById('order-notes').value;

  if (!name || !phone) {
    alert("Please enter your name and phone before sending on WhatsApp.");
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderDetails = cart.map(item =>
    `${item.name} x${item.quantity} = Ksh ${item.price * item.quantity}`
  ).join('%0A');

  const total = document.getElementById('cart-total').textContent;

  const message = `Hello, I'd like to place an order:%0AName: ${name}%0APhone: ${phone}%0AItems:%0A${orderDetails}%0ATotal: Ksh ${total}%0ANotes: ${notes}`;

  const whatsappNumber = "2547XXXXXXXX"; // Replace with your number e.g., 254712345678
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
  window.open(whatsappURL, '_blank');
}
