import { ContentResponse } from "./api";
import { ImageResponse } from "./image";

export type ProfileResponse = ContentResponse<{
  name: string;
  body: string;
  twitterUrl: string;
  githubUrl: string;
  image: ImageResponse;
}>;