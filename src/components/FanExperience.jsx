import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, PlayCircle } from 'lucide-react';

const quizQuestions = [
  {
    question: "When did Aston Martin make its modern return to Formula One?",
    options: ["2018", "2019", "2020", "2021"],
    answer: 3
  },
  {
    question: "Where is the Aston Martin Aramco F1 Team headquarters located?",
    options: ["Maranello", "Silverstone", "Milton Keynes", "Brackley"],
    answer: 1
  },
  {
    question: "Which driver scored Aston Martin's first podium of the modern era?",
    options: ["Sebastian Vettel", "Fernando Alonso", "Lance Stroll", "Nico Hülkenberg"],
    answer: 0
  }
];

const FanExperience = () => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Simulation of Engine sound
  const toggleSound = () => {
    setIsPlayingSound(!isPlayingSound);
    // In a real app we would play an audio file here using HTMLAudioElement
  };

  const handleAnswer = (index) => {
    setSelectedOption(index);
    
    setTimeout(() => {
      if (index === quizQuestions[currentQuestion].answer) {
        setScore(score + 1);
      }
      
      const nextQ = currentQuestion + 1;
      if (nextQ < quizQuestions.length) {
        setCurrentQuestion(nextQ);
        setSelectedOption(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setSelectedOption(null);
  };

  return (
    <section id="fanexperience" className="py-24 bg-[#050505] relative overflow-hidden text-am-white">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-orbitron font-bold uppercase tracking-wider mb-4"
          >
            The <span className="text-am-neon">Fan Hub</span>
          </motion.h2>
          <p className="text-gray-400 font-montserrat uppercase tracking-[0.2em]">Immerse yourself in the action</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Engine Sound Experience */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-black/40 border border-gray-800 p-8 rounded-xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-[0_0_30px_rgba(0,111,98,0.1)] hover:shadow-[0_0_30px_rgba(0,111,98,0.3)] transition-all duration-500"
          >
            <div className={`absolute inset-0 bg-am-green/5 transition-opacity duration-300 ${isPlayingSound ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
            
            <h3 className="text-2xl font-orbitron font-bold mb-4 relative z-10">Hear The Roar</h3>
            <p className="text-gray-400 font-montserrat mb-8 relative z-10">Experience the visceral sound of the Mercedes-AMG F1 M14 E Performance V6 Turbo.</p>
            
            <button 
              onClick={toggleSound}
              className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${isPlayingSound ? 'bg-am-neon text-black scale-110 shadow-[0_0_40px_rgba(0,255,179,0.5)]' : 'bg-am-dark border-2 border-am-green hover:border-am-neon text-am-neon hover:bg-am-green/10'}`}
            >
              {isPlayingSound ? <Volume2 size={40} /> : <PlayCircle size={40} />}
            </button>
            
            {isPlayingSound && (
              <div className="absolute bottom-6 font-orbitron text-sm text-am-neon tracking-widest uppercase animate-pulse">
                Simulating Audio...
              </div>
            )}
          </motion.div>

          {/* F1 Knowledge Quiz */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-black/40 border border-gray-800 p-8 rounded-xl h-full flex flex-col min-h-[400px]"
          >
            <h3 className="text-2xl font-orbitron font-bold mb-6 border-b border-gray-800 pb-4 flex justify-between items-center">
              <span>Team Quiz</span>
              {!showResults && <span className="text-sm text-am-neon font-montserrat">Q {currentQuestion + 1}/{quizQuestions.length}</span>}
            </h3>

            <div className="flex-grow flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!showResults ? (
                  <motion.div
                    key={`q-${currentQuestion}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-lg font-montserrat text-gray-200 mb-6">{quizQuestions[currentQuestion].question}</p>
                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map((option, index) => {
                        let btnClass = "w-full text-left px-6 py-3 rounded-md font-montserrat transition-all duration-300 border ";
                        if (selectedOption !== null) {
                          if (index === quizQuestions[currentQuestion].answer) {
                            btnClass += "bg-am-green/20 border-am-green text-white"; // Correct
                          } else if (index === selectedOption) {
                            btnClass += "bg-red-900/40 border-red-500 text-gray-300"; // Wrong selected
                          } else {
                            btnClass += "bg-am-dark/50 border-gray-800 text-gray-500 opacity-50"; // Neutral
                          }
                        } else {
                          btnClass += "bg-am-dark/80 border-gray-800 hover:border-am-neon hover:bg-gray-900 text-gray-300";
                        }
                        
                        return (
                          <button 
                            key={index} 
                            disabled={selectedOption !== null}
                            onClick={() => handleAnswer(index)}
                            className={btnClass}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-24 h-24 mx-auto border-4 border-am-neon rounded-full flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,255,179,0.3)]">
                      <span className="text-3xl font-orbitron font-bold text-am-neon">{score}/{quizQuestions.length}</span>
                    </div>
                    <h4 className="text-2xl font-orbitron font-bold mb-2">
                      {score === quizQuestions.length ? 'Perfect Strategy!' : score > 0 ? 'Solid Points Finish!' : 'DNF. Try Again!'}
                    </h4>
                    <p className="text-gray-400 font-montserrat mb-8">You answered {score} out of {quizQuestions.length} questions correctly.</p>
                    <button 
                      onClick={resetQuiz}
                      className="px-8 py-3 bg-am-green hover:bg-am-neon text-am-white hover:text-am-dark font-orbitron font-bold transition-all duration-300 rounded-sm"
                    >
                      Restart Quiz
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
        
        {/* Interactive 360 Link */}
        <div className="mt-16 text-center">
          <a href="#car3d" className="inline-flex flex-col items-center group">
            <span className="text-gray-400 font-montserrat text-sm uppercase tracking-widest mb-2 group-hover:text-am-white transition-colors">Want more?</span>
            <span className="text-am-neon font-orbitron text-xl uppercase tracking-wider relative">
              Explore AMR24 in 3D
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-am-neon transition-all duration-300 group-hover:w-full"></span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FanExperience;
