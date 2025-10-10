/**
 * AI Model Detector MCP Server v2.0.0 - Type Definitions
 * 
 * Real VS Code integration with comprehensive model family detection
 * supporting OpenAI, Anthropic, Google, xAI, and other AI model providers
 * through actual VS Code settings and Chat Participant API integration.
 */

import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import sqlite3 from 'sqlite3';

/**
 * Zod validation schemas for MCP tool inputs
 */
export const DetectCurrentModelSchema = z.object({
  includeConfidence: z.boolean().optional().default(true),
  source: z.enum(['settings', 'runtime', 'both']).optional().default('both')
});

export const GetModelCapabilitiesSchema = z.object({
  modelId: z.string().optional(),
  includeDetails: z.boolean().optional().default(true)
});

export const MonitorModelChangesSchema = z.object({
  interval: z.number().min(1000).max(60000).optional().default(5000),
  duration: z.number().min(5000).max(300000).optional().default(30000)
});

export const ValidateModelAccessSchema = z.object({
  includeAvailableModels: z.boolean().optional().default(false),
  testConnection: z.boolean().optional().default(true)
});

/**
 * Model classification enums
 */
export enum ModelFamily {
  GPT = 'gpt',
  O_SERIES = 'o-series', 
  CLAUDE = 'claude',
  GEMINI = 'gemini',
  GROK = 'grok',
  UNKNOWN = 'unknown'
}

export enum ModelVendor {
  OPENAI = 'OpenAI',
  ANTHROPIC = 'Anthropic', 
  GOOGLE = 'Google',
  XAI = 'xAI',
  UNKNOWN = 'Unknown'
}

export enum ModelCapability {
  CHAT = 'chat',
  CODE_GENERATION = 'code_generation',
  CODE_COMPLETION = 'code_completion',
  ANALYSIS = 'analysis',
  CREATIVE_WRITING = 'creative_writing',
  REASONING = 'reasoning',
  MULTIMODAL = 'multimodal',
  FUNCTION_CALLING = 'function_calling',
  JSON_MODE = 'json_mode'
}

export enum DetectionConfidence {
  HIGH = 'high',
  MEDIUM = 'medium', 
  LOW = 'low',
  NONE = 'none'
}

/**
 * Type definitions matching VS Code extension interfaces
 */
export interface ModelInfo {
  id: string;
  name: string;
  vendor: ModelVendor;
  family: ModelFamily;
  maxTokens: number;
  capabilities: ModelCapability[];
  version?: string;
  accuracy?: string;
  source?: string;
  timestamp?: Date;
  metadata?: {
    capabilities?: ModelCapability[];
    specialFeatures?: string[];
    contextWindow?: string;
    requestId?: string;
  };
}

export interface ModelDefinition extends ModelInfo {
  contextWindow: number;
  supportsChatCompletion: boolean;
  supportsCodeGeneration: boolean;
}

export interface DetectionResult {
  currentModel: ModelDefinition | null;
  confidence: DetectionConfidence;
  timestamp: Date;
  source: string;
  availableModels?: ModelInfo[];
  success: boolean;
  error?: string;
}

export interface ModelDetectionResult {
  currentModel: ModelInfo | null;
  model?: ModelInfo | null; // Legacy support
  confidence: DetectionConfidence;
  timestamp: Date;
  source: string;
  method?: string;
  availableModels?: ModelInfo[];
  success: boolean;
  error?: string;
  performance?: {
    duration: number;
  };
}

/**
 * Communication bridge interface to VS Code extension
 */
export interface VSCodeBridge {
  detectCurrentModel(): Promise<ModelDetectionResult>;
  getModelCapabilities(modelId?: string): Promise<ModelInfo | null>;
  startModelMonitoring(interval: number): Promise<string>;
  stopModelMonitoring(sessionId: string): Promise<boolean>;
  validateModelAccess(includeAvailable: boolean): Promise<ModelDetectionResult>;
  isConnected(): Promise<boolean>;
}

/**
 * Model definitions for all families shown in VS Code model selector
 */
export const MODEL_DEFINITIONS = {
  // OpenAI GPT Series
  'gpt-4.1': { id: 'gpt-4.1', name: 'GPT-4.1', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-4o': { id: 'gpt-4o', name: 'GPT-4o', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-5-mini': { id: 'gpt-5-mini', name: 'GPT-5 mini', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-5': { id: 'gpt-5', name: 'GPT-5', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  
  // OpenAI O-Series  
  'o1-preview': { id: 'o1-preview', name: 'o1-preview', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 128000, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  'o1-mini': { id: 'o1-mini', name: 'o1-mini', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 65536, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  'o3-mini': { id: 'o3-mini', name: 'o3-mini', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 65536, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  
  // Anthropic Claude Series
  'claude-3-5-sonnet': { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'claude-3-7-sonnet': { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'claude-sonnet-4': { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  
  // Google Gemini Series
  'gemini-2.5-pro': { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', vendor: ModelVendor.GOOGLE, family: ModelFamily.GEMINI, maxTokens: 1000000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.MULTIMODAL] },
  'gemini-2.5-flash': { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', vendor: ModelVendor.GOOGLE, family: ModelFamily.GEMINI, maxTokens: 1000000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.MULTIMODAL] },
  
  // xAI Grok Series
  'grok-code-fast-1': { id: 'grok-code-fast-1', name: 'Grok Code Fast 1', vendor: ModelVendor.XAI, family: ModelFamily.GROK, maxTokens: 131072, capabilities: [ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'grok-2': { id: 'grok-2', name: 'Grok 2', vendor: ModelVendor.XAI, family: ModelFamily.GROK, maxTokens: 131072, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] }
};

/**
 * Real VS Code Bridge Implementation
 * 
 * Connects to actual VS Code settings and Chat Participant API
 * for genuine model detection instead of mock responses
 */
export class RealVSCodeBridge implements VSCodeBridge {
  private vsCodeProfilePath: string;
  private settingsFilePath: string;
  private userDataPath: string;
  private monitoringSessions: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    // Find VS Code user data directory
    const userProfile = os.homedir();
    this.userDataPath = path.join(userProfile, 'AppData', 'Roaming', 'Code');
    this.vsCodeProfilePath = path.join(this.userDataPath, 'User');
    this.settingsFilePath = path.join(this.vsCodeProfilePath, 'settings.json');
  }

  /**
   * Read current model from VS Code's APPLICATION storage database
   */
  private async readCurrentModelFromStorage(): Promise<ModelDetectionResult | null> {
    return new Promise((resolve) => {
      try {
        const storagePath = path.join(this.userDataPath, 'User', 'globalStorage', 'state.vscdb');

        if (!fs.existsSync(storagePath)) {
          resolve(null);
          return;
        }

        const db = new sqlite3.Database(storagePath, sqlite3.OPEN_READONLY, (err) => {
          if (err) {
            console.error('Error opening VS Code storage database:', err.message);
            resolve(null);
            return;
          }

          const query = `SELECT key, value FROM ItemTable WHERE key = 'chat.currentLanguageModel.panel'`;

          db.get(query, [], (err, row: any) => {
            db.close();

            if (err) {
              console.error('Error querying storage database:', err.message);
              resolve(null);
              return;
            }

            if (!row || !row.value) {
              resolve(null);
              return;
            }

            const currentModel = row.value as string;
            const modelInfo = this.parseModelIdentifier(currentModel);

            const detectedModelInfo: ModelInfo = {
              id: currentModel,
              name: currentModel,
              vendor: modelInfo.provider === 'anthropic' ? ModelVendor.ANTHROPIC :
                      modelInfo.provider === 'openai' ? ModelVendor.OPENAI :
                      modelInfo.provider === 'google' ? ModelVendor.GOOGLE :
                      modelInfo.provider === 'xai' ? ModelVendor.XAI : ModelVendor.UNKNOWN,
              family: modelInfo.family,
              maxTokens: 100000,
              capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION]
            };

            resolve({
              currentModel: detectedModelInfo,
              confidence: DetectionConfidence.HIGH,
              timestamp: new Date(),
              source: 'storage:panel',
              availableModels: [detectedModelInfo],
              success: true
            });
          });
        });
      } catch (error) {
        console.error('Storage detection error:', error);
        resolve(null);
      }
    });
  }

  /**
   * Parse VS Code model identifier to determine model family
   */
  private parseModelIdentifier(modelIdentifier: string): { family: ModelFamily, provider: string } {
    // Handle different identifier formats:
    // - copilot/claude-sonnet-4 -> Claude family
    // - github.copilot-chat/gpt-4o -> GPT family  
    // - copilot/gpt-4o -> GPT family
    
    const lowerIdentifier = modelIdentifier.toLowerCase();
    
    // Claude models
    if (lowerIdentifier.includes('claude') || lowerIdentifier.includes('sonnet') || lowerIdentifier.includes('haiku') || lowerIdentifier.includes('opus')) {
      return { family: ModelFamily.CLAUDE, provider: 'anthropic' };
    }
    
    // GPT models
    if (lowerIdentifier.includes('gpt') || lowerIdentifier.includes('o1')) {
      return { family: ModelFamily.GPT, provider: 'openai' };
    }
    
    // Gemini models
    if (lowerIdentifier.includes('gemini') || lowerIdentifier.includes('bard')) {
      return { family: ModelFamily.GEMINI, provider: 'google' };
    }
    
    // Grok models
    if (lowerIdentifier.includes('grok')) {
      return { family: ModelFamily.GROK, provider: 'xai' };
    }
    
    // Default to unknown
    return { family: ModelFamily.UNKNOWN, provider: 'unknown' };
  }

  /**
   * Find VS Code user data directory across different OS and installation types
   */
  private findVSCodeUserDataPath(): string | null {
    const userProfile = os.homedir();
    
    // Windows paths to check
    const windowsPaths = [
      path.join(userProfile, 'AppData', 'Roaming', 'Code'),
      path.join(userProfile, 'AppData', 'Roaming', 'Code - Insiders'),
      path.join(userProfile, 'AppData', 'Roaming', 'VSCodium')
    ];

    for (const vscodePath of windowsPaths) {
      if (fs.existsSync(vscodePath)) {
        return vscodePath;
      }
    }

    return null;
  }

  async detectCurrentModel(): Promise<ModelDetectionResult> {
    try {
      const userDataPath = this.findVSCodeUserDataPath();

      if (!userDataPath) {
        return {
          currentModel: null,
          confidence: DetectionConfidence.NONE,
          timestamp: new Date(),
          source: 'storage:panel',
          success: false,
          error: 'VS Code user data path not found'
        };
      }

      // Refresh internal paths in case a non-default installation is active
      this.userDataPath = userDataPath;
      this.vsCodeProfilePath = path.join(this.userDataPath, 'User');
      this.settingsFilePath = path.join(this.vsCodeProfilePath, 'settings.json');

      const storageResult = await this.readCurrentModelFromStorage();
      if (storageResult) {
        return storageResult;
      }

      return {
        currentModel: null,
        confidence: DetectionConfidence.NONE,
        timestamp: new Date(),
        source: 'storage:panel',
        success: false,
        error: 'No chat.currentLanguageModel.panel key found in VS Code storage database'
      };

    } catch (error) {
      return {
        currentModel: null,
        confidence: DetectionConfidence.NONE,
        timestamp: new Date(),
        source: 'error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getModelCapabilities(modelId?: string): Promise<ModelInfo | null> {
    // No default model - require explicit modelId
    if (!modelId) {
      return null;
    }
    
    // Look up model in our definitions
    const modelKey = modelId as keyof typeof MODEL_DEFINITIONS;
    return MODEL_DEFINITIONS[modelKey] || null;
  }

  async startModelMonitoring(interval: number): Promise<string> {
    const sessionId = this.generateRequestId();
    
    const timer = setInterval(async () => {
      await this.detectCurrentModel();
    }, interval);

    this.monitoringSessions.set(sessionId, timer);
    return sessionId;
  }

  async stopModelMonitoring(sessionId: string): Promise<boolean> {
    const timer = this.monitoringSessions.get(sessionId);
    if (timer) {
      clearInterval(timer);
      this.monitoringSessions.delete(sessionId);
      return true;
    }
    return false;
  }

  async validateModelAccess(includeAvailable: boolean): Promise<ModelDetectionResult> {
    // Detect actual current model instead of using fallback
    const currentDetection = await this.detectCurrentModel();
    
    const availableModels = includeAvailable ? [
      MODEL_DEFINITIONS['gpt-4.1'],
      MODEL_DEFINITIONS['gpt-4o'],
      MODEL_DEFINITIONS['gpt-5'],
      MODEL_DEFINITIONS['gpt-5-mini'],
      MODEL_DEFINITIONS['o1-preview'], 
      MODEL_DEFINITIONS['o1-mini'],
      MODEL_DEFINITIONS['o3-mini'],
      MODEL_DEFINITIONS['claude-3-5-sonnet'],
      MODEL_DEFINITIONS['claude-3-7-sonnet'],
      MODEL_DEFINITIONS['claude-sonnet-4'],
      MODEL_DEFINITIONS['gemini-2.5-pro'],
      MODEL_DEFINITIONS['gemini-2.5-flash'],
      MODEL_DEFINITIONS['grok-code-fast-1'],
      MODEL_DEFINITIONS['grok-2']
    ] : undefined;

    return {
      currentModel: currentDetection.currentModel,
      confidence: currentDetection.confidence,
      timestamp: new Date(),
      source: 'validation',
      availableModels,
      success: currentDetection.success,
      error: currentDetection.error
    };
  }

  async isConnected(): Promise<boolean> {
    try {
      return fs.existsSync(this.vsCodeProfilePath);
    } catch {
      return false;
    }
  }

  private generateRequestId(): string {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
