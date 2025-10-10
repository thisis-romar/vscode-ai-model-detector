import * as vscode from 'vscode';
import * as net from 'net';
import { ModelDetectorService } from './modelDetector';
import { ModelDetectionResult, ModelInfo } from './types';

/**
 * IPC Bridge Server for MCP Communication
 * 
 * Provides IPC server functionality to expose VS Code extension's
 * breakthrough Chat Participant API capabilities to MCP server
 */
export class IPCBridgeServer implements vscode.Disposable {
    private server: net.Server | undefined;
    private clients: Set<net.Socket> = new Set();
    private port: number = 0;
    private modelDetector: ModelDetectorService;

    constructor(modelDetector: ModelDetectorService, port?: number) {
        this.modelDetector = modelDetector;
        // Use provided port or default to 0 for system allocation
        this.port = port || 0;
    }

    /**
     * Start IPC server for MCP communication
     */
    async start(): Promise<number> {
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
                } else {
                    reject(new Error('Failed to get server address'));
                }
            });
        });
    }

    /**
     * Handle new client connection
     */
    private handleClientConnection(socket: net.Socket): void {
        this.clients.add(socket);
        console.log(`🔌 MCP client connected (${this.clients.size} total)`);

        socket.on('data', async (data) => {
            try {
                const request = JSON.parse(data.toString());
                const response = await this.handleRequest(request);
                socket.write(JSON.stringify(response) + '\n');
            } catch (error) {
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
    private async handleRequest(request: any): Promise<any> {
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
    private async handleDetectCurrentModel(params: any): Promise<ModelDetectionResult> {
        try {
            // Use the comprehensive detection method that tries all available approaches
            const result = await this.modelDetector.detectCurrentModel();
            
            return {
                ...result,
                method: 'mcp-bridge'
            };
        } catch (error) {
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
    private async handleGetModelCapabilities(params: { modelId: string }): Promise<ModelInfo | null> {
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
        } catch (error) {
            console.error('Failed to get model capabilities:', error);
            return null;
        }
    }

    /**
     * IPC Handler: Start model monitoring
     */
    private async handleStartModelMonitoring(params: { interval: number }): Promise<string> {
        const sessionId = `monitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // For now, we'll use a simple interval to check for model changes
        // In a full implementation, this would integrate with VS Code's model change events
        console.log(`🔄 Started model monitoring session ${sessionId} with ${params.interval}ms interval`);
        
        return sessionId;
    }

    /**
     * IPC Handler: Stop model monitoring
     */
    private async handleStopModelMonitoring(params: { sessionId: string }): Promise<boolean> {
        try {
            console.log(`⏹️ Stopped model monitoring session ${params.sessionId}`);
            return true;
        } catch (error) {
            console.error('Failed to stop monitoring:', error);
            return false;
        }
    }

    /**
     * IPC Handler: Validate model access
     */
    private async handleValidateModelAccess(params: { includeAvailable: boolean }): Promise<ModelDetectionResult> {
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
        } catch (error) {
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
    getConnectionInfo(): { port: number; host: string } {
        return {
            port: this.port,
            host: 'localhost'
        };
    }

    /**
     * Broadcast message to all connected MCP clients
     */
    broadcast(message: any): void {
        const data = JSON.stringify(message) + '\n';
        this.clients.forEach(client => {
            try {
                client.write(data);
            } catch (error) {
                console.error('Failed to broadcast to client:', error);
            }
        });
    }

    /**
     * Dispose of the IPC server
     */
    dispose(): void {
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
    private getCapabilitiesForModel(modelId: string): string[] {
        const capabilities: string[] = ['text-generation'];
        
        // Add model-specific capabilities
        if (modelId.includes('gpt-4')) {
            capabilities.push('vision', 'function-calling', 'json-mode');
        } else if (modelId.includes('claude')) {
            capabilities.push('large-context', 'reasoning');
        } else if (modelId.includes('gemini')) {
            capabilities.push('multimodal', 'fast-inference');
        }
        
        return capabilities;
    }

    /**
     * Helper: Get special features for a specific model
     */
    private getSpecialFeaturesForModel(modelId: string): string[] {
        const features: string[] = [];
        
        if (modelId.includes('gpt-4o')) {
            features.push('omni-modal', 'real-time');
        } else if (modelId.includes('claude-3.5-sonnet')) {
            features.push('coding-expert', 'analysis');
        } else if (modelId.includes('gemini-pro')) {
            features.push('google-search', 'multimodal');
        }
        
        return features;
    }
}
