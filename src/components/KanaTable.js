import React from 'react';

const KanaTable = React.memo(({ kanaSet }) => (
  <div className="grid grid-cols-5 gap-2 text-center">
    {kanaSet.map(({ hiragana, katakana, romaji }) => (
      <div key={romaji} className="border p-2">
        <div className="text-xl font-bold flex justify-between">
          <span>{hiragana}</span>
          <span>{katakana}</span>
        </div>
        <div className="text-sm">{romaji}</div>
      </div>
    ))}
  </div>
));

export default KanaTable;