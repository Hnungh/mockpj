function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(item) {
  const cart = getCart();
  cart.push(item);
  saveCart(cart);
  alert("เพิ่มสินค้าแล้ว");
}

function calcSubtotal() {
  return getCart().reduce((s, i) => s + i.price, 0);
}

function calcShipping(subtotal) {
  return subtotal >= 50000 ? 0 : 5000;
}

function clearCart() {
  localStorage.removeItem("cart");
}
