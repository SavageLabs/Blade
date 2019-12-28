import * as ActionTypes from "./ActionTypes";

export const updateInfoStatus = (
  feature,
  value,
  persist = false
) => dispatch => {
  if (persist) {
    if (!value) {
      window.localStorage.removeItem(feature);
    } else {
      window.localStorage.setItem(feature, value);
    }
  }
  dispatch({
    type: ActionTypes.UPDATE_STATUS,
    feature,
    value
  });
};
export const pushMessage = (level, message, remove = -1) => dispatch => {
  const object = { message, level, show: true };
  dispatch(updateInfoStatus("pop_msg", object));
  if (remove > 0) {
    setTimeout(
      () =>
        dispatch(updateInfoStatus("pop_msg", { show: false, message, level })),
      remove * 1000
    );
  }
};
export const setModal = modal => dispatch => {
  dispatch(updateInfoStatus("modal", modal));
};
export const closeModal = () => (dispatch, getState) => {
  const modal = getState().status.modal;
  if (modal) modal();
};
