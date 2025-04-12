import { type aiImagePageTypes, type imageTypes } from "./types";

// Initial state of the aiImagePage
export const aiImagePageStates: aiImagePageTypes["states"] = {
  // State for the "text_to_image" feature, initialized with empty options
  text_to_image: { options: {} } as aiImagePageTypes["states"]["text_to_image"],

  // State for the "image_to_image" feature, initialized with empty options
  image_to_image: {
    options: {},
  } as aiImagePageTypes["states"]["image_to_image"],

  // State for the "image_upscale" feature, initialized with empty options
  image_upscale: { options: {} } as aiImagePageTypes["states"]["image_upscale"],

  // Default results for each feature, initialized as empty arrays
  result: {
    image_to_image: [],
    image_upscale: [],
    text_to_image: [],
  },

  // Loading and error flags, both initialized to false
  loading: false,
  error: false,

  // Default document name and workspace ID
  document_name: "New image",
  workspace_id: 0,
};

// Types for the possible actions that the reducer can handle
export type aiImageReducerActionTypes<
  T extends keyof aiImagePageTypes["states"],
> =
  | {
      type: "set_state"; // Action to update a specific state
      payload: {
        state: T; // The feature to update (e.g., "text_to_image")
        value: Partial<aiImagePageTypes["states"][T]>; // The new value for that feature
      };
    }
  | {
      type: "reset_option"; // Action to reset the options for a specific feature
      state: T; // The feature to reset options for
    }
  | {
      type: "reset_states"; // Action to reset all states to their initial values
    }
  | {
      type: "set_result"; // Action to set the results for a specific feature
      payload: {
        state: imageTypes; // The feature (e.g., "image_to_image")
        value: string[]; // The result value (array of image URLs)
      };
    }
  | {
      type: "set_send_image"; // Action to set the send image value
      payload: aiImagePageTypes["states"]["sendImage"]; // The sendImage value to set
    };

// Reducer function to update the state based on actions
export const aiImageReducer = <T extends keyof aiImagePageTypes["states"]>(
  state: aiImagePageTypes["states"], // Current state
  action: aiImageReducerActionTypes<T>, // Action to perform
): aiImagePageTypes["states"] => {
  // Handling the "set_state" action
  if (action.type === "set_state") {
    const value: any = action.payload.value;
    const isOptions = Boolean(value.options); // Check if options are being updated
    const currentState: any = state[action.payload.state]; // Get the current state for the feature

    if (typeof action.payload.value === "object" && currentState.options) {
      // If options are being updated, merge them with the existing options
      return {
        ...state,
        [action.payload.state]: {
          ...(state[action.payload.state] as Partial<
            aiImagePageTypes["states"][T]
          >),
          ...(!isOptions
            ? (action.payload.value as Partial<aiImagePageTypes["states"][T]>)
            : {
                ...(action.payload.value as Partial<
                  aiImagePageTypes["states"][T]
                >),
                options: {
                  ...currentState.options,
                  ...value.options,
                },
              }),
        },
      };
    } else {
      // If not options, just update the state with the new value
      return {
        ...state,
        [action.payload.state]: action.payload.value,
      };
    }
  }

  // Handling the "reset_option" action to reset options for a feature
  else if (action.type === "reset_option") {
    const currentState: any = state[action.state];
    return {
      ...state,
      [action.state]: {
        ...({ ...currentState, options: {} } as Partial<
          aiImagePageTypes["states"][T]
        >),
      },
    };
  }

  // Handling the "reset_states" action to reset all states to their initial values
  else if (action.type === "reset_states") {
    return {
      image_to_image: {
        ...aiImagePageStates.image_to_image,
        models: state.image_to_image.models,
        model: state.image_to_image.model,
      },
      text_to_image: {
        ...aiImagePageStates.text_to_image,
        models: state.text_to_image.models,
        model: state.text_to_image.model,
      },
      image_upscale: {
        ...aiImagePageStates.image_upscale,
        models: state.image_upscale.models,
        model: state.image_upscale.model,
      },
      result: aiImagePageStates.result,
      error: false,
      loading: false,
      document_name: aiImagePageStates.document_name,
      workspace_id: state.workspace_id,
    };
  }

  // Handling the "set_result" action to set the result for a specific feature
  else if (action.type === "set_result") {
    return {
      ...state,
      result: {
        ...state.result,
        [action.payload.state]: action.payload.value, // Update the result for the specified feature
      },
    };
  }

  // Handling the "set_send_image" action to set the send image value
  else if (action.type === "set_send_image") {
    return {
      ...state,
      sendImage: action.payload, // Set the sendImage value in the state
    };
  }

  // If no action matches, return the current state unchanged
  return state;
};
