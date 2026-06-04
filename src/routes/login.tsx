import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "@/components/shared/AuthShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — HavenlyEst" },
      { name: "description", content: "Sign in to your HavenlyEst account to save listings and message agents." },
    ],
  }),
  component: () => <AuthShell mode="login" />,
});
