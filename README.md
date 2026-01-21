# LangChain Anthropic MCP Server

🚀 **MCP server that exposes LangChain + Anthropic Claude capabilities as tools** - instantly generate production-ready RAG systems, Supabase vector stores, document ingestion pipelines, and more!

Perfect for use with **Cursor AI** or any MCP client.

## 🚀 Quick Start

### Installation for Cursor

Add to your Cursor `mcp.json`:

```json
{
  "mcpServers": {
    "langchain-anthropic": {
      "command": "npx",
      "args": [
        "-y",
        "spencer-life/langchain-anthropic-mcp-server"
      ],
      "env": {}
    }
  }
}
```

**That's it!** Restart Cursor and start using it.

## 💡 Usage

Once installed, ask your AI assistant:

```
"Use langchain-anthropic to setup a Supabase vector store"
"Use langchain-anthropic to create a RAG chain with Claude Sonnet"
"Use langchain-anthropic to generate PDF document ingestion code"
```

The AI will call the appropriate tool and return complete, production-ready code!

## 🛠️ Available Tools

- ✅ **setup_supabase_vectorstore** - Complete Supabase vector store setup
- ✅ **create_rag_chain** - Full RAG with Claude
- ✅ **generate_document_ingestion** - Document loading & chunking
- ✅ **create_conversational_rag** - RAG with conversation memory
- ✅ **setup_hybrid_search** - Vector + keyword search
- ✅ **create_multi_query_retriever** - Multi-query for better recall
- ✅ **setup_extended_thinking** - Extended thinking configuration
- ✅ **generate_package_setup** - Complete dependencies

## 📝 License

MIT License

**Built with ❤️ for the LangChain and MCP community**
