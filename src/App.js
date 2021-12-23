import React from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './component/page/Home';
import About from './component/page/About';
import Place from './component/page/Place';
import Stay from './component/page/Stay';
import Plogging from './component/page/Plogging';
import Gpx from './component/page/Gpx';
import District from './component/page/District';
import ScrollToTop from './component/scrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/about' component={About} />

          <Route path='/cafe' exact component={Place} />
          <Route path='/restaurant' exact component={Place} />
          <Route path='/stay' exact component={Stay} />
          <Route path='/stay/district' exact component={District} />
          <Route path='/plogging' exact component={Plogging} />
          <Route path='/plogging/courseView' exact component={Gpx} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
