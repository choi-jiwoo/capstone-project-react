import React from 'react';
import MainService from '../MainService';
import HomeContent from '../HomeContent';
import Banner from '../Banner';

function Home() {
  return (
    <>
      <Banner />
      <MainService />
      <HomeContent />
    </>
  );
}

export default Home;
