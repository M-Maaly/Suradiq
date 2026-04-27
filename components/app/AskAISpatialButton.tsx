"use client";

import { Ruler, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatActions } from "@/lib/store/chat-store-provider";

interface AskAISpatialButtonProps {
  productName: string;
  dimensions?: string;
}

export function AskAISpatialButton({ productName, dimensions }: AskAISpatialButtonProps) {
  const { openChatWithMessage } = useChatActions();

  const handleClick = () => {
    const dimensionInfo = dimensions ? ` (Dimensions: ${dimensions})` : "";
    openChatWithMessage(`I'm interested in the "${productName}"${dimensionInfo}. Can you help me figure out if this is suitable for my space and if the volume/size fits my room?`);
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="w-full gap-2 border-zinc-200 bg-white text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
    >
      <Ruler className="h-4 w-4 text-amber-500" />
      <span className="flex items-center gap-1.5">
        AI Fit & Space Guide
        <Sparkles className="h-3 w-3 text-amber-400" />
      </span>
    </Button>
  );
}
