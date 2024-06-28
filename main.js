import { readFromLocaleStorage } from './storageController.js';
import { productIsOrdered, addProductToCart, decrementProduct, incrementProduct, calculateTotalСost, removeProductFromCart, calculateProductСost, getProductCount, getOrderedProducts} from './cart.js';
import { getAllProducts, getPriceProduct} from './products.js';

function openCart(){
  let backgroundElem = document.querySelector('.cart-background');
  backgroundElem.style.display = 'block'

  cart.classList.add('active');
}

function closeCart(){
  let backgroundElem = document.querySelector('.cart-background');
  backgroundElem.style.display = 'none'

  cart.classList.remove('active');
}

function CartBoxComponent(title, price, image) {
  return `

        <img src=${image} alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="price-product" id="price-product">$ ${price}</div>
            <div class="wrap-quantity">
            	<div class="quantity_counter">
                  <button id="minus">
                     <i class="fa-solid fa-minus"></i>
                  </button>
                  <p id="quantity">1</p>
                  <button id="plus">
                     <i class="fa-solid fa-plus"></i>
                  </button>


               </div>
            </div>

         <!-- REMOVE CART  -->
        <div class="remove-btn">
            <button type="button" class="delete btn-danger">Remove</button>
         </div>

         <div class="product_total">
            <p>Subtotal: $ <span id="totalProduct">0</span></p>
         </div>
            
        </div>

    `;
};

let cartBackground = document.querySelector('.cart-background');
let cartIcon = document.querySelector('.cart-icon-wrap');
let cart = document.querySelector('.cart');
let closeCartElem = document.querySelector('#cart-close');

document.addEventListener("DOMContentLoaded", function () {
  const categories = [...new Set(getAllProducts().map((item) => { return item }))]

  const displayItem = (items) => {
  document.getElementById('root').innerHTML = items.map((item)=> {
      let {id, image, title, price, alt} = item;
      return(
        `<div class='product-box' id=${id}>
              <div class='img-box'>
                  <img class='product-img' src=${image} alt=${alt}></img>
              </div>
              <h2 class='product-title'>${title}</h2>
              <span class='product-price'>$ ${price}</span>` +
              "<button class='add-cart'>Añadir a<br>canasta</button>" + `
          </div>
        `
      )
  }).join('');
  };

  displayItem(categories);

	// ---- START BUTTOM MENU -------
const toggleBtn = document.querySelector('.navbar-toggler');
const toggleBtnIcon = document.querySelector('.navbar-toggler i');
const openMenu = document.querySelector('.open_menu');

toggleBtn.onclick = function () {
	openMenu.classList.toggle('abrir')
	const isOpen = openMenu.classList.contains('abrir')

	toggleBtnIcon.classList = isOpen 
	? 'fa-solid fa-xmark'
	: 'fa-solid fa-bars'

}

// ---- END BUTTOM MENU -------

  // OPEN & CLOSE CART

  cartBackground = document.querySelector('.cart-background');
  cartIcon = document.querySelector('.cart-icon-wrap');
  cart = document.querySelector('.cart');
  closeCartElem = document.querySelector('#cart-close');

  cartIcon.addEventListener('click', () => {
    openCart();
  });

  closeCartElem.addEventListener('click', () => {
    closeCart();
  });

  cartBackground.addEventListener('click', () => {
    closeCart();
  });

  // Add to cart button listener
  let btns_agregarAlCarrito = document.querySelectorAll(".add-cart");
  btns_agregarAlCarrito.forEach((btn) => {
    btn.addEventListener("click", function (event){
      let productBoxElement = event.target.parentElement;

      if (productIsOrdered(String(productBoxElement.id))){
        openCart();
    
        return;
      }
    
      addProductListener(String(productBoxElement.id));
    });
  });
});

function updateProductView(productId){
  let shopContent = document.querySelector(".shop-content");
  let productsViews = shopContent.querySelectorAll(".product-box");

  productsViews.forEach((productView) => {
    let id = productView.id;
    if (id == productId){
      let buttonElement = productView.querySelector(".add-cart");
      
      if (productIsOrdered(id)){
        buttonElement.style.backgroundColor = 'green';
        buttonElement.textContent = "Ir a la\r\n";
				buttonElement.textContent += "canasta";
				buttonElement.style.whiteSpace = "pre-line";
				// buttonElement.style.padding = "15px 25px";
      }
      else{
        buttonElement.style.backgroundColor = '#90BF2A'
				buttonElement.style.color = '#ffffff';				
        buttonElement.textContent = 'Añadir a canasta';
      }   
    }
  })
}

function addProductListener(productId){
  let title = "";
  let price = '';
  let imgSrc = "";

  for (let i = 0; i < getAllProducts().length; i++){
    let product = getAllProducts()[i];
    if (product.id == productId){
      title = product.title;
      price = product.price;
      imgSrc = product.image;

      break;
    }
  }

  addProductToCart(productId);

  // Add product to cart
  let cartBoxElement = CartBoxComponent(title, price, imgSrc);
  let newNode = document.createElement("div");
  newNode.classList.add('cart-box')
  newNode.id = productId;
  newNode.innerHTML = cartBoxElement;
  const cartContent = cart.querySelector(".cart-content");
  cartContent.appendChild(newNode);

  // Прослушиваем события клика на кнопках "Плюс" и "Минус" для каждого продукта
  let minus = newNode.querySelector('#minus');
  let plus = newNode.querySelector('#plus');

  // Обработчик события клика на кнопке "Минус"
  minus.addEventListener('click', () => {
    decrementProduct(productId);

    if (getProductCount(productId) == 0){
      cartContent.removeChild(newNode);

      updateProductView(productId);
    }

    updateView();
  });

  // Обработчик события клика на кнопке "Плюс"
  plus.addEventListener('click', () => {
    incrementProduct(productId);
    updateView();
  });

  // Обработчик события клика на кнопке "Удалить"
  let remove = newNode.querySelector('.delete');
  remove.addEventListener('click', function (event) {
    cartContent.removeChild(newNode);
    removeProductFromCart(productId);

    updateProductView(productId);
    updateView();
  });

  updateProductView(productId);

  updateView();
}

function updateView(){
  let productCarts = document.querySelectorAll('.cart-box');

  productCarts.forEach((productCart) => {
    let productId = productCart.id;

    let productCost = calculateProductСost(productId);
    let productCount = getProductCount(productId)

    productCart.querySelector('#totalProduct').textContent = productCost.toFixed(2);
    productCart.querySelector('#quantity').textContent = productCount
  });

  let totalCost = calculateTotalСost();

  document.getElementById('total_cost').textContent = totalCost.toFixed(2);

  let cartCountElement = document.getElementById("count");
  cartCountElement.innerHTML = Object.keys(getOrderedProducts()).length

  let cartContentElement = document.querySelector(".cart-content");

  if (Object.keys(getOrderedProducts()).length == 0){
    let newNode = document.createElement("h3");
    newNode.classList.add('cart-empty-title')
    newNode.textContent = "Canasta vacía";
    cartContentElement.appendChild(newNode);
  }
  else{
    let node = cartContentElement.querySelector(".cart-empty-title")
    if (node){
      cartContentElement.removeChild(node)
    }
  }
}

// Update Cart from Local Storage
document.addEventListener("DOMContentLoaded", function () {
  readFromLocaleStorage();

  getAllProducts().forEach((prod) => {
    if (prod.id in getOrderedProducts()){
      addProductListener(String(prod.id))
    }
  });
})

// Get the header element
const header = document.querySelector(".header-mid");

// Function to handle the scroll event
function handleScroll() {
  const scrollY = window.scrollY;
  // Add or remove "sticky" class based on the scroll position
  if (scrollY > 0) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

