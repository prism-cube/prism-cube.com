import { ContentResponse, ListContentsResponse } from "./api";
import { ImageResponse } from "./image";

export type TagsResponse = ListContentsResponse<TagResponse>;

export type TagResponse = ContentResponse<{
  name?: string;
  image?: ImageResponse;
}>;