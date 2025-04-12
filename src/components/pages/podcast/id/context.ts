import { createContext } from "react";

import type podcastSingleType from "./type";

const PodcastSingleContext = createContext({} as podcastSingleType["context"]);

export default PodcastSingleContext;
