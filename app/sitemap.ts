import type { MetadataRoute } from 'next';
import { getPapers } from '@/lib/papers';
import { SITE_URL } from '@/lib/site';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return [{url:SITE_URL+'/',priority:1},...['categories','institutions','about'].map(p=>({url:`${SITE_URL}/${p}/`,priority:.7})),...getPapers().map(p=>({url:`${SITE_URL}/papers/${p.id}/`,...(p.updated?{lastModified:p.updated}:{}),priority:.5}))];}
