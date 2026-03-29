import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { createShoppingAgent } from "@/lib/ai/shopping-agent";

export async function POST(request: Request) {
  console.log("[ChatAPI] Request received");
  const { messages }: { messages: UIMessage[] } = await request.json();
  console.log("[ChatAPI] Messages count:", messages.length);
  const lastMsg = messages[messages.length - 1];
  console.log("[ChatAPI] Last message role:", lastMsg?.role);
  // Safely log content regardless of structure
  console.log("[ChatAPI] Last message parts/content:", JSON.stringify(lastMsg && ("parts" in lastMsg ? lastMsg.parts : (lastMsg as any).content)));

  // Get the user's session - userId will be null if not authenticated
  const { userId } = await auth();

  // Create agent with user context (orders tool only available if authenticated)
  const agent = createShoppingAgent({ userId });

  // Map messages to ensure they have the required 'id' and 'parts' arrays for UIMessage validation
  const formattedMessages: UIMessage[] = messages.map((msg: any) => ({
    id: msg.id || Math.random().toString(36).substring(7),
    role: msg.role,
    content: msg.content,
    parts: msg.parts || (msg.content ? [{ type: "text", text: msg.content }] : []),
  }));

  return createAgentUIStreamResponse({
    agent,
    uiMessages: formattedMessages,
  });
}
