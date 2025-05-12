import { FileTable } from "@/components/FileTable";

const exportedObject = {
  title: "Interne komponenter/FileTable",
  component: FileTable,
};

export default exportedObject;

export function emptyFileList() {
  return <FileTable files={[]} />;
}

export function multipleFiles() {
  const files = [
    {
      id: "1234",
      creationTime: "2021-09-29T09:08:42.711Z",
      byteSize: 42,
      metadata: {
        agency: "123456",
        name: "test",
      },
    },
  ];

  return <FileTable files={files} />;
}
