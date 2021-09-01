import BootstrapTable from "react-bootstrap-table-next";

export default function FileList({ files }) {
  const cols = [
    {
      dataField: "name",
      text: "Filnavn",
    },
    {
      dataField: "agency",
      text: "Bibl.nr",
    },
    {
      dataField: "creationTime",
      text: "Dato",
    },
    {
      dataField: "byteSize",
      text: "Størrelse",
    },
  ];

  return (
    <>
      <BootstrapTable
        keyField="name"
        data={[]}
        columns={cols}
        bordered={false}
        noDataIndication="Tabellen har ingen data at vise"
      />
    </>
  );
}
