const promotions = ['SINGLE LOOK', 'DOUBLE LOOK', 'TRIPLE LOOK', 'FULL LOOK'];

const getPromotion = (products) => {
	const promotion = products
		.map(product => product.category)
		.filter((category, index, looks) => looks.indexOf(category) === index)
		.length;
  	return promotions[promotion - 1];
};

const getValues = (products, promotion) => {
	const totalRegularPrice = products
		.reduce((total, {regularPrice}) => total + regularPrice, 0)
		.toFixed(2);
	
	const totalPrice = products.reduce((total, {promotions, regularPrice}) => {
		for(const look of promotions) {
			if(look.looks.includes(promotion)) return total += look.price;
		}
		return total += regularPrice;
	}, 0);
	
	return { 
		totalPrice: totalPrice.toFixed(2), 
		discountValue: (totalRegularPrice - totalPrice).toFixed(2),
		discount: `${(100 - (100 * totalPrice) / totalRegularPrice).toFixed(2)}%`
	};
};

function getShoppingCart(ids, productsList) {
	const filteredProducts = productsList.filter(el => ids.includes(el.id));
	const products = filteredProducts.map(({ name, category }) => ({ name, category }));
	const promotion = getPromotion(filteredProducts);
	const {totalPrice, discountValue, discount} = getValues(filteredProducts, promotion);
	return {products, promotion, totalPrice, discountValue, discount};
}

module.exports = { getShoppingCart };
