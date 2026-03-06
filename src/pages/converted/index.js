import { useEffect, useState } from "react";
import { getServerSession } from "next-auth/next";
import { conversionsOrigin, defaultCategory } from "@/constants";
import { FileList } from "@/components/FileList";
import { options } from "@/pages/api/auth/[...nextauth]";
import { log } from "dbc-node-logger";

const ConversionPage = ({ session }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = {
      category: defaultCategory,
      origin: conversionsOrigin,
    };

    fetch("/api/files/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          alert(text);
          throw new Error(text);
        }
        return response.json();
      })
      .then((item) => {
        setFiles(item);
      })
      .catch((error) => {
        log.error("ConversionPage error", { error: error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <FileList
      title="Konverteringsservice"
      files={files}
      isLoading={isLoading}
      loginAgency={session.user.netpunktAgency}
    />
  );
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, options);

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
