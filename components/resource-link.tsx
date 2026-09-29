import {
  ArrowUpRight,
  Code2,
  Database,
  ExternalLink,
  Box,
  Play,
} from "lucide-react";
import { describeResource } from "@/lib/resources";
export function ResourceLink({ url, title }: { url: string; title: string }) {
  const resource = describeResource(url);
  const Icon = {
    repository: Code2,
    dataset: Database,
    model: Box,
    demo: Play,
    resource: ExternalLink,
  }[resource.kind];
  return (
    <a
      className="resource-action"
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label={`${resource.label} for ${title} (opens in a new tab)`}
      title={resource.destination}
    >
      <Icon size={16} />
      <span>{resource.label}</span>
      <ArrowUpRight size={14} />
    </a>
  );
}
