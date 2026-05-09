export interface ChatRequest {
  message: string;
  session_id?: string;
}

export interface ChatResponse {
  response: string;
  agent_used: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  agent_used?: string;
}
