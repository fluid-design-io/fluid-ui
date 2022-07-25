import type { Meta, Story } from "@storybook/react/types-6-0";
import type { ComponentProps, FC } from "react";
import {
  HiOutlineArrowCircleDown,
  HiOutlineInformationCircle,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import type { AccordionProps } from "../lib/components/Accordion"
import { Accordion } from "../lib/components/Accordion";
import { AccordionPanel } from "../lib/components/Accordion/AccordionPanel";
import { excludeClassName } from "../lib/helpers/exclude";

export default {
  title: "Components/Accordion",
  component: Accordion,
  args: {
    isOpen: false,
    divider: false,
  },
} as Meta;

interface CustomAccordionProps extends AccordionProps {
  headerIcons: FC<ComponentProps<"svg">>[];
}
const Template: Story<CustomAccordionProps> = (args) => {
  return (
    <Accordion divider={args?.divider} className={args?.className}>
      <AccordionPanel
        header="Shop"
        headerIcon={args?.headerIcons && args.headerIcons[0]}
        {...excludeClassName(args)}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
          Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
          condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
          Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu
          ante scelerisque vulputate.
        </p>
      </AccordionPanel>
      <AccordionPanel
        header="Service"
        headerIcon={args?.headerIcons && args.headerIcons[1]}
        {...excludeClassName(args)}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
          purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis
          porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non
          quam. In suscipit faucibus urna.
        </p>
      </AccordionPanel>
    </Accordion>
  );
};

export const Default = Template.bind({});

export const IsOpen = Template.bind({});
IsOpen.storyName = "Default Open";
IsOpen.args = {
  isOpen: true,
};

export const WithDivider = Template.bind({});
WithDivider.storyName = "With Divider";
WithDivider.args = {
  divider: true,
};

export const WithArrowIcon = Template.bind({});
WithArrowIcon.storyName = "With arrow icon";
WithArrowIcon.args = {
  divider: true,
  arrowIcon: HiOutlineArrowCircleDown,
};

export const WithHeaderIcon = Template.bind({});
WithHeaderIcon.storyName = "With header icon";
WithHeaderIcon.args = {
  divider: true,
  headerIcons: [HiOutlineShoppingCart, HiOutlineInformationCircle],
};

export const CustomStyle = Template.bind({});
CustomStyle.storyName = "Custom style";
CustomStyle.args = {
  divider: true,
  className: "max-w-md mx-auto shadow-lg shadow-gray-300/40",
};
