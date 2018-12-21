import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout'
import 'antd/dist/antd.css';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          ABC
        </Layout>
      </div>
    );
  }
}

export default App;
