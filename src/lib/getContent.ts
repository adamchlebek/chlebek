import type { AboutCardDTO } from "@/shared/AboutCardDTO";
import { createBucketClient } from "@cosmicjs/sdk";

const cosmic = createBucketClient({
  bucketSlug: import.meta.env.PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: import.meta.env.PUBLIC_COSMIC_READ_KEY,
});

export async function getHeaderText() {
  const data = await makeSingleRequest('texts', 'header');

  return data?.object.metadata.text.value;
}

export async function getAboutText() {
  const data = await makeSingleRequest('texts', 'about');

  return data?.object.metadata.text.value;
}

export async function getAboutCardsData() {
  const data = await makeMultipleRequest('about-cards');

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
    .map((x: { card: AboutCardDTO }) => x.card).sort((a, b) => a.id - b.id);
}


export async function getSkillsList() {
  const data = await makeSingleRequest('lists', 'skills');

  return data?.object.metadata.items;
}

export async function getCourseWorkList() {
  const data = await makeSingleRequest('lists', 'coursework');

  return data?.object.metadata.items;
}

export async function getCodingLevelList(){
  const data = await makeSingleRequest('lists', 'coding-levels');

  return data?.object.metadata.items;
}

async function makeSingleRequest(type: string, slug: string) {
  try {
    const data = await cosmic.objects.findOne({
      type: type,
      slug: slug,
    }).props("metadata")
    .depth(1)
  
    return data;
  } catch (error) {
    return undefined;
  }
}

async function makeMultipleRequest(type: string) {
  try {
    const data = await cosmic.objects
      .find({ type: type })
      .props("metadata")
      .depth(1);

    return data;
  } catch (error) {
    return undefined;
  }
}