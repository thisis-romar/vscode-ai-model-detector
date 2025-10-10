import * as vscode from 'vscode';
import { ModelDetectorService } from './modelDetector';
/**
 * IPC Bridge Server for MCP Communication
 *
 * Provides IPC server functionality to expose VS Code extension's
 * breakthrough Chat Participant API capabilities to MCP server
 */
export declare class IPCBridgeServer implements vscode.Disposable {
    private server;
    private clients;
    private port;
    private modelDetector;
    constructor(modelDetector: ModelDetectorService, port?: number);
    /**
     * Start IPC server for MCP communication
     */
    start(): Promise<number>;
    /**
     * Handle new client connection
     */
    private handleClientConnection;
    /**
     * Handle IPC requests from MCP server
     */
    private handleRequest;
    /**
     * IPC Handler: Detect current model using existing detection methods
     */
    private handleDetectCurrentModel;
    /**
     * IPC Handler: Get model capabilities
     */
    private handleGetModelCapabilities;
    /**
     * IPC Handler: Start model monitoring
     */
    private handleStartModelMonitoring;
    /**
     * IPC Handler: Stop model monitoring
     */
    private handleStopModelMonitoring;
    /**
     * IPC Handler: Validate model access
     */
    private handleValidateModelAccess;
    /**
     * Get IPC connection details for MCP server configuration
     */
    getConnectionInfo(): {
        port: number;
        host: string;
    };
    /**
     * Broadcast message to all connected MCP clients
     */
    broadcast(message: any): void;
    /**
     * Dispose of the IPC server
     */
    dispose(): void;
    /**
     * Helper: Get capabilities for a specific model
     */
    private getCapabilitiesForModel;
    /**
     * Helper: Get special features for a specific model
     */
    private getSpecialFeaturesForModel;
}
//# sourceMappingURL=ipcBridge.d.ts.map