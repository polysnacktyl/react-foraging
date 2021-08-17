import React, { Component } from 'react';
import { EditModal } from './EditModal';
import TriggerButton from './ModalButton';


export class Container extends Component {
  state = { isShown: false, tags: '', user: this.props.user };
  showModal = () => {
    this.setState({ isShown: true }, () => {
      this.closeButton.focus();
    });
    this.toggleScrollLock();
  };
  closeModal = () => {
    this.setState({ isShown: false });
    this.TriggerButton.focus();
    this.toggleScrollLock();
  };
  handleEdit = (event) => {
    this.setState({ tags: event.target.value })
  };
  onClickOutside = (event) => {
    if (this.modal && this.modal.contains(event.target)) return;
    this.closeModal();
  };

  toggleScrollLock = () => {
    document.querySelector('html').classList.toggle('scroll-lock');
  };
  render() {
    return (
      <React.Fragment>
        <TriggerButton
          showModal={this.showModal}
          buttonRef={(n) => (this.TriggerButton = n)}
          triggerText={this.props.triggerText}
        />
        {this.state.isShown ? (
          <EditModal
            onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onClickOutside={this.onClickOutside}
            onChange={this.handleEdit}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Container;
