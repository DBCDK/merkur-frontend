import FileList from "@/components/FileList";
import { useEffect, useState } from "react";
import FileFilter from "@/components/FileFilter";
import { getSession } from "next-auth/client";

const ConversionPage = () => {
  const [files, setFiles] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/files/search")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setFiles(data);
      });
  }, []);

  if (isLoading || !files) {
    return <p>Indlæser data...</p>;
  }

  const agencies = [...new Set(files.map((item) => item.metadata.agency))];

  return (
    <>
      <div>
        <h3>Konverteringsservice</h3>
      </div>
      <div>
        <h6>
          Ses filen ikke? Gå evt. til&nbsp;
          <a
            href="http://dbcposthus.dbc.dk/dataleverancer/index.php"
            target="_blank"
          >
            Det gamle DBC-posthus
          </a>
        </h6>
      </div>
      <div>
        <h4>Filer til afhentning</h4>
      </div>
      <div>
        <FileFilter agencies={agencies} />
      </div>
      <div>{<FileList files={files} />}</div>
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
