import React, { Component } from 'react';
import { Button, Icon, Modal, Form, Message } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../constants';

class AddTypeModal extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            isModalOpened: false,
            typeData: {
                title: '',
                fields: '',
                fieldsArr: []
            },
            error: false
        };

        this.state = JSON.parse(JSON.stringify(this.initialState));
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
        this.createType = this.createType.bind(this);
    }

    openModal() {
        this.setState({
            isModalOpened: true
        });
    }

    closeModal() {
        this.setState(JSON.parse(JSON.stringify(this.initialState)));
    }

    createType() {
        let { title, fieldsArr } = this.state.typeData;

        if (!title || !fieldsArr.length) {
            this.setState({
                error: true
            });
        } else {
            axios.post(`${API_URL}types.json`, {
                title,
                fields: fieldsArr,
                created: Date.now()
            })
                .then(res => {
                    this.props.refresh()
                        .then(() => {
                            this.closeModal();
                        });
                });
        }
    }

    valueChanged(e) {
        let stateUpdate = {
            [e.target.name]: e.target.value
        };

        if (e.target.name === 'fields') {
            stateUpdate.fieldsArr = e.target.value.split(',').map(str => str.trim()).filter(str => !!str);
        }

        this.setState({
            typeData: {
                ...this.state.typeData,
                ...stateUpdate
            }
        });
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
                                <Form error={this.state.error}>
                                    <Form.Field>
                                        <label>Type title</label>
                                        <input onChange={this.valueChanged} value={this.state.typeData.title} name="title" placeholder='Title1'/>
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Fields (separated using comma):</label>
                                        <textarea onChange={this.valueChanged} value={this.state.typeData.fields} name="fields" placeholder='Field1, Field2, Field3' />
                                    </Form.Field>
                                    <Message
                                        error
                                        content='Please fill all fields correctly.'
                                    />
                                </Form>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button onClick={this.closeModal}>Close</Button>
                                <Button onClick={this.createType} color='green'>Add</Button>
                            </Modal.Actions>
                        </Modal>
                    )
                }
            </div>
        );
    }
}

export default AddTypeModal;
