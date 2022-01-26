import React from 'react';

interface Props {
  percent: number;
}

export default function ProgressBar({ percent }: Props) {
  return (
    <div className="h-[14px] flex flex-col">
      <div className="flex-1 flex">
        <div className="w-2 bg-[#00a2f3]" />
        <div className="flex-1 flex flex-col">
          <div className="flex-1 flex">
            <div className="w-0.5 bg-black" />
            <div className="flex-1 flex flex-col">
              <div className="h-0.5 bg-black" />
              <div className="flex-1 bg-[#0041d3]">
                <div
                  className="bg-[#d34100] h-full"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
            <div className="w-0.5" />
          </div>
          <div className="h-0.5" />
        </div>
        <div className="w-2 bg-blue-400" />
        <div className="w-0.5 bg-black" />
      </div>
      <div className="h-0.5 bg-black" />
    </div>
  );
}
