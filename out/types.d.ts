import * as vscode from 'vscode';
/**
 * Core model information interface with complete metadata
 */
export interface ModelInfo {
    /** Model identifier (e.g., "gpt-4", "claude-3-sonnet") */
    id: string;
    /** Display name for the model */
    name: string;
    /** Model vendor (e.g., "OpenAI", "Anthropic") */
    vendor: string;
    /** Model family (e.g., "gpt-4", "claude-3") */
    family: string;
    /** Model version string */
    version: string;
    /** Maximum input tokens supported */
    maxTokens: number;
    /** Detection accuracy level */
    accuracy: 'Perfect' | 'Available' | 'Cached' | 'Unknown';
    /** Source of detection */
    source: 'chat-context' | 'lm-api' | 'storage' | 'event';
    /** Detection timestamp */
    timestamp: Date;
    /** Additional metadata */
    metadata?: {
        [key: string]: any;
    };
}
/**
 * Model detection result with comprehensive information
 */
export interface ModelDetectionResult {
    /** Successfully detected model info */
    model?: ModelInfo;
    /** Detection was successful */
    success: boolean;
    /** Error message if detection failed */
    error?: string;
    /** Available models from LM API */
    availableModels?: ModelInfo[];
    /** Detection method used */
    method: 'chat-participant' | 'lm-api' | 'command' | 'status-bar' | 'mcp-bridge';
    /** Performance metrics */
    performance: {
        startTime: number;
        endTime: number;
        duration: number;
    };
}
/**
 * Chat participant result metadata
 */
export interface ChatParticipantResult {
    metadata: {
        command?: string;
        modelDetected?: boolean;
        accuracy?: string;
    };
}
/**
 * Model detector service configuration
 */
export interface ModelDetectorConfig {
    /** Enable status bar display */
    enableStatusBar: boolean;
    /** Enable change notifications */
    enableNotifications: boolean;
    /** Maximum history entries to store */
    historyLimit: number;
    /** Auto-detection interval (0 to disable) */
    autoDetectInterval: number;
}
/**
 * Model change event data
 */
export interface ModelChangeEvent {
    /** Previous model (if known) */
    previousModel?: ModelInfo;
    /** Current model */
    currentModel?: ModelInfo;
    /** Change timestamp */
    timestamp: Date;
    /** Change source */
    source: 'user-selection' | 'api-change' | 'extension-startup';
}
/**
 * Status bar item state
 */
export interface StatusBarState {
    /** Current displayed text */
    text: string;
    /** Tooltip content */
    tooltip: string;
    /** Is currently visible */
    visible: boolean;
    /** Last update timestamp */
    lastUpdate: Date;
}
/**
 * Extension context with model detection capabilities
 */
export interface ModelDetectorContext {
    /** VS Code extension context */
    extensionContext: vscode.ExtensionContext;
    /** Model detection service */
    detector: any;
    /** Status bar manager */
    statusBar: any;
    /** Configuration */
    config: ModelDetectorConfig;
}
/**
 * Language model chat interface (extended from VS Code API)
 */
export interface LanguageModelInfo extends vscode.LanguageModelChat {
    /** Additional detection metadata */
    detectionMetadata?: {
        confidence: number;
        lastSeen: Date;
        usageCount: number;
    };
}
/**
 * Detection history entry
 */
export interface DetectionHistoryEntry {
    /** Entry ID */
    id: string;
    /** Detected model information */
    model: ModelInfo;
    /** Detection context */
    context: {
        method: string;
        location: string;
        user: string;
    };
    /** Entry timestamp */
    timestamp: Date;
}
/**
 * Export all types for use throughout the extension
 */
export { vscode };
//# sourceMappingURL=types.d.ts.map