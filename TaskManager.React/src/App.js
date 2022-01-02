import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout/Layout';
import Home from './components/Home';
import Workspace from './components/Workspace';
import Tasks from './components/Tasks';
import './App.css';

const App = () => {
  return (
      <Layout>
          <Route exact path='/' component={Home} title="ATOS Data Portal" />
          <Route path='/workspace' component={Workspace} />
          <Route path='/tasks' component={Tasks} />
      </Layout>
  );
}

export default App;