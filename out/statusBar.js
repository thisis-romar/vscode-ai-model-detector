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
exports.StatusBarManager = void 0;
const vscode = __importStar(require("vscode"));
/**
 * Status bar integration for continuous AI model monitoring
 */
class StatusBarManager {
    constructor(detectorService) {
        this.isEnabled = false;
        this.detectorService = detectorService;
        // Create status bar item
        this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100 // Priority - higher numbers = more left
        );
        // Configure status bar item
        this.statusBarItem.command = 'aiModelDetector.showQuickPick';
        this.statusBarItem.tooltip = 'Click for AI Model Detection details';
        // Initialize based on configuration
        this.loadConfiguration();
    }
    /**
     * Initialize status bar based on configuration
     */
    async loadConfiguration() {
        const config = vscode.workspace.getConfiguration('aiModelDetector');
        const enableStatusBar = config.get('enableStatusBar', true);
        if (enableStatusBar) {
            await this.enable();
        }
        else {
            await this.disable();
        }
    }
    /**
     * Enable status bar monitoring
     */
    async enable() {
        if (this.isEnabled) {
            return;
        }
        this.isEnabled = true;
        this.statusBarItem.show();
        // Initial update
        await this.updateModelDisplay();
        // Set up periodic updates
        const config = vscode.workspace.getConfiguration('aiModelDetector');
        const updateInterval = config.get('statusBarUpdateInterval', 5000);
        this.updateInterval = setInterval(async () => {
            await this.updateModelDisplay();
        }, updateInterval);
        console.log('AI Model Detector: Status bar monitoring enabled');
    }
    /**
     * Disable status bar monitoring
     */
    async disable() {
        if (!this.isEnabled) {
            return;
        }
        this.isEnabled = false;
        this.statusBarItem.hide();
        // Clear update interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = undefined;
        }
        console.log('AI Model Detector: Status bar monitoring disabled');
    }
    /**
     * Toggle status bar monitoring
     */
    async toggle() {
        if (this.isEnabled) {
            await this.disable();
        }
        else {
            await this.enable();
        }
        // Update configuration
        const config = vscode.workspace.getConfiguration('aiModelDetector');
        await config.update('enableStatusBar', this.isEnabled, vscode.ConfigurationTarget.Global);
    }
    /**
     * Update the status bar with current model information
     */
    async updateModelDisplay() {
        if (!this.isEnabled) {
            return;
        }
        try {
            // Try to get current model information
            const result = await this.detectorService.detectCurrentModel();
            if (result.success && result.model) {
                this.displayModel(result.model);
            }
            else {
                this.displayError(result.error);
            }
        }
        catch (error) {
            this.displayError(`Detection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Display model information in status bar
     */
    displayModel(model) {
        // Determine icon based on vendor
        const vendorIcon = this.getVendorIcon(model.vendor);
        // Determine accuracy color
        const accuracyIcon = model.accuracy === 'Perfect' ? '✅' :
            model.accuracy === 'Available' ? '🔍' :
                model.accuracy === 'Cached' ? '💾' : '❓';
        // Create display text
        const displayText = `${vendorIcon} ${model.name}`;
        // Update status bar
        this.statusBarItem.text = displayText;
        this.statusBarItem.tooltip = this.createTooltip(model);
        this.statusBarItem.backgroundColor = undefined; // Normal color
        this.statusBarItem.color = undefined; // Normal color
    }
    /**
     * Display error state in status bar
     */
    displayError(error) {
        this.statusBarItem.text = `❌ AI Model`;
        this.statusBarItem.tooltip = `AI Model Detection Error: ${error || 'Unknown error'}`;
        this.statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        this.statusBarItem.color = new vscode.ThemeColor('statusBarItem.errorForeground');
    }
    /**
     * Get appropriate icon for AI vendor
     */
    getVendorIcon(vendor) {
        const vendorLower = vendor.toLowerCase();
        if (vendorLower.includes('openai') || vendorLower.includes('gpt')) {
            return '🤖'; // OpenAI/GPT
        }
        else if (vendorLower.includes('anthropic') || vendorLower.includes('claude')) {
            return '🔮'; // Anthropic/Claude
        }
        else if (vendorLower.includes('google') || vendorLower.includes('gemini')) {
            return '🧠'; // Google/Gemini
        }
        else if (vendorLower.includes('microsoft') || vendorLower.includes('copilot')) {
            return '🚀'; // Microsoft/Copilot
        }
        else if (vendorLower.includes('meta') || vendorLower.includes('llama')) {
            return '🦙'; // Meta/LLaMA
        }
        else {
            return '🎯'; // Generic AI
        }
    }
    /**
     * Create detailed tooltip for status bar item
     */
    createTooltip(model) {
        const lines = [
            `AI Model: ${model.name}`,
            `Vendor: ${model.vendor}`,
            `Family: ${model.family}`,
            `Version: ${model.version}`,
            `Max Tokens: ${model.maxTokens.toLocaleString()}`,
            ``,
            `Accuracy: ${model.accuracy}`,
            `Source: ${model.source}`,
            `Last Updated: ${model.timestamp.toLocaleString()}`,
            ``,
            `Click for detailed information and controls`
        ];
        return lines.join('\n');
    }
    /**
     * Show quick pick with model information and actions
     */
    async showQuickPick() {
        try {
            // Get current model information
            const result = await this.detectorService.detectCurrentModel();
            if (!result.success || !result.model) {
                vscode.window.showErrorMessage(`AI Model Detection failed: ${result.error}`);
                return;
            }
            const model = result.model;
            // Create quick pick items
            const items = [
                {
                    label: `$(info) Current Model: ${model.name}`,
                    description: `${model.vendor} - ${model.family} v${model.version}`,
                    detail: `Accuracy: ${model.accuracy} | Max Tokens: ${model.maxTokens.toLocaleString()}`
                },
                {
                    label: `$(refresh) Refresh Detection`,
                    description: 'Force a new model detection',
                    detail: 'Updates model information from all available sources'
                },
                {
                    label: `$(history) Show Detection History`,
                    description: 'View previous model detections',
                    detail: 'Shows chronological history of detected models'
                },
                {
                    label: `$(settings-gear) Open Settings`,
                    description: 'Configure AI Model Detector',
                    detail: 'Adjust monitoring intervals and display options'
                },
                {
                    label: this.isEnabled ? `$(eye-closed) Disable Monitoring` : `$(eye) Enable Monitoring`,
                    description: this.isEnabled ? 'Hide status bar item' : 'Show status bar item',
                    detail: 'Toggle continuous model monitoring'
                }
            ];
            // Show quick pick
            const selected = await vscode.window.showQuickPick(items, {
                placeHolder: 'AI Model Detector Actions',
                title: `Current Model: ${model.name} (${model.vendor})`
            });
            // Handle selection
            if (selected) {
                await this.handleQuickPickSelection(selected);
            }
        }
        catch (error) {
            vscode.window.showErrorMessage(`Error showing model information: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Handle quick pick selection
     */
    async handleQuickPickSelection(item) {
        if (item.label.includes('Refresh Detection')) {
            await vscode.commands.executeCommand('aiModelDetector.detect');
        }
        else if (item.label.includes('Detection History')) {
            await vscode.commands.executeCommand('aiModelDetector.showHistory');
        }
        else if (item.label.includes('Open Settings')) {
            await vscode.commands.executeCommand('workbench.action.openSettings', 'aiModelDetector');
        }
        else if (item.label.includes('Disable Monitoring') || item.label.includes('Enable Monitoring')) {
            await this.toggle();
        }
    }
    /**
     * Force update the display
     */
    async forceUpdate() {
        await this.updateModelDisplay();
    }
    /**
     * Dispose of the status bar item and interval
     */
    dispose() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        this.statusBarItem.dispose();
    }
}
exports.StatusBarManager = StatusBarManager;
//# sourceMappingURL=statusBar.js.map