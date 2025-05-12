import { Sidebar } from "@/components/Sidebar";

const exportedObject = {
  title: "Interne komponenter/Sidebar",
  component: Sidebar,
};

export default exportedObject;

export function example() {
  return <Sidebar />;
}
