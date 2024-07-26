import React from 'react';
import { Grid, GridItem, Text, VStack, Box, Flex, useBreakpointValue } from '@chakra-ui/react';

const KanaTable = React.memo(({ kanaSet }) => {
  const columns = useBreakpointValue({
    base: "repeat(3, 1fr)",
    sm: "repeat(4, 1fr)",
    md: "repeat(5, 1fr)",
    lg: "repeat(5, 1fr)"
  });

  return (
    <Box width="100%" maxWidth="100%" px={2}>
      <Grid 
        templateColumns={columns}
        gap={2}
        width="100%"
      >
        {kanaSet.map(({ hiragana, katakana, romaji }) => (
          <GridItem key={romaji} borderWidth={1} p={1} minHeight="70px" boxShadow="sm" borderRadius="md">
            <VStack spacing={0} align="stretch" height="100%" justifyContent="center">
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize="lg" fontWeight="bold">{hiragana}</Text>
                <Text fontSize="lg" fontWeight="bold">{katakana}</Text>
              </Flex>
              <Text fontSize="xs" textAlign="center" fontWeight="medium">
                {romaji}
              </Text>
            </VStack>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
});

export default KanaTable;