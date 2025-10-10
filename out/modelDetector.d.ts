import * as vscode from 'vscode';
import { ModelInfo, ModelDetectionResult, ModelChangeEvent, DetectionHistoryEntry } from './types';
/**
 * Core model detection service with 100% accuracy through multiple methods
 */
export declare class ModelDetectorService implements vscode.Disposable {
    private context;
    private detectionHistory;
    private currentModel;
    private modelChangeEmitter;
    readonly onModelChange: vscode.Event<ModelChangeEvent>;
    constructor(context: vscode.ExtensionContext);
    /**
     * PRIMARY METHOD: Detect model from chat participant context (100% accurate)
     */
    detectFromChatContext(request: vscode.ChatRequest): Promise<ModelDetectionResult>;
    /**
     * SECONDARY METHOD: Detect available models via LM API
     */
    detectFromLMAPI(): Promise<ModelDetectionResult>;
    /**
     * FALLBACK METHOD: Get cached model from storage
     */
    detectFromStorage(): Promise<ModelDetectionResult>;
    /**
     * LAST RESORT METHOD: Safe JSON parsing from VS Code globalStorage files
     */
    detectFromFileSystem(): Promise<ModelDetectionResult>;
    /**
     * COMPREHENSIVE METHOD: Try all detection methods with fallbacks
     */
    detectCurrentModel(request?: vscode.ChatRequest): Promise<ModelDetectionResult>;
    /**
     * Get current model (cached)
     */
    getCurrentModel(): ModelInfo | undefined;
    /**
     * Get detection history
     */
    getDetectionHistory(): DetectionHistoryEntry[];
    /**
     * Clear detection history
     */
    clearDetectionHistory(): void;
    /**
     * Setup model change event listener
     */
    private setupModelChangeListener;
    /**
     * Handle model change events
     */
    private handleModelChange;
    /**
     * Update current model and persist to storage
     */
    private updateCurrentModel;
    /**
     * Add detection to history
     */
    private addToHistory;
    /**
     * Load detection history from storage
     */
    private loadDetectionHistory;
    /**
     * Generate unique request ID
     */
    private generateRequestId;
    /**
     * Logging utility with configurable output
     */
    private log;
    /**
     * Safely scan directory for model information in JSON files
     */
    private scanDirectoryForModel;
    /**
     * Safely parse model information from a JSON file
     */
    private parseModelFromJsonFile;
    /**
     * Extract model ID from JSON object using multiple strategies
     */
    private extractModelId;
    /**
     * Infer vendor from model ID
     */
    private inferVendor;
    /**
     * Infer model family from model ID
     */
    private inferFamily;
    /**
     * Dispose of the service and clean up resources
     */
    dispose(): void;
}
//# sourceMappingURL=modelDetector.d.ts.map