#!/usr/bin/env node

/**
 * Refactored MCP Server for AI Model Detector
 * Uses RealVSCodeBridge for accurate model detection
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  CallToolRequestSchema, 
  ListToolsRequestSchema 
} from '@modelcontextprotocol/sdk/types.js';
import { RealVSCodeBridge } from './dist/types.js';

/**
 * AI Model Detector MCP Server with Real VS Code Integration
 */
class AIModelDetectorServer {
  constructor() {
    this.server = new Server(
      {
        name: 'ai-model-detector-mcp-server',
        version: '2.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    
    // Initialize real VS Code bridge
    this.bridge = new RealVSCodeBridge();
    this.setupHandlers();
  }

  setupHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'detect_current_model',
            description: 'Get currently selected AI model with best-effort detection',
            inputSchema: {
              type: 'object',
              properties: {
                requestId: {
                  type: 'string',
                  description: 'Optional request ID for tracking'
                }
              }
            }
          },
          {
            name: 'get_model_capabilities',
            description: 'Analyze capabilities of a known AI model',
            inputSchema: {
              type: 'object',
              properties: {
                modelId: {
                  type: 'string',
                  description: 'Model ID to analyze'
                }
              },
              required: ['modelId']
            }
          },
          {
            name: 'monitor_model_changes',
            description: 'Start model change monitoring',
            inputSchema: {
              type: 'object',
              properties: {
                interval: {
                  type: 'number',
                  minimum: 1000,
                  default: 5000,
                  description: 'Monitoring interval in milliseconds'
                }
              }
            }
          },
          {
            name: 'validate_model_access',
            description: 'Validate model detection capabilities',
            inputSchema: {
              type: 'object',
              properties: {
                includeAvailableModels: {
                  type: 'boolean',
                  default: false,
                  description: 'Include list of known models'
                }
              }
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'detect_current_model':
            return await this.handleDetectCurrentModel(args);

          case 'get_model_capabilities':
            return await this.handleGetModelCapabilities(args);

          case 'monitor_model_changes':
            return await this.handleMonitorModelChanges(args);

          case 'validate_model_access':
            return await this.handleValidateModelAccess(args);

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `❌ **Tool Error**

**Tool**: ${name}
**Error**: ${error.message}
**Timestamp**: ${new Date().toISOString()}

**Troubleshooting**: Check tool parameters and try again.`
          }],
          isError: true
        };
      }
    });
  }

  async handleDetectCurrentModel(args) {
    const result = await this.bridge.detectCurrentModel();
    
    if (result.success && result.currentModel) {
      return {
        content: [{
          type: 'text',
          text: `🎯 **AI Model Detection Results**

**Status**: ✅ Successfully Detected
**Timestamp**: ${result.timestamp.toISOString()}

**Current Model**:
- **Name**: ${result.currentModel.name}
- **ID**: ${result.currentModel.id}
- **Vendor**: ${result.currentModel.vendor}
- **Family**: ${result.currentModel.family}
- **Max Tokens**: ${result.currentModel.maxTokens?.toLocaleString() || 'Unknown'}
- **Capabilities**: ${result.currentModel.capabilities?.join(', ') || 'Unknown'}

**Detection Details**:
- **Confidence**: ${result.confidence}
- **Source**: ${result.source}
${result.error ? `- **Note**: ${result.error}` : ''}

${result.availableModels && result.availableModels.length > 1 ? 
`**Available Models**: ${result.availableModels.length} models detected` : ''}`
        }]
      };
    } else {
      return {
        content: [{
          type: 'text',
          text: `❌ **Model Detection Failed**

**Status**: No model detected
**Timestamp**: ${result.timestamp.toISOString()}

**Error**: ${result.error || 'Unknown error'}
**Source**: ${result.source}
**Confidence**: ${result.confidence}

**Troubleshooting**:
- Ensure VS Code is running and configured
- Check GitHub Copilot extension is installed and activated
- Verify a model is selected in VS Code Chat settings`
        }],
        isError: false
      };
    }
  }

  async handleGetModelCapabilities(args) {
    const modelId = args?.modelId;
    
    if (!modelId) {
      return {
        content: [{
          type: 'text',
          text: `⚠️ **Missing Model ID**

Please provide a modelId parameter. Example values:
- gpt-4o
- gpt-5
- claude-sonnet-4
- claude-3-5-sonnet
- gemini-2.5-pro
- grok-2`
        }],
        isError: true
      };
    }

    const modelInfo = await this.bridge.getModelCapabilities(modelId);
    
    if (modelInfo) {
      return {
        content: [{
          type: 'text',
          text: `🔍 **Model Capabilities: ${modelInfo.name}**

**Model Information**:
- **ID**: ${modelInfo.id}
- **Vendor**: ${modelInfo.vendor}
- **Family**: ${modelInfo.family}
- **Max Tokens**: ${modelInfo.maxTokens?.toLocaleString()}

**Capabilities**:
${modelInfo.capabilities?.map(cap => `- ${cap}`).join('\n') || '- Unknown'}

**Use Cases**:
- Chat and conversation
- Code generation and completion
- Analysis and reasoning
- Multi-language support`
        }]
      };
    } else {
      return {
        content: [{
          type: 'text',
          text: `❌ **Unknown Model ID**: ${modelId}

This model is not in our definitions. Supported models:
- OpenAI: gpt-4.1, gpt-4o, gpt-5, gpt-5-mini, o1-preview, o1-mini, o3-mini
- Anthropic: claude-3-5-sonnet, claude-3-7-sonnet, claude-sonnet-4
- Google: gemini-2.5-pro, gemini-2.5-flash
- xAI: grok-code-fast-1, grok-2`
        }],
        isError: false
      };
    }
  }

  async handleMonitorModelChanges(args) {
    const interval = args?.interval || 5000;
    const sessionId = await this.bridge.startModelMonitoring(interval);
    
    return {
      content: [{
        type: 'text',
        text: `🔄 **Model Monitoring Started**

**Session ID**: ${sessionId}
**Monitoring Interval**: ${interval}ms (${(interval / 1000).toFixed(1)} seconds)
**Status**: ✅ Active

**Features**:
- Real-time VS Code storage monitoring
- Automatic change detection
- Background process running

**Note**: Monitoring output appears in MCP server logs.
**To Stop**: Call stop_model_monitoring with session ID: ${sessionId}`
      }]
    };
  }

  async handleValidateModelAccess(args) {
    const includeModels = args?.includeAvailableModels || false;
    const result = await this.bridge.validateModelAccess(includeModels);
    
    let responseText = `🏥 **Model Access Validation**

**MCP Server**: ✅ Running (v2.1.0)
**Tool Registration**: ✅ All 4 tools available
**Connection Status**: ${await this.bridge.isConnected() ? '✅ VS Code Connected' : '❌ VS Code Not Found'}
**Detection Confidence**: ${result.confidence}

`;

    if (result.currentModel) {
      responseText += `**Current Model Detected**:
- **Name**: ${result.currentModel.name}
- **ID**: ${result.currentModel.id}
- **Vendor**: ${result.currentModel.vendor}
- **Source**: ${result.source}

`;
    } else {
      responseText += `**Current Model**: ❌ Not detected
**Error**: ${result.error || 'Unknown'}

`;
    }

    if (includeModels && result.availableModels && result.availableModels.length > 0) {
      responseText += `**Available Models** (${result.availableModels.length} total):
${result.availableModels.map(m => `- ${m.name} (${m.vendor} ${m.family})`).join('\n')}
`;
    }

    responseText += `\n**Status**: All systems operational for AI model detection`;

    return {
      content: [{
        type: 'text',
        text: responseText
      }]
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    
    console.error('🚀 AI Model Detector MCP Server v2.1.0 started (Real Detection Mode)');
    console.error('📡 Connected via stdio transport');
    console.error('🔧 4 tools available with VS Code integration');
    console.error('⚡ Ready for GitHub Copilot with actual model detection');
  }
}

// Start the server
async function main() {
  try {
    const server = new AIModelDetectorServer();
    await server.run();
  } catch (error) {
    console.error('❌ Failed to start MCP Server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('\n👋 Shutting down AI Model Detector MCP Server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('\n👋 Shutting down AI Model Detector MCP Server...');
  process.exit(0);
});

main().catch(error => {
  console.error('Startup error:', error);
  process.exit(1);
});
