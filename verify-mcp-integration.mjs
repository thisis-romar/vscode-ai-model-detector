#!/usr/bin/env node

/**
 * Quick MCP Server Verification
 * Test that all 4 AI Model Detector tools are available
 */

import { spawn } from 'child_process';

console.log('🔍 Verifying AI Model Detector MCP Server for GitHub Copilot...');

// Test MCP server startup and tool listing
const serverProcess = spawn('node', ['dist/index.js'], {
    cwd: 'h:\\-EMBLEM-PROJECT(s)-\\Tools\\packages\\vscode-ai-model-detector\\mcp-server',
    stdio: ['pipe', 'pipe', 'pipe']
});

let responseBuffer = '';

serverProcess.stdout.on('data', (data) => {
    responseBuffer += data.toString();
    
    // Process complete JSON lines
    const lines = responseBuffer.split('\n');
    responseBuffer = lines.pop() || '';
    
    for (const line of lines) {
        if (line.trim()) {
            try {
                const response = JSON.parse(line);
                if (response.result && response.result.tools) {
                    console.log('✅ AI Model Detector MCP Tools Available:');
                    response.result.tools.forEach(tool => {
                        console.log(`   🛠️  ${tool.name}: ${tool.description}`);
                    });
                    console.log('\n🎯 MCP Server Ready for GitHub Copilot Integration!');
                    serverProcess.kill();
                    return;
                }
            } catch (e) {
                // Ignore parse errors for non-JSON output
            }
        }
    }
});

serverProcess.stderr.on('data', (data) => {
    console.log('Server info:', data.toString());
});

// Initialize MCP server
const initMessage = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize", 
    params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
            name: "github-copilot-integration-test",
            version: "1.0.0"
        }
    }
};

console.log('📡 Initializing MCP server...');
serverProcess.stdin.write(JSON.stringify(initMessage) + '\n');

// Wait a moment then request tools list
setTimeout(() => {
    const toolsRequest = {
        jsonrpc: "2.0",
        id: 2, 
        method: "tools/list"
    };
    console.log('📋 Requesting available tools...');
    serverProcess.stdin.write(JSON.stringify(toolsRequest) + '\n');
}, 1000);

// Timeout after 5 seconds
setTimeout(() => {
    console.log('⏰ Test timeout - MCP server may need configuration check');
    serverProcess.kill();
    process.exit(1);
}, 5000);
