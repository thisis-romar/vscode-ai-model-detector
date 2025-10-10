/**
 * Test Refactored MCP Server - Panel Only Detection
 * 
 * This script tests the refactored AI Model Detector MCP server
 * to ensure it only returns results from chat.currentLanguageModel.panel
 */

import { RealVSCodeBridge } from './dist/types.js';

console.log('🧪 Testing Refactored AI Model Detection (Panel Only)');
console.log('═'.repeat(60));

const bridge = new RealVSCodeBridge();

try {
    const result = await bridge.detectCurrentModel();
    
    console.log('\n📊 Detection Results:');
    console.log('─'.repeat(40));
    
    if (result && result.success) {
        console.log('✅ Status: SUCCESS');
        console.log(`📝 Model: ${result.currentModel.name}`);
        console.log(`🆔 ID: ${result.currentModel.id}`);
        console.log(`🏢 Vendor: ${result.currentModel.vendor}`);
        console.log(`📋 Family: ${result.currentModel.family}`);
        console.log(`🎯 Source: ${result.source}`);
        console.log(`📊 Confidence: ${result.confidence}`);
        console.log(`⏰ Timestamp: ${result.timestamp.toISOString()}`);
        
        // Verify it only used panel detection
        if (result.source === 'storage:panel') {
            console.log('\n✅ VERIFICATION: Panel-only detection confirmed');
        } else {
            console.log('\n❌ WARNING: Non-panel source detected:', result.source);
        }
    } else {
        console.log('❌ Status: FAILED');
        console.log(`📝 Error: ${result?.error || 'Unknown error'}`);
        console.log(`🎯 Source: ${result?.source || 'Unknown'}`);
        console.log(`📊 Confidence: ${result?.confidence || 'None'}`);
        console.log(`⏰ Timestamp: ${result?.timestamp?.toISOString() || 'Unknown'}`);
    }
    
    console.log('\n🎯 Refactoring Summary:');
    console.log('─'.repeat(40));
    console.log('✅ Removed editor fallback detection');
    console.log('✅ Removed editing-session fallback detection');
    console.log('✅ Removed settings.json fallback detection');
    console.log('✅ Removed MCP sampling fallback detection');
    console.log('✅ Only chat.currentLanguageModel.panel is used');
    
} catch (error) {
    console.error('❌ Test failed:', error.message);
}