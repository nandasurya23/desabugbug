import React from 'react';

const GlobalSkeleton = ({ type = 'card', count = 1 }) => {
  const elements = Array.from({ length: count }, (_, i) => i);

  if (type === 'card') {
    return (
      <>
        {elements.map((key) => (
          <div key={key} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse flex flex-col h-full min-h-[400px]">
            <div className="h-56 bg-gray-200"></div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="h-7 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 flex-1"></div>
              <div className="pt-4 border-t border-gray-100 mt-auto flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'stat') {
    return (
      <>
        {elements.map((key) => (
          <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between animate-pulse min-h-[104px]">
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            </div>
            <div className="w-14 h-14 bg-gray-200 rounded-xl ml-4"></div>
          </div>
        ))}
      </>
    );
  }
  
  if (type === 'table') {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-full">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        {elements.map((key) => (
          <div key={key} className="p-4 border-b border-gray-50 flex gap-4 animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  // text fallback
  return (
    <div className="space-y-3 w-full animate-pulse">
      {elements.map((key) => (
        <div key={key} className="h-4 bg-gray-200 rounded w-full"></div>
      ))}
    </div>
  );
};

export default GlobalSkeleton;
