import { GetListContentsQuery } from "src/types/api";
import { ArticlesResponse } from "src/types/articles";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: ArticlesResponse;
  };
};