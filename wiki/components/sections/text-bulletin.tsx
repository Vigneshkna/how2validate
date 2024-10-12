import React from 'react';

const RingBullet = ( props: {items?: string[], itemRecords?: Record<string,string>}) => {
  return (
    <div className="flex flex-col space-y-4">
      {props.items && props.items?.map((item, index) => (
        <div key={index} className="flex items-start">
            <div>
                <div className="h-4 w-4 border-2 m-2 border-black rounded-full flex items-center justify-center mr-3">
                {/* <div className="h-3 w-3 bg-blue-500 rounded-full"></div> */}
            </div>
            </div>
            <p className="text-gray-700">{item}</p>
            </div>
      ))}
      {props.itemRecords && <ul>
        {Object.entries(props.itemRecords).map(([key, value]) => (
            <>
                <div key={key} className="flex items-start">
                <div>
                    <div className="h-3 w-3 border-2 m-2 border-black rounded-full flex items-center justify-center mr-3">
                    {/* <div className="h-3 w-3 bg-blue-500 rounded-full"></div> */}
                </div>
                </div>
                <p className="text-gray-700">
                    <code className="bg-gray-200 text-gray-800 rounded px-1 font-mono">{key}</code>
                    <span>{value}</span></p>
                </div>
            </>
        ))}
      </ul>}
    </div>
  );
};

export default RingBullet;
