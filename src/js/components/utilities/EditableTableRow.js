import React, { Component } from 'react'
import { Icon, Label, Menu, Table, Segment, Button, Input } from 'semantic-ui-react'

class EditableTableRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            mode: 'read',
            item: props.item || {},
            attrs: props.attrs
        };

        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
    }

    edit(){
        this.setState({
            mode: 'edit'
        })
    }

    save(){
        this.setState({
            mode: 'read'
        })
    }

    render(){
        return (
            <Table.Row  active={this.state.mode == 'edit'}>
                {
                    this.state.attrs.map((e,i) => {
                        let innerElement;
                        switch (this.state.mode){
                            case 'read':
                                innerElement = <span>{this.state.item[e]}</span>;
                                break;
                            case 'edit':
                                innerElement = <Input placeholder={e} value={this.state.item[e]} onChange={this.valueChanged} fluid/>;
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
                            (this.state.mode == 'edit')
                                ? (<Button icon color='blue' onClick={this.save}>
                                    <Icon name='checkmark'/>
                                  </Button>)
                                : (<Button icon color='blue' onClick={this.edit}>
                                    <Icon name='write'/>
                                  </Button>)
                        }
                        <Button icon color='orange'>
                            <Icon name='remove' />
                        </Button>
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        );
    }
}

export default EditableTableRow