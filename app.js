const CART_KEY = "cart_v1";

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addItem(item) {
  const cart = getCart();
  const found = cart.find(i => i.id === item.id);
  if (found) found.qty++;
  else cart.push({ ...item, qty: 1 });
  saveCart(cart);
  alert("เพิ่มสินค้าแล้ว");
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0)
    cart.splice(cart.indexOf(item), 1);
  saveCart(cart);
  location.reload();
}

function subtotal() {
  return getCart().reduce((s, i) => s + i.price * i.qty, 0);
}

function shippingCost(sub) {
  return sub >= 80000 ? 0 : 5000;
}

function discountAmount(sub) {
  return sub >= 100000 ? 10000 : 0;
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
}
