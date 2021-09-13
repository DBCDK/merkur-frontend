import { getSession, useSession } from "next-auth/client";

export default function Delivered() {
  return (
    <>
      <h1>Delivered</h1>
    </>
  );
}

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
