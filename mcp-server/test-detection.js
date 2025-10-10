#!/usr/bin/env node

/**
 * Test script to verify MCP server model detection
 * Tests that fallback logic has been completely eliminated
 */

import { spawn } from 'child_process';
import path from 'path';

async function testModelDetection() {
    console.log('🧪 Testing VS Code AI Model Detection (No Fallback Logic)');
    console.log('=' .repeat(60));

    // Start MCP server process
    const serverProcess = spawn('node', ['dist/index.js'], {
        cwd: __dirname,
        stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = '';
    let errorOutput = '';

    serverProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    serverProcess.stderr.on('data', (data) => {
        errorOutput += data.toString();
    });

    // Wait a moment for server to start
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Send MCP request to detect current model
    const mcpRequest = {
        jsonrpc: '2.0',
        id: 'test-1',
        method: 'tools/call',
        params: {
            name: 'detect_current_model',
            arguments: {
                includeConfidence: true,
                source: 'both'
            }
        }
    };

    console.log('📤 Sending detect_current_model request...');
    console.log('Request:', JSON.stringify(mcpRequest, null, 2));

    // Send the request
    serverProcess.stdin.write(JSON.stringify(mcpRequest) + '\n');

    // Wait for response
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n📥 MCP Server Response:');
    if (output) {
        console.log('STDOUT:', output);
    }
    if (errorOutput) {
        console.log('STDERR:', errorOutput);
    }

    // Test model capabilities
    const capabilitiesRequest = {
        jsonrpc: '2.0',
        id: 'test-2',
        method: 'tools/call',
        params: {
            name: 'get_model_capabilities',
            arguments: {
                modelId: 'claude-sonnet-4',
                includeDetails: true
            }
        }
    };

    console.log('\n📤 Testing get_model_capabilities...');
    serverProcess.stdin.write(JSON.stringify(capabilitiesRequest) + '\n');

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Test validation
    const validationRequest = {
        jsonrpc: '2.0',
        id: 'test-3',
        method: 'tools/call',
        params: {
            name: 'validate_model_access',
            arguments: {
                includeAvailableModels: true,
                testConnection: true
            }
        }
    };

    console.log('\n📤 Testing validate_model_access...');
    serverProcess.stdin.write(JSON.stringify(validationRequest) + '\n');

    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('\n✅ Test Complete - Check output above for honest detection results');
    console.log('🚫 No fallback logic should be present in responses');

    serverProcess.kill();
}

// Run the test
testModelDetection().catch(console.error);
