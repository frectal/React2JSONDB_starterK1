import React, { Component } from 'react';
import { Button, Header, Icon, Modal, Form } from 'semantic-ui-react';

class AddTypeModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            isModalOpened: false,
            typeData: {
                title: '',
                fields: ''
            }
        };

        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    openModal(){
        this.setState({
            isModalOpened: true
        })
    }

    closeModal(){
        this.setState({
            isModalOpened: false
        })
    }

    render() {
        return (
            <div>
                <Button inverted fluid size="tiny" onClick={this.openModal}>
                    <Button.Content>
                        <Icon name='plus' />
                    </Button.Content>
                </Button>
                {
                    this.state.isModalOpened && (
                        <Modal open={this.state.isModalOpened} onClose={this.closeModal}>
                            <Modal.Header>Add new type</Modal.Header>
                            <Modal.Content>
                                <Form>
                                    <Form.Field>
                                        <label>Type title</label>
                                        <input placeholder='Type title'/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Fields:</label>
                                        <textarea placeholder='Field list' />
                                    </Form.Field>
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.closeModal}>Close</Button>
                                <Button color='green'>Add</Button>
                            </Modal.Actions>
                        </Modal>
                    )
                }
            </div>
        )
    }
}

export default AddTypeModal;
