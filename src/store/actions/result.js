import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
  // const updatedResult = res * 2;
  return {
    type: actionTypes.STORE_RESULT,
    result: res,
  };
};

export const storeResult = (res) => {
  return (dispatch, getState) => {
    setTimeout(() => {
      // const oldCounter = getState().ctr.counter;
      dispatch(saveResult(res));
    }, 2000);
  };
};

export const deleteResult = (id) => {
  return {
    type: actionTypes.DELETE_RESULT,
    id: id,
  };
};
