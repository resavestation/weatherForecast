import { APIRequestWeather } from "@services/config";
const request = new APIRequestWeather();
const get = request.get;

export const FetchDataLocation = (params) => {
  return get(`/api/location/search`, { params: { query: params } });
};
