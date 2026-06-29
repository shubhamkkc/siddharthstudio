import { Studio } from "sanity";
import config from "../../sanity.config";

export default function SanityStudio() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Studio config={config} />
    </div>
  );
}
