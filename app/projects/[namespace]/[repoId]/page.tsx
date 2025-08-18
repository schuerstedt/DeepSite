import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { apiServer } from "@/lib/api";
import MY_TOKEN_KEY from "@/lib/get-cookie-name";
import { AppEditor } from "@/components/editor";

async function getProject(namespace: string, repoId: string) {
  // TODO replace with a server action
  const cookieStore = await cookies();
  const token = cookieStore.get(MY_TOKEN_KEY())?.value;
  if (!token) return {};
  try {
    const { data } = await apiServer.get(
      `/me/projects/${namespace}/${repoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.project;
  } catch {
    return {};
  }
}

export default async function ProjectNamespacePage({
  params,
}: {
  params: Promise<{ namespace: string; repoId: string }>;
}) {
  const { namespace, repoId } = await params;
  const project = await getProject(namespace, repoId);
  if (!project?.html) {
    redirect("/projects");
  }
  return <AppEditor project={project} />;
}
