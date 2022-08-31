/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { AccordionComponent } from './Accordion';
import { AccordionPanel } from './AccordionPanel';

AccordionComponent.displayName = 'Accordion';
AccordionPanel.displayName = 'AccordionPanel';

export const Accordion = Object.assign(AccordionComponent, {
  Panel: AccordionPanel,
});
