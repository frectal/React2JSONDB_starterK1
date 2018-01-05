import React, { Component } from 'react';
import { Icon, Table, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import { API_URL } from '../../constants';

class EditableTableRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'read',
            item: JSON.parse(JSON.stringify(props.item || {})),
            attrs: props.attrs
        };

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.valueChanged = this.valueChanged.bind(this);
        this.delete = this.delete.bind(this);
    }

    edit() {
        this.setState({
            mode: 'edit'
        });
    }

    delete() {
        axios.delete(`${API_URL}items/${this.state.item.id}.json`)
            .then(this.props.refresh);
    }

    save() {
        axios.patch(`${API_URL}items/${this.state.item.id}.json`, this.state.item)
            .then(res => {
                this.setState({
                    mode: 'read'
                }, this.props.refresh());
            });
    }

    valueChanged(e) {
        this.setState({
            ...this.state,
            item: {
                ...this.state.item,
                [e.target.name]: e.target.value
            }
        });
    }

    render() {
        return (
            <Table.Row active={this.state.mode === 'edit'}>
                {
                    this.state.attrs.map((e, i) => {
                        let innerElement;
                        switch (this.state.mode) {
                        case 'read':
                            innerElement = <span>{this.state.item[e]}</span>;
                            break;
                        case 'edit':
                            innerElement = <Input placeholder={e} name={e} value={this.state.item[e]} onChange={this.valueChanged} fluid/>;
                            break;
                        }

                        return (
                            <Table.Cell key={e}>{innerElement}</Table.Cell>
                        );
                    })
                }
                <Table.Cell>
                    <Button.Group fluid size='small'>
                        {
                            (this.state.mode === 'edit')
                                ? (<Button icon color='blue' onClick={this.save}>
                                    <Icon name='checkmark'/>
                                </Button>)
                                : (<Button icon color='blue' onClick={this.edit}>
                                    <Icon name='write'/>
                                </Button>)
                        }
                        <Button icon color='orange' onClick={this.delete}>
                            <Icon name='remove' />
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default EditableTableRow;