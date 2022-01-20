import React from 'react';
import { classNames } from './interfaceUtils';

const tabs = ['Home', 'Fleet'] as const;
export type Tab = typeof tabs[number];

interface Props {
  currentTab: Tab;
  setCurrentTab: (tab: Tab) => void;
}

export default function Tabs({ currentTab, setCurrentTab }: Props) {
  return (
    <div className="ml-[180px]">
      <nav className="flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={classNames(
              tab === currentTab
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm outline-none',
            )}
            type="button"
            onClick={() => setCurrentTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>
    </div>
  );
}
