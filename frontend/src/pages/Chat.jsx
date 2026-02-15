import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: targetUserId } = useParams();
  const navigate = useNavigate();
  const { authUser } = useAuthUser();
  
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isInitialized = useRef(false);

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken", authUser?._id],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    // Guard checks
    if (isInitialized.current || !tokenData?.token || !authUser || !targetUserId) {
      return;
    }

    // Prevent chatting with yourself
    if (authUser._id === targetUserId) {
      toast.error("You cannot chat with yourself!");
      navigate("/");
      return;
    }

    const initChat = async () => {
      try {
        console.log("Initializing stream chat client...");

        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Disconnect if already connected
        if (client.userID) {
          await client.disconnectUser();
        }

        await client.connectUser(
          {
            id: authUser._id,
            name: authUser.fullName,
            image: authUser.profilePic,
          },
          tokenData.token
        );

        // Create unique channel ID and members
        const channelId = [authUser._id, targetUserId].sort().join("-");
        const members = [...new Set([authUser._id, targetUserId])];

        const currChannel = client.channel("messaging", channelId, {
          members: members,
        });

        await currChannel.watch();

        setChatClient(client);
        setChannel(currChannel);
        isInitialized.current = true;
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    initChat();

    // Cleanup on unmount
    return () => {
      const client = StreamChat.getInstance();
      if (client.userID) {
        client.disconnectUser();
        isInitialized.current = false;
      }
    };
  }, [tokenData, authUser, targetUserId, navigate]);

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;
      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });
      toast.success("Video call link sent successfully!");
    }
  };

  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;