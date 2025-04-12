import {
  type PromptTemplateInput,
  type PromptTemplateInputWithoutMessage,
} from "@/refactor_lib/types/interfaces/PromptTemplate.interface";

import {
  ADVANCED_PROMPT_OPTIONS_CREATIVITY_LEVEL,
  ADVANCED_PROMPT_OPTIONS_Format,
  ADVANCED_PROMPT_OPTIONS_Length,
  ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW,
  ADVANCED_PROMPT_OPTIONS_TONE,
} from "./advancedPromptOptions";

/**
 * @const {object} `promptTemplateCreator` - utility to help create request body prompt template
 */

type typeCreateParamsForGenerate = {
  message: string;
  model: string;
  format?: string;
  language?: string;
  length?: string;
  point_of_view?: string;
  tone_of_voice?: string;
  prompt_type: AppsType;
  frequency_penalty: number;
  presence_penalty: number;
  temperature: number;
  top_p: number;
};

const promptTemplateCreator = {
  CreateParamsForGeneration: ({
    message,
    model,
    format = "auto",
    language = "English",
    length = "medium",
    point_of_view = "auto",
    tone_of_voice = "auto",
    frequency_penalty,
    presence_penalty,
    temperature,
    top_p,
    prompt_type,
  }: typeCreateParamsForGenerate) => {
    return {
      message,
      model,
      prompt_context: {
        format,
        language,
        length,
        point_of_view,
        tone_of_voice,
      },
      prompt_type,
      setting: {
        frequency_penalty,
        presence_penalty,
        temperature,
        top_p,
      },
    };
  },
  createStartConversationPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: "you are a helpful assistant.",
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createContinueConversationPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createRegenerateConversationPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInputWithoutMessage) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateTemplatePrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: "you are a helpful assistant.",
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateTranslatePrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    destLang,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput & { destLang: string }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: `You will be provided with a sentence, and your task is to translate it into ${destLang}.`,
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createOpenAITextToImagePrompt: ({
    documentName,
    model,
    n,
    userMessage,
    quality,
    responseFormat,
    size,
    style,
    workspaceId,
  }: {
    documentName: string;
    model: string;
    n: number;
    userMessage: string;
    quality: string;
    responseFormat: string;
    size: string;
    style: string;
    workspaceId: number;
  }) => {
    return {
      document_name: documentName,
      model,
      n,
      prompt: userMessage,
      quality,
      response_format: responseFormat,
      size,
      style,
      workspace_id: workspaceId,
    };
  },
  createStabilityTextToImagePrompt: ({
    model,
    userMessage,
    userMessageWeight,
    cfgScale,
    height,
    width,
    samples,
    sampler,
    clipGuidancePreset,
    stylePreset,
    steps,
  }: {
    model: string;
    userMessage: string;
    userMessageWeight: number;
    cfgScale: number;
    height: number;
    width: number;
    samples: number;
    sampler: string;
    clipGuidancePreset: string;
    stylePreset: string;
    steps: number;
  }) => {
    return {
      model,
      text_prompts: [
        {
          text: userMessage,
          weight: userMessageWeight,
        },
      ],
      cfg_scale: cfgScale,
      height,
      width,
      samples,
      sampler,
      clip_guidance_preset: clipGuidancePreset,
      style_preset: stylePreset,
      steps,
    };
  },
  createGenerateAIWriterPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    destLangCode = "en-us",
    topP = 1,
    creativityLevel = ADVANCED_PROMPT_OPTIONS_CREATIVITY_LEVEL[0],
    tone = ADVANCED_PROMPT_OPTIONS_TONE[0],
    pointOfView = ADVANCED_PROMPT_OPTIONS_POINT_OF_VIEW[0],
    format = ADVANCED_PROMPT_OPTIONS_Format[0],
    length = ADVANCED_PROMPT_OPTIONS_Length[0],
  }: PromptTemplateInput & {
    destLangCode?: string;
    tone?: string;
    creativityLevel?: string;
    length?: string;
    pointOfView?: string;
    format?: string;
  }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,

      messages: [
        {
          content: `You are a helpful assistant. Your task is to rewrite the user's request into a more concise and clear form without changing its meaning. Ensure the tone of voice is set to ${tone}, the point of view is ${pointOfView}, and the language is ${destLangCode}. If any of these options are set to 'auto,' ignore them. The format should follow ${format}. Here’s the user input:`,
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateCodePrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
    targetLang,
  }: PromptTemplateInput & { targetLang: string }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: "you are a helpful assistant.",
          role: "assistant",
        },
        {
          content: `${userMessage} in ${targetLang}`,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateGrammarPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
    targetLang = "en-us",
  }: PromptTemplateInput & { targetLang?: string }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: `You will be provided with statements, and your task is to convert them to standard ${targetLang}.`,
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateHighlightPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
    targetPlatform,
  }: PromptTemplateInput & { targetPlatform: string }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: `Summarize content you are provided with for ${targetPlatform} social network.`,
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
      type: targetPlatform,
    };
  },
  createGenerateExplainerPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: "Explain content you are provided with",
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
  createGenerateSummarize: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: "Summarize content you are provided with",
          role: "assistant",
        },
        {
          content: userMessage,
          role: "user",
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream,
      temperature,
      top_p: topP,
    };
  },
};

export default promptTemplateCreator;
