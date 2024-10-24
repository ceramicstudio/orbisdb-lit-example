import React, { useEffect } from "react";
import ChatHeader from "../fragments/chatheader";
import ChatContent from "../fragments/chatcontent";
import { env } from "@/env.mjs";
import ChatInputBox from "../fragments/chatinputbox";
import { Post, Message } from "../../types";
import { useOrbisContext } from "@/context/OrbisContext";
import { ILitNodeClient } from "@lit-protocol/types";

type ChatProps = { address: string; lit: ILitNodeClient };

const Chat = ({ address, lit }: ChatProps) => {
  const [chatMessages, setChatMessages] = React.useState<Message[]>([]);
  const { orbis, isAuthenticated } = useOrbisContext();

  const getMessages = async () => {
    try {
      const user = await orbis.getConnectedUser();
      if (user) {
        const query = await orbis
          .select()
          .raw(
            `SELECT *
              FROM ${env.NEXT_PUBLIC_POST_ID} as post
              ORDER BY created DESC`
          )
          .run();
        const queryResult = query.rows as Post[];
        console.log(queryResult);
        if (queryResult.length) {
          queryResult.forEach((el: any) => {
            setChatMessages((prevMessages) => [
              ...prevMessages,
              {
                text: el.body,
                sentBy: el.controller.split(":")[4]!!,
                sentAt: new Date(el.created),
                isChatOwner: address === el.controller.split(":")[4]!!,
                ...el,
              },
            ]);
          });
        }
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  /** State to control new messages */

  /**
   *
   * @param message
   * "Create" a new message
   */
  const sendANewMessage = (message: Message) => {
    if (chatMessages) {
      setChatMessages((chatMessages) => [...chatMessages, message]);
    }
  };

  /**
   * Reset chat to the default messages
   */

  useEffect(() => {
    if (localStorage.getItem("orbis:session")) { 
      getMessages();
    }
  }, []);

  return (
    <div className="max-w-xxl mx-auto mt-32 w-5/6 min-h-200">
      <div className="flex flex-row justify-between items-center py-2"></div>
      <div className="bg-white border border-gray-200 rounded-lg shadow relative">
        <ChatHeader
          name={address}
          numberOfMessages={chatMessages ? chatMessages.length : 0}
        />
        {chatMessages && <ChatContent messages={chatMessages} lit={lit} />}
        <ChatInputBox
          sendANewMessage={sendANewMessage}
          address={address}
          lit={lit}
        />
      </div>
    </div>
  );
};

export default Chat;
