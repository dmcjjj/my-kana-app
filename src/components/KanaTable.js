import React from 'react';
import { Grid, GridItem, Text } from '@chakra-ui/react';

const KanaTable = React.memo(({ kanaSet }) => (
  <Grid templateColumns="repeat(5, 1fr)" gap={2}>
    {kanaSet.map(({ hiragana, katakana, romaji }) => (
      <GridItem key={romaji} borderWidth={1} p={2}>
        <Text fontSize="xl" fontWeight="bold" display="flex" justifyContent="space-between">
          <span>{hiragana}</span>
          <span>{katakana}</span>
        </Text>
        <Text fontSize="sm">{romaji}</Text>
      </GridItem>
    ))}
  </Grid>
));

export default KanaTable;

