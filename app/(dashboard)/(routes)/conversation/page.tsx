"use client";

import axios from "axios";
import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<string[]>([]);

    // zod ka use hm form validation k liye krte hain
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        },
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // old messages in chat
            const userMessages: { role: string; message: string } = {
                role: "user",
                message: values.prompt,
            };

            // new messages and old messages in chat
            const newMessages = [...messages, userMessages];

            // Api request
            const res = await axios.post("/api/conversation", {
                message: values.prompt,
            });

            // response from api
            const response = res.data;

            // setMessages((current) => [...current, userMessages, response]);
            setMessages(response);
            form.reset();
        } catch (error) {
            // Todo: Pro model
            console.log(error);
        } finally {
            router.refresh();
        }
    };

    return (
        <div>
            <Heading
                title="Conversation"
                description="Our most advanced ai modal"
                icon={MessageSquare}
                bgColor="text-violet-500/10"
                iconColor="text-violet-500"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0  p-0">
                                            <Input
                                                className="outline-none border-0 focus-visible:ring-0 focus-visible:ring-transparent "
                                                disabled={isLoading}
                                                placeholder="How can I improve my sketching skill?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                className="col-span-12 lg:col-span-2 w-full"
                                disabled={isLoading}
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="mt-4 space-y-4">
                    <div>
                        {isLoading && (
                            <div className="w-full flex justify-center bg-gray-200 items-center py-6">
                                <Loader />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConversationPage;
