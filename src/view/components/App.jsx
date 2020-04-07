import React from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import T from '../js/common';

class App extends React.Component {
    state = { apiMessage: null }

    componentDidMount() {
        T.get("/", data =>
            this.setState({ apiMessage: "API connect success" }),
            error =>
                this.setState({ apiMessage: "API connect fail" }));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/view/components/App.js</code> and save to reload.</p>
                    {this.state.apiMessage ? <p>{this.state.apiMessage}</p> : null}
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                </header>
            </div>
        );
    }
}

export default App;