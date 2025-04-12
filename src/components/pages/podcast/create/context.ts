import { createContext } from "react";

import type podcastCreateTypes from "./type";

const PodcastCreateContext = createContext({} as podcastCreateTypes["context"]);

export default PodcastCreateContext;
