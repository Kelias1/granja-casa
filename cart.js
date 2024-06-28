import { writeToLocaleStorage, readFromLocaleStorage } from './storageController.js';
import { getAllProducts, getPriceProduct} from './products.js';

let orderedProducts = {} // Продукты которые находятся в корзине

// Проверка что продукт уже заказан
function productIsOrdered(productId){
   return Object.keys(orderedProducts).includes(productId);
}

function getOrderedProducts(){
	return orderedProducts;
}


// Добавить продукт в корзину
 function addProductToCart(productId){
  if (!productIsOrdered(productId)){
    orderedProducts[productId] = 1;

    writeToLocaleStorage();

    return true;
  }

  return false;
}

// Удалить продукт из корзины
function removeProductFromCart(productId){
  if (!productIsOrdered(productId)){
    return false;
  }

  delete orderedProducts[productId]

  writeToLocaleStorage();

  return true;
}

// Увеличить кол-во продукта в корзине на 1
function incrementProduct(productId){
  if (!productIsOrdered(productId)){
    return false;
  }

  orderedProducts[productId] += 1

  writeToLocaleStorage();

  return true;
}

// Уменьшить кол-во продукта в корзине на 1
function decrementProduct(productId){
  if (!productIsOrdered(productId)){
    return false;
  }

  orderedProducts[productId] -= 1

  if (orderedProducts[productId] == 0){
    removeProductFromCart(productId);
  }

  writeToLocaleStorage();

  return true;
}

function calculateTotalСost(){
  let totalCost = 0;

  for (let productId in orderedProducts){
    let price = getPriceProduct(productId)
    let count = orderedProducts[productId];

    totalCost += count * price;
  }

  return totalCost;
}

function calculateProductСost(productId){
  if (!productIsOrdered(productId)){
    return 0;
  }

  let price = getPriceProduct(productId)
  let count = orderedProducts[productId];

  return count * price;
}

function getProductCount(productId){
  if (!productIsOrdered(productId)){
    return 0;
  }

  return orderedProducts[productId];
}

export { getProductCount, calculateProductСost, calculateTotalСost, removeProductFromCart, decrementProduct, incrementProduct, addProductToCart, productIsOrdered, getOrderedProducts, orderedProducts};

