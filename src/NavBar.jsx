import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (<nav className="navbar">
                    <a href="/" className="navbar-brand">🤗 ChattyApp 🤗</a>
                    <span className="user-count">{this.props.usersCount} users online</span>
                </nav>)
    }
}

export default NavBar;