import React, { Component } from 'react';
import { Icon, Menu, Table, Segment, Button, Input, Header } from 'semantic-ui-react';
import EditableTableRow from '../utilities/EditableTableRow';
import axios from 'axios';
import { API_URL } from '../../constants';
import DataConvertor from '../../services/DataConvertor';

class ItemTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.initialize = this.initialize.bind(this);
        this.newItemValueUpdated = this.newItemValueUpdated.bind(this);
        this.refreshItems = this.refreshItems.bind(this);
        this.createItem = this.createItem.bind(this);
        this.changePage = this.changePage.bind(this);
    }

    initialize(newType) {
        let newState = {
            type: newType,
            items: [],
            newItem: {},
            pagination: {
                page: 1,
                itemsPerPage: 10
            }
        };
        newType.fields.forEach(e => {
            newState.newItem[e] = '';
        });
        this.setState(newState, this.refreshItems);
    }

    refreshItems() {
        axios.get(`${API_URL}items.json?orderBy="type"&equalTo="${this.state.type.id}"`)
            .then(res => {
                let items =  Object.keys(res.data)
                    .reverse()
                    .map(key => {
                        let singleItem = {...res.data[key]};
                        this.state.type.fields.forEach(field => {
                            singleItem[field] = DataConvertor.toString(singleItem[field]);
                        });
                        return {
                            ...singleItem,
                            id: key
                        }
                    })
                    .sort((a, b) => (a.created < b.created));
                this.setState({ items });
            });
    };

    componentWillMount() {
        this.initialize(this.props.type);
    }

    componentWillReceiveProps(nProps) {
        if (nProps.type.id !== this.state.type.id) {
            this.initialize(nProps.type);
        }
    }

    newItemValueUpdated(e) {
        this.setState({
            ...this.state,
            newItem: {
                ...this.state.newItem,
                [e.target.name]: e.target.value
            }
        });
    }

    createItem() {
        let newItem = {};
        Object.keys(this.state.newItem).forEach(key => {
            newItem[key] = DataConvertor.toObject(this.state.newItem[key]);
        });
        axios.post(`${API_URL}items.json`, {
            ...newItem,
            created: Date.now(),
            type: this.state.type.id
        })
            .then(() => {
                let newItem = {};
                this.state.type.fields.forEach(field => {
                    newItem[field] = '';
                });
                this.setState({newItem}, this.refreshItems);
            });
    }

    changePage(direction) {
        this.setState({
            pagination: {
                ...this.state.pagination,
                page: this.state.pagination.page + direction
            }
        });
    }

    render() {
        let offset = this.state.pagination.page * this.state.pagination.itemsPerPage - this.state.pagination.itemsPerPage;
        let lastPage = this.state.pagination.page * this.state.pagination.itemsPerPage >= this.state.items.length,
            firstPage = this.state.pagination.page === 1;

        let items = [...this.state.items].splice(offset, this.state.pagination.itemsPerPage);

        return (
            <div className="data-table">
                <Header as='h2'>{this.state.type.title}</Header>
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={this.state.type.fields.length + 1}>Add new {this.state.type.title}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row active={this.state.mode === 'edit'}>
                            {
                                Object.keys(this.state.newItem).map((e, i) => {
                                    return (
                                        <Table.Cell key={e}>
                                            <Input placeholder={e} name={e} value={this.state.newItem[e]} onChange={this.newItemValueUpdated} fluid/>
                                        </Table.Cell>
                                    );
                                })
                            }
                            <Table.Cell collapsing>
                                <Button className='create-new-item-btn' icon color='green' fluid size='small' onClick={this.createItem}>
                                    <Icon name='add'/>
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                <Table className="main-table" celled>
                    <Table.Header>
                        <Table.Row>
                            {
                                this.state.type.fields.map((e, i) => {
                                    return <Table.HeaderCell key={i}>{e}</Table.HeaderCell>;
                                })
                            }
                            <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            items.length
                                ? items.map((e, i) => {
                                    return <EditableTableRow refresh={this.refreshItems} item={e} attrs={this.state.type.fields} key={e.id}/>;
                                })
                                : <Table.Row><Table.Cell colSpan={this.state.type.fields.length + 1}>Sorry, there aren't items on this page.</Table.Cell></Table.Row>
                        }
                    </Table.Body>
                </Table>
                <Segment className='pagination'>
                    <Menu size='tiny' floated='right' pagination>
                        <Menu.Item disabled={firstPage} onClick={() => !firstPage && this.changePage(-1)} icon>
                            <Icon name='left chevron' />
                        </Menu.Item>
                        <Menu.Item disabled={lastPage} onClick={() => !lastPage && this.changePage(1)} icon>
                            <Icon name='right chevron' />
                        </Menu.Item>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

export default ItemTable;