import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu } from 'semantic-ui-react';
import ItemTable from '../utilities/ItemTable';
import AddTypeModal from '../utilities/AddTypeModal';
import axios from 'axios';
import { API_URL } from '../../constants';

class LeftSidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            types: {},
            selectedType: {}
        };

        this.refreshTypes = this.refreshTypes.bind(this);
        this.selectType = this.selectType.bind(this);
    }

    componentWillMount() {
        this.refreshTypes();
    }

    selectType(typeId) {
        this.setState({
            selectedType: {
                id: typeId,
                ...this.state.types[typeId]
            }
        });
    }

    refreshTypes() {
        return axios.get(`${API_URL}types.json`)
            .then(res => {
                if (!res.data) {
                    return;
                }
                let selectedType;

                if (this.state.selectedType.id) {
                    selectedType = this.state.selectedType;
                } else {
                    selectedType = {
                        id: Object.keys(res.data)[0],
                        ...res.data[Object.keys(res.data)[0]]
                    };
                }

                this.setState({
                    types: res.data,
                    selectedType: selectedType
                });
            });
    }

    render() {
        return (
            <div className="left-sidebar">
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='push' width='thin' visible={this.props.isSidebarVisible} icon='labeled' vertical inverted>
                        <Menu.Item><AddTypeModal refresh={this.refreshTypes}/></Menu.Item>
                        {
                            Object.keys(this.state.types).map(key => {
                                return <Menu.Item onClick={() => this.selectType(key)} className={`item-type ${this.state.selectedType.id === key ? 'active' : ''}`} key={key}>{this.state.types[key].title}</Menu.Item>;
                            })
                        }
                    </Sidebar>
                    <Sidebar.Pusher>
                        <Segment basic>
                            {
                                !this.state.selectedType.id
                                    ? <div>Please, create a type.</div>
                                    : <ItemTable type={this.state.selectedType}/>
                            }
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isSidebarVisible: state.layout.isSidebarVisible
    };
};

export default connect(mapStateToProps)(LeftSidebar);
