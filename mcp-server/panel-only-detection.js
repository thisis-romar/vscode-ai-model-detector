import sqlite3 from 'sqlite3';
import path from 'path';
import os from 'os';

/**
 * Simplified AI Model Detector - Panel Model Only
 * 
 * This refactored version ONLY checks chat.currentLanguageModel.panel
 * and removes all fallback methods that could lead to incorrect answers.
 */

const vsCodeStoragePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User', 'globalStorage', 'state.vscdb');

console.log('🎯 Simplified AI Model Detection');
console.log('Database path:', vsCodeStoragePath);

const db = new sqlite3.Database(vsCodeStoragePath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        return;
    }
    console.log('✅ Successfully opened VS Code storage database');
});

// Query ONLY for the panel model key - no fallbacks
db.get("SELECT key, value FROM ItemTable WHERE key = 'chat.currentLanguageModel.panel'", (err, row) => {
    if (err) {
        console.error('❌ Error querying database:', err.message);
        db.close();
        return;
    }
    
    if (!row) {
        console.log('❌ No panel model configuration found');
        db.close();
        return;
    }
    
    console.log('\n🎯 CURRENT AI MODEL (Panel Only):');
    console.log(`✅ Key: ${row.key}`);
    console.log(`✅ Value: ${row.value}`);
    console.log('\n📋 Detection Summary:');
    console.log('- Method: VS Code SQLite Storage');
    console.log('- Source: chat.currentLanguageModel.panel');
    console.log('- Confidence: HIGH (Direct panel setting)');
    console.log('- Fallbacks: REMOVED (Panel only detection)');
    
    db.close();
});