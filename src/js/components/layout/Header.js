import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toggleMenu, toggleSidebar } from '../../actions/layoutActions';

class HeaderComponent extends Component {
    render() {
        return (
            <div className="top-menu">
                <Menu stackable className={`${this.props.isMenuVisible ? 'visible' : ''}`}>
                    <Menu.Item className="first-line">
                        <span className="burger-button" onClick={this.props.toggleSidebar}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <div>
                            React2
                        </div>
                        <span className="burger-button mobile-only" onClick={this.props.toggleMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </Menu.Item>
                    <Menu.Item>Action 1</Menu.Item>
                    <Menu.Item>Action 2</Menu.Item>
                    <Menu.Item>Action 3</Menu.Item>
                </Menu>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isMenuVisible: state.layout.isMenuVisible
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        toggleMenu,
        toggleSidebar
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);