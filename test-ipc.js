/**
 * Test IPC Bridge Server Standalone
 * Phase 3 Integration Test
 */

const { IPCBridgeServer } = require('./out/ipcBridge');
const { ModelDetectorService } = require('./out/modelDetector');

async function testIPCBridge() {
    console.log('🧪 Testing IPC Bridge Server...');
    
    try {
        // Mock VS Code context for testing
        const mockContext = {
            globalState: {
                get: (key) => undefined,
                update: (key, value) => Promise.resolve()
            },
            workspaceState: {
                get: (key) => undefined,
                update: (key, value) => Promise.resolve()
            }
        };
        
        // Create service instance
        const detectorService = new ModelDetectorService(mockContext);
        
        // Create IPC bridge
        const ipcBridge = new IPCBridgeServer(detectorService, 3001);
        
        // Start server
        const port = await ipcBridge.start();
        console.log(`✅ IPC Bridge Server started successfully on port ${port}`);
        
        // Test basic connectivity
        const net = require('net');
        const client = net.createConnection({ port: port }, () => {
            console.log('✅ Client connected to IPC bridge');
            
            // Test detect_current_model command
            const testRequest = {
                method: 'detect_current_model',
                params: {}
            };
            
            client.write(JSON.stringify(testRequest) + '\n');
        });
        
        client.on('data', (data) => {
            console.log('📨 Received response:', data.toString());
            client.end();
            ipcBridge.dispose();
            console.log('🎯 Test completed successfully');
        });
        
        client.on('error', (err) => {
            console.error('❌ Client error:', err);
            ipcBridge.dispose();
        });
        
    } catch (error) {
        console.error('❌ Test failed:', error);
    }
}

testIPCBridge();
