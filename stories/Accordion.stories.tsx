import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { ComponentProps, FC } from "react";
import {
  HiOutlineArrowCircleDown,
  HiOutlineInformationCircle,
  HiOutlineShoppingCart,
  HiOutlineUser,
} from "react-icons/hi";
import { Accordion } from "../src/lib/components/Accordion";
import clsxm from "../src/lib/helpers/clsxm";
import { AccordionPanelProps } from "../src/lib/components/Accordion/AccordionPanel";

export default {
  title: "Components/Accordion",
  component: Accordion,
  args: {
    isOpen: false,
    divider: false,
    darkMode: false,
  },
} as Meta;

interface CustomAccordionProps extends AccordionPanelProps {
  headerIcons: FC<ComponentProps<"svg">>[];
  rtl: boolean;
  darkMode: boolean;
}
const Template: Story<CustomAccordionProps> = (args) => {
  const headers = args?.rtl ? ["متجر", "خدمة", "معلومات عنا"] : ["Shop", "Service", "About"];
  const contents = args?.rtl
    ? [
        "لكن لا بد أن أوضح لك أن كل هذه الأفكار المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤلاء الأشخاص الذين لا يدركون بأن السعادة لا بد أن نستشعرها بصورة أكثر عقلانية ومنطقية فيعرضهم هذا لمواجهة الظروف الأليمة، وأكرر بأنه لا يوجد من هؤ",
        "المغلوطة حول استنكار  النشوة وتمجيد الألم نشأت بالفعل، وسأعرض لك التفاصيل لتكتشف حقيقة وأساس تلك السعادة البشرية، فلا أحد يرفض أو يكره أو يتجنب الشعور بالسعادة، ولكن بفضل هؤ",
        "و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما تنجم عنه بعض المتعة ؟ ",
      ]
    : [
        `Mauris mauris ante, blandit et, ultrices a, suscipit eget, quam.
    Integer ut neque. Vivamus nisi metus, molestie vel, gravida in,
    condimentum sit amet, nunc. Nam a nibh. Donec suscipit eros. Nam mi.
    Proin viverra leo ut odio. Curabitur malesuada. Vestibulum a velit eu
    ante scelerisque vulputate.`,
        `Sed non urna. Donec et ante. Phasellus eu ligula. Vestibulum sit amet
    purus. Vivamus hendrerit, dolor at aliquet laoreet, mauris turpis
    porttitor velit, faucibus interdum tellus libero ac justo. Vivamus non
    quam. In suscipit faucibus urna.`,
        `Nam mi. Proin viverra leo ut
    odio. Curabitur malesuada. Vestibulum a velit eu ante scelerisque
    vulputate.`,
      ];
  const body = (
    <Accordion divider={args?.divider} className={clsxm(args?.className, "contrast")}>
      {headers.map((_, index) => (
        <Accordion.Panel
          key={`${index}`}
          header={headers[index]}
          headerIcon={args?.headerIcons && args.headerIcons[index]}
        >
          <p className="mb-2 text-primary-500 dark:text-primary-300">{contents[index]}</p>
        </Accordion.Panel>
      ))}
    </Accordion>
  );
  if (args?.rtl || args?.darkMode) {
    return (
      <div dir={args?.rtl ? "rtl" : "ltr"} className={clsxm(args?.darkMode && "dark")}>
        {body}
      </div>
    );
  }
  return body;
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
  headerIcons: [HiOutlineShoppingCart, HiOutlineInformationCircle, HiOutlineUser],
};

export const CustomStyle = Template.bind({});
CustomStyle.storyName = "Custom style";
CustomStyle.args = {
  divider: true,
  className: "fl-max-w-md fl-mx-auto fl-shadow-lg fl-shadow-primary-300/40",
};
export const RTL = Template.bind({});
RTL.storyName = "RTL language";
RTL.args = {
  rtl: true,
  divider: true,
  headerIcons: [HiOutlineShoppingCart, HiOutlineInformationCircle, HiOutlineUser],
};
