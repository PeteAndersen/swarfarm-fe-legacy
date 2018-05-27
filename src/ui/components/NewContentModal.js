import React from 'react';
import { Modal, Header, Button, Icon } from 'semantic-ui-react';

class NewContentModal extends React.Component {
  state = {
    show: false
  };

  componentDidMount() {
    window.addEventListener('newContentAvailable', () => {
      this.setState({
        show: true
      });
    });
  }

  closeModal = () => {
    this.setState({
      show: false
    });
  };

  refreshPage = () => {
    window.location.reload(window.location.href);
  };

  render() {
    return (
      <Modal basic closeIcon open={this.state.show}>
        <Header icon="browser" content="New Version Available" />
        <Modal.Content>
          <Modal.Description>
            An update is available for SWARFARM. You can reload the page now to activate it, or
            continue and it will activate the next time you visit.
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.closeModal}>Continue Without Reloading</Button>
          <Button color="green" onClick={this.refreshPage}>
            <Icon name="refresh" /> Reload Now
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default NewContentModal;
