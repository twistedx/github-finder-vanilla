import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Search extends Component {

    state = {
        text: ''
    };

    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    };
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = e => {
        console.log(e);
        e.preventDefault();
        console.log(this.state.text)
        if (this.state.text === '') {
            this.props.setAlert('Please enter something', 'light');
        } else {
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }

    render() {
        const { showClear, clearUsers } = this.props;

        return (
            <div>
                <form onSubmit={this.onSubmit} className="form" >
                    <input type="text" name="text" placeholder="Search for Users.." value={this.state.text} onChange={this.handleInputChange} />
                    <button type="submit" value='search' className="btn btn-dark btn-block" >Search</button>
                </form>
                {showClear && <button className="btn btn-light btn-block" onClick={clearUsers}>Clear</button>}

            </div>
        )
    }
}

export default Search
