import { type PromptTemplateInput } from "@/refactor_lib/types/interfaces/PromptTemplate.interface";

/**
 * @const {object} `editorAiImpovementPrompt` - utility to help create request body prompt template
 */

export type AiOption =
  | "Explains"
  | "Expand"
  | "Rewrite"
  | "Translate"
  | "Summarize"
  | "Improve"
  | "Shorten";

const editorAiImpovementPrompt = {
  createExplainPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    task,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
    lang,
    tone,
    format,
  }: PromptTemplateInput & {
    task: AiOption;
    lang: string;
    tone: string;
    format: string;
  }) => {
    const prompt = PromptHandler({
      text: userMessage,
      task: task,
      lang: lang,
      tone,
      format,
    });
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: prompt.assiastantMessage,
          //content: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language and The format should follow ${format} without any additional expression. Ensure the tone of voice is set to ${tone}, If any of these options are set to 'auto,' ignore them. Here’s the user input:`,
          //content:`You are a helpful assistant. Your task is to ${task} the user's request into a more concise and clear form without changing its meaning. Ensure the tone of voice is set to ${tone}, and the language is ${lang}. If any of these options are set to 'auto,' ignore them. The format should follow ${format}. Here’s the user input:`,

          role: "assistant",
        },
        {
          content: prompt.value,
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

  createAskQuestionPrompt: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    askedQuestion,
    model,
    presencePenalty = 0,
    stream = true,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput & { askedQuestion: string }) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          content: `You will be provided with a sentence  and your task is answer this question: ${askedQuestion}   without any additional expression about provided text .`,
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
  createChatInEditor: ({
    documentName,
    frequencyPenalty = 0,
    maxToken = 100,
    userMessage,
    model,
    presencePenalty = 0,
    temperature = 0.3,
    topP = 1,
  }: PromptTemplateInput) => {
    return {
      document_name: documentName,
      frequency_penalty: frequencyPenalty,
      max_tokens: maxToken,
      messages: [
        {
          role: "assistant",
          content: "you are a helpful assistant.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model,
      presence_penalty: presencePenalty,
      stream: true,
      temperature,
      top_p: topP,
    };
  },
};

export default editorAiImpovementPrompt;

interface OptionObject {
  key: AiOption;
  value: string;
  assiastantMessage: string;
}

const PromptHandler = ({
  text,
  lang,
  task,
  tone,
  format,
}: {
  text: string;
  lang: string;
  task: AiOption;
  tone: string;
  format: string;
}) => {
  const prompt: OptionObject[] = [
    {
      key: "Explains",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `Please explain clearly and concisely in ${lang} : """${text}"""`,
    },
    {
      key: "Expand",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `Here is the original text to rewrite:

				"""${text}"""
				
				Please rewrite the text above to be twice as long, while keeping the core meaning the same. Do not add any completely new information, ideas or opinions.
				Output the rewritten, expanded text directly, without any quotes or other formatting. Write in the same language as the original text.`,
    },
    {
      key: "Rewrite",
      assiastantMessage: `You are a helpful assistant. Your task is to rewrite the user's request into a more concise and clear form without changing its meaning. Ensure the tone of voice is set to ${tone}, and the language is ${lang}. If any of these options are set to 'auto,' ignore them. The format should follow ${format}. Here’s the user input:`,
      value: text,
    },
    {
      key: "Translate",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `You are a highly skilled AI trained in language translation. I would like you to translate the text delimited by triple quotes into ${lang} language, ensuring that the translation is colloquial and authentic.
				Only give me the output and nothing else. Do not wrap responses in quotes. 
				"""
				${text}
				"""`,
    },
    {
      key: "Summarize",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the text delimited by triple quotes and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.
			Only give me the output and nothing else. Do not wrap responses in quotes. Respond in the ${lang} language.
			"""
			${text}
			"""`,
    },
    {
      key: "Improve",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `Rewrite the following text, which will be delimited by triple quotes, to be more concise and well-written while preserving the original meaning:

					"""${text}"""
					
					Provide only the rewritten text as your output, without any quotes or tags. Respond in the same language as the original text.`,
    },
    {
      key: "Shorten",
      assiastantMessage: `You will be provided with a sentence  and your task is to ${task} it in ${lang} language without any additional expression.`,
      value: `Here is the original text to rewrite:

			"""${text}"""
			
			Please rewrite the text above to be no more than half the number of characters while keeping the core meaning the same. Output only the rewritten text, without any quotes or other formatting. Write the rewritten text in the same language as the original text.`,
    },
  ];

  const filteredPrompt = prompt.filter(item => item.key === task);

  return filteredPrompt[0];
};
