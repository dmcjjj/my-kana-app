import React from 'react';
import { Grid, GridItem, Text, VStack, Box, Flex } from '@chakra-ui/react';

const KanaTable = React.memo(({ kanaSet }) => (
  <Box width="100%" maxWidth="container.xl" mx="auto">
    <Grid 
      templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" }}
      gap={4}
      width="100%"
    >
      {kanaSet.map(({ hiragana, katakana, romaji }) => (
        <GridItem key={romaji} borderWidth={1} p={2} minHeight="80px" boxShadow="sm" borderRadius="md">
          <VStack spacing={1} align="stretch" height="100%" justifyContent="center">
          <Flex justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold" px={1}>{hiragana}</Text>
              <Text fontSize="xl" fontWeight="bold" px={0.5}>{katakana}</Text>
          </Flex>
            <Text fontSize="xl" textAlign="center" fontWeight="medium">
              {romaji}
            </Text>
          </VStack>
        </GridItem>
      ))}
    </Grid>
  </Box>
));

export default KanaTable;