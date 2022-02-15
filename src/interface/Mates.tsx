import React, { useState } from 'react';

import { getMates } from '../state/selectors';
import MessageBox from './common/MessageBox';
import Menu from './common/Menu';
import Assets from '../assets';
import ProgressBar from './common/ProgressBar';
import { classNames } from './interfaceUtils';
import { sailorSkills } from '../data/sailorData';

export default function Mates() {
  const mates = getMates();

  const [selectedI, setSelectedI] = useState(0);

  const { id, name, age, stats, navigationLevel, battleLevel, skills, color } =
    mates[selectedI];

  return (
    <MessageBox>
      <div className="flex">
        <div className="w-[280px]">
          <Menu
            options={mates.map((mate, i) => ({
              label: mate.name,
              value: i,
            }))}
            onSelect={() => {}}
            onActiveIndex={setSelectedI}
          />
        </div>
        <div className="relative text-black text-2xl p-8">
          <div className="flex items-center">
            <img src={Assets.characters(id)} className="w-32 h-40" alt="" />
            <div className="pl-8">
              <div className={classNames('text-4xl font-bold', color)}>
                {name}
              </div>
              <div className="text-lg text-gray-500">Age {age}</div>
              <div className="mt-4">
                <div>Commodore of Hermes II</div>
                <div>Loyal to Portugal</div>
              </div>
            </div>
          </div>
          <div className="flex mt-8">
            <div className="w-72 mr-8 pr-8 space-y-8">
              {id === '1' && (
                <div className="flex justify-between">
                  <div>Rank</div>
                  <div>Commoner</div>
                </div>
              )}
              {id !== '1' && (
                <div className="flex justify-between">
                  <div>Wages</div>
                  <div>10</div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <div>Navigation Level</div>
                    <div>{navigationLevel}</div>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-lg mt-2 pl-4">
                    <div>Experience</div>
                    <div>0</div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <div>Battle Level</div>
                    <div>{battleLevel}</div>
                  </div>
                  <div className="flex items-center justify-between text-gray-500 text-lg mt-2 pl-4">
                    <div>Experience</div>
                    <div>0</div>
                  </div>
                </div>
              </div>
              <div>
                <div>Skills</div>
                <div className="space-y-2 pl-4 text-lg mt-2">
                  {sailorSkills.map((skill) => (
                    <div
                      className={classNames(
                        'capitalize',
                        skills.includes(skill)
                          ? 'text-orange-700 font-bold'
                          : 'text-orange-200',
                      )}
                      key={skill}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {Object.entries(stats)
                .filter(([key]) => key !== 'luck')
                .map(([key, value]) => (
                  <div
                    className="w-56 flex items-center justify-between"
                    key={key}
                  >
                    <div className="w-36">
                      <div className="text-lg capitalize mb-2">{key}</div>
                      <ProgressBar percent={value} />
                    </div>
                    <div className="flex text-right">{value}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MessageBox>
  );
}
