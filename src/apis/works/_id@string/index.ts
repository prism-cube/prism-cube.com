import { GetContentQuery } from "src/types/api";
import { WorkResponse } from "src/types/works";

export type Methods = {
  get: {
    query?: GetContentQuery;
    resBody: WorkResponse;
  };
};