import { ContentResponse, ListContentsResponse } from "./api";
import { TechResponse } from "./tech";
import { ImageResponse } from "./image";

export type WorksResponse = ListContentsResponse<WorkResponse>;

export type WorkResponse = ContentResponse<{
  title: string;
  body?: string;
  description: string;
  url?: string;
  platform: string[];
  techs: TechResponse[];
  image?: ImageResponse;
  githubUrl?: string;
  appStoreUrl?: string;
  googlePlayUrl?: string;
}>;