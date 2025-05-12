import { useEffect, useState } from "react";
import { defaultCategory, periodicJobsOrigin } from "@/constants";
import { FileList } from "@/components/FileList";
import { getServerSession } from "next-auth/next";
import { options } from "@/pages/api/auth/[...nextauth]";

const PeriodicJobsPage = ({ session }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const data = {
      category: defaultCategory,
      origin: periodicJobsOrigin,
    };
    setIsLoading(true);
    fetch("/api/files/search", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          alert(text);
          throw response;
        }
        return response.json();
      })
      .then((item) => {
        setIsLoading(false);
        setFiles(item);
      });
  }, []);

  return (
    <>
      <FileList
        title="Dataleverancer"
        files={files}
        isLoading={isLoading}
        loginAgency={session.user.netpunktAgency}
      />
    </>
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
