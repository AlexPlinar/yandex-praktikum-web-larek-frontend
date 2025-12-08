# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Описание базовых классов и интерфейсов

### API
- **`ApiProductItemResponse`** — объект продукта, получаемый от API.
- **`ApiProductListResponse`** — список продуктов с количеством.
- **`ApiOrderRequest`** — объект для отправки заказа на сервер.
- **`ApiOrderResponse`** — ответ сервера на запрос заказа.

### Модель
- **`Product`** — базовая модель продукта.
  - Свойства: `id`, `type`, `name`, `cost`, `description`, `image`.
- **`IUserData`** — модель данных пользователя.
  - Свойства: `address`, `deliveryMethod`, `email`, `phone`.
  - Функция `isValid()` проверяет корректность введённых данных.
- **`ICatalog`** — модель каталога продуктов.
  - Свойство: `items: Product[]`.
  - Функция `getItems()` возвращает список продуктов.
- **`ICart`** — модель корзины.
  - Свойство: `items: Product[]`.
  - Функции: `addItem`, `removeItem`, `getItems`, `getTotal`.

### Представление (View)
- **`IProductView`** — отображение продукта.
  - `render(product)` — показать продукт на экране.
  - `onProductClicked(callback)` — событие клика по продукту.
  - `onAddToCartClicked(callback)` — событие добавления в корзину.
  - `onRemoveFromCartClicked(callback)` — событие удаления из корзины.
- **`IFormView`** — форма ввода данных пользователя.
  - `render(data)` — отобразить данные в форме.
  - `onInputChanged(callback)` — событие изменения данных.
  - `onSubmit(callback)` — событие отправки формы.
- **`ICatalogView`** — отображение списка продуктов.
  - `render(products)` — показать список товаров.
- **`ICartView`** — отображение корзины.
  - `render(cart)` — показать содержимое корзины.
  - `onRemoveFromCartClicked(callback)` — событие удаления товара.

### Презентер (Presenter)
- **`ProductPresenter`**
  - Связь: `model: Product`, `view: IProductView`.
  - Функции: `init`, `handleProductClick`, `handleAddToCart`, `handleRemoveFromCart`.
- **`FormPresenter`**
  - Связь: `model: IUserData`, `view: IFormView`.
  - Функции: `init`, `handleSubmit`, `handleInputChange`.
- **`CatalogPresenter`**
  - Связь: `model: ICatalog`, `view: ICatalogView`.
  - Функции: `init`.
- **`CartPresenter`**
  - Связь: `model: ICart`, `view: ICartView`.
  - Функции: `init`, `handleAddItem`, `handleRemoveItem`, `calculateTotal`.

## Архитектура проекта
Проект построен по паттерну **MVP**:

1. **Model** — хранит данные и логику (продукты, корзина, пользователь).
2. **View** — отвечает за отображение данных на экране и сбор событий.
3. **Presenter** — связывает Model и View, обрабатывает события, вызывает методы моделей и обновляет View.

### Взаимодействие компонентов
- `CatalogPresenter` запрашивает данные из `ICatalog` и отображает их через `ICatalogView`.
- `ProductPresenter` обрабатывает действия с конкретным продуктом через `IProductView`.
- `CartPresenter` управляет корзиной `ICart` и обновляет `ICartView`.
- `FormPresenter` управляет данными пользователя `IUserData` через `IFormView`.

## Типы данных
- Все объекты API описаны через интерфейсы `ApiProductItemResponse`, `ApiProductListResponse`, `ApiOrderRequest`, `ApiOrderResponse`.
- Модели приложения используют интерфейсы `Product`, `IUserData`, `ICatalog`, `ICart`.
- Представления используют интерфейсы `IProductView`, `IFormView`, `ICatalogView`, `ICartView`.
- Презентеры используют интерфейсы `ProductPresenter`, `FormPresenter`, `CatalogPresenter`, `CartPresenter`.

## UML диаграмма
- https://github.com/AlexPlinar/yandex-praktikum-web-larek-frontend/blob/main/MVP%20UML%20Diagram.png
