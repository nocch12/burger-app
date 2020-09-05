import React from "react";

import claases from "./Modal.module.css";

import Auxi from "../../../hoc/Auxi";
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
    <Auxi>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={claases.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-10vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxi>
  );
};

export default modal;
