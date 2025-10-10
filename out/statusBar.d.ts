import { ModelDetectorService } from './modelDetector';
/**
 * Status bar integration for continuous AI model monitoring
 */
export declare class StatusBarManager {
    private statusBarItem;
    private detectorService;
    private updateInterval;
    private isEnabled;
    constructor(detectorService: ModelDetectorService);
    /**
     * Initialize status bar based on configuration
     */
    private loadConfiguration;
    /**
     * Enable status bar monitoring
     */
    enable(): Promise<void>;
    /**
     * Disable status bar monitoring
     */
    disable(): Promise<void>;
    /**
     * Toggle status bar monitoring
     */
    toggle(): Promise<void>;
    /**
     * Update the status bar with current model information
     */
    private updateModelDisplay;
    /**
     * Display model information in status bar
     */
    private displayModel;
    /**
     * Display error state in status bar
     */
    private displayError;
    /**
     * Get appropriate icon for AI vendor
     */
    private getVendorIcon;
    /**
     * Create detailed tooltip for status bar item
     */
    private createTooltip;
    /**
     * Show quick pick with model information and actions
     */
    showQuickPick(): Promise<void>;
    /**
     * Handle quick pick selection
     */
    private handleQuickPickSelection;
    /**
     * Force update the display
     */
    forceUpdate(): Promise<void>;
    /**
     * Dispose of the status bar item and interval
     */
    dispose(): void;
}
//# sourceMappingURL=statusBar.d.ts.map