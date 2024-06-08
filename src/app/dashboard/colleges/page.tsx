"use client";

import SubHeading from "@/components/shared/sub-heading";
import { Button } from "@/components/ui/button";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collegeFormSchema } from "@/validations/collge";
import { AddOrEditCollege } from "@/actions/college.actions";
import { showToast } from "@/lib/toast";
import { useTheme } from "next-themes";
import { Icons } from "@/components/icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const CollgePage = () => {
  const [isPending, startTransition] = React.useTransition();
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof collegeFormSchema>>({
    resolver: zodResolver(collegeFormSchema),
    defaultValues: {
      collegeFullName: "",
      collegeShortName: "",
    },
  });

  function onSubmit(formData: z.infer<typeof collegeFormSchema>): void {
    startTransition(async () => {
      console.log("first call");
      try {
        const message = await AddOrEditCollege({
          collegeFullName: formData.collegeFullName,
          collegeShortName: formData.collegeShortName,
        });

        switch (message) {
          case "exists":
            showToast(
              "error",
              "Sorry! Either the full name or the short name of the college already exists",
              {
                theme: theme,
              }
            );

            form.reset();
            break;

          case "success":
            showToast("success", "New Cadet College Added Successfully!", {
              theme: theme,
            });

            form.reset();
            break;

          default:
            showToast("error", "Sorry! Something went wrong", {
              theme: theme,
            });
            form.reset();
            console.error(message);
        }
      } catch (error) {
        console.error(error);

        showToast("error", "Sorry! Something went wrong", {
          theme: theme,
        });
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <SubHeading content="Cadet Colleges" />
        </div>
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">
                Add College <BsFillPlusCircleFill className="ml-3" size={20} />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[350px] sm:max-w-[350px] md:max-w-[550px] lg:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New College</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={(...args) =>
                    void form.handleSubmit(onSubmit)(...args)
                  }
                >
                  <div className="grid gap-4 py-4">
                    <div>
                      <FormField
                        control={form.control}
                        name="collegeFullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              College Full Name
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Rangpur Cadet College"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="pt-2 sm:text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div>
                      <FormField
                        control={form.control}
                        name="collegeShortName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              College Short Name{" "}
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="ccr" {...field} />
                            </FormControl>
                            <FormMessage className="pt-2 sm:text-sm" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <DialogFooter className="flex sm:justify-between md:justify-between lg:justify-between gap-3">
                      <DialogClose asChild className="">
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>

                      <Button disabled={isPending}>
                        {isPending ? (
                          <>
                            <Icons.spinner
                              className="mr-2 size-4 animate-spin"
                              aria-hidden="true"
                            />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <span>Add College</span>
                        )}
                      </Button>
                    </DialogFooter>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CollgePage;
