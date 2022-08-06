import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Button, ButtonProps } from "../src/lib/components/Button";
import * as Yup from "yup";

import { FluidButtonSizes, FluidButtonWeights } from "../src/lib/components/FluidUI/FluidTheme";
import {
  ComboBox,
  Form,
  Input,
  Menu,
  SubmitButton,
  SubmitButtonRef,
  Switch,
  Textarea,
} from "../src/lib/components/Form";
import { HiChevronDown, HiDotsVertical, HiInformationCircle, HiPencil, HiTrash } from "react-icons/hi";
import { states } from "../src/lib/helpers/data";
import { useRef, useState } from "@storybook/addons";
import AppMenu from "../src/lib/components/Form/AppMenu";

export default {
  title: "Components/Form",
  component: Button,
  args: {
    weight: "normal" as keyof FluidButtonWeights,
    size: "md" as keyof FluidButtonSizes,
    disabled: false,
  },
} as Meta;

interface StoryButtonProps extends Omit<ButtonProps, "color"> {}

const Template: Story<StoryButtonProps> = args => {
  const submitBtnRef = useRef<HTMLButtonElement | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<any>(null);
  const initialValues = {
    name: "",
    email: "",
    message: "",
    state: "California",
    saveResponse: false,
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().optional(),
    state: Yup.string().required("State is required"),
    saveResponse: Yup.boolean().required("Save response is required"),
  });
  console.log("submitBtnRef", submitBtnRef);
  return (
    <>
      <div className="w-4/5 max-w-lg mx-auto mt-12 p-4 bg-white dark:bg-stone-900 shadow-lg shadow-gray-400/20 dark:shadow-black/30 rounded-xl">
        <Form
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              setIsSubmitted(values);
              setSubmitting(false);
              resetForm();
            }, 2000);
          }}
        >
          {isSubmitted && (
            <div>
              <h1>Thank you for your submission!</h1>
            </div>
          )}
          <h2 className="text-xl font-semibold pb-4 text-gray-700 dark:text-gray-200">Contact Us</h2>
          <div className="relative flex justify-between mb-4">
            <div />
            <Menu
              label={"Actions"}
              icon={
                <HiChevronDown
                  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-50"
                  aria-hidden="true"
                />
              }
              header={
                <p className="truncate py-3 px-3.5">
                  <span className="mb-0.5 block text-xs text-gray-500 dark:text-gray-400">Signed in as</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Guest user</span>
                </p>
              }
              buttonClassName="!ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-800 rounded-md"
              menus={[
                {
                  label: "Edit",
                  icon: HiPencil,
                  role: "info",
                  onClick: () => console.log("edit"),
                },
                {
                  role: "separator",
                },
                {
                  label: "Delete",
                  role: "destructive",
                  icon: HiTrash,
                  onClick: () => console.log("delete"),
                },
              ]}
            />
          </div>
          <Input name="name" label="Name" type="text" />
          <Input name="email" label="Email" type="email" />
          <Textarea
            name="message"
            label="Message"
            description={{
              text: "Please be as detailed as possible.",
              icon: HiInformationCircle,
            }}
          />
          <ComboBox name="state" list={states} itemKey="name" />
          <Switch name="saveResponse" label="Save Response" />
          <SubmitButton title="Submit" slot="end" />
          <SubmitButtonRef ref={submitBtnRef} className="hidden" />
        </Form>
      </div>
      <div>
        <Button onClick={() => submitBtnRef.current?.click()} shape="pill" weight="outline" color="green">
          Submit Button Ref
        </Button>
      </div>
    </>
  );
};
export const Default = Template.bind({});
