import React from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/page/Home';
import About from './component/page/About';
import Search from './component/page/Search';
import Stay from './component/page/Stay';
import Activity from './component/page/Activity';
import Plogging from './component/page/Plogging';
import Gpx from './component/page/Gpx';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />

          <Route path='/cafe' exact component={Search} />
          <Route path='/restaurant' exact component={Search} />
          <Route path='/stay' exact component={Stay} />
          <Route path='/activity' exact component={Activity} />
          <Route path='/plogging' exact component={Plogging} />
          <Route path='/plogging/courseView' exact component={Gpx} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
