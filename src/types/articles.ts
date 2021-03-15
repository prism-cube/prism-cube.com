import { ContentResponse, ListContentsResponse } from "./api";
import { TagResponse } from "./tag";
import { ImageResponse } from "./image";

export type ArticlesResponse = ListContentsResponse<ArticleResponse>;

export type ArticleResponse = ContentResponse<{
  title?: string;
  body?: string;
  tags?: TagResponse[];
  image?: ImageResponse;
}>;