import dynamic from "next/dynamic";

// Dynamically import with SSR disabled to ensure the scroll events work on the client.
const ScrollScrubbedHeader = dynamic(
  () => import("../util/ScrollScrubbedHeader"),
  { ssr: false }
);

export default function Home() {
  return (
    <div>
      <ScrollScrubbedHeader start={0.0} end={0.3} threshold={300} />
      {/* Other content goes here */}
    </div>
  );
}