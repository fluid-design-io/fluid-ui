import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { MenuProps } from ".";
import clsxm from "../../helpers/clsxm";

function AppMenu({
  label,
  header,
  icon,
  badge,
  menus,
  className,
  buttonClassName,
  ...props
}: MenuProps & {
  className?: string;
  buttonClassName?: string;
  [x: string]: any;
}) {
  return (
    <Menu as="div" className={clsxm("relative -ml-px block", className)} {...props}>
      <Menu.Button
        className={clsxm(
          "default-focus group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900",
          buttonClassName
        )}
      >
        {label && (
          <span className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-200 dark:hover:text-gray-50">
            {label}
          </span>
        )}
        {icon && icon}
        {badge && (
          <span className="ml-1.5 rounded bg-gray-200 py-0.5 px-1.5 text-xs font-semibold tabular-nums text-gray-700 ">
            {badge}
          </span>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="popover-panel menu-popover absolute right-0 z-50 w-56  divide-y divide-gray-100 dark:divide-gray-700">
          {header && header}
          <div className="py-1">
            {menus.map(item => (
              <Menu.Item key={`menu-${item.label}`}>
                {({ active }) =>
                  item.role === "separator" ? (
                    <div className="mt-1 border-t border-t-gray-100 pb-1 dark:border-t-gray-700" />
                  ) : (
                    <button
                      onClick={item.onClick}
                      className={clsxm(
                        !item.role && active && "bg-gray-100 text-gray-900 dark:bg-black/20 dark:text-white",
                        !item.role && "text-gray-700 dark:text-gray-200",
                        item.role === "destructive" && active && "bg-red-100 dark:bg-red-700/20",
                        item.role === "destructive" && "text-red-600 dark:text-red-300",
                        item.role === "info" && active && "bg-blue-100 dark:bg-blue-700/20",
                        item.role === "info" && "text-blue-600 dark:text-blue-300",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        "block w-full px-4 py-2 text-left text-sm rtl:text-right",
                        "flex items-center justify-start"
                      )}
                    >
                      {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                      <span>{item.label}</span>
                    </button>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export default AppMenu;
