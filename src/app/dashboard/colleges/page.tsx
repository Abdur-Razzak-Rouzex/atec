"use client";

import { AddOrEditCollege, GetAllColleges } from "@/actions/college.actions";
import { Icons } from "@/components/icons";
import SubHeading from "@/components/shared/sub-heading";
import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { showToast } from "@/lib/toast";
import { CollegeType } from "@/types";
import { collegeFormSchema } from "@/validations/collge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { z } from "zod";

const CollgePage = () => {
  const [isPending, startTransition] = React.useTransition();
  const [colleges, setColleges] = useState<CollegeType[]>([]);
  const [isRefetchData, setIsRefetchData] = useState<boolean>(false);
  const { theme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getColleges = async () => {
      const data = await GetAllColleges();
      console.log("the collleges: ", data);
      setColleges(data);
    };

    getColleges();
  }, [isRefetchData]);

  const form = useForm<z.infer<typeof collegeFormSchema>>({
    resolver: zodResolver(collegeFormSchema),
    defaultValues: {
      collegeFullName: "",
      collegeAcronym: "",
    },
  });

  function onSubmit(formData: z.infer<typeof collegeFormSchema>): void {
    startTransition(async () => {
      try {
        const message = await AddOrEditCollege({
          collegeFullName: formData.collegeFullName,
          collegeAcronym: formData.collegeAcronym.toLowerCase(),
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

            setIsModalOpen(false);
            setIsRefetchData(() => !isRefetchData);
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
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button variant="default" onClick={() => setIsModalOpen(true)}>
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
                        name="collegeAcronym"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              College Acronym
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
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setIsModalOpen(false)}
                        >
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

      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={colleges} />;
      </div>
    </div>
  );
};

export default CollgePage;
