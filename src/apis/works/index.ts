import { GetListContentsQuery } from "src/types/api";
import { WorksResponse } from "src/types/works";

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: WorksResponse;
  };
};