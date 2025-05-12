import { FileList } from "@/components/FileList";

const exportedObject = {
  title: "Interne komponenter/FileList",
  component: FileList,
};

export default exportedObject;


export function userIs010100() {
  return (
    <FileList
      files={conversionFiles}
      isLoading={false}
      loginAgency={"010100"}
      title={"Konverteringer"}
    />
  );
}

export function userIs810010() {
  return (
    <FileList
      files={conversionFiles}
      isLoading={false}
      loginAgency={"810010"}
      title={"Konverteringer"}
    />
  );
}

const conversionFiles = [
  {
    id: 7511232,
    creationTime: 1632082337943,
    atime: null,
    byteSize: 358349,
    metadata: {
      name: "conversion.40465",
      jobId: 40465,
      agency: 810010,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
  {
    id: 7511222,
    creationTime: 1631996029081,
    atime: null,
    byteSize: 3497096,
    metadata: {
      name: "conversion.40442",
      jobId: 40442,
      agency: 810010,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
  {
    id: 7511131,
    creationTime: 1631696384460,
    atime: null,
    byteSize: 18,
    metadata: {
      name: "julemand.30864",
      agency: 820030,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
  {
    id: 7511130,
    creationTime: 1631695562452,
    atime: 1631867657718,
    byteSize: 18,
    metadata: {
      name: "julemand.txt",
      agency: 870970,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
  {
    id: 7511129,
    creationTime: 1631695480086,
    atime: 1631695489676,
    byteSize: 174,
    metadata: {
      name: "julemand.txt",
      agency: 870970,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
  {
    id: 7511128,
    creationTime: 1631694865183,
    atime: 1631695141665,
    byteSize: 163,
    metadata: {
      name: "julemand.txt",
      agency: 870970,
      origin: "dataio/sink/marcconv",
      claimed: false,
      category: "dataout",
    },
  },
];
