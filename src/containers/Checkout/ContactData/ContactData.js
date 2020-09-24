import React, { useState } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const ContactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP CODE",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    delivaryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in orderForm) {
      if (orderForm.hasOwnProperty(formElementIdentifier)) {
        const element = orderForm[formElementIdentifier];
        formData[formElementIdentifier] = element.value;
      }
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };
    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifer) => {
    const updateFormEl = updateObject(orderForm[inputIdentifer], {
      touched: true,
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifer].validation
      ),
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifer]: updateFormEl,
    });

    updatedOrderForm[inputIdentifer] = updateFormEl;

    let formIsValid = true;
    for (const inputIdentifer in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(inputIdentifer)) {
        const element = updatedOrderForm[inputIdentifer];
        formIsValid = element.valid && formIsValid;
      }
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];
  for (const key in orderForm) {
    if (orderForm.hasOwnProperty(key)) {
      const el = orderForm[key];
      formElementsArray.push({
        id: key,
        config: el,
      });
    }
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formEl) => (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          invalid={!formEl.config.valid}
          shouldValidate={formEl.config.validation}
          touched={formEl.config.touched}
          changed={(event) => inputChangedHandler(event, formEl.id)}
        />
      ))}
      <Button btnType="Success" disabled={!formIsValid}>
        Order
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
