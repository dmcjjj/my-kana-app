import React from 'react';

const KanaTable = React.memo(({ kanaSet }) => {
  return (
    <div className="w-full px-2 pt-4">
      <div className="w-full grid grid-cols-5 gap-2">
        {kanaSet.map(({ hiragana, katakana, romaji }) => (
          <div key={romaji} className="relative w-full pb-[75%]">
            <div className="absolute inset-0 w-full h-full border border-gray-200 shadow-sm rounded-md p-2 bg-white flex flex-col justify-center">
              <div className="flex justify-between items-center h-1/2 w-full">
                <span className="text-xl sm:text-2xl font-bold w-[45%] text-left text-gray-800">{hiragana}</span>
                <span className="text-xl sm:text-2xl font-bold w-[45%] text-right text-gray-800">{katakana}</span>
              </div>
              <div className="text-lg sm:text-xl text-center font-medium h-1/2 text-gray-600">
                {romaji}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default KanaTable;