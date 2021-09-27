import { getSession } from "next-auth/client";
import { UploadForm } from "@/components/UploadForm";
import { readFile } from "@/components/file-helper";

const UploadPage = () => {
  async function onUpload(file, metadata) {
    const fileContent = await readFile(file);

    const uploadResponse = await fetch("/api/files/add", {
      method: "POST",
      body: fileContent,
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    const body = await uploadResponse.json();
    const fileLocation = body.location;

    const data = {
      fileId: fileLocation,
      metadata: metadata,
    };
    const metadataResponse = await fetch("/api/files/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }

  return (
    <>
      <UploadForm onUpload={onUpload} />
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

export default UploadPage;
