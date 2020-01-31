import React, { useState, useEffect } from "react";

import { Button, Modal } from "reactstrap";

const MustLoginModal = props => {
  console.log("TCL: props ", props);
  useEffect(() => {
    console.log("entro");
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    setToggled(props.isOpen);
  }, []);

  const [isToggled, setToggled] = useState(false);

  const toggleModal = () => {
    setToggled(!isToggled);
  };

  return (
    <>
      <Modal
        className="modal-dialog-centered"
        isOpen={isToggled}
        toggle={toggleModal}
      >
        <div className="modal-header">
          <h6 className="modal-title" id="modal-title-default">
            Type your modal title
          </h6>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body">
          <p>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean.
          </p>
          <p>
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country, in which
            roasted parts of sentences fly into your mouth.
          </p>
        </div>
        <div className="modal-footer">
          <Button color="primary" type="button">
            Save changes
          </Button>
          <Button
            className="ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={toggleModal}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MustLoginModal;
