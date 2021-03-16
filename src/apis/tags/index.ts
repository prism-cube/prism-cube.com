import { GetListContentsQuery } from "src/types/api";
import { TagsResponse } from "src/types/tags";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: TagsResponse;
  };
};