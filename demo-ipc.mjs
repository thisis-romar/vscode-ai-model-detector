/**
 * Demo script to test the IPC Bridge functionality
 * Tests communication between VS Code extension and MCP server
 */

import { createConnection } from 'net';

const IPC_PORT = 3001;

/**
 * Test IPC Bridge communication
 */
async function testIPCBridge() {
    console.log('🚀 Testing IPC Bridge Communication');
    console.log('===================================');
    
    // Test 1: Connect to IPC server
    console.log('\n1. Connecting to IPC Bridge Server...');
    
    const client = createConnection(IPC_PORT, 'localhost');
    
    return new Promise((resolve, reject) => {
        let responseData = '';
        
        client.on('connect', () => {
            console.log('✅ Connected to IPC Bridge Server');
            
            // Test 2: Send detect current model request
            console.log('\n2. Testing detect_current_model...');
            const request = JSON.stringify({
                method: 'detect_current_model',
                params: {}
            });
            
            client.write(request + '\n');
        });
        
        client.on('data', (data) => {
            responseData += data.toString();
            
            // Check if we have a complete JSON response
            try {
                const lines = responseData.trim().split('\n');
                for (const line of lines) {
                    if (line.trim()) {
                        const response = JSON.parse(line);
                        console.log('📦 Response received:', JSON.stringify(response, null, 2));
                        
                        // Test 3: Send get capabilities request
                        if (response.result && response.result.modelInfo) {
                            console.log('\n3. Testing get_model_capabilities...');
                            const capRequest = JSON.stringify({
                                method: 'get_model_capabilities',
                                params: { modelId: response.result.modelInfo.id || 'gpt-4' }
                            });
                            
                            setTimeout(() => {
                                client.write(capRequest + '\n');
                            }, 1000);
                        }
                        
                        // Test 4: Send validate access request
                        if (response.method === 'get_model_capabilities') {
                            console.log('\n4. Testing validate_model_access...');
                            const validateRequest = JSON.stringify({
                                method: 'validate_model_access',
                                params: { includeAvailable: true }
                            });
                            
                            setTimeout(() => {
                                client.write(validateRequest + '\n');
                                
                                // End test after final request
                                setTimeout(() => {
                                    console.log('\n🎉 IPC Bridge Test Complete!');
                                    client.end();
                                    resolve(true);
                                }, 2000);
                            }, 1000);
                        }
                    }
                }
                responseData = ''; // Clear buffer after processing
            } catch (e) {
                // Wait for more data if JSON is incomplete
            }
        });
        
        client.on('error', (error) => {
            console.error('❌ Connection failed:', error.message);
            console.log('\n💡 Make sure to start the IPC Bridge server first:');
            console.log('   cd h:\\-EMBLEM-PROJECT(s)-\\Tools\\packages\\vscode-ai-model-detector');
            console.log('   node out/ipcBridge.js');
            reject(error);
        });
        
        client.on('close', () => {
            console.log('🔌 Connection closed');
            resolve(true);
        });
        
        // Timeout after 10 seconds
        setTimeout(() => {
            console.log('⏰ Test timeout - closing connection');
            client.end();
            resolve(true);
        }, 10000);
    });
}

// Run the test
testIPCBridge()
    .then(() => {
        console.log('\n✅ Demo completed successfully!');
        process.exit(0);
    })
    .catch((error) => {
        console.error('\n❌ Demo failed:', error);
        process.exit(1);
    });
