import React, { Component } from 'react';
import Header from './layout/Header';
import Sidebar from './layout/Sidebar';

export default class IndexPage extends Component {
    render() {
        return (
            <div className="page">
                <Header/>
                <Sidebar/>
            </div>
        );
    }
}