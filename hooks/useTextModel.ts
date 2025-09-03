import { useState, useEffect } from 'react';

interface TextModel {
  value: string;
  label: string;
}

export function useTextModel() {
  const [selectedModel, setSelectedModel] = useState<string>('openai');
  const [availableModels, setAvailableModels] = useState<TextModel[]>([
    { value: 'openai', label: 'OpenAI' }
  ]);
  const [loading, setLoading] = useState(true);

  // Load saved model from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('deepsite-text-model');
    if (saved) {
      setSelectedModel(saved);
    }
  }, []);

  // Fetch available models from pollinations.ai
  useEffect(() => {
    async function fetchModels() {
      try {
        setLoading(true);
        const response = await fetch('https://text.pollinations.ai/models');
        if (response.ok) {
          const models = await response.json();
          if (Array.isArray(models)) {
            // Handle the new API format with objects containing name and description
            const formattedModels = models
              .filter(model => model.name && !model.community) // Filter out community models for cleaner list
              .map(model => ({
                value: model.name,
                label: `${model.name}${model.description ? ` - ${model.description}` : ''}`
              }));
            
            setAvailableModels(formattedModels);
            
            // If current selected model is not in the list, use the first one
            const modelNames = models.map(m => m.name);
            if (!modelNames.includes(selectedModel)) {
              const newModel = modelNames[0] || 'openai';
              setSelectedModel(newModel);
              localStorage.setItem('deepsite-text-model', newModel);
            }
          }
        } else {
          console.warn('Failed to fetch text models, using fallback');
          setAvailableModels([
            { value: 'openai', label: 'OpenAI - GPT-5 Nano' },
            { value: 'gemini', label: 'Gemini - 2.5 Flash Lite' },
            { value: 'mistral', label: 'Mistral - Small 3.1 24B' },
            { value: 'deepseek-reasoning', label: 'DeepSeek - R1 Reasoning' },
            { value: 'nova-fast', label: 'Amazon Nova - Micro' }
          ]);
        }
      } catch (error) {
        console.warn('Error fetching text models:', error);
        setAvailableModels([
          { value: 'openai', label: 'OpenAI - GPT-5 Nano' },
          { value: 'gemini', label: 'Gemini - 2.5 Flash Lite' },
          { value: 'mistral', label: 'Mistral - Small 3.1 24B' },
          { value: 'deepseek-reasoning', label: 'DeepSeek - R1 Reasoning' },
          { value: 'nova-fast', label: 'Amazon Nova - Micro' }
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchModels();
  }, [selectedModel]);

  const changeModel = (newModel: string) => {
    setSelectedModel(newModel);
    localStorage.setItem('deepsite-text-model', newModel);
    
    // Dispatch custom event for other parts of the app to listen to
    window.dispatchEvent(new CustomEvent('textModelChanged', { 
      detail: { model: newModel } 
    }));
    
    console.log(`Text generation model changed to: ${newModel}`);
  };

  return {
    selectedModel,
    availableModels,
    loading,
    changeModel
  };
}
