import { useEffect, useState, type RefObject } from "react";

import { useChatbotStore } from "@/stores/zustand/chat";
import type { Conversation } from "@/stores/zustand/chat/types";

interface UseChatbotScrollProps {
  containerRef: RefObject<HTMLDivElement | null>;
  chats: Conversation[];
}

export const useChatbotScroll = ({
  containerRef,
  chats,
}: UseChatbotScrollProps) => {
  const beforeStart = useChatbotStore.use.beforeStart();
  const isStreaming = useChatbotStore.use.isStreaming();
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  useEffect(() => {
    if (isStreaming) {
      const userMessage = document.querySelector(".last-user-message");
      const assistMessage = document.querySelector(".last-assist-message");
      const assistMessageHeight = assistMessage
        ? assistMessage.clientHeight + 24
        : 0; //24px for gap-6
      if (userMessage && containerRef.current) {
        const containerHeight = containerRef.current.clientHeight - 36; //py-4
        const elemHeight = userMessage.clientHeight + assistMessageHeight;
        const spaceNeeded = containerHeight - elemHeight;
        const adjustmentDiv = document.querySelector(
          ".height-adjustment",
        ) as HTMLDivElement;
        if (adjustmentDiv) {
          adjustmentDiv.style.height = `${spaceNeeded > 0 ? spaceNeeded : 0}px`;
        }
      }
    }
  }, [chats, isStreaming]);

  useEffect(() => {
    if (beforeStart) {
      const elem = document.querySelector(".last-user-message");
      if (!elem) return;
      elem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [beforeStart]);

  // Check if the container is scrollable
  const isContainerScrollable = () => {
    if (containerRef.current) {
      return (
        containerRef.current.scrollHeight > containerRef.current.clientHeight
      );
    }
    return false;
  };

  // Check if the user has scrolled to the bottom of the container
  const isAtBottom = () => {
    if (containerRef.current) {
      return (
        containerRef.current.scrollTop +
          containerRef.current.clientHeight +
          50 >=
        containerRef.current.scrollHeight
      );
    }
    return false;
  };

  // Handle scroll event
  const checkScroll = () => {
    if (isContainerScrollable() && !isAtBottom()) {
      setShowScrollBtn(true);
    } else {
      setShowScrollBtn(false);
    }
  };

  // Add scroll event listener to the container
  useEffect(() => {
    checkScroll();
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
    };
  }, [beforeStart]);

  // Scroll to the bottom of the container
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    setTimeout(scrollToBottom, 300);
  }, []);

  // Monitor container height and content changes
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Use MutationObserver to detect changes in the container's content
      const observer = new MutationObserver(() => {
        checkScroll(); // Re-check scrollability after content changes
      });

      // Observe changes to the container's child elements
      observer.observe(container, {
        childList: true,
        subtree: true,
      });

      // Cleanup observer on unmount
      return () => {
        observer.disconnect();
      };
    }
  }, []);

  return {
    scrollToBottom,
    showScrollBtn,
  };
};
