import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Segment, Button, Input } from 'semantic-ui-react'
import EditableTableRow from '../utilities/EditableTableRow';

class ItemTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            type: 'Employees',
            attrs: ['a','b','c'],
            items: [{
                a: 1,
                b: 3,
                c: 123
            }, {
                a: 2,
                b: 4,
                c: 234
            }, {
                a: 3,
                b: 5,
                c: 345
            }],
            newItem: {}
        };
        this.state.attrs.forEach(e => {
            this.state.newItem[e] = '';
        })
    }

    render(){
        return (
            <div className="data-table">
                <Table fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={this.state.attrs.length+1}>Add new {this.state.type}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row  active={this.state.mode == 'edit'}>
                            {
                                Object.keys(this.state.newItem).map((e,i) => {
                                    return (
                                        <Table.Cell key={e}>
                                            <Input placeholder={e} value={this.state.newItem[e]} onChange={this.valueChanged} fluid/>
                                        </Table.Cell>
                                    );
                                })
                            }
                            <Table.Cell collapsing>
                                <Button className='create-new-item-btn' icon color='green' fluid size='small' onClick={this.save}>
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
                                this.state.attrs.map((e,i) => {
                                    return <Table.HeaderCell key={i}>{e}</Table.HeaderCell>
                                })
                            }
                            <Table.HeaderCell collapsing>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.items.map((e,i) => {
                                return <EditableTableRow item={e} attrs={this.state.attrs} key={i}/>
                            })
                        }
                    </Table.Body>
                </Table>
                <Segment className='pagination'>
                    <Menu size='tiny' floated='right' pagination>
                        <Menu.Item icon>
                            <Icon name='left chevron' />
                        </Menu.Item>
                        <Menu.Item>1</Menu.Item>
                        <Menu.Item>2</Menu.Item>
                        <Menu.Item>3</Menu.Item>
                        <Menu.Item>4</Menu.Item>
                        <Menu.Item icon>
                            <Icon name='right chevron' />
                        </Menu.Item>
                    </Menu>
                </Segment>
            </div>
        );
    }
}

export default ItemTable