import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const Modal = ({ isShowing, close }) =>
  isShowing
    ? //create Portal to render modal only if isShowing is true at the end of body
      ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        onClick={close}
                      ></button>
                    </div>
                    <div className="modal-body">
                      <p className="modal-title">Employee Created!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

export default Modal;
