import * as vscode from 'vscode';
import { ModelDetectorService } from './modelDetector';
import { ChatParticipantResult } from './types';
import { IPCBridgeServer } from './ipcBridge';
/**
 * Chat participant for real-time AI model detection with 100% accuracy
 * Enhanced with MCP integration via IPC bridge
 */
export declare class ChatParticipantHandler {
    private detectorService;
    private ipcBridge?;
    constructor(detectorService: ModelDetectorService, ipcBridge?: IPCBridgeServer);
    /**
     * Handle chat requests for @modeldetector participant
     */
    handleChatRequest(request: vscode.ChatRequest, context: vscode.ChatContext, stream: vscode.ChatResponseStream, token: vscode.CancellationToken): Promise<ChatParticipantResult>;
    /**
     * Handle /detect command for comprehensive model information
     */
    private handleDetectCommand;
    /**
     * Handle /monitor command for continuous monitoring setup
     */
    private handleMonitorCommand;
    /**
     * Handle default detection (no specific command)
     */
    private handleDefaultDetection;
    /**
     * Stream comprehensive model information to chat
     */
    private streamModelInformation;
    /**
     * Stream available models information
     */
    private streamAvailableModels;
}
//# sourceMappingURL=chatParticipant.d.ts.map