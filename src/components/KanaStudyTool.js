import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
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
    <Card maxW="container.lg" mx="auto" width="100%">
      <CardHeader>
        <Heading size="md" textAlign="center">Kana Study Tool</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} width="100%">
          <Text fontSize="7xl" fontWeight="bold">{currentKana[kanaType]}</Text>
          <form onSubmit={checkAnswer} style={{ width: '100%' }}>
            <Box position="relative" width="100%">
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Enter romaji here"
                textAlign="center"
              />
            </Box>
          </form>
          <Text>{feedback}</Text>
          <Text>Score: {score}</Text>
          <Button onClick={() => setKanaType((kt) => (kt === 'hiragana' ? 'katakana' : 'hiragana'))} width="full">
            Switch to {kanaType === 'hiragana' ? 'Katakana' : 'Hiragana'}
          </Button>
          <Box display="flex" alignItems="center" justifyContent="center" width="full">
            <Switch
              id="voiced-mode"
              isChecked={includeVoiced}
              onChange={() => {
                setIncludeVoiced((prev) => !prev);
                setScore(0);
              }}
            />
            <Text ml={2}>Include Voiced Consonants</Text>
          </Box>
          <Button onClick={() => setShowTable((st) => !st)} width="full">
            {showTable ? 'Hide' : 'Show'} Kana Table
          </Button>
          {showTable && (
            <Tabs width="100%">
              <TabList>
                <Tab width="50%">Basic</Tab>
                <Tab width="50%">Voiced</Tab>
              </TabList>
              <TabPanels>
                <TabPanel width="100%" padding={0}>
                  <KanaTable kanaSet={kanaData.basic} />
                </TabPanel>
                <TabPanel width="100%" padding={0}>
                  <KanaTable kanaSet={kanaData.voiced} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default KanaStudyTool;