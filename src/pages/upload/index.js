import { getSession } from "next-auth/client";
import { UploadForm } from "@/components/UploadForm";
import { readFile } from "@/components/file-helper";
import { useState } from "react";
import { BusySpinner } from "@/components/BusySpinner";

const UploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  async function onUpload(file, metadata) {
    setIsUploading(true);
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

    setIsUploading(false);
    setUploadComplete(true);
  }

  return (
    <div>
      <UploadForm onUpload={onUpload} />
      {isUploading && <BusySpinner label="Filoverførsel igang..." />}
      {uploadComplete && <div>Filoverførsel færdig</div>}
    </div>
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
