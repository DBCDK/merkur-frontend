// src/pages/delivered/index.js
import { useEffect, useState } from "react";
import { defaultCategory, periodicJobsOrigin } from "@/constants";
import { FileList } from "@/components/FileList";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";
import { log } from "dbc-node-logger";

const PeriodicJobsPage = ({ session }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = {
      category: defaultCategory,
      origin: periodicJobsOrigin,
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
        log.error("PeriodicJobsPage error", { error: error });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <FileList
      title="Dataleverancer"
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

export default PeriodicJobsPage;
