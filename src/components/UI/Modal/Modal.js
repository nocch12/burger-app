import React from "react";

import claases from "./Modal.module.css";

import Auxi from "../../../hoc/Auxi/Auxi";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  // }

  return (
    <Auxi>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={claases.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxi>
  );
};

export default React.memo(
  Modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
