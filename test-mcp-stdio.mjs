/**
 * MCP Server Stdio Client Test
 * Tests the actual compiled MCP server via stdio communication
 */

import { spawn } from 'child_process';

async function testMCPServer() {
    console.log('🧪 Testing compiled MCP Server...');
    
    try {
        // Spawn the MCP server process
        const serverProcess = spawn('node', ['dist/index.js'], {
            cwd: 'h:\\-EMBLEM-PROJECT(s)-\\Tools\\packages\\vscode-ai-model-detector\\mcp-server',
            stdio: ['pipe', 'pipe', 'pipe']
        });
        
        console.log('🚀 MCP Server process started');
        
        let responseBuffer = '';
        
        // Set up data handler
        serverProcess.stdout.on('data', (data) => {
            responseBuffer += data.toString();
            
            // Check for complete JSON messages
            const lines = responseBuffer.split('\n');
            responseBuffer = lines.pop() || ''; // Keep incomplete line
            
            for (const line of lines) {
                if (line.trim()) {
                    try {
                        const response = JSON.parse(line);
                        console.log('📨 Server response:', JSON.stringify(response, null, 2));
                    } catch (error) {
                        console.log('📝 Server message:', line);
                    }
                }
            }
        });
        
        serverProcess.stderr.on('data', (data) => {
            console.log('🔧 Server stderr:', data.toString());
        });
        
        // Initialize the MCP server
        const initMessage = {
            jsonrpc: "2.0",
            id: 1,
            method: "initialize",
            params: {
                protocolVersion: "2024-11-05",
                capabilities: {},
                clientInfo: {
                    name: "test-client",
                    version: "1.0.0"
                }
            }
        };
        
        console.log('📤 Sending initialize message...');
        serverProcess.stdin.write(JSON.stringify(initMessage) + '\n');
        
        // Wait a bit for initialization
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Send initialized notification
        const initializedMessage = {
            jsonrpc: "2.0",
            method: "notifications/initialized"
        };
        
        console.log('📤 Sending initialized notification...');
        serverProcess.stdin.write(JSON.stringify(initializedMessage) + '\n');
        
        // Test tools/list
        const toolsListMessage = {
            jsonrpc: "2.0",
            id: 2,
            method: "tools/list"
        };
        
        console.log('📤 Requesting tools list...');
        serverProcess.stdin.write(JSON.stringify(toolsListMessage) + '\n');
        
        // Wait for responses
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test detect_current_model tool
        const detectModelMessage = {
            jsonrpc: "2.0",
            id: 3,
            method: "tools/call",
            params: {
                name: "detect_current_model",
                arguments: {}
            }
        };
        
        console.log('📤 Testing detect_current_model tool...');
        serverProcess.stdin.write(JSON.stringify(detectModelMessage) + '\n');
        
        // Wait for tool response
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Test get_model_capabilities tool
        const capabilitiesMessage = {
            jsonrpc: "2.0",
            id: 4,
            method: "tools/call",
            params: {
                name: "get_model_capabilities",
                arguments: {
                    model_name: "gpt-4"
                }
            }
        };
        
        console.log('📤 Testing get_model_capabilities tool...');
        serverProcess.stdin.write(JSON.stringify(capabilitiesMessage) + '\n');
        
        // Wait for final responses
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Clean shutdown
        console.log('🔌 Shutting down MCP server...');
        serverProcess.kill('SIGTERM');
        
        console.log('✅ MCP Server test completed!');
        
    } catch (error) {
        console.error('❌ MCP Server test failed:', error);
    }
}

// Run the test
testMCPServer();
