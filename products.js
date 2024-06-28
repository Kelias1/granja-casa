const products = [
	{
			id: 0,
			image: 'images/1.png',
			title: 'Col Repollo',
			price: 0.5,
			alt: 'col repollo',
	},
	{
			id: 1,
			image: 'images/2.png',
			title: 'Zanahoria',
			price: 0.5,
			alt: 'zanahoria',
	},
	{
			id: 2,
			image: 'images/3.png',
			title: 'Lechuga',
			price: 0.5,
			alt: 'lechuga',
	},
	{
			id: 3,
			image: 'images/4.png',
			title: 'Remolacha',
			price: 0.5,
			alt: 'remolacha',
	},
	{
			id: 4,
			image: 'images/5.png',
			title: 'Cilantro',
			price: 0.5,
			alt: 'cilantro',
	},
	{
			id: 5,
			image: 'images/6.png',
			title: 'Limón',
			price: 0.5,
			alt: 'limón',
	},
	{
			id: 6,
			image: 'images/7.png',
			title: 'Leche',
			price: 1,
			alt: 'leche',
	},
	{
			id: 7,
			image: 'images/8.png',
			title: 'Queso Fresco',
			price: 3,
			alt: 'queso fresco',
	},
];

function getPriceProduct(productId){
  for (let i = 0; i < products.length; i++){
      if (products[i].id == productId){
        return products[i].price;
      }
  }
  return -1;
}

function getAllProducts(){
  return products;
}

export { getAllProducts, getPriceProduct };
