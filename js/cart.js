function add(price){
  let cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.push(price);
  localStorage.setItem('cart',JSON.stringify(cart));
  alert('Added');
}

function total(){
  let cart = JSON.parse(localStorage.getItem('cart')||'[]');
  return cart.reduce((a,b)=>a+b,0);
}
