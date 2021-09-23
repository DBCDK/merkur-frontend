import { getSession } from "next-auth/client";
import { UploadForm } from "@/components/UploadForm";

const UploadPage = () => {

  function onUpload(file, metadata) {
    // TODO Implement
    console.log(JSON.stringify(metadata));
    console.log(file)
  }

  return (
    <>
      <UploadForm onUpload={onUpload}/>
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
