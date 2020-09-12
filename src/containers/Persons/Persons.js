import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "../../components/Person/Person";
import AddPerson from "../../components/AddPerson/AddPerson";

export class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson personAdded={this.props.onAddPerson} />
        <div>
          {this.props.persons.map((person) => (
            <Person
              key={person.id}
              name={person.name}
              age={person.age}
              clicked={() => this.props.onSubPerson(person.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    persons: state.persons,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddPerson: (name, age) =>
      dispatch({ type: "ADD", payload: { name, age } }),
    onSubPerson: (id) => dispatch({ type: "SUB", payload: id }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
