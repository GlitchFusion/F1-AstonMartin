import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity } from 'lucide-react';

// Generate mock telemetry data
const generateTelemetry = () => {
  const data = [];
  let speed = 80;
  let throttle = 20;
  let brake = 80;

  for (let i = 0; i <= 100; i++) {
    // Simulate a corner exit to straight then heavy braking zone
    if (i < 20) {
      speed += (200 - speed) * 0.1;
      throttle = 100;
      brake = 0;
    } else if (i >= 20 && i < 70) {
      speed += (320 - speed) * 0.05 + (Math.random() * 5);
      throttle = 100;
      brake = 0;
    } else if (i >= 70 && i < 85) {
      speed -= (speed - 100) * 0.3;
      throttle = 0;
      brake = 100;
    } else {
      speed += (150 - speed) * 0.1;
      throttle = 60;
      brake = 0;
    }

    data.push({
      distance: i * 20, // meters
      speed: Math.round(speed),
      throttle: Math.round(throttle),
      brake: Math.round(brake)
    });
  }
  return data;
};

const TelemetryVisualization = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateTelemetry());
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-am-dark/95 border border-am-green p-4 rounded-lg shadow-[0_0_15px_rgba(0,111,98,0.3)] backdrop-blur-sm">
          <p className="text-gray-400 font-montserrat text-xs mb-2 uppercase tracking-widest border-b border-gray-800 pb-1">Dist: {label}m</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-6 mb-1">
              <span className="text-gray-300 font-montserrat text-sm capitalize">{entry.name}:</span>
              <span className="font-orbitron font-bold text-sm" style={{ color: entry.color }}>
                {entry.value} {entry.name === 'speed' ? 'km/h' : '%'}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="telemetryvisualization" className="py-24 bg-am-dark relative overflow-hidden text-am-white">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/2 bg-am-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-1/3 h-1/3 bg-am-neon/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Activity className="text-am-neon w-6 h-6" />
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold uppercase tracking-wider">
                Race <span className="text-am-green">Telemetry</span>
              </h2>
            </div>
            <p className="text-gray-400 font-montserrat max-w-xl text-lg leading-relaxed">
              Analyze a high-speed lap sector. Visualizing driver inputs vs vehicle speed highlights the extreme braking forces and acceleration capabilities of the AMR24.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-am-neon"></div>
              <span className="text-xs font-montserrat tracking-widest text-gray-400 uppercase">Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-am-green"></div>
              <span className="text-xs font-montserrat tracking-widest text-gray-400 uppercase">Throttle</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff3333]"></div>
              <span className="text-xs font-montserrat tracking-widest text-gray-400 uppercase">Brake</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* Speed Graph (Area Chart) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/40 border border-gray-800 p-6 lg:p-8 rounded-xl h-80 relative group"
          >
            <h3 className="absolute top-6 left-8 z-10 text-am-white font-orbitron text-lg uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Speed Trace (km/h)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FFB3" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00FFB3" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="distance" hide />
                <YAxis domain={[0, 350]} stroke="#444" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Montserrat' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#006F62', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area 
                  type="monotone" 
                  dataKey="speed" 
                  name="Speed"
                  stroke="#00FFB3" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSpeed)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Pedals Graph (Line/Area Chart) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 border border-gray-800 p-6 lg:p-8 rounded-xl h-64 relative group"
          >
            <h3 className="absolute top-6 left-8 z-10 text-am-white font-orbitron text-lg uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">Driver Inputs (%)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                <XAxis dataKey="distance" stroke="#444" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Montserrat' }} />
                <YAxis domain={[0, 100]} stroke="#444" tick={{ fill: '#666', fontSize: 12, fontFamily: 'Montserrat' }} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#006F62', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Line 
                  type="stepAfter" 
                  dataKey="throttle" 
                  name="throttle"
                  stroke="#006F62" 
                  strokeWidth={3}
                  dot={false}
                  animationDuration={2000}
                  animationDelay={300}
                />
                <Line 
                  type="stepAfter" 
                  dataKey="brake" 
                  name="brake"
                  stroke="#ff3333" 
                  strokeWidth={3}
                  dot={false}
                  animationDuration={2000}
                  animationDelay={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TelemetryVisualization;
