import { GetListContentsQuery } from "src/types/api";
import { ProfileResponse } from "src/types/profile";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: ProfileResponse;
  };
};