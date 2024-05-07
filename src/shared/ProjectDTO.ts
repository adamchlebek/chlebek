export interface ProjectDTO {
  id: number;
  slug?: string;
  title: string;
  subheader: string;
  description?: string;
  dates?: string;
  isActive?: boolean;
  tools?: string;
  textColor: string;
  extraLinks?: [
    {
      title: string;
      url: string;
    },
  ];
  imageUrl?: string;
  screenshotUrls?: string[];
}
