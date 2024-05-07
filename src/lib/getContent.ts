import type { AboutCardDTO } from "@/shared/AboutCardDTO";
import type { EducationCardDTO } from "@/shared/EducationCardDTO";
import type { ImageDataDTO } from "@/shared/ImageDataDTO";
import type { ProjectDTO } from "@/shared/ProjectDTO";
import type { ScreenshotDataDTO } from "@/shared/ScreenshotDataDTO";
import type { WorkCardDTO } from "@/shared/WorkCardDTO";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: import.meta.env.PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.PUBLIC_COSMIC_READ_KEY,
});

export async function getHeaderText() {
  const data = await makeSingleRequest("texts", "header");

  return data?.object.metadata.text.value;
}

export async function getAboutText() {
  const data = await makeSingleRequest("texts", "about");

  return data?.object.metadata.text.value;
}

export async function getAboutCardsData() {
  const data = await makeMultipleRequest("abouts");

  return data?.objects
    .map(
      (x: {
        slug: string;
        title: string;
        metadata: {
          card: AboutCardDTO;
        };
      }) => x.metadata,
    )
    .map((x: { card: AboutCardDTO }) => x.card)
    .sort((a: AboutCardDTO, b: AboutCardDTO) => a.id - b.id);
}

export async function getProjectCardData() {}

export async function getProjectData() {
  const data = await makeMultipleRequest("projects");

  return data?.objects
    .map(
      (x: {
        slug: string;
        title: string;
        metadata: {
          card: ProjectDTO;
        };
      }) => {
        return {
          ...x.metadata,
          slug: x.slug,
        };
      },
    )
    .map(
      (x: {
        card: ProjectDTO;
        logo: ImageDataDTO;
        screenshots: ScreenshotDataDTO[];
        slug: string;
      }) => {
        return {
          ...x.card,
          slug: x.slug,
          imageUrl: x.logo?.url,
          screenshotUrls: x.screenshots.map(
            (screenshot) => screenshot.screenshot?.url,
          ),
        };
      },
    );
}

export async function getSingleProjectData(slug: string): Promise<ProjectDTO> {
  const data = await cosmic.objects
    .findOne({
      type: "projects",
      slug: slug,
    })
    .props(["slug", "metadata"])
    .depth(1);

  return {
    ...data.object.metadata.card,
    slug: data.object.slug,
    imageUrl: data.object.metadata.logo.url,
    screenshotUrls: data.object.metadata.screenshots.map(
      (screenshot: ScreenshotDataDTO) => screenshot.screenshot.url,
    ),
  };
}

export async function getSkillsList() {
  const data = await makeSingleRequest("lists", "skills");

  return data?.object.metadata.items;
}

export async function getCourseWorkList() {
  const data = await makeSingleRequest("lists", "coursework");

  return data?.object.metadata.items;
}

export async function getCodingLevelList() {
  const data = await makeSingleRequest("lists", "coding-levels");

  return data?.object.metadata.items;
}

export async function getEducationCardsData() {
  const data = await makeMultipleRequest("educations");

  return data?.objects
    .map(
      (x: {
        slug: string;
        title: string;
        metadata: {
          card: EducationCardDTO;
        };
      }) => x.metadata,
    )
    .map((x: { card: EducationCardDTO; logo: ImageDataDTO }) => {
      return {
        ...x.card,
        logoUrl: x.logo.url,
      };
    })
    .sort((a: EducationCardDTO, b: EducationCardDTO) => b.id - a.id);
}

export async function getWorkCardsData() {
  const data = await makeMultipleRequest("works");

  return data?.objects
    .map(
      (x: {
        slug: string;
        title: string;
        metadata: {
          card: WorkCardDTO;
        };
      }) => x.metadata,
    )
    .map((x: { card: WorkCardDTO; logo: ImageDataDTO }) => {
      return {
        ...x.card,
        logoUrl: x.logo.url,
      };
    })
    .sort((a: WorkCardDTO, b: WorkCardDTO) => b.id - a.id);
}

async function makeSingleRequest(type: string, slug: string) {
  try {
    const data = await cosmic.objects
      .findOne({
        type: type,
        slug: slug,
      })
      .props("metadata")
      .depth(1);

    return data;
  } catch (error) {
    return undefined;
  }
}

async function makeMultipleRequest(type: string) {
  try {
    const data = await cosmic.objects
      .find({ type: type })
      .props(["slug", "metadata"])
      .depth(1);

    return data;
  } catch (error) {
    return undefined;
  }
}
