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
export interface Product {
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
    items: Product[];
    getItems(): Product[];
}

export interface ICart {
    items: Product[];
    addItem(product: Product): boolean;
    removeItem(product: Product): boolean;
    getItems(): Product[];
    getTotal(): number;
}

// View

export interface IProductView {
    render(product: Product): void;
    onProductClicked(callback: (product: Product) => void): void;
    onAddToCartClicked(callback: (product: Product) => void): void;
    onRemoveFromCartClicked(callback: (product: Product) => void): void;
}

export interface IFormView {
    render(data: IUserData): void;
    onInputChanged(callback: (data: IUserData) => void): void;
    onSubmit(callback: (data: IUserData) => void): void;
}

export interface ICatalogView {
    render(products: Product[]): void;
}

export interface ICartView {
    render(cart: ICart): void;
    onRemoveFromCartClicked(callback: (product: Product) => void): void;
}

// Presenter

export interface ProductPresenter {
    model: Product;
    view: IProductView;

    init(): void;
    handleProductClick(): void;
    handleAddToCart(): void;
    handleRemoveFromCart(): void;
}

export interface FormPresenter {
    model: IUserData;
    view: IFormView;

    init(): void;
    handleSubmit(): void;
    handleInputChange(): void;
}

export interface CatalogPresenter {
    model: ICatalog;
    view: ICatalogView;

    init(): void;
}

export interface CartPresenter {
    model: ICart;
    view: ICartView;

    init(): void;
    handleAddItem(product: Product): void;
    handleRemoveItem(product: Product): void;
    calculateTotal(): number;
}
