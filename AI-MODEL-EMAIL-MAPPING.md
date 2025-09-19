# AI Model Email Mapping Configuration

**Created:** September 18, 2025  
**Purpose:** Standardized email addresses for AI model commit attribution  
**Format:** `admin+llm-[model-name]@emblemprojects.com`

## 📧 Email Mapping Reference

### OpenAI Models
| Model ID | Display Name | Email Address |
|----------|--------------|---------------|
| `copilot/gpt-4.1` | GPT-4.1 | `admin+llm-gpt-4-1@emblemprojects.com` |
| `copilot/gpt-4o` | GPT-4o | `admin+llm-gpt-4o@emblemprojects.com` |
| `copilot/gpt-5-mini` | GPT-5 Mini | `admin+llm-gpt-5-mini@emblemprojects.com` |
| `copilot/gpt-5` | GPT-5 | `admin+llm-gpt-5@emblemprojects.com` |
| `copilot/o3-mini` | o3-mini | `admin+llm-o3-mini@emblemprojects.com` |
| `copilot/o4-mini` | o4-mini | `admin+llm-o4-mini@emblemprojects.com` |

### Anthropic Models
| Model ID | Display Name | Email Address |
|----------|--------------|---------------|
| `copilot/claude-sonnet-3.5` | Claude Sonnet 3.5 | `admin+llm-claude-sonnet-3-5@emblemprojects.com` |
| `copilot/claude-sonnet-3.7` | Claude Sonnet 3.7 | `admin+llm-claude-sonnet-3-7@emblemprojects.com` |
| `copilot/claude-sonnet-4` | Claude Sonnet 4 | `admin+llm-claude-sonnet-4@emblemprojects.com` |

### Google Models  
| Model ID | Display Name | Email Address |
|----------|--------------|---------------|
| `copilot/gemini-2.5-pro` | Gemini 2.5 Pro | `admin+llm-gemini-2-5-pro@emblemprojects.com` |

### xAI Models
| Model ID | Display Name | Email Address |
|----------|--------------|---------------|
| `copilot/grok-code-fast-1` | Grok Code Fast 1 | `admin+llm-grok-code-fast-1@emblemprojects.com` |

## 🔧 Usage Instructions

### Automatic Configuration
Use the `Set-GitAuthorFromModel.ps1` script to automatically detect and configure:

```powershell
# Run from any git repository
.\Set-GitAuthorFromModel.ps1
```

### Manual Configuration  
For manual setup of a specific model:

```bash
# Example: Claude Sonnet 4
git config user.name "Claude Sonnet 4"
git config user.email "admin+llm-claude-sonnet-4@emblemprojects.com"
```

## 📋 Naming Convention Rules

1. **Lowercase with hyphens**: Replace spaces and dots with hyphens
2. **Remove special characters**: No parentheses, slashes, or other symbols  
3. **Preserve version numbers**: Keep version identifiers intact
4. **Consistent prefixing**: All emails use `admin+llm-` prefix
5. **Domain standard**: All use `@emblemprojects.com` domain

### Examples:
- "Claude Sonnet 3.5" → `claude-sonnet-3-5`
- "GPT-4o" → `gpt-4o` 
- "Gemini 2.5 Pro" → `gemini-2-5-pro`
- "o4-mini (Preview)" → `o4-mini`

## 🔄 Updating for New Models

When new models are added to VS Code:

1. **Identify Model ID**: Use `test-final-detection.js` to get exact ID
2. **Create Email**: Follow naming convention rules  
3. **Update Mapping**: Add to `Set-GitAuthorFromModel.ps1`
4. **Test Configuration**: Verify git config works correctly
5. **Document**: Add to this reference file

## 🎯 Benefits

- **Transparent Attribution**: Every commit clearly shows which AI model created the code
- **Audit Trail**: Complete history of which models contributed to each project  
- **Email Organization**: Plus-addressing allows filtering and organization
- **Consistency**: Standardized format across all projects and repositories
- **Automation**: Scripts can automatically set correct attribution

---

**Last Updated:** September 18, 2025  
**Maintained by:** EmblemProjects AI Development Team