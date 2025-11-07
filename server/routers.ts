import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { invokeLLM } from "./_core/llm";
import { createLead, createChatConversation, createChatMessage, getChatMessages, getChatConversationBySessionId, getLeads } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Chatbot router
  chatbot: router({
    // Send a message to the chatbot and get a response
    sendMessage: publicProcedure
      .input(
        z.object({
          sessionId: z.string(),
          message: z.string(),
          userInfo: z.object({
            name: z.string().optional(),
            email: z.string().optional(),
          }).optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          // Get or create conversation
          let conversation = await getChatConversationBySessionId(input.sessionId);
          
          if (!conversation) {
            await createChatConversation({
              sessionId: input.sessionId,
              status: "active",
            });
            conversation = await getChatConversationBySessionId(input.sessionId);
          }

          if (!conversation) {
            throw new Error("Failed to create conversation");
          }

          // Get chat history
          const messages = await getChatMessages(conversation.id);

          // Create system prompt for lead qualification
          const systemPrompt = `You are a helpful AI assistant for Agri Brazil Success, an agricultural investment platform. 
Your role is to:
1. Help potential investors understand our services and investment opportunities
2. Qualify leads by asking about their investment interests, budget, and timeline
3. Provide information about grain market trends, risk management, and sustainability initiatives
4. Be professional, friendly, and informative

When you have gathered enough information (name, email, investment type, budget, timeline), 
summarize what you've learned and ask if they would like to proceed with a consultation.

Keep responses concise and focused on the conversation.`;

          // Build message history for LLM
          const llmMessages: Array<{ role: "system" | "user" | "assistant" | "tool" | "function", content: string }> = [
            { role: "system", content: systemPrompt },
            ...messages.map(m => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
            { role: "user", content: input.message },
          ];

          // Call LLM
          const response = await invokeLLM({
            messages: llmMessages,
          });

          const assistantMessage = response.choices[0]?.message?.content || "I apologize, I could not process that. Please try again.";

          // Ensure assistantMessage is a string
          const messageContent = typeof assistantMessage === "string" ? assistantMessage : JSON.stringify(assistantMessage);

          // Save user message
          await createChatMessage({
            conversationId: conversation.id,
            role: "user",
            content: input.message,
          });

          // Save assistant message
          await createChatMessage({
            conversationId: conversation.id,
            role: "assistant",
            content: messageContent,
          });

          return {
            success: true,
            response: messageContent,
            conversationId: conversation.id,
          };
        } catch (error) {
          console.error("Chatbot error:", error);
          return {
            success: false,
            response: "I encountered an error. Please try again later.",
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }),

    // Get chat history
    getHistory: publicProcedure
      .input(z.object({ sessionId: z.string() }))
      .query(async ({ input }) => {
        try {
          const conversation = await getChatConversationBySessionId(input.sessionId);
          if (!conversation) {
            return { messages: [] };
          }

          const messages = await getChatMessages(conversation.id);
          return { messages };
        } catch (error) {
          console.error("Error fetching chat history:", error);
          return { messages: [] };
        }
      }),

    // Submit lead information
    submitLead: publicProcedure
      .input(
        z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().optional(),
          projectType: z.string().optional(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
          message: z.string().optional(),
          sessionId: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createLead({
            name: input.name,
            email: input.email,
            phone: input.phone,
            projectType: input.projectType,
            budget: input.budget,
            timeline: input.timeline,
            message: input.message,
            source: "chatbot",
            status: "new",
          });

          return {
            success: true,
            message: "Lead created successfully",
          };
        } catch (error) {
          console.error("Error creating lead:", error);
          return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create lead",
          };
        }
      }),
  }),

  // Leads router (admin only)
  leads: router({
    list: publicProcedure.query(async () => {
      try {
        const leads = await getLeads(100);
        return { success: true, leads };
      } catch (error) {
        console.error("Error fetching leads:", error);
        return { success: false, leads: [] };
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
