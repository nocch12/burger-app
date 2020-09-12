import React from 'react';

import classes from './Person.module.css';

const person = (props) => {
  return (
    <div className={classes.Person}>
      <h4 onClick={props.clicked}>{props.name}</h4>
      <p>Age: {props.age}</p>
    </div>
  );
}

export default person;
