import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useF1API } from '../hooks/useF1API';
import { Trophy, Target, Flag } from 'lucide-react';

// Mock race-by-race progression for the chart
const mockProgressionData = [
  { race: 'BHR', points: 15 },
  { race: 'SAU', points: 30 },
  { race: 'AUS', points: 45 },
  { race: 'AZE', points: 57 },
  { race: 'MIA', points: 75 },
  { race: 'MON', points: 102 },
  { race: 'ESP', points: 120 },
  { race: 'CAN', points: 138 },
  { race: 'GBR', points: 150 },
  { race: 'HUN', points: 172 },
  { race: 'BEL', points: 196 },
  { race: 'NED', points: 215 },
  { race: 'ITA', points: 230 },
  { race: 'SIN', points: 245 },
  { race: 'JPN', points: 255 },
  { race: 'QAT', points: 268 },
  { race: 'USA', points: 280 }
];

// Animated Number Counter
const AnimatedCounter = ({ from = 0, to, duration = 2 }) => {
  const [count, setCount] = useState(from);
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = from;
      const end = to;
      if (start === end) return;
      const stepTime = Math.abs(Math.floor((duration * 1000) / (end - start)));
      
      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const SeasonStats = () => {
  const { teamStats, driverStats, loading } = useF1API('2023'); // Example season context

  return (
    <section id="seasonstats" className="py-24 bg-gradient-to-t from-gray-900 to-am-dark relative border-t border-gray-800">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold text-am-white uppercase tracking-wider mb-4"
          >
            Season <span className="text-am-green">Performance</span>
          </motion.h2>
          <p className="text-gray-400 font-montserrat uppercase tracking-[0.2em]">Data Driven Excellence</p>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { icon: <Target className="w-8 h-8 text-am-neon" />, title: "Championship Points", value: teamStats?.points || 0 },
            { icon: <Trophy className="w-8 h-8 text-am-neon" />, title: "Podium Finishes", value: teamStats?.podiums || 0 },
            { icon: <Flag className="w-8 h-8 text-am-neon" />, title: "Race Wins", value: teamStats?.wins || 0 }
          ].map((stat, idx) => (
            <motion.div 
              key={stat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="bg-black/40 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center text-center shadow-lg hover:border-am-green/50 transition-colors"
            >
              <div className="mb-4 bg-am-green/10 p-4 rounded-full">{stat.icon}</div>
              <h3 className="text-gray-400 font-montserrat uppercase tracking-widest text-sm mb-2">{stat.title}</h3>
              <p className="text-5xl font-orbitron font-bold text-am-white">
                {!loading ? <AnimatedCounter to={parseInt(stat.value)} /> : '...'}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts & Drivers Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Driver Contribution */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1 bg-black/40 border border-gray-800 p-8 rounded-xl"
          >
            <h3 className="text-xl font-orbitron text-am-white mb-6 uppercase tracking-widest border-b border-gray-800 pb-2">Driver Points</h3>
            <div className="flex flex-col gap-6">
              {!loading && driverStats.map((driver) => (
                <div key={driver.id}>
                  <div className="flex justify-between font-montserrat text-sm mb-2">
                    <span className="text-gray-300 uppercase">{driver.name}</span>
                    <span className="text-am-neon font-bold">{driver.points} pts</span>
                  </div>
                  <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(driver.points / teamStats.points) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="bg-gradient-to-r from-am-green to-am-neon h-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Points Progression Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-black/40 border border-gray-800 p-8 rounded-xl"
          >
            <h3 className="text-xl font-orbitron text-am-white mb-6 uppercase tracking-widest border-b border-gray-800 pb-2">Points Progression</h3>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgressionData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="race" stroke="#666" tick={{ fill: '#888', fontSize: 12, fontFamily: 'Montserrat' }} />
                  <YAxis stroke="#666" tick={{ fill: '#888', fontSize: 12, fontFamily: 'Montserrat' }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0B0B0B', borderColor: '#006F62', color: '#fff' }}
                    itemStyle={{ color: '#00FFB3', fontFamily: 'Orbitron' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="points" 
                    stroke="#00FFB3" 
                    strokeWidth={3}
                    dot={{ fill: '#006F62', strokeWidth: 2, r: 4 }} 
                    activeDot={{ r: 6, fill: '#00FFB3' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default SeasonStats;
