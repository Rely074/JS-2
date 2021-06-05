const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        // this.cart = [];
        this.allProducts = [];
        this._getProducts()
            .then(data => {
                this.cart = data;
                this.render()
            });
    }

    _getProducts(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }
    calcSum(){
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render(){
        const block = document.querySelector(this.container);
        const cartInfo = document.getElementById('cartInfo');
        console.log(this.cart)
        const cartObj = new CartInfo(this.cart);
        cartInfo.insertAdjacentHTML('beforeend', cartObj.render())

        for (let product of this.cart.contents) {
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
}

class CartInfo {
    constructor(cart) {
        this.countGoods = cart.countGoods;
        this.amount = cart.amount;
    }

    render() {
        return `<div class = "cartInfo">
        <span>Количество: ${this.countGoods}</span>
        <span>Стоимость: ${this.amount}</span>
        </div>`
    }
}

class ProductItem {
	constructor(product, img = 'https://via.placeholder.com/200x150'){
		this.title = product.product_name;;
		this.price = product.price;
		this.id = product.id_product;
		this.img = img;
		
	}
	
	render() {
		return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price}</p>
                </div>
            </div>`
	}
}


let list = new ProductsList();
//list.render();



class Cart {
    addProduct; //добавить продукт в корзину
    deleteProduct; //удалить продукт из корзины
}