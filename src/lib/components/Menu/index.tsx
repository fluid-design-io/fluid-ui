/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { MenuComp } from './Menu';
import { MenuItem } from './MenuItem';

// @ts-ignore
MenuComp.displayName = 'Menu';
// @ts-ignore
MenuItem.displayName = 'MenuItem';

export const Menu = Object.assign(MenuComp, {
  Item: MenuItem,
});
