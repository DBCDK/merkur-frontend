import { useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/client";
import { conversionsOrigin, defaultCategory } from "@/constants";
import { FileList } from "@/components/FileList";

const ConversionPage = () => {
  const [session] = useSession();
  const [files, setFiles] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const data = {
    category: defaultCategory,
    origin: conversionsOrigin,
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/files/search", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((item) => {
        setIsLoading(false);
        setFiles(item);
      });
  }, []);

  return (
    <>
      <FileList
        title="Konverteringsservice"
        files={files}
        isLoading={isLoading}
        loginAgency={session.user.netpunktAgency}
      />
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ConversionPage;
