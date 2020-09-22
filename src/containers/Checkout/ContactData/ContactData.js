import React, { Component } from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(formElementIdentifier)) {
        const element = this.state.orderForm[formElementIdentifier];
        formData[formElementIdentifier] = element.value;
      }
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  checkValidity(value, rules) {
    let isValid = true;
    if(!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };
    const updateFormEl = {
      ...updatedOrderForm[inputIdentifier],
    };
    updateFormEl.touched = true;
    updateFormEl.value = event.target.value;
    updateFormEl.valid = this.checkValidity(
      event.target.value,
      updateFormEl.validation
    );

    updatedOrderForm[inputIdentifier] = updateFormEl;

    let formIsValid = true;
    for (const inputIdentifier in updatedOrderForm) {
      if (updatedOrderForm.hasOwnProperty(inputIdentifier)) {
        const element = updatedOrderForm[inputIdentifier];
        formIsValid = element.valid && formIsValid;
      }
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      if (this.state.orderForm.hasOwnProperty(key)) {
        const el = this.state.orderForm[key];
        formElementsArray.push({
          id: key,
          config: el,
        });
      }
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formEl) => (
          <Input
            key={formEl.id}
            elementType={formEl.config.elementType}
            elementConfig={formEl.config.elementConfig}
            value={formEl.config.value}
            invalid={!formEl.config.valid}
            shouldValidate={formEl.config.validation}
            touched={formEl.config.touched}
            changed={(event) => this.inputChangedHandler(event, formEl.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
