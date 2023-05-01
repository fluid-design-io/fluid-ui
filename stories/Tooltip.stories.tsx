import React from 'react';

import { FluidProvider, Button } from '../src/lib/components';
import clsxm from '../src/lib/helpers/clsxm';

export default {
  title: 'Components/Tooltip',
  component: null,
  args: {},
};

const Template = (args) => {
  return (
    <>
      <div className='flex gap-4 px-8 py-24'>
        <Button label='Left' data-tooltip-left='Left' />
        <Button label='Right' data-tooltip-right='Right' />
        <Button label='Top' data-tooltip-top='Top' />
        <Button label='Bottom' data-tooltip-bottom='Bottom' />
        <Button label='Default' data-tooltip='Default' />
      </div>
      <div className='flex gap-4 px-24'>
        <div
          className='text-sky-500'
          data-tooltip-left='This is a left tooltip'
        >
          data-tooltip-left
        </div>
        <div
          className='text-sky-500'
          data-tooltip-right='This is a right tooltip'
        >
          data-tooltip-right
        </div>
        <div className='text-sky-500' data-tooltip-top='This is a top tooltip'>
          data-tooltip-top
        </div>
        <div
          className='text-sky-500'
          data-tooltip-bottom='This is a bottom tooltip'
        >
          data-tooltip-bottom
        </div>
        <div className='text-sky-500' data-tooltip='This is a default tooltip'>
          data-tooltip
        </div>
      </div>
      <div className='flex gap-4 px-24 py-12'>
        <div
          className='text-sky-500 [--tooltip-width:120px]'
          data-tooltip-right='This is a right tooltip that is really long and informative'
        >
          --tooltip-width: 120px
        </div>
      </div>
    </>
  );
};

export const Default = Template.bind({});
