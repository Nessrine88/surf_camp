import { getTranslations } from "next-intl/server";
import HeroSection from "./_components/HeroSection";
import InfoBlock from "./_components/InfoBlock";
import { fetchDataFromStrapi, processInfoBlocks } from "@/utils/stapi-utils";
export default async function Home() {
  const t = await getTranslations("Homepage");
  const data = await fetchDataFromStrapi("infoblocks-landing?populate=deep");

  console.log("Raw Strapi data:", data);

  const infoBlockData = processInfoBlocks(data);

  console.log("Processed data:", infoBlockData);
  const heroHeadline = (
    <>
      <h1>barrel</h1>
      <h1>your.</h1>
      <h1>happiness.</h1>
    </>
  );

  return (
    <div>
      <HeroSection headline={heroHeadline} />

      {infoBlockData.map((data: any) => (
        <InfoBlock key={data.id} data={data} />
      ))}
    </div>
  );
}

export const revalidate = 300;
