import { createFileRoute } from "@tanstack/react-router";
import { ArcadePage } from "@/components/arcade/arcade-page";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <ArcadePage />;
}
