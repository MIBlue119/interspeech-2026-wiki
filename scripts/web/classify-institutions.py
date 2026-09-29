# /// script
# requires-python = ">=3.11"
# dependencies = ["typesafe-sdk", "python-dotenv"]
# ///
"""Classify public institution names with TypeSafe Jev. Credentials never enter output.

Usage:
  uv run scripts/web/classify-institutions.py --input /tmp/institutions.json --env-file /path/to/.env

Resume-safe: completed classifications are retained. Use --limit for a small pilot.
The --env-file may provide TYPESAFE_API_KEY or JEV_API_KEY.
"""
import argparse
import asyncio
import json
import os
from pathlib import Path
from dotenv import dotenv_values
from typesafe_sdk import AsyncTypeSafeClient, Choice

ROOT = Path(__file__).resolve().parents[2]
QUESTION = Choice(
    instructions=(
        "Classify the named author affiliation for a speech research paper directory. "
        "Use the actual organization's identity when you know it, not just a generic word like Institute. "
        "A corporate research lab belongs to company; a department of a university belongs to university. "
        "Institutes of Technology that grant university degrees belong to university. "
        "Public standalone research organizations such as CNRS, Academia Sinica, Chinese Academy of Sciences, "
        "Inria, DFKI and RIKEN belong to research. Government departments, hospitals, funding programs, "
        "unknown organizations, or ambiguous joint affiliations belong to other. "
        "Do not guess for unknown names. Choose other if you cannot confidently identify the type."
    ),
    criteria={
        "university": "University, college, higher education school, degree-granting institute or a department thereof.",
        "company": "Commercial company, startup, business, or a lab operated by one company.",
        "research": "Standalone government, public, nonprofit or independent research institute, not a university or corporate lab.",
        "other": "Unknown, ambiguous, mixed organization, hospital, government office, funding program, or none of the above.",
    },
)
async def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--input',required=True)
    ap.add_argument('--env-file',required=True)
    ap.add_argument('--limit',type=int,default=0)
    ap.add_argument('--concurrency',type=int,default=12)
    args=ap.parse_args()
    credentials=dotenv_values(args.env_file)
    token=credentials.get('TYPESAFE_API_KEY') or credentials.get('JEV_API_KEY')
    if not token: raise SystemExit('No TypeSafe credential found in the supplied env file.')
    os.environ['TYPESAFE_API_KEY']=token
    output=ROOT/'lib/institution-classifications.json'
    rows=json.loads(output.read_text()) if output.exists() else {}
    names=[n for n in json.loads(Path(args.input).read_text()) if n not in rows]
    if args.limit: names=names[:args.limit]
    sem=asyncio.Semaphore(args.concurrency)
    failed=0
    def save(): output.write_text(json.dumps(dict(sorted(rows.items())),indent=2,ensure_ascii=False)+'\n')
    async with AsyncTypeSafeClient() as client:
        async def classify(name):
            nonlocal failed
            async with sem:
                try:
                    response=await client.system_one(model='jev-latest',state={'institution_name':name},questions={'kind':QUESTION})
                    result=response.choices['kind']
                    confidence=round(float(result.confidence),4)
                    rows[name]={'type':result.choice if confidence>=0.8 else 'other','suggested_type':result.choice,'confidence':confidence,'model':'jev-latest','source':'TypeSafe','updated':'2026-09-29'}
                    if len(rows)%50==0: save();print(f'Classified {len(rows)} names; failures: {failed}',flush=True)
                except Exception as exc:
                    failed+=1
                    # Avoid dumping request headers or service payloads containing credentials.
                    print(f'Classification failed for one institution: {type(exc).__name__}',flush=True)
        await asyncio.gather(*(classify(name) for name in names))
    save()
    print(json.dumps({'classified':len(rows),'failed':failed,'counts':{kind:sum(r['type']==kind for r in rows.values()) for kind in ['university','company','research','other']}}),flush=True)
if __name__=='__main__':asyncio.run(main())
