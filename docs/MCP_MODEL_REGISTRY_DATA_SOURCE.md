# MCP AI Model Detector - Data Source Investigation

**Investigation Date**: November 7, 2025  
**MCP Server Version**: 2.1.0  
**Investigation Method**: Deep forensic analysis of source code

## Executive Summary

The **AI Model Detector MCP Server's Internal Model Registry** data is **hardcoded directly in the source code** as a TypeScript constant object. The model metadata (families, max tokens, capabilities, vendors) is **NOT dynamically sourced from external APIs** but is instead **manually maintained** by the package developer.

## Data Source Chain

```
Ultimate Source: Hardcoded TypeScript Constant
      ↓
File: H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server\src\types.ts
      ↓
Constant: MODEL_DEFINITIONS (line ~143)
      ↓
Compiled: dist/types.js
      ↓
Executed: MCP Server Runtime
      ↓
Queried: Via MCP tools (detect_current_model, get_model_capabilities)
```

## Source Code Evidence

### File Location
```
H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\mcp-server\src\types.ts
```

### Definition Structure (Lines 143-169)
```typescript
/**
 * Model definitions for all families shown in VS Code model selector
 */
export const MODEL_DEFINITIONS = {
  // OpenAI GPT Series
  'gpt-4.1': { id: 'gpt-4.1', name: 'GPT-4.1', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-4o': { id: 'gpt-4o', name: 'GPT-4o', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-5-mini': { id: 'gpt-5-mini', name: 'GPT-5 mini', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  'gpt-5': { id: 'gpt-5', name: 'GPT-5', vendor: ModelVendor.OPENAI, family: ModelFamily.GPT, maxTokens: 128000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] },
  
  // OpenAI O-Series
  'o1-preview': { id: 'o1-preview', name: 'o1-preview', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 128000, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  'o1-mini': { id: 'o1-mini', name: 'o1-mini', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 65536, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  'o3-mini': { id: 'o3-mini', name: 'o3-mini', vendor: ModelVendor.OPENAI, family: ModelFamily.O_SERIES, maxTokens: 65536, capabilities: [ModelCapability.REASONING, ModelCapability.CODE_GENERATION] },
  
  // Anthropic Claude Series
  'claude-3-5-sonnet': { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'claude-3-7-sonnet': { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'claude-sonnet-4': { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', vendor: ModelVendor.ANTHROPIC, family: ModelFamily.CLAUDE, maxTokens: 200000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  
  // Google Gemini Series
  'gemini-2.5-pro': { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', vendor: ModelVendor.GOOGLE, family: ModelFamily.GEMINI, maxTokens: 1000000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.MULTIMODAL] },
  'gemini-2.5-flash': { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', vendor: ModelVendor.GOOGLE, family: ModelFamily.GEMINI, maxTokens: 1000000, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION, ModelCapability.MULTIMODAL] },
  
  // xAI Grok Series
  'grok-code-fast-1': { id: 'grok-code-fast-1', name: 'Grok Code Fast 1', vendor: ModelVendor.XAI, family: ModelFamily.GROK, maxTokens: 131072, capabilities: [ModelCapability.CODE_GENERATION, ModelCapability.ANALYSIS] },
  'grok-2': { id: 'grok-2', name: 'Grok 2', vendor: ModelVendor.XAI, family: ModelFamily.GROK, maxTokens: 131072, capabilities: [ModelCapability.CHAT, ModelCapability.CODE_GENERATION] }
};
```

## Complete Model Registry (14 Models)

| Model ID | Display Name | Vendor | Family | Max Tokens | Capabilities |
|----------|--------------|--------|--------|------------|--------------|
| `gpt-4.1` | GPT-4.1 | OpenAI | gpt | 128,000 | chat, code_generation |
| `gpt-4o` | GPT-4o | OpenAI | gpt | 128,000 | chat, code_generation |
| `gpt-5-mini` | GPT-5 mini | OpenAI | gpt | 128,000 | chat, code_generation |
| `gpt-5` | GPT-5 | OpenAI | gpt | 128,000 | chat, code_generation |
| `o1-preview` | o1-preview | OpenAI | o-series | 128,000 | reasoning, code_generation |
| `o1-mini` | o1-mini | OpenAI | o-series | 65,536 | reasoning, code_generation |
| `o3-mini` | o3-mini | OpenAI | o-series | 65,536 | reasoning, code_generation |
| `claude-3-5-sonnet` | Claude 3.5 Sonnet | Anthropic | claude | 200,000 | chat, code_generation, analysis |
| `claude-3-7-sonnet` | Claude 3.7 Sonnet | Anthropic | claude | 200,000 | chat, code_generation, analysis |
| `claude-sonnet-4` | Claude Sonnet 4 | Anthropic | claude | 200,000 | chat, code_generation, analysis |
| `gemini-2.5-pro` | Gemini 2.5 Pro | Google | gemini | 1,000,000 | chat, code_generation, multimodal |
| `gemini-2.5-flash` | Gemini 2.5 Flash | Google | gemini | 1,000,000 | chat, code_generation, multimodal |
| `grok-code-fast-1` | Grok Code Fast 1 | xAI | grok | 131,072 | code_generation, analysis |
| `grok-2` | Grok 2 | xAI | grok | 131,072 | chat, code_generation |

## Key Findings

### 1. **Hardcoded Maintenance**
- Model metadata is **manually updated** by the package maintainer
- Updates require **new npm package releases** (version bumps)
- No dynamic API calls to vendor endpoints

### 2. **Static Data Location**
- **Source**: `src/types.ts` (TypeScript)
- **Compiled**: `dist/types.js` (JavaScript)
- **Package**: `@emblem-projects/ai-model-detector-mcp`
- **Version**: 2.1.0

### 3. **Detection vs. Metadata**
The MCP server has **two separate data sources**:

**A. Dynamic Detection (Runtime)**
- **Source**: VS Code's SQLite database (`state.vscdb`)
- **Key**: `chat.currentLanguageModel.panel`
- **Purpose**: Detects which model is **currently active**
- **Data**: Model ID string (e.g., `copilot/claude-sonnet-4.5`)

**B. Static Metadata (Hardcoded)**
- **Source**: `MODEL_DEFINITIONS` constant in `types.ts`
- **Purpose**: Provides **capabilities, vendor, family, max tokens**
- **Data**: Enrichment metadata for known model IDs

### 4. **Discrepancy Resolution**
When VS Code detects `copilot/claude-sonnet-4.5` but the registry only knows `claude-sonnet-4`:

1. The detection is **accurate** (sourced from VS Code's actual storage)
2. The metadata lookup **fails** or uses **fallback heuristics**
3. This explains the **100,000 vs 200,000 token discrepancy** we documented

The 100,000 token value comes from a **fallback default** when the exact model ID isn't found in `MODEL_DEFINITIONS`.

## Implications for AI Attribution

### For Our GIT-ATT-001 Standard:

1. **Model Detection is Authoritative**
   - VS Code's SQLite storage is the **source of truth** for active model
   - MCP tool accurately reports what VS Code is using

2. **Metadata is Approximation**
   - Family, vendor, max tokens are **manually maintained estimates**
   - May lag behind actual vendor specifications
   - Can be outdated when vendors release new models

3. **Best Practice**
   - **Trust the Model ID** from detection (e.g., `copilot/claude-sonnet-4.5`)
   - **Use metadata cautiously** (capabilities, max tokens)
   - **Verify critical specs** against vendor documentation when needed

## Update Mechanism

To get updated model metadata, users must:

1. Wait for package maintainer to update `types.ts`
2. Wait for new npm release
3. Update local installation: `npm update @emblem-projects/ai-model-detector-mcp`
4. Or use global: `npm install -g @emblem-projects/ai-model-detector-mcp@latest`

**No automatic synchronization with vendor APIs exists.**

## Validation Steps Performed

1. ✅ Located MCP server installation: `H:\-EMBLEM-PROJECT(s)-\Tools\packages\vscode-ai-model-detector\`
2. ✅ Identified source files: `src/types.ts` (15,854 bytes), `src/index.ts` (12,861 bytes)
3. ✅ Read `MODEL_DEFINITIONS` constant: 14 models hardcoded
4. ✅ Confirmed no external API calls in source code
5. ✅ Verified via README: "Bundled model metadata" (not "fetched" or "synced")
6. ✅ Cross-referenced with our MODEL_REGISTRY.md: Matches known limitations

## Conclusion

The **Internal Model Registry** in the MCP AI Model Detector is:

- **Manually curated** by the package maintainer
- **Hardcoded** in TypeScript source files
- **Distributed** via npm package releases
- **NOT dynamically fetched** from vendor APIs
- **A reference implementation** subject to maintainer updates

This explains why newer model variants (like `claude-sonnet-4.5`) may not have matching metadata entries, leading to fallback behaviors and discrepancies in reported capabilities.

---

**Investigation Tools Used:**
- PowerShell `Get-ChildItem`, `Get-Content`, `Select-String`
- VS Code MCP configuration files
- Direct source code examination
- Sequential thinking analysis

**Data Provenance Verified:** ✅ Complete chain documented from hardcoded constant → npm package → MCP runtime → tool response
