"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterMembership } from "@/actions/membership.actions";
import { MembershipFromSchema } from "@/app/validations/membership";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTheme } from "next-themes";
import { CollegeType } from "@/types";

export enum MEMBERSHIP_TYPES {
  Life_member = "life_member",
  General_member = "general_member",
}

export const CADET_COLLEGES: CollegeType[] = [
  { title: "FCC", value: "fcc" },
  { title: "RCC", value: "rcc" },
  { title: "MCC", value: "mcc" },
  { title: "JCC", value: "jcc" },
  { title: "CCR", value: "ccr" },
  { title: "SCC", value: "scc" },
  { title: "MGCC", value: "mgcc" },
  { title: "CCC", value: "ccc" },
  { title: "BCC", value: "bcc" },
  { title: "PCC", value: "pcc" },
  { title: "JGCC", value: "jgcc" },
  { title: "FGCC", value: "fgcc" },
];

export function MembershipForm() {
  const { theme } = useTheme();

  const [isPending, startTransition] = React.useTransition();
  const [selectedMembershipCategory, setSelectedMembershipCategory] = useState<
    string | null
  >(null);

  const form = useForm<z.infer<typeof MembershipFromSchema>>({
    resolver: zodResolver(MembershipFromSchema),

    defaultValues: {
      fullName: "",
      fathersName: "",
      mothersName: "",
      email: "",
      phoneNumber: "",
      batch: "",
      presentAddress: "",
      permanentAddress: "",
      house: "",
      cadetNo: "",
      workAddress: "",
      designation: "",
      profession: "",
      organization: "",
      translationId: "",
      nationalId: "",
      bloodGroup: "",
      cadetName: "",
      college: "",
      membershipCategory: "",
      calender: new Date(),
      passOutYear: "",
      isAgreedToTerms: false,
    },
  });
  async function onSubmit(
    FormData: z.infer<typeof MembershipFromSchema>
  ): Promise<void> {
    startTransition(async () => {
      try {
        const message = await RegisterMembership({
          username: FormData.fullName,
          email: FormData.email,
          phoneNumber: FormData.phoneNumber,
          translationId: FormData.translationId,
          nationalId: FormData.nationalId,
          fathersName: FormData.fathersName,
          mothersName: FormData.mothersName,
          batch: FormData.batch,
          presentAddress: FormData.presentAddress,
          permanentAddress: FormData.permanentAddress,
          house: FormData.house,
          cadetNo: FormData.cadetNo,
          workAddress: FormData.workAddress,
          designation: FormData.designation,
          profession: FormData.profession,
          organization: FormData.organization,
          bloodGroup: FormData.bloodGroup,
          cadetName: FormData.cadetName,
          college: FormData.college,
          membershipCategory: FormData.membershipCategory,
          calender: FormData.calender,
          passOutYear: FormData.passOutYear,
          mobile: FormData.isAgreedToTerms,
        });

        console.log("the submit message: ", message);
      } catch (error) {
        console.error("Error submitting form:", error);
        showToast("error", "An error occurred while processing your request", {
          theme: theme,
        });
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" lg:flex lg:justify-center lg:gap-4 md:flex md:justify-center md:gap-4 ml-4 mr-4">
            <div className="lg:w-1/3 md:w-1/3">
              <div className="mb-4 mt-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Your Full Name *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="college"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-slate-400">
                            <SelectValue placeholder="Select collage name *" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CADET_COLLEGES?.map((college: CollegeType) => (
                            <SelectItem
                              value={college.value}
                              key={college.value}
                            >
                              {college.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="membershipCategory"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedMembershipCategory(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="text-slate-400">
                            <SelectValue placeholder="Select Membership Category *" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem
                            value="select membership category"
                            disabled
                          >
                            Select Membership Category
                          </SelectItem>
                          <SelectItem value={MEMBERSHIP_TYPES.Life_member}>
                            Life Memeber
                          </SelectItem>
                          <SelectItem value={MEMBERSHIP_TYPES.General_member}>
                            General Member
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedMembershipCategory ==
                        MEMBERSHIP_TYPES.General_member && (
                        <FormDescription className="text-sky-500">
                          General category : 500 TK
                        </FormDescription>
                      )}

                      {selectedMembershipCategory ==
                        MEMBERSHIP_TYPES.Life_member && (
                        <FormDescription className="text-sky-500">
                          Life Member : 5000 TK
                        </FormDescription>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="fathersName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Father's Name *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="mothersName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Mother's Name *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="presentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Present Address *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="permanentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Permanent Address *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="profession"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Profession *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Designation *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Organization *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="workAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Work Address *" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" lg:w-1/3 md:w-1/3">
              <div className="mb-4 mt-8">
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone Number *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="calender"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl className="text-slate-400">
                            <Button
                              variant={"outline"}
                              className={cn(
                                "pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="batch"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="College Intake *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="house"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="House *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="cadetNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Cadet No *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="translationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Translation ID *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="National ID *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="bloodGroup"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Blood Group *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="cadetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Cadet Name *" {...field} />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="passOutYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Pass Out Year *"
                          {...field}
                          type="number"
                        />
                      </FormControl>
                      <FormMessage className="pt-2 sm:text-sm" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4">
                <FormField
                  control={form.control}
                  name="isAgreedToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-slate-400">
                          I agree to the rules of the community
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="lg:flex lg:justify-center mt-6 mb-4 md:flex md:justify-center flex justify-center">
            <Button className="w-1/2 bg-lime-400"> Submit </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default MembershipForm;
