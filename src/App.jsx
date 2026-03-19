import React, { useState } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RaceCountdown from './components/RaceCountdown';
import AboutTeam from './components/AboutTeam';
import CarTechnology from './components/CarTechnology';
import Car3D from './components/Car3D';
import Drivers from './components/Drivers';
import PastDrivers from './components/PastDrivers';
import SeasonStats from './components/SeasonStats';
import TelemetryVisualization from './components/TelemetryVisualization';
import MomentsGallery from './components/MomentsGallery';
import Engineering from './components/Engineering';
import FanExperience from './components/FanExperience';
import Footer from './components/Footer';

function App() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="bg-am-dark min-h-screen text-am-white">
      {!loadingComplete && <Preloader onLoadingComplete={() => setLoadingComplete(true)} />}
      
      {loadingComplete && (
        <>
          <Navbar />
          <main>
            <Hero />
            <RaceCountdown />
            <AboutTeam />
            <CarTechnology />
            <Car3D />
            <Drivers />
            <PastDrivers />
            <SeasonStats />
            <TelemetryVisualization />
            <MomentsGallery />
            <Engineering />
            <FanExperience />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
