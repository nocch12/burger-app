import React from "react";

import classes from "./Order.module.css";

const order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    if (props.ingredients.hasOwnProperty(ingredientName)) {
      const amount = props.ingredients[ingredientName];
      ingredients.push({ name: ingredientName, amount: amount });
    }
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        key={ig.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ig.name} ({ig.amount})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
