import { GetContentQuery } from "src/types/api";
import { ArticleResponse } from "src/types/article";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: ArticleResponse;
  };
};