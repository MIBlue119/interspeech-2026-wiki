import katex from 'katex';
import type { Root, RootContent } from 'mdast';
import type { VFile } from 'vfile';

export const MATH_FALLBACK_LABEL = 'Formula could not be rendered; check the original paper. Source: ';

/** Recover only the observed JSON-style control-character damage inside math. */
export function repairMathControls(value: string): string {
  return value
    .replace(/\t(ext|imes|au|heta|ilde|op)(?![A-Za-z])/g, (_, suffix: string) => `\\t${suffix}`)
    .replace(/\u0008eta(?![A-Za-z])/g, '\\beta');
}

/** Runs after remark-math: prose, links, HTML and code nodes are never repaired. */
export function remarkRepairMath() {
  return (tree: Root, file: VFile) => {
    function walk(node: Root | RootContent) {
      if (node.type === 'math' || node.type === 'inlineMath') {
        const source = node.value;
        const repaired = repairMathControls(source);
        node.value = repaired;
        try {
          const raw = String(file.value).slice(node.position?.start.offset, node.position?.end.offset);
          // Two observed formulas contain a line break where a serialized \r may
          // have been. Flag these exact signatures; do not infer rho from arbitrary
          // multiline math (e.g. "$4\n$" is valid).
          if (/^\$\r?\nho(?: = 0\.2)?\$$/.test(raw)) {
            throw new Error('Possible damaged rho command: line break followed by ho. Review the original paper.');
          }
          // Validate with throwing enabled: KaTeX's permissive fallback can otherwise
          // render an unknown command in red without marking it as a katex-error.
          katex.renderToString(repaired, { throwOnError: true, trust: false, strict: 'ignore', displayMode: node.type === 'math' });
          // remark-math also caches the source in hChildren; update that copy too.
          if (node.type === 'inlineMath') {
            node.data = { ...node.data, hChildren: [{ type: 'text', value: repaired }] };
          } else {
            node.data = { ...node.data, hChildren: [{
              type: 'element', tagName: 'code',
              properties: { className: ['language-math', 'math-display'] },
              children: [{ type: 'text', value: repaired }],
            }] };
          }
        } catch (error) {
          // Preserve the original formula instead of guessing missing mathematical
          // content. Plain HAST text stays escaped, even with hostile TeX input.
          node.data = {
            hName: 'span',
            hProperties: { className: ['katex-error'], title: String(error) },
            hChildren: [
              { type: 'text', value: MATH_FALLBACK_LABEL },
              { type: 'element', tagName: 'code', properties: {}, children: [{ type: 'text', value: source }] },
            ],
          };
        }
        return;
      }
      if ('children' in node) for (const child of node.children) walk(child);
    }
    walk(tree);
  };
}
