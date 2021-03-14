import { GetListContentsQuery } from "src/types/api";
import { ArticlesResponse } from "src/types/article";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: ArticlesResponse;
  };
};