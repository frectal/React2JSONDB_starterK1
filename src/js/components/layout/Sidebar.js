import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import ItemTable from '../utilities/ItemTable';
import AddTypeModal from '../utilities/AddTypeModal';

class LeftSidebar extends Component {
    render() {
        return (
            <div className="left-sidebar">
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='push' width='thin' visible={this.props.isSidebarVisible} icon='labeled' vertical inverted>
                        <Menu.Item><AddTypeModal /></Menu.Item>
                        <Menu.Item className="item-type">Type of item 1</Menu.Item>
                        <Menu.Item className="item-type">Type of item 2</Menu.Item>
                        <Menu.Item className="item-type">Type of item 3</Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            <ItemTable />
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isSidebarVisible: state.layout.isSidebarVisible
    };
};

export default connect(mapStateToProps)(LeftSidebar);
