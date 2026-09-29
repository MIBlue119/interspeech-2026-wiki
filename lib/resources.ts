export type ResourceKind =
  "repository" | "dataset" | "model" | "demo" | "resource";
export function describeResource(url: string): {
  kind: ResourceKind;
  label: string;
  destination: string;
} {
  const parsed = new URL(url);
  const host = parsed.hostname.replace(/^www\./, "");
  const segments = parsed.pathname.split("/").filter(Boolean);
  const destination = [host, ...segments.slice(0, 2)].join("/");
  if (
    ["github.com", "gitlab.com", "bitbucket.org", "codeberg.org"].includes(
      host,
    ) &&
    segments.length >= 2
  )
    return { kind: "repository", label: "View repository", destination };
  if (host === "huggingface.co" && segments[0] === "datasets")
    return { kind: "dataset", label: "View dataset", destination };
  if (host === "huggingface.co" && segments[0] === "spaces")
    return { kind: "demo", label: "Try demo", destination };
  if (
    host === "huggingface.co" &&
    segments.length >= 2 &&
    ![
      "docs",
      "collections",
      "papers",
      "blog",
      "organizations",
      "settings",
    ].includes(segments[0])
  )
    return { kind: "model", label: "View model", destination };
  if (host === "modelscope.cn" && segments[0] === "models")
    return { kind: "model", label: "View model", destination };
  return { kind: "resource", label: "Open resource", destination };
}
