import os
import json
from groq import Groq
from typing import List, Dict, Any, Optional
from dotenv import load_dotenv

# Load environment variables from .env.local if present
load_dotenv(".env.local")

class GroqChatManager:
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            print("Warning: GROQ_API_KEY not found. AI Chatbot will not function.")
            self.client = None
            return

        self.client = Groq(api_key=self.api_key)
        self.model = "llama-3.3-70b-versatile"
        
        # Define System Instructions (Prompt Engineering)
        self.system_prompt = """
        You are the official MSU Smart Kiosk Assistant, located at the Management and Science University (MSU) campus. 
        Your goal is to provide students, staff, and visitors with accurate information and helpful services.

        YOUR PERSONALITY:
        - Professional, friendly, and efficient.
        - You use 'we' when referring to MSU.
        - You are tech-savvy and helpful.

        SERVICE SIMULATION (DEMO MODE):
        - If a user asks to rent or borrow a book, inform them that a request for the book has been processed and they can collect it at the Library Counter (Level 5) within 24 hours.
        - if the user requests to book a venue, inform them to come to the Campus & Infrastructure office to fill up a form to book a venue.
        - For campus inquiries (locations, hours, etc.), prioritize using the MSU knowledge base provided in your context.

        CONSTRAINTS:
        - If a user asks for something outside your scope, politely remind them you are a campus assistant.
        - Keep responses concise as you are being displayed on a kiosk screen.
        """
        
        self.chat_history = {} # userId: List of messages
        
        # Load RAG knowledge
        self.knowledge_base = []
        knowledge_path = "data/campus_info.json"
        if os.path.exists(knowledge_path):
            try:
                with open(knowledge_path, "r") as f:
                    self.knowledge_base = json.load(f)
            except Exception as e:
                print(f"Error loading knowledge base: {e}")

    def _get_relevant_context(self, message: str) -> str:
        """Smarter keyword-based context retrieval with weighted scoring."""
        # Common words to ignore for matching
        stop_words = {
            "where", "is", "the", "how", "do", "i", "can", "what", "are", "of", "to", 
            "in", "at", "my", "your", "a", "an", "for", "any", "does", "get", "help", "me"
        }
        
        # Tokenize and filter query
        msg_tokens = set(message.lower().replace('?', '').replace('.', '').split())
        query_keywords = msg_tokens - stop_words
        
        if not query_keywords:
            return ""

        scored_items = []
        for item in self.knowledge_base:
            question_tokens = set(item['question'].lower().replace('?', '').split())
            category_tokens = set(item['category'].lower().split())
            
            # Weighted scoring: 
            # 3 points for exact keyword in question
            # 1 point for exact keyword in category
            score = sum(3 for k in query_keywords if k in question_tokens)
            score += sum(1 for k in query_keywords if k in category_tokens)
            
            if score > 0:
                scored_items.append((score, item))
        
        # Sort by score descending and take ONLY the top 3 most relevant items
        scored_items.sort(key=lambda x: x[0], reverse=True)
        top_matches = [f"Q: {item['question']}\nA: {item['answer']}" for score, item in scored_items[:3]]
        
        if top_matches:
            return "\n\nRelevant MSU Knowledge:\n" + "\n---\n".join(top_matches)
        return ""

    def get_chat_response(self, user_id: str, message: str, user_name: str = "Student") -> str:
        if not self.client:
            return "Error: Groq API Key not configured."

        if user_id not in self.chat_history:
            # Determine user status for the initial prompt
            if not user_id or user_name.lower() == "visitor":
                user_context = f"Hello assistant! my name is {user_name} and I am currently visiting the MSU campus. I don't have a student or staff ID."
            else:
                user_context = f"Hello assistant! my name is {user_name} and my ID is {user_id}. If my ID begins with the letter 'S' it means I am a staff member. Do not explain to me that I am a student or staff member. You should only say my name when it is necessary such as when greeting me or when it is about me, use my name more than my ID unless it is requested."

            self.chat_history[user_id] = [
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": f"{user_context} Please address me with respect and help me with my campus inquiries."}
            ]

        # Get relevant context from knowledge base
        knowledge_context = self._get_relevant_context(message)
        enhanced_message = message + knowledge_context
        print(enhanced_message)

        self.chat_history[user_id].append({"role": "user", "content": enhanced_message})

        # Prune history to limit tokens: System (0) + Context (1) + Last 3 messages
        if len(self.chat_history[user_id]) > 5:
            self.chat_history[user_id] = [
                self.chat_history[user_id][0], 
                self.chat_history[user_id][1], 
                *self.chat_history[user_id][-3:]
            ]

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=self.chat_history[user_id],
                max_tokens=1024
            )
            
            final_text = response.choices[0].message.content
            # We store the original message in history, not the enhanced one, to keep it clean
            self.chat_history[user_id][-1] = {"role": "user", "content": message}
            self.chat_history[user_id].append({"role": "assistant", "content": final_text})
            return final_text

        except Exception as e:
            print(f"Groq API Error: {e}")
            return "I'm having trouble connecting to the cloud right now."

    def clear_session(self, user_id: str):
        """Explicitly delete the chat history for a user."""
        if user_id in self.chat_history:
            del self.chat_history[user_id]
            print(f"Session cleared for user: {user_id}")

# Global instance
ai_manager = GroqChatManager()
