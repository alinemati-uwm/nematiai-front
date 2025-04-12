export interface EngineAPIResponse {
  getAvailableEngines: Array<{
    model: string;
    url: {
      name: string;
      url: string;
    };
    params: object;
    is_active: boolean;
  }>;
  getAvailableEnginesImageToImage: Array<{
    model: string;
    url: {
      name: string;
      url: string;
    };
    params: object;
    is_active: true;
  }>;
}
