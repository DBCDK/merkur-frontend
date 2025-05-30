import { FileFilter } from "@/components/FileFilter";

const onSetSelectedAgency = (value) => {
  alert(`Valgt agency: ${value}`);
};

const exportedObject = {
  title: "Interne komponenter/FileFilter",
  component: FileFilter,
};

export default exportedObject;

export function userIsAdmin() {
  return (
    <FileFilter
      agencies={agencies}
      setSelectedAgency={onSetSelectedAgency}
      loginAgency={"010100"}
    />
  );
}

export function userIsFBS() {
  return (
    <FileFilter
      agencies={agencies}
      setSelectedAgency={onSetSelectedAgency}
      loginAgency={"710010"}
    />
  );
}

const agencies = ["870970", "710010", "830020", undefined];
