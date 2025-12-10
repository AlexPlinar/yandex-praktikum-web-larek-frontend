// API
export interface ApiProductItemResponse {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number | null;
}
export interface ApiProductListResponse {
    total: number;
    items: ApiProductItemResponse[] | null;
}

export interface ApiOrderRequest {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface ApiOrderResponse {
    id?: string;
    total?: number;
    error?: string;
}

// Model
export interface IProduct {
    id: number;
    type: string;
    name: string;
    cost: number;
    description: string;
    image: string;
}

// Model with logic
export interface IUserData {
    address: string;
    deliveryMethod: string;
    email: string;
    phone: string;
    isValid(): boolean;
}

export interface ICatalog {
    items: IProduct[];
    getItems(): IProduct[];
}

export interface ICart {
    items: IProduct[];
    addItem(product: IProduct): boolean;
    removeItem(product: IProduct): boolean;
    getItems(): IProduct[];
    getTotal(): number;
}

// View

export interface IProductView {
    render(product: IProduct): void;
    onProductClicked(callback: (product: IProduct) => void): void;
    onAddToCartClicked(callback: (product: IProduct) => void): void;
    onRemoveFromCartClicked(callback: (product: IProduct) => void): void;
}

export interface IFormView {
    render(data: IUserData): void;
    onInputChanged(callback: (data: IUserData) => void): void;
    onSubmit(callback: (data: IUserData) => void): void;
}

export interface ICatalogView {
    render(products: IProduct[]): void;
}

export interface ICartView {
    render(cart: ICart): void;
    onRemoveFromCartClicked(callback: (product: IProduct) => void): void;
}

// Presenter

export interface IProductPresenter {
    model: IProduct;
    view: IProductView;

    init(): void;
    handleProductClick(): void;
    handleAddToCart(): void;
    handleRemoveFromCart(): void;
}

export interface IFormPresenter {
    model: IUserData;
    view: IFormView;

    init(): void;
    handleSubmit(): void;
    handleInputChange(): void;
}

export interface ICatalogPresenter {
    model: ICatalog;
    view: ICatalogView;

    init(): void;
}

export interface ICartPresenter {
    model: ICart;
    view: ICartView;

    init(): void;
    handleAddItem(product: IProduct): void;
    handleRemoveItem(product: IProduct): void;
    calculateTotal(): number;
}

// Model classes
class Product implements IProduct {
    constructor(
        public id: number,
        public type: string,
        public name: string,
        public cost: number,
        public description: string,
        public image: string
    ) { };
}

class UserData implements IUserData {
    constructor(
        public address: string,
        public deliveryMethod: string,
        public email: string,
        public phone: string,
    ) { };
    isValid(): boolean {
        return !!this.address && !!this.deliveryMethod && !!this.email && !!this.phone;
    }
}

class Catalog implements ICatalog {
    constructor(
        public items: IProduct[],

    ) { };
    getItems(): IProduct[] {
        return this.items;
    }
}

class Cart implements ICart {
    constructor(
        public items: IProduct[],
    ) { };
    addItem(product: IProduct): boolean {
        if (!this.items.includes(product)) {
            this.items.push(product);
            return true;
        }
        return false;
    }
    removeItem(product: IProduct): boolean {
        const index = this.items.indexOf(product);
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }
    getItems(): IProduct[] {
        return this.items;
    }
    getTotal(): number {
        return this.items.length;
    }
}

// View classes
class ProductView implements IProductView {
    // ! гарантирую что до использования я в коде инициализирую product
    private product!: IProduct;
    constructor(
        private container: HTMLElement,
    ) { };
    render(product: IProduct): void {
        this.product = product;
        this.container.innerHTML = `${product.name}`; // TODO: дополнить
    };
    onProductClicked(callback: (product: IProduct) => void): void {
        this.container.addEventListener('click', () => callback(this.product));
    };
    onAddToCartClicked(callback: (product: IProduct) => void): void {
        const addBtn = this.container.querySelector('.button'); // TODO: проверить классы
        if (addBtn) addBtn.addEventListener('click', () => callback(this.product));
    };
    onRemoveFromCartClicked(callback: (product: IProduct) => void): void {
        const removeBtn = this.container.querySelector('.basket__item-delete'); // TODO: проверить классы
        if (removeBtn) removeBtn.addEventListener('click', () => callback(this.product));
    }
}

class FormView implements IFormView {
    private data!: UserData;
    constructor(
        private container: HTMLElement,
    ) { };
    render(data: IUserData): void {
        this.data = data;
        this.container.innerHTML = `${data.address}`; // TODO: дополнить
    };
    onInputChanged(callback: (data: IUserData) => void): void {
        // пока оставляю заглушкку
    };
    onSubmit(callback: (data: IUserData) => void): void {
        // пока оставляю заглушкку
    }
}

class CatalogView implements ICatalogView {
    private products: IProduct[];
    constructor(
        private container: HTMLElement,
    ) { };
    render(products: IProduct[]): void {
        this.products = products;
        this.container.innerHTML = products.
            map(prod => `${prod.name}`).
            join(' ');
    }
}

class CartView implements ICartView {
    private cart: ICart;
    constructor(
        private container: HTMLElement,
    ) { };
    render(cart: ICart): void {
        this.cart = cart;
        this.container.innerHTML = cart.
            items.
            map(prod => `${prod.name}`).
            join(' ');
    };
    onRemoveFromCartClicked(callback: (product: IProduct) => void): void {
        // пока оставляю заглушкку
    }
}

// Presenter classes

class ProductPresenter implements IProductPresenter {
    constructor(
        public model: IProduct,
        public view: IProductView,
    ) { };
    init(): void {

    };
    handleAddToCart(): void {

    };
    handleProductClick(): void {

    };
    handleRemoveFromCart(): void {

    };
}

class FormPresenter implements IFormPresenter {
    constructor(
        public model: IUserData,
        public view: IFormView,
    ) { };
    init(): void {

    };
    handleInputChange(): void {

    };
    handleSubmit(): void {

    };
}

class CatalogPresenter implements ICatalogPresenter {
    constructor(
        public model: ICatalog,
        public view: ICatalogView,
    ) { };
    init(): void {

    };
}

class CartPresenter implements ICartPresenter {
    constructor(
        public model: ICart,
        public view: ICartView,
    ) { };
    init(): void {

    };
    handleAddItem(product: IProduct): void {

    };
    handleRemoveItem(product: IProduct): void {

    };
    calculateTotal(): number {
        return 0;
    }
}