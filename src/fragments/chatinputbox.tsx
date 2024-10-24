import React from "react";
import { Message, Post } from "../../types";
import { env } from "@/env.mjs";
import DebouncedInput from "./debounced";
import { encryptWithLit, encodeb64 } from "../../utils/lit";
import { useOrbisContext } from "@/context/OrbisContext";
import { ILitNodeClient } from "@lit-protocol/types";

const CONTEXT_ID = env.NEXT_PUBLIC_CONTEXT_ID ?? "";
const POST_ID = env.NEXT_PUBLIC_POST_ID ?? "";

interface ChatInputBoxProps {
  sendANewMessage: (message: Message) => void;
  address: string;
  lit: ILitNodeClient;
}

const chain = "ethereum";

const ChatInputBox = ({ sendANewMessage, address, lit }: ChatInputBoxProps) => {
  const [newMessage, setNewMessage] = React.useState("");
  const { orbis, isAuthenticated } = useOrbisContext();
  /**
   * Send message handler
   * Should empty text field after sent
   */
  const doSendMessage = async () => {
    if (newMessage && newMessage.length > 0) {
      const accessControlConditions = [
        {
          contractAddress: "",
          standardContractType: "",
          chain,
          method: "",
          parameters: [":userAddress"],
          returnValueTest: {
            comparator: "=",
            value: address,
          },
        },
      ];

      const { ciphertext, dataToEncryptHash } = await encryptWithLit(
        lit,
        newMessage,
        accessControlConditions,
        chain
      );

      console.log(ciphertext);

      const stringified = JSON.stringify(accessControlConditions);
      const b64 = new TextEncoder().encode(stringified);
      const encoded = await encodeb64(b64);

      const user = await orbis.getConnectedUser(); // Get the connected user
      const createQuery = await orbis
        .insert(POST_ID)
        .value({
          body: dataToEncryptHash,
          to: address,
          created: new Date().toISOString(),
          ciphertext,
          chain,
          accessControlConditions: encoded,
          accessControlConditionType: "accessControlConditions",
        })
        .context(CONTEXT_ID)
        .run();

      if (createQuery.content) {
        console.log("Post created successfully");
        sendANewMessage({
          sentAt: new Date(createQuery.content.created),
          sentBy: address,
          isChatOwner: true,
          text: createQuery.content.body,
          body: createQuery.content.body,
          id: createQuery.id,
          to: createQuery.content.to,
          created: createQuery.content.created,
          ciphertext: createQuery.content.ciphertext,
          chain: createQuery.content.chain,
          accessControlConditions: createQuery.content.accessControlConditions,
          accessControlConditionType:
            createQuery.content.accessControlConditionType,
          author: {
            id: createQuery.controller,
          },
        });

        console.log(createQuery);
        console.log(address);
        setNewMessage("");
      }
    }
  };

  return (
    <div className="px-6 py-4 bg-white w-100 overflow-hidden rounded-bl-xl rounded-br-xla">
      <div className="flex flex-row items-center space-x-5">
        <DebouncedInput
          value={newMessage ?? ""}
          debounce={100}
          onChange={(value) => setNewMessage(String(value))}
        />
        <button
          type="button"
          disabled={!newMessage || newMessage.length === 0}
          className="px-3 py-2 text-xs font-medium text-center text-white bg-purple-500 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 disabled:opacity-50"
          onClick={() => doSendMessage()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInputBox;
