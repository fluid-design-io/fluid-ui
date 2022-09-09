import { TabGroup } from './TabGroup';
import { TabList } from './TabList';
import { TabListItem } from './TabListItem';
import { TabPanel } from './TabPanel';
import { TabPanels } from './TabPanels';

export const Tab = Object.assign(TabGroup, {
  List: TabList,
  ListItem: TabListItem,
  Panels: TabPanels,
  Panel: TabPanel,
});
