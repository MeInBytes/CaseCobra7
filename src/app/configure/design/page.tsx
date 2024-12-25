// // import { db } from "@/db";
// import { notFound } from "next/navigation";
// import DesignConfigurator from "./DesignConfigurator";
// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();
// // interface PageProps {
// //   searchParams: {
// //     [key: string]: string | string[] | undefined;
// //   };
// // }
// interface PageProps {
//   searchParams: Record<string, string | string[] | undefined>;
// }
// const Page = async ({ searchParams }: PageProps) => {
//   const { id } = await searchParams;

//   if (!id || typeof id !== "string") {
//     return notFound();
//   }

//   const configuration = await db.configuration.findUnique({
//     where: { id },
//   });

//   if (!configuration) {
//     return notFound();
//   }

//   const { imageUrl, width, height } = configuration;

//   return (
//     <DesignConfigurator
//       configId={configuration.id}
//       imageDimensions={{ width, height }}
//       imageUrl={imageUrl}
//     />
//   );
// };

// export default Page;

import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

// Updated type definition for searchParams
export interface PageProps {
  searchParams: {
    id?: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  // Await the searchParams
  const params = await searchParams;

  // Safely extract the id from searchParams
  const id = params.id;

  // Validate the id
  if (!id || typeof id !== "string") {
    return notFound();
  }

  // Fetch configuration
  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  // Handle case where configuration is not found
  if (!configuration) {
    return notFound();
  }

  // Destructure necessary configuration properties
  const { imageUrl, width, height } = configuration;

  // Render the DesignConfigurator with configuration details
  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default Page;
