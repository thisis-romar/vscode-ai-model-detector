import sqlite3 from 'sqlite3';
import path from 'path';
import os from 'os';

const vsCodeStoragePath = path.join(os.homedir(), 'AppData', 'Roaming', 'Code', 'User', 'globalStorage', 'state.vscdb');

console.log('Checking VS Code storage database...');
console.log('Database path:', vsCodeStoragePath);

const db = new sqlite3.Database(vsCodeStoragePath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        return;
    }
    console.log('Successfully opened VS Code storage database');
});

// Query for all chat-related keys
db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
    if (err) {
        console.error('Error getting tables:', err.message);
        return;
    }
    
    console.log('\nAvailable tables:');
    tables.forEach(table => {
        console.log(`- ${table.name}`);
    });
    
    // Look for ItemTable which typically stores key-value pairs
    const itemTableExists = tables.some(table => table.name === 'ItemTable');
    
    if (itemTableExists) {
        console.log('\nQuerying ItemTable for chat model keys...');
        
        // Query for chat model related keys
        db.all("SELECT key, value FROM ItemTable WHERE key LIKE '%chat%' OR key LIKE '%model%' OR key LIKE '%copilot%'", (err, rows) => {
            if (err) {
                console.error('Error querying ItemTable:', err.message);
                return;
            }
            
            console.log(`\nFound ${rows.length} relevant keys:`);
            rows.forEach(row => {
                console.log(`Key: ${row.key}`);
                console.log(`Value: ${row.value}`);
                console.log('---');
            });
            
            // Specifically look for current language model keys
            const chatModelKeys = rows.filter(row => 
                row.key.includes('currentLanguageModel') || 
                row.key.includes('chat.model') ||
                row.key.includes('copilot.model')
            );
            
            if (chatModelKeys.length > 0) {
                console.log('\n🎯 CHAT MODEL KEYS FOUND:');
                chatModelKeys.forEach(row => {
                    console.log(`✅ ${row.key}: ${row.value}`);
                });
            } else {
                console.log('\n❌ No specific chat model keys found');
            }
            
            db.close();
        });
    } else {
        console.log('\n❌ ItemTable not found in database');
        db.close();
    }
});
