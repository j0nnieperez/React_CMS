import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalAlert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      modalTitle:'',
      modalBody:''
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
        modal:nextProps.show,
        modalTitle:nextProps.modalTitle,
        modalBody:nextProps.modalBody,
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.state.modalTitle}</ModalHeader>
          <ModalBody>{this.state.modalBody}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Aceptar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalAlert;