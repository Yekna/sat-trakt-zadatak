export type JobicyApiResponse = {
  jobs: Job[];
  success: boolean;
  message?: string;
  error?: string;
};

export type Job = {
  url: string;
  companyLogo: string;
  jobIndustry: string[];
  jobTitle: string;
  companyName: string;
  jobExcerpt: string;
  jobType: string[];
  jobGeo: string;
  jobLevel: string;
};