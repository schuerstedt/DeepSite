# Hugging Face Token Usage Monitoring

## Overview

DeepSite now includes comprehensive token usage monitoring to help you track your Hugging Face API consumption and stay within your subscription limits.

## How Token Tracking Works

### Client-Side Tracking
- Token usage is tracked on the client side using localStorage
- Automatically estimates tokens for both input prompts and AI responses
- Tracks usage per request with detailed metadata
- Persists data across browser sessions

### Token Estimation
- Uses a simple approximation: ~4 characters per token
- Tracks both prompt tokens (input) and completion tokens (output)
- Provides total token count per request

## Viewing Token Usage

### In Settings Panel
1. Open the AI chat interface
2. Click the "Settings" gear icon
3. View the blue "Token Usage" panel that shows:
   - **Tokens used this month**: Running total
   - **Number of requests**: Count of API calls
   - **Progress bar**: Visual indicator vs HF Pro limit
   - **Monthly limit**: 1,000,000 tokens for HF Pro

### Usage Data Tracked
- **Request ID**: Unique identifier for each API call
- **Timestamp**: When the request was made
- **Model**: Which AI model was used
- **Provider**: Which inference provider was selected
- **Token breakdown**: Prompt tokens, completion tokens, total tokens

## Hugging Face Pro Limits

### Current Limits (as of implementation)
- **HF Pro subscription**: 1,000,000 tokens per month
- **Progress tracking**: Visual bar shows percentage used
- **Auto-reset**: Usage resets monthly

### Managing Your Usage
1. **Monitor regularly**: Check settings panel frequently
2. **Optimize prompts**: Shorter, more focused prompts use fewer tokens
3. **Choose models wisely**: Different models may have different token efficiency
4. **Use follow-ups**: Edit existing designs instead of starting from scratch

## Technical Implementation

### Files Involved
- `hooks/useTokenTracking.ts` - Client-side tracking hook
- `components/editor/ask-ai/settings.tsx` - Usage display
- `components/editor/ask-ai/index.tsx` - Tracking integration
- `lib/token-monitoring.ts` - Core monitoring functions (server-side utilities)

### Data Storage
- **Location**: Browser localStorage
- **Key**: `tokenUsage`
- **Retention**: Last 100 requests
- **Format**: JSON array of TokenUsage objects

### Usage Interface
```typescript
interface TokenUsage {
  requestId: string;
  timestamp: Date;
  model: string;
  provider: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  estimatedCost?: number;
}
```

## Checking HF Account Directly

### Official HF Billing Page
- Visit: https://huggingface.co/settings/billing
- View detailed usage statistics
- Check current subscription status
- Monitor billing cycles

### Account Usage API
- HF provides usage APIs for programmatic monitoring
- Can be integrated for real-time usage tracking
- Requires API key authentication

## Best Practices

### Token Conservation
1. **Be specific**: Clear, concise prompts are more efficient
2. **Iterate smartly**: Use follow-up edits instead of complete rewrites
3. **Choose appropriate models**: Some models are more token-efficient
4. **Review before sending**: Double-check prompts to avoid unnecessary requests

### Monitoring Strategy
1. **Daily checks**: Review usage in settings panel
2. **Weekly analysis**: Look at usage patterns and trends
3. **Monthly planning**: Plan projects based on remaining quota
4. **Emergency limits**: Set personal thresholds (e.g., stop at 80% usage)

## Troubleshooting

### Missing Usage Data
- Clear browser cache and reload
- Check if localStorage is enabled
- Verify tracking is working by making a test request

### Inaccurate Estimates
- Token estimation is approximate (~4 chars per token)
- Different models may tokenize differently
- Use HF official billing page for precise counts

### Reset Tracking Data
- Open browser developer tools
- Go to Application > Local Storage
- Delete the `tokenUsage` key to reset data

## Future Enhancements

### Planned Features
- Real-time HF API usage integration
- Export usage reports
- Advanced analytics and trends
- Usage alerts and warnings
- Cost estimation based on subscription type

### API Integration
- Direct HF account integration
- Real-time quota checking
- Automatic usage sync
- Billing cycle awareness

## Support

For issues with token tracking:
1. Check browser console for errors
2. Verify localStorage permissions
3. Test with a simple prompt to ensure tracking works
4. Compare with HF official usage at https://huggingface.co/settings/billing

---

*Note: Token estimation is approximate. For precise usage data, always refer to your official Hugging Face billing dashboard.*
