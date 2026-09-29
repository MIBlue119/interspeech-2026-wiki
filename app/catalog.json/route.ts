import { getAgentCatalog } from '@/lib/agent-export';

export const dynamic = 'force-static';
export function GET() {
  return Response.json(getAgentCatalog());
}
