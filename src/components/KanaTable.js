import React from 'react';
import { Grid, GridItem, Text, VStack, Box, Flex, AspectRatio } from '@chakra-ui/react';

const KanaTable = React.memo(({ kanaSet }) => {
  return (
    <Box width="100%" maxWidth="100%" px={2} pt={4}>
      <Grid 
        templateColumns="repeat(5, 1fr)"
        gap={2}
        width="100%"
      >
        {kanaSet.map(({ hiragana, katakana, romaji }) => (
          <GridItem key={romaji}>
            <AspectRatio ratio={4/3} maxWidth="100%">
              <Box borderWidth={1} boxShadow="sm" borderRadius="md" width="100%" height="100%" p="5%">
                <VStack spacing="4%" align="stretch" justifyContent="center" height="100%">
                  <Flex justifyContent="space-between" alignItems="center" height="50%">
                    <Text fontSize={['4vw', '3vw', '2vw']} fontWeight="bold" width="45%" textAlign="left">{hiragana}</Text>
                    <Text fontSize={['4vw', '3vw', '2vw']} fontWeight="bold" width="45%" textAlign="right">{katakana}</Text>
                  </Flex>
                  <Text fontSize={['4vw', '3vw', '2vw']} textAlign="center" fontWeight="medium" height="50%">
                    {romaji}
                  </Text>
                </VStack>
              </Box>
            </AspectRatio>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
});

export default KanaTable;