import { File } from "@/components/File";

const exportedObject = {
  title: "Interne komponenter/File",
  component: File,
};

export default exportedObject;

export function example() {
  const file = {
    id: "1234",
    creationTime: "2021-09-29T09:08:42.711Z",
    byteSize: 42,
    metadata: {
      agency: "123456",
      name: "test",
    },
  };

  return (
    <div>
      <p>{File(file)}</p>
    </div>
  );
}
