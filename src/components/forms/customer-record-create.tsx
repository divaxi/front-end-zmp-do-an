import React from "react";
import { Control, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import TextInputController from "./input-components/TextInputController";
import DateInputController from "./input-components/DateInputController";
import RadioButtonController from "./input-components/RadioButtonController";

const customerRecordSchema = z.object({
  fullName: z.string().min(1, "Vui lòng nhập họ và tên"),
  DOB: z.string({
    required_error: "Vui lòng chọn ngày sinh",
  }),
  sex: z.string().min(1, "Vui lòng chọn giới tính"),
  CCCDNumber: z.string().nullable().optional(),
  BHYTNumber: z.string().nullable().optional(),
});

export type CustomerRecordFormValues = z.infer<typeof customerRecordSchema>;

interface CustomerRecordCreateProps {
  onSubmit: (data: CustomerRecordFormValues) => void;
  defaultValues?: Partial<CustomerRecordFormValues>;
}

const CustomerRecordCreate: React.FC<CustomerRecordCreateProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const form = useForm<CustomerRecordFormValues>({
    resolver: zodResolver(customerRecordSchema),
    defaultValues: {
      fullName: "",
      sex: "",
      CCCDNumber: null,
      BHYTNumber: null,
      ...defaultValues,
    },
  });

  const handleSubmit = (data: CustomerRecordFormValues) => {
    onSubmit(data);
  };

  const sexOptions = [
    { value: "male", displayName: "Nam" },
    { value: "female", displayName: "Nữ" },
    { value: "other", displayName: "Khác" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 m-4"
      >
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <span className="text-red-500"> *</span>
              <FormControl>
                <TextInputController
                  name="fullName"
                  control={form.control}
                  placeholder="Nhập họ và tên"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="DOB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <span className="text-red-500"> *</span>
              <FormControl>
                <DateInputController
                  name="DOB"
                  control={form.control as unknown as Control<FieldValues>}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giới tính</FormLabel>
              <span className="text-red-500"> *</span>
              <FormControl>
                <RadioButtonController
                  name="sex"
                  control={form.control as unknown as Control<FieldValues>}
                  options={sexOptions}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="CCCDNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số CCCD</FormLabel>
              <FormControl>
                <TextInputController
                  name="CCCDNumber"
                  control={form.control}
                  placeholder="Nhập số CCCD"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="BHYTNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số BHYT</FormLabel>
              <FormControl>
                <TextInputController
                  name="BHYTNumber"
                  control={form.control}
                  placeholder="Nhập số BHYT"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-primary text-white font-bold "
        >
          Lưu thông tin
        </Button>
      </form>
    </Form>
  );
};

export default CustomerRecordCreate;
