import React, { Component } from "react";

import classes from "./AddPerson.module.css";

class AddPerson extends Component {
  state = {
    name: "",
    age: "",
  };

  nameChangedHandler = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  ageChangedHandler = (event) => {
    this.setState({
      age: event.target.value,
    });
  };

  addPersonHandler = () => {
    this.props.personAdded(this.state.name, this.state.age);
    this.setState({
      name: "",
      age: ""
    })
  }

  render() {
    return (
      <div className={classes.AddPerson}>
        <input
          type="text"
          placeholder="name"
          onChange={this.nameChangedHandler}
          value={this.state.name}
        />
        <input
          type="text"
          placeholder="age"
          onChange={this.ageChangedHandler}
          value={this.state.age}
        />
        <button onClick={this.addPersonHandler}>add person</button>
      </div>
    );
  }
}

export default AddPerson;
