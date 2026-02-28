import React, { useEffect, useState } from "react";
import { http } from "../api/http";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [language, setLanguage] = useState("ru");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      http.get("/api/products/"),
      http.get("/api/categories/")
    ]).then(([productsRes, categoriesRes]) => {
      setProducts(productsRes.data);
      setCategories(categoriesRes.data);
      setLoading(false);
    });
  }, []);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  const removeFromCart = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );

  const submitOrder = async () => {
    if (cart.length === 0) return;

    const orderData = {
      total_price: totalPrice,
      items: cart.map(item => ({
        product: item.id,
        quantity: 1
      }))
    };

    try {
      await http.post("/api/orders/create/", orderData);
      alert(language === "ru" ? "Заказ сохранён!" : "Pasūtījums saglabāts!");
      setCart([]);
    } catch (error) {
      alert("Вы должны войти в систему!");
      console.error(error);
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category.id === selectedCategory)
    : products;

  return (
    <div className="container mt-4">

      {/* HERO */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">🍣 Premium Sushi Experience</h1>
        <p className="text-muted">
          Authentic Japanese taste in modern dark style
        </p>
      </div>

      {/* LANGUAGE */}
      <div className="text-center mb-4">
        <button
          className="btn btn-outline-light me-2"
          onClick={() => setLanguage("ru")}
        >
          RU
        </button>
        <button
          className="btn btn-outline-light"
          onClick={() => setLanguage("lv")}
        >
          LV
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="text-center mb-5">
        <button
          className="btn btn-danger me-2"
          onClick={() => setSelectedCategory(null)}
        >
          {language === "ru" ? "Все" : "Visi"}
        </button>

        {categories.map(category => (
          <button
            key={category.id}
            className="btn btn-secondary me-2"
            onClick={() => setSelectedCategory(category.id)}
          >
            {language === "ru"
              ? category.name_ru
              : category.name_lv}
          </button>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="row">

        {/* PRODUCTS */}
        <div className="col-lg-8">
          {loading ? (
            <p>Загрузка...</p>
          ) : (
            <div className="row">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-md-6 mb-4">
                  <ProductCard
                    product={product}
                    language={language}
                    addToCart={addToCart}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CART */}
        <div className="col-lg-4">
          <Cart
            cart={cart}
            language={language}
            removeFromCart={removeFromCart}
            totalPrice={totalPrice}
            submitOrder={submitOrder}
          />
        </div>

      </div>
    </div>
  );
}