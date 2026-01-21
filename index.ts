#!/usr/bin/env node
/**
 * LangChain Anthropic MCP Server
 * 
 * Exposes LangChain capabilities as MCP tools:
 * - Supabase vector store setup
 * - RAG chain creation
 * - Document ingestion
 * - Vector search
 * - Claude integration
 * 
 * Use this MCP server in Cursor to quickly set up LangChain
 * features in any project.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Initialize server
const server = new Server(
  {
    name: "langchain-anthropic-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

/**
 * List available LangChain tools
 */
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "setup_supabase_vectorstore",
      description: "Generate code to set up Supabase as a vector store with LangChain. Returns TypeScript code ready to use.",
      inputSchema: {
        type: "object",
        properties: {
          project_name: {
            type: "string",
            description: "Name of the project",
          },
          table_name: {
            type: "string",
            description: "Name of the vector table in Supabase",
            default: "documents",
          },
          embedding_model: {
            type: "string",
            description: "Embedding model to use",
            enum: ["text-embedding-004", "text-embedding-3-small", "text-embedding-3-large"],
            default: "text-embedding-004",
          },
          dimension: {
            type: "number",
            description: "Vector dimension (768 for Gemini, 1536 for OpenAI)",
            default: 768,
          },
        },
        required: ["project_name"],
      },
    },
    {
      name: "create_rag_chain",
      description: "Generate a complete RAG chain with LangChain and Anthropic Claude. Returns TypeScript implementation.",
      inputSchema: {
        type: "object",
        properties: {
          vectorstore_type: {
            type: "string",
            description: "Type of vector store",
            enum: ["supabase", "pinecone", "chroma", "in-memory"],
            default: "supabase",
          },
          claude_model: {
            type: "string",
            description: "Claude model to use",
            enum: ["claude-haiku-4-5-20251001", "claude-sonnet-4-5-20250929", "claude-opus-4-5-20250929"],
            default: "claude-sonnet-4-5-20250929",
          },
          retriever_k: {
            type: "number",
            description: "Number of documents to retrieve",
            default: 5,
          },
          enable_caching: {
            type: "boolean",
            description: "Enable prompt caching (90% cost savings)",
            default: true,
          },
        },
        required: [],
      },
    },
    {
      name: "generate_document_ingestion",
      description: "Generate code for ingesting documents into a vector store with chunking and embedding.",
      inputSchema: {
        type: "object",
        properties: {
          source_type: {
            type: "string",
            description: "Type of documents to ingest",
            enum: ["markdown", "pdf", "text", "json", "csv"],
            default: "markdown",
          },
          chunk_size: {
            type: "number",
            description: "Chunk size in characters",
            default: 1000,
          },
          chunk_overlap: {
            type: "number",
            description: "Overlap between chunks",
            default: 200,
          },
          embedding_model: {
            type: "string",
            description: "Embedding model",
            default: "text-embedding-004",
          },
        },
        required: ["source_type"],
      },
    },
    {
      name: "create_conversational_rag",
      description: "Generate a conversational RAG system with memory that maintains context across multiple queries.",
      inputSchema: {
        type: "object",
        properties: {
          memory_type: {
            type: "string",
            description: "Type of conversation memory",
            enum: ["buffer", "summary", "buffer-window"],
            default: "buffer",
          },
          claude_model: {
            type: "string",
            description: "Claude model",
            default: "claude-sonnet-4-5-20250929",
          },
        },
        required: [],
      },
    },
    {
      name: "setup_hybrid_search",
      description: "Generate hybrid search setup combining vector similarity and keyword search (BM25).",
      inputSchema: {
        type: "object",
        properties: {
          vector_weight: {
            type: "number",
            description: "Weight for vector search (0-1)",
            default: 0.7,
          },
          keyword_weight: {
            type: "number",
            description: "Weight for keyword search (0-1)",
            default: 0.3,
          },
        },
        required: [],
      },
    },
    {
      name: "create_multi_query_retriever",
      description: "Generate a multi-query retriever that generates multiple search queries for better recall.",
      inputSchema: {
        type: "object",
        properties: {
          num_queries: {
            type: "number",
            description: "Number of query variations to generate",
            default: 3,
          },
        },
        required: [],
      },
    },
    {
      name: "setup_extended_thinking",
      description: "Generate code for extended thinking mode with Claude for complex reasoning tasks.",
      inputSchema: {
        type: "object",
        properties: {
          thinking_budget: {
            type: "number",
            description: "Token budget for thinking",
            default: 8000,
          },
          complexity_threshold: {
            type: "number",
            description: "Complexity score threshold to enable thinking (0-100)",
            default: 60,
          },
        },
        required: [],
      },
    },
    {
      name: "generate_package_setup",
      description: "Generate package.json dependencies and setup instructions for LangChain with Anthropic.",
      inputSchema: {
        type: "object",
        properties: {
          features: {
            type: "array",
            description: "Features to include",
            items: {
              type: "string",
              enum: ["supabase", "pdf", "csv", "streaming", "caching"],
            },
          },
        },
        required: [],
      },
    },
  ],
}));

// ... rest of implementation truncated for brevity ...