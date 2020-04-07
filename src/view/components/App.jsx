import React from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import T from '../js/common';

class App extends React.Component {
    state = {}

    componentDidMount() {
        T.get("/",data => this.setState({data}));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    {this.state.data ? <p>{this.state.data.data}</p> : null}
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                </header>
            </div>
        );
    }
}

export default App;