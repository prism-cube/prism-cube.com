import { ContentResponse, ListContentsResponse } from "./api";
import { ImageResponse } from "./image";

export type TechsResponse = ListContentsResponse<TechResponse>;

export type TechResponse = ContentResponse<{
  name?: string;
  image?: ImageResponse;
}>;