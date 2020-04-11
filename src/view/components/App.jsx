import React from 'react';
import logo from '../img/logo.svg';
import '../css/App.css';
import T from '../js/common';

class App extends React.Component {

    testConnect(e) {
        e.preventDefault();
        T.get("/",
            data => T.notify("API connect success", T.NOTIFY_TYPE.SUCCESS),
            error => T.notify("API connect fail", T.NOTIFY_TYPE.DANGER));
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Edit <code>src/view/components/App.js</code> and save to reload.</p>
                    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                    <br/>
                    <button className='btn btn-success' onClick={this.testConnect}>Test API connection</button>
                </header>
            </div>
        );
    }
}

export default App;