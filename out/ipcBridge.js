"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IPCBridgeServer = void 0;
const net = __importStar(require("net"));
/**
 * IPC Bridge Server for MCP Communication
 *
 * Provides IPC server functionality to expose VS Code extension's
 * breakthrough Chat Participant API capabilities to MCP server
 */
class IPCBridgeServer {
    constructor(modelDetector, port) {
        this.clients = new Set();
        this.port = 0;
        this.modelDetector = modelDetector;
        // Use provided port or default to 0 for system allocation
        this.port = port || 0;
    }
    /**
     * Start IPC server for MCP communication
     */
    async start() {
        return new Promise((resolve, reject) => {
            this.server = net.createServer((socket) => {
                this.handleClientConnection(socket);
            });
            this.server.on('error', (error) => {
                console.error('IPC Bridge Server error:', error);
                reject(error);
            });
            // Listen on specified port (or 0 for system allocation)
            this.server.listen(this.port, 'localhost', () => {
                const address = this.server?.address();
                if (address && typeof address === 'object') {
                    this.port = address.port;
                    console.log(`🔗 IPC Bridge Server started on port ${this.port}`);
                    resolve(this.port);
                }
                else {
                    reject(new Error('Failed to get server address'));
                }
            });
        });
    }
    /**
     * Handle new client connection
     */
    handleClientConnection(socket) {
        this.clients.add(socket);
        console.log(`🔌 MCP client connected (${this.clients.size} total)`);
        socket.on('data', async (data) => {
            try {
                const request = JSON.parse(data.toString());
                const response = await this.handleRequest(request);
                socket.write(JSON.stringify(response) + '\n');
            }
            catch (error) {
                const errorResponse = {
                    success: false,
                    error: error instanceof Error ? error.message : 'Unknown error'
                };
                socket.write(JSON.stringify(errorResponse) + '\n');
            }
        });
        socket.on('close', () => {
            this.clients.delete(socket);
            console.log(`📵 MCP client disconnected (${this.clients.size} remaining)`);
        });
        socket.on('error', (error) => {
            console.error('IPC client error:', error);
            this.clients.delete(socket);
        });
    }
    /**
     * Handle IPC requests from MCP server
     */
    async handleRequest(request) {
        const { method, params } = request;
        switch (method) {
            case 'detectCurrentModel':
                return await this.handleDetectCurrentModel(params);
            case 'getModelCapabilities':
                return await this.handleGetModelCapabilities(params);
            case 'startModelMonitoring':
                return await this.handleStartModelMonitoring(params);
            case 'stopModelMonitoring':
                return await this.handleStopModelMonitoring(params);
            case 'validateModelAccess':
                return await this.handleValidateModelAccess(params);
            case 'isConnected':
                return { connected: true, port: this.port, clients: this.clients.size };
            default:
                throw new Error(`Unknown method: ${method}`);
        }
    }
    /**
     * IPC Handler: Detect current model using existing detection methods
     */
    async handleDetectCurrentModel(params) {
        try {
            // Use the comprehensive detection method that tries all available approaches
            const result = await this.modelDetector.detectCurrentModel();
            return {
                ...result,
                method: 'mcp-bridge'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Detection failed',
                method: 'mcp-bridge',
                performance: {
                    startTime: Date.now(),
                    endTime: Date.now(),
                    duration: 1
                }
            };
        }
    }
    /**
     * IPC Handler: Get model capabilities
     */
    async handleGetModelCapabilities(params) {
        try {
            // Get available models and find the requested one
            const lmResult = await this.modelDetector.detectFromLMAPI();
            if (lmResult.availableModels) {
                const foundModel = lmResult.availableModels.find(m => m.id === params.modelId);
                if (foundModel) {
                    // Enhance with capabilities metadata
                    return {
                        ...foundModel,
                        metadata: {
                            ...foundModel.metadata,
                            capabilities: this.getCapabilitiesForModel(params.modelId),
                            specialFeatures: this.getSpecialFeaturesForModel(params.modelId)
                        }
                    };
                }
            }
            return null;
        }
        catch (error) {
            console.error('Failed to get model capabilities:', error);
            return null;
        }
    }
    /**
     * IPC Handler: Start model monitoring
     */
    async handleStartModelMonitoring(params) {
        const sessionId = `monitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        // For now, we'll use a simple interval to check for model changes
        // In a full implementation, this would integrate with VS Code's model change events
        console.log(`🔄 Started model monitoring session ${sessionId} with ${params.interval}ms interval`);
        return sessionId;
    }
    /**
     * IPC Handler: Stop model monitoring
     */
    async handleStopModelMonitoring(params) {
        try {
            console.log(`⏹️ Stopped model monitoring session ${params.sessionId}`);
            return true;
        }
        catch (error) {
            console.error('Failed to stop monitoring:', error);
            return false;
        }
    }
    /**
     * IPC Handler: Validate model access
     */
    async handleValidateModelAccess(params) {
        try {
            // Use the existing detection method to validate access
            const result = await this.modelDetector.detectCurrentModel();
            if (params.includeAvailable) {
                // Get available models from LM API
                const lmResult = await this.modelDetector.detectFromLMAPI();
                if (lmResult.availableModels) {
                    result.availableModels = lmResult.availableModels;
                }
            }
            return {
                ...result,
                method: 'mcp-bridge'
            };
        }
        catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Validation failed',
                method: 'mcp-bridge',
                performance: {
                    startTime: Date.now(),
                    endTime: Date.now(),
                    duration: 1
                }
            };
        }
    }
    /**
     * Get IPC connection details for MCP server configuration
     */
    getConnectionInfo() {
        return {
            port: this.port,
            host: 'localhost'
        };
    }
    /**
     * Broadcast message to all connected MCP clients
     */
    broadcast(message) {
        const data = JSON.stringify(message) + '\n';
        this.clients.forEach(client => {
            try {
                client.write(data);
            }
            catch (error) {
                console.error('Failed to broadcast to client:', error);
            }
        });
    }
    /**
     * Dispose of the IPC server
     */
    dispose() {
        if (this.server) {
            this.clients.forEach(client => client.destroy());
            this.clients.clear();
            this.server.close();
            console.log('🔌 IPC Bridge Server disposed');
        }
    }
    /**
     * Helper: Get capabilities for a specific model
     */
    getCapabilitiesForModel(modelId) {
        const capabilities = ['text-generation'];
        // Add model-specific capabilities
        if (modelId.includes('gpt-4')) {
            capabilities.push('vision', 'function-calling', 'json-mode');
        }
        else if (modelId.includes('claude')) {
            capabilities.push('large-context', 'reasoning');
        }
        else if (modelId.includes('gemini')) {
            capabilities.push('multimodal', 'fast-inference');
        }
        return capabilities;
    }
    /**
     * Helper: Get special features for a specific model
     */
    getSpecialFeaturesForModel(modelId) {
        const features = [];
        if (modelId.includes('gpt-4o')) {
            features.push('omni-modal', 'real-time');
        }
        else if (modelId.includes('claude-3.5-sonnet')) {
            features.push('coding-expert', 'analysis');
        }
        else if (modelId.includes('gemini-pro')) {
            features.push('google-search', 'multimodal');
        }
        return features;
    }
}
exports.IPCBridgeServer = IPCBridgeServer;
//# sourceMappingURL=ipcBridge.js.map