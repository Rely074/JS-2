const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        // this._fetchProducts();
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    // _fetchProducts() {
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 2000},
    //         {id: 2, title: 'Mouse', price: 20},
    //         {id: 3, title: 'Keyboard', price: 200},
    //         {id: 4, title: 'Gamepad', price: 50},
    //     ];
    // }

    _getProducts(){
        return fetch(`${API}/catalogData.json`)
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
        for (let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
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
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
	}
}


let list = new ProductsList();
list.render();



class Cart {
    addProduct; //добавить продукт в корзину
    deleteProduct; //удалить продукт из корзины
}