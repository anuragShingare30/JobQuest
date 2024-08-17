'use client'
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getchatResponse } from "../utils/action";

const Chat = () => {
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([]);

    const { mutate: mutateFunc, isPending, data } = useMutation({
        mutationFn: async (text: string) => await getchatResponse(text),
        onSuccess: (data) => {
            if (!data) {
                toast.error("An error occured");
            }
            else {
                toast.success("Success");
            }
            // Assuming result is the key holding the chat response
            let result = data.content.parts[0].text;
            setMessages((prevMessages) => [...prevMessages, { role: 'bot', parts: [{ text: result }] }]);
        }
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessages((prevMessages) => [...prevMessages, { role: 'user', parts: [{ text: text }] }]);
        mutateFunc(text);
        setText("");
        console.log(messages);
    };

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };


    return (
        <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
            <div>
                <h1 className="text-3xl relative bottom-5">An Virtual AI Assistant</h1>
                {
                    messages.map((message, index) => {
                        let avatar = message.role === 'user' ? '👨🏽' : '🤖';
                        let bcg = message.role === 'user' ? "bg-base-200 shadow-lg" : "bg-base-100 shadow-lg";

                        // Function to process the message text
                        const renderText = (text: string) => {
                            const parts = text.split('**');
                            return parts.map((part, idx) => {
                                // Alternate between <h1> and <p> based on the split index
                                if (idx % 2 === 1) {
                                    return <h1 key={idx} className="font-extrabold">{part}</h1>;
                                } else {
                                    return <p key={idx} className="font-light font-mono">{part}</p>;
                                }
                            });
                        };

                        return (
                            <div key={index} className={`flex flex-row mt-6 leading-loose border-b border-base-300 ${bcg}`}>
                                <p className="m-3">{avatar}</p>
                                <div className="m-3">
                                    {renderText(message.parts[0].text)}
                                </div>
                            </div>
                        );
                    })
                }


                <div className="m-10">
                    {isPending ? <span className="loading"></span> : null}
                </div>
            </div>
            <form className="join relative mb-24" onSubmit={handleSubmit}>
                <div className="join w-full absolute bottom-auto mt-5">
                    <input
                        type="text"
                        placeholder="Message VoyageVision"
                        className="input input-bordered join-item w-full"
                        name="text"
                        value={text}
                        onChange={handleInput}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary w-32 join-item rounded-2xl mb-5 font-bold"
                        disabled={isPending}

                    >
                        {isPending ? "Please Wait..." : "Ask"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export { Chat };
