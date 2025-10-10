/**
 * IPC Bridge Launcher
 * Starts the IPC bridge server for VS Code extension communication
 */

const { IPCBridgeServer } = require('./out/ipcBridge.js');

async function startIPCBridge() {
    console.log('🚀 Starting IPC Bridge Server...');
    
    try {
        const bridge = new IPCBridgeServer(3001);
        await bridge.start();
        
        console.log('✅ IPC Bridge Server started successfully on port 3001');
        console.log('📡 Ready to receive commands from VS Code extension');
        
        // Keep the process alive
        process.on('SIGINT', () => {
            console.log('\n🛑 Shutting down IPC Bridge Server...');
            if (bridge && typeof bridge.stop === 'function') {
                bridge.stop();
            }
            process.exit(0);
        });
        
    } catch (error) {
        console.error('❌ Failed to start IPC Bridge Server:', error);
        process.exit(1);
    }
}

// Start the server
startIPCBridge();
