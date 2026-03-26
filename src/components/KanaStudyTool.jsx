import React, { useState, useEffect, useCallback } from 'react';
import { kanaData } from '../data/kanaData';
import KanaTable from './KanaTable';

const KanaStudyTool = () => {
  const [currentKana, setCurrentKana] = useState({ hiragana: '', katakana: '', romaji: '' });
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [kanaType, setKanaType] = useState('hiragana');
  const [showTable, setShowTable] = useState(false);
  const [includeVoiced, setIncludeVoiced] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  const pickRandomKana = useCallback(() => {
    const kanaSet = [...kanaData.basic, ...(includeVoiced ? kanaData.voiced : [])];
    const randomKana = kanaSet[Math.floor(Math.random() * kanaSet.length)];
    setCurrentKana(randomKana);
    setUserInput('');
    setFeedback('');
  }, [includeVoiced]);

  useEffect(() => {
    pickRandomKana();
  }, [pickRandomKana]);

  const checkAnswer = (e) => {
    e.preventDefault();
    if (userInput.toLowerCase().trim() === currentKana.romaji) {
      setFeedback('Correct!');
      setScore((prevScore) => prevScore + 1);
      setTimeout(pickRandomKana, 1000);
    } else {
      setFeedback(`Incorrect. The correct answer is ${currentKana.romaji}.`);
    }
    setUserInput('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
        <h2 className="text-xl font-bold text-center text-gray-800">Kana Study Tool</h2>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col items-center w-full space-y-6">
          
          <div className="text-8xl font-black text-gray-800 tracking-wider">
            {currentKana[kanaType]}
          </div>
          
          <form onSubmit={checkAnswer} className="w-full max-w-sm">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Enter romaji here"
              className="w-full px-4 py-3 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              autoFocus
            />
          </form>
          
          <div className={`text-lg font-medium h-6 ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-500'}`}>
            {feedback}
          </div>
          
          <div className="text-xl font-semibold text-gray-700">
            Score: <span className="text-blue-600">{score}</span>
          </div>
          
          <button 
            onClick={() => setKanaType((kt) => (kt === 'hiragana' ? 'katakana' : 'hiragana'))}
            className="w-full max-w-sm py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-lg transition-colors"
          >
            Switch to {kanaType === 'hiragana' ? 'Katakana' : 'Hiragana'}
          </button>
          
          <div className="flex items-center justify-center w-full max-w-sm pt-2">
            <label className="flex items-center cursor-pointer relative">
              <input 
                type="checkbox" 
                className="sr-only"
                checked={includeVoiced}
                onChange={() => {
                  setIncludeVoiced((prev) => !prev);
                  setScore(0);
                }}
              />
              <div className={`w-11 h-6 rounded-full transition-colors flex items-center px-1 ${includeVoiced ? 'bg-blue-600' : 'bg-gray-300'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${includeVoiced ? 'translate-x-5' : 'translate-x-0'}`}></div>
              </div>
              <span className="ml-3 text-gray-700 font-medium">Include Voiced Consonants</span>
            </label>
          </div>
          
          <button 
            onClick={() => setShowTable((st) => !st)}
            className="w-full max-w-sm py-2 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors mt-4"
          >
            {showTable ? 'Hide' : 'Show'} Kana Table
          </button>
          
          {showTable && (
            <div className="w-full border rounded-lg overflow-hidden mt-6">
              <div className="flex border-b bg-gray-50">
                <button 
                  className={`w-1/2 py-3 font-semibold ${activeTab === 'basic' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('basic')}
                >
                  Basic
                </button>
                <button 
                  className={`w-1/2 py-3 font-semibold ${activeTab === 'voiced' ? 'bg-white border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('voiced')}
                >
                  Voiced
                </button>
              </div>
              <div className="bg-white p-2">
                {activeTab === 'basic' && <KanaTable kanaSet={kanaData.basic} />}
                {activeTab === 'voiced' && <KanaTable kanaSet={kanaData.voiced} />}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanaStudyTool;