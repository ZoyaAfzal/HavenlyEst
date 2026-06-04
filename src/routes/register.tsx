import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/shared/AuthShell";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account — HavenlyEst" },
      { name: "description", content: "Create a HavenlyEst account to save listings, schedule visits, and message vetted agents." },
    ],
  }),
  component: () => <AuthShell mode="register" />,
});
