import { GetContentQuery } from "src/types/api";
import { TagResponse } from "src/types/tags";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: TagResponse;
  };
};