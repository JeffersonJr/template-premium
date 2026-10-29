import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/vitrine.html")({
  beforeLoad: () => {
    throw redirect({ to: "/vitrine", replace: true, statusCode: 301 });
  },
});
