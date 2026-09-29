import { getAgentMarkdown, getAgentPaperIds } from '@/lib/agent-export';

export const dynamic = 'force-static';
export const dynamicParams = false;
export function generateStaticParams() {
  return getAgentPaperIds().map(id => ({ id }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const markdown = getAgentMarkdown(id);
  if (markdown === undefined) return new Response('Paper not found', { status: 404 });
  return new Response(markdown, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
