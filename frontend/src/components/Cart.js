import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function Cart({ cart, language, removeFromCart, totalPrice, submitOrder }) {
  return (
    <div className="cart-container">

      <h4>
        🛒 {language === "ru" ? "Корзина" : "Grozs"}
        <span className="badge-cart">{cart.length}</span>
      </h4>

      {cart.length === 0 ? (
        <p className="text-muted">
          {language === "ru" ? "Корзина пуста" : "Grozs ir tukšs"}
        </p>
      ) : (
        <>
          <ul className="list-group mb-3">

            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                >
                  {language === "ru"
                    ? item.name_ru
                    : item.name_lv}

                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => removeFromCart(index)}
                  >
                    ✕
                  </button>
                </motion.li>
              ))}
            </AnimatePresence>

          </ul>

          <h5>
            {language === "ru" ? "Итого:" : "Kopā:"} €{totalPrice.toFixed(2)}
          </h5>

          <motion.button
            className="btn btn-danger w-100 mt-3"
            whileTap={{ scale: 0.95 }}
            onClick={submitOrder}
          >
            {language === "ru"
              ? "Оформить заказ"
              : "Pasūtīt"}
          </motion.button>
        </>
      )}
    </div>
  );
}

export default Cart;