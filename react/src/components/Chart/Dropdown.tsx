import { Menu, Transition } from "@headlessui/react";

import React from "react";
import { Fragment } from "react";

interface Option {
  icon?: any;
  title: string;
  id: string;
  color?: string;
  onClick: () => void;
}
const Dropdown: React.FC<{
  options: Option[][];
  children: any;
}> = ({ options, children }) => {
  return (
    <div
      className="onvo-dropdown-container relative z-20 dropdown-container"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Menu as="div" className="z-20 inline-block text-left">
        <div>
          <Menu.Button className="onvo-dropdown-button inline-flex w-full justify-center">
            {children}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment as any}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="onvo-dropdown-menu-items z-20 absolute backdrop-blur-lg right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white/50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-700 dark:bg-gray-800/50 border dark:border-gray-700">
            {options.map((a, i) => (
              <div key={i + ""} className="relative px-1 py-1 z-10">
                {a.map((b) => (
                  <Menu.Item key={b.title}>
                    {({ active }) => (
                      <button
                        onClick={(e) => {
                          b.onClick();
                        }}
                        className={`${
                          active
                            ? "text-white " +
                              (b.color ? b.color : "bg-blue-500")
                            : "text-gray-900 dark:text-gray-200"
                        }  onvo-dropdown-menu-item-${i} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {b.icon && (
                          <b.icon
                            className={
                              "mr-2 h-5 w-5" + (active ? " text-white" : "")
                            }
                            aria-hidden="true"
                          />
                        )}
                        {b.title}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default Dropdown;
