import * as vscode from 'vscode';
import { ModelDetectorService } from './modelDetector';
import { StatusBarManager } from './statusBar';
import { ChatParticipantHandler } from './chatParticipant';
import { IPCBridgeServer } from './ipcBridge';

/**
 * Main extension activation function
 */
export function activate(context: vscode.ExtensionContext) {
    console.log('🚀 AI Model Detector extension is now active!');
    
    // Initialize core services
    const detectorService = new ModelDetectorService(context);
    const statusBarManager = new StatusBarManager(detectorService);
    
    // 🌉 Initialize IPC Bridge for MCP integration (Phase 3)
    const ipcBridge = new IPCBridgeServer(detectorService, 3001);
    
    // Start IPC bridge asynchronously
    ipcBridge.start().then(port => {
        console.log(`✅ IPC Bridge active on port ${port} - MCP tools available`);
    }).catch(error => {
        console.error('❌ IPC Bridge failed to start:', error);
    });
    
    // Pass IPC bridge to chat participant for hybrid architecture
    const chatParticipant = new ChatParticipantHandler(detectorService, ipcBridge);
    
    // Register chat participant
    const participant = vscode.chat.createChatParticipant('modeldetector', chatParticipant.handleChatRequest.bind(chatParticipant));
    participant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'images', 'icon.png');
    participant.followupProvider = {
        provideFollowups(result: any, context: vscode.ChatContext, token: vscode.CancellationToken) {
            return [
                {
                    prompt: '@modeldetector /detect',
                    label: '🔍 Detect Current Model',
                    command: 'detect'
                },
                {
                    prompt: '@modeldetector /monitor',
                    label: '📊 Enable Monitoring',
                    command: 'monitor'
                }
            ];
        }
    };
    
    // Register commands
    const commands = [
        // Manual detection command
        vscode.commands.registerCommand('aiModelDetector.detect', async () => {
            try {
                const result = await detectorService.detectCurrentModel();
                
                if (result.success && result.model) {
                    const model = result.model;
                    const message = `🎯 **Current AI Model:** ${model.name}\n` +
                                  `**Vendor:** ${model.vendor}\n` +
                                  `**Family:** ${model.family} v${model.version}\n` +
                                  `**Max Tokens:** ${model.maxTokens.toLocaleString()}\n` +
                                  `**Accuracy:** ${model.accuracy} (${model.source})\n` +
                                  `**Detected:** ${model.timestamp.toLocaleString()}`;
                    
                    vscode.window.showInformationMessage(message, { modal: false });
                    
                    // Update status bar
                    await statusBarManager.forceUpdate();
                } else {
                    vscode.window.showWarningMessage(`AI Model Detection failed: ${result.error}`);
                }
            } catch (error) {
                vscode.window.showErrorMessage(`Detection error: ${error instanceof Error ? error.message : 'Unknown error'}`);
            }
        }),
        
        // Status bar toggle command
        vscode.commands.registerCommand('aiModelDetector.toggleStatusBar', async () => {
            await statusBarManager.toggle();
            
            const config = vscode.workspace.getConfiguration('aiModelDetector');
            const isEnabled = config.get<boolean>('enableStatusBar', true);
            
            vscode.window.showInformationMessage(
                `Status bar monitoring ${isEnabled ? 'enabled' : 'disabled'}`
            );
        }),
        
        // Show quick pick command
        vscode.commands.registerCommand('aiModelDetector.showQuickPick', async () => {
            await statusBarManager.showQuickPick();
        }),
        
        // Show detection history command
        vscode.commands.registerCommand('aiModelDetector.showHistory', async () => {
            const history = detectorService.getDetectionHistory();
            
            if (history.length === 0) {
                vscode.window.showInformationMessage('No detection history available');
                return;
            }
            
            // Create webview to show history
            const panel = vscode.window.createWebviewPanel(
                'aiModelHistory',
                'AI Model Detection History',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            
            panel.webview.html = generateHistoryHTML(history);
        }),
        
        // Configuration commands
        vscode.commands.registerCommand('aiModelDetector.openSettings', () => {
            vscode.commands.executeCommand('workbench.action.openSettings', 'aiModelDetector');
        }),
        
        // Refresh detection command
        vscode.commands.registerCommand('aiModelDetector.refresh', async () => {
            await statusBarManager.forceUpdate();
            vscode.window.showInformationMessage('AI model detection refreshed');
        })
    ];
    
    // Register all commands
    commands.forEach(command => context.subscriptions.push(command));
    
    // Register disposables
    context.subscriptions.push(
        participant,
        statusBarManager,
        detectorService
    );
    
    // Listen for configuration changes
    const configListener = vscode.workspace.onDidChangeConfiguration(async (e: vscode.ConfigurationChangeEvent) => {
        if (e.affectsConfiguration('aiModelDetector')) {
            console.log('AI Model Detector configuration changed');
            
            // Reload status bar based on new configuration
            const config = vscode.workspace.getConfiguration('aiModelDetector');
            const enableStatusBar = config.get<boolean>('enableStatusBar', true);
            
            if (enableStatusBar) {
                await statusBarManager.enable();
            } else {
                await statusBarManager.disable();
            }
        }
    });
    
    context.subscriptions.push(configListener);
    
    // Add IPC bridge to disposables for proper cleanup
    context.subscriptions.push(ipcBridge);
    
    console.log('🎯 AI Model Detector: All components initialized successfully (with MCP bridge)');
}

/**
 * Extension deactivation function
 */
export function deactivate() {
    console.log('🔌 AI Model Detector extension is now deactivated (IPC bridge closed)');
}

/**
 * Generate HTML for detection history webview
 */
function generateHistoryHTML(history: any[]): string {
    const historyRows = history.map(entry => `
        <tr>
            <td>${entry.timestamp.toLocaleString()}</td>
            <td><strong>${entry.model?.name || 'Unknown'}</strong></td>
            <td>${entry.model?.vendor || 'Unknown'}</td>
            <td>${entry.model?.family || 'Unknown'}</td>
            <td><span class="accuracy-${entry.model?.accuracy?.toLowerCase()}">${entry.model?.accuracy || 'Unknown'}</span></td>
            <td>${entry.method || 'Unknown'}</td>
        </tr>
    `).join('');
    
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Model Detection History</title>
            <style>
                body {
                    font-family: var(--vscode-font-family);
                    color: var(--vscode-foreground);
                    background-color: var(--vscode-editor-background);
                    padding: 20px;
                }
                
                h1 {
                    color: var(--vscode-titleBar-activeForeground);
                    border-bottom: 1px solid var(--vscode-titleBar-border);
                    padding-bottom: 10px;
                }
                
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid var(--vscode-panel-border);
                }
                
                th {
                    background-color: var(--vscode-badge-background);
                    color: var(--vscode-badge-foreground);
                    font-weight: bold;
                }
                
                tr:hover {
                    background-color: var(--vscode-list-hoverBackground);
                }
                
                .accuracy-perfect {
                    color: var(--vscode-gitDecoration-addedResourceForeground);
                    font-weight: bold;
                }
                
                .accuracy-available {
                    color: var(--vscode-gitDecoration-modifiedResourceForeground);
                }
                
                .accuracy-cached {
                    color: var(--vscode-gitDecoration-stageModifiedResourceForeground);
                }
                
                .summary {
                    background-color: var(--vscode-textBlockQuote-background);
                    border-left: 4px solid var(--vscode-textBlockQuote-border);
                    padding: 15px;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h1>🎯 AI Model Detection History</h1>
            
            <div class="summary">
                <strong>Total Detections:</strong> ${history.length}<br>
                <strong>Last Detection:</strong> ${history[0]?.timestamp?.toLocaleString() || 'Never'}<br>
                <strong>Current Model:</strong> ${history[0]?.model?.name || 'Unknown'}
            </div>
            
            <table>
                <thead>
                    <tr>
                        <th>Timestamp</th>
                        <th>Model Name</th>
                        <th>Vendor</th>
                        <th>Family</th>
                        <th>Accuracy</th>
                        <th>Method</th>
                    </tr>
                </thead>
                <tbody>
                    ${historyRows}
                </tbody>
            </table>
        </body>
        </html>
    `;
}
