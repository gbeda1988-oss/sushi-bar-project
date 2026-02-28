import React from "react";
import { motion } from "framer-motion";

function ProductCard({ product, language, addToCart }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card h-100 shadow">

        {product.image && (
          <motion.img
            src={product.image}
            className="card-img-top"
            alt={product.name_ru}
            style={{ height: "220px", objectFit: "cover" }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        )}

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            {language === "ru" ? product.name_ru : product.name_lv}
          </h5>

          <p className="card-text fs-5">
            €{product.price}
          </p>

          <motion.button
            className="btn btn-danger mt-auto"
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
          >
            {language === "ru"
              ? "Добавить в корзину"
              : "Pievienot grozam"}
          </motion.button>
        </div>

      </div>
    </motion.div>
  );
}

export default ProductCard;