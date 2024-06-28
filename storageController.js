import { getOrderedProducts} from './cart.js';

function writeToLocaleStorage(){
  localStorage.setItem("products", JSON.stringify(getOrderedProducts()))
}

function readFromLocaleStorage(){
  let data = localStorage.getItem("products")
  if (data){
    let object = JSON.parse(data)
    let orderedProducts = getOrderedProducts();

    for (let key in object){
      orderedProducts[key] = object[key]
    }
  }
}

export { writeToLocaleStorage, readFromLocaleStorage };
