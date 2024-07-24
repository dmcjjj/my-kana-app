import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
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
    if (userInput.toLowerCase() === currentKana.romaji) {
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Kana Study Tool</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <span className="text-6xl font-bold">{currentKana[kanaType]}</span>
        </div>
        <form onSubmit={checkAnswer} className="space-y-4">
          <div className="relative">
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter romaji"
              className="w-full pr-28 text-center [&::placeholder]:text-center [&::placeholder]:translate-x-0"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
              Press Enter
            </span>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p>{feedback}</p>
          <p>Score: {score}</p>
        </div>
        <div className="mt-4 flex flex-col items-center space-y-2">
          <Button onClick={() => setKanaType((kt) => (kt === 'hiragana' ? 'katakana' : 'hiragana'))} className="w-full">
            Switch to {kanaType === 'hiragana' ? 'Katakana' : 'Hiragana'}
          </Button>
          <div className="flex items-center justify-center w-full">
            <Switch 
              id="voiced-mode" 
              checked={includeVoiced} 
              onCheckedChange={() => {
                setIncludeVoiced((prev) => !prev);
                setScore(0);
              }} 
            />
            <label htmlFor="voiced-mode" className="ml-2">Include Voiced Consonants</label>
          </div>
          <Button onClick={() => setShowTable((st) => !st)} className="w-full">
            {showTable ? 'Hide' : 'Show'} Kana Table
          </Button>
        </div>
        {showTable && (
          <Tabs defaultValue="basic" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="voiced">Voiced</TabsTrigger>
            </TabsList>
            <TabsContent value="basic">
              <KanaTable kanaSet={kanaData.basic} />
            </TabsContent>
            <TabsContent value="voiced">
              <KanaTable kanaSet={kanaData.voiced} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default KanaStudyTool;