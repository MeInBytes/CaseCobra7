import { db } from "@/db";
import { notFound } from "next/navigation";
import DesignConfigurator from "./DesignConfigurator";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const { id } = searchParams;

  if (!id || typeof id !== "string") {
    return notFound();
  }

  const configuration = await db.configuration.findUnique({
    where: { id },
  });

  if (!configuration) {
    return notFound();
  }

  const { imageUrl, width, height } = configuration;

  return (
    <DesignConfigurator
      configId={configuration.id}
      imageDimensions={{ width, height }}
      imageUrl={imageUrl}
    />
  );
};

export default Page;
// Assuming you have the necessary imports
// import { notFound } from "next/navigation";

// interface PageProps {
//   searchParams: {
//     id?: string;
//   };
// }

// const Page = async ({ searchParams }: PageProps) => {
//   // Await the searchParams to access its properties
//   const { id } = await searchParams;

//   if (!id || typeof id !== "string") {
//     return notFound();
//   }

//   // Your component logic here
//   return (
//     <div>
//       <h1>Item ID: {id}</h1>
//       {/* Other component content */}
//     </div>
//   );
// };

// export default Page;
