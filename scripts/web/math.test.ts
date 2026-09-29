import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { WikiMarkdown } from '../../components/wiki-markdown';
import { MATH_FALLBACK_LABEL, repairMathControls } from '../../lib/markdown';
import { getContent, getPapers } from '../../lib/papers';

const render = (markdown: string) => renderToStaticMarkup(createElement(WikiMarkdown, { children: markdown }));

test('paper loss expressions render accessible inline math inside prose', () => {
  const html = render(String.raw`Joint loss ($L_{ctc} + \lambda_{ce}L_{ce}$) improves alignment.`);
  assert.match(html, /class="katex"/);
  assert.match(html, /<math /);
  assert.match(html, /<msub>/);
  assert.match(html, /λ/);
  assert.match(html, /Joint loss \(/);
  assert.match(html, /\) improves alignment\./);
  assert.doesNotMatch(html, /katex-error|katex-display/);
});

test('block math renders display layout and aligned equations', () => {
  const html = render(String.raw`Before.

$$
\begin{aligned}
L &= L_{ctc} + \lambda_{ce} L_{ce} \\
\lambda_{ce} &= 0.5
\end{aligned}
$$

After.`);
  assert.match(html, /class="katex-display"/);
  assert.match(html, /display="block"/);
  assert.match(html, /<mtable/);
  assert.doesNotMatch(html, /katex-error/);
});

test('inline double-dollar delimiters render math without rewriting source', () => {
  assert.match(render('Compare $$x_1 + x_2$$ here.'), /class="katex"/);
});

test('inline, fenced and indented code remain literal; escaped dollars remain text', () => {
  const html = render('`$L_{ctc}$`\n\n```python\nloss = "$x$"\n```\n\n    $$x + y$$\n\nEscaped \\$x\\$');
  assert.match(html, /<code>\$L_\{ctc\}\$<\/code>/);
  assert.match(html, /<code class="language-python">loss = &quot;\$x\$&quot;/);
  assert.match(html, /<pre><code>\$\$x \+ y\$\$/);
  assert.match(html, /Escaped \$x\$/);
  assert.doesNotMatch(html, /class="katex/);
});

test('raw HTML and dangerous Markdown links remain untrusted', () => {
  const html = render('<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">\n\n[unsafe](javascript:alert%281%29)');
  assert.doesNotMatch(html, /<script|<img|href="javascript:/);
  assert.match(html, /&lt;script&gt;/);
});

test('TeX cannot create trusted HTML or dangerous links', () => {
  const html = render(String.raw`$\href{javascript:alert(1)}{click}$ $\htmlClass{injected}{x}$`);
  assert.doesNotMatch(html, /href="javascript:|class="injected"/);
});

test('malformed TeX falls back visibly without breaking the digest', () => {
  const html = render(String.raw`Before $\frac{$ after.`);
  assert.match(html, /katex-error/);
  assert.ok(html.includes(MATH_FALLBACK_LABEL));
  assert.match(html, /Before/);
  assert.match(html, /after\./);
});

test('only recognized control-character command damage is recovered', () => {
  for (const command of ['text', 'times', 'tau', 'theta', 'tilde', 'top']) {
    assert.equal(repairMathControls('\t' + command.slice(1)), '\\' + command);
  }
  assert.equal(repairMathControls('\beta_1'), String.raw`\beta_1`);
  assert.equal(repairMathControls('\ttext \tunknown \textual \betamax'), '\ttext \tunknown \textual \betamax');
  assert.equal(repairMathControls(String.raw`\theta + \text{x}`), String.raw`\theta + \text{x}`);
});

test('repaired inline and display math reaches KaTeX while prose and code stay literal', () => {
  const damaged = '\text{loss} + 2\times\tau + \theta + \tilde{x} + x^\top + \beta';
  for (const source of [`$${damaged}$`, `$$\n${damaged}\n$$`]) {
    const html = render(source);
    assert.match(html, /class="katex"/);
    assert.doesNotMatch(html, /katex-error/);
    assert.ok(html.includes(String.raw`\text{loss}`));
    assert.ok(html.includes(String.raw`\beta`));
    assert.match(html, /β/);
  }
  const html = render(`Prose: ${damaged}\n\n\`${damaged}\`\n\n\`\`\`text\n${damaged}\n\`\`\``);
  assert.ok(html.includes(damaged));
  assert.doesNotMatch(html, /class="katex|\\text|\\beta/);
});

test('valid multiline math is preserved and ambiguous damaged rho is not guessed', () => {
  const valid = render('$4\n$');
  assert.match(valid, /class="katex"/);
  assert.doesNotMatch(valid, /katex-error/);
  assert.equal(repairMathControls('\nho'), '\nho');
  assert.equal(repairMathControls('\nho = 0.2'), '\nho = 0.2');
  for (const formula of ['$\nho$', '$\nho = 0.2$']) {
    const html = render(formula);
    assert.ok(html.includes(MATH_FALLBACK_LABEL));
    assert.match(html, /Possible damaged rho command/);
    assert.doesNotMatch(html, /class="katex"/);
  }
});

test('unknown commands get an explicit fallback rather than a plausible-looking formula', () => {
  const html = render(String.raw`$\span S$ $\L_{shape}$`);
  assert.equal([...html.matchAll(/class="katex-error"/g)].length, 2);
  assert.equal(html.split(MATH_FALLBACK_LABEL).length - 1, 2);
});

// Reviewed source defects; match exact formulas, not just counts, so a new error
// in an already affected paper still fails the corpus regression test.
const knownSourceErrors: Record<string, string[]> = {
  carson26_interspeech: [String.raw`\mathbb{1}_{|\hat{S}| > |\span S|}`],
  choi26g_interspeech: [String.raw`T'_ \times F'_`],
  magoshi26b_interspeech: ['t^^*'],
  monir26_interspeech: Array(3).fill(String.raw`L_{\text{SIR}\cdot\text{SP}\cdot\text{SF}`),
  mukhituly26_interspeech: [String.raw`y \in \{\text{benign}, \text{harmful}, \text{jailbreak\}`],
  singh26d_interspeech: ['I_F \\'],
  wang26i_interspeech: [String.raw`\L_{shape}`],
  zhao26c_interspeech: [String.raw`X_\tilde{}(\cdot, l, f) = \text{cat}(X(:, 2l-1, f), X(:, 2l, f)) \in \mathbb{R}^4`],
  kumar26g_interspeech: ['\nho', '\nho = 0.2'],
};

test('corpus has no unexplained KaTeX failures or damaged-rho fallbacks', (t) => {
  const actual: Record<string, string[]> = {};
  for (const paper of getPapers()) {
    const html = render(getContent(paper.id));
    const failures = [...html.matchAll(/class="katex-error"[^>]*>[^<]*<code>([\s\S]*?)<\/code><\/span>/g)];
    assert.equal(failures.length, [...html.matchAll(/class="katex-error"/g)].length, `${paper.id}: unlabeled fallback`);
    if (failures.length) actual[paper.id] = failures.map(match => match[1]);
  }
  const expected = Object.fromEntries(Object.entries(knownSourceErrors).map(([id, formulas]) => [id,
    formulas.map(formula => renderToStaticMarkup(createElement('code', null, formula)).slice(6, -7)),
  ]));
  assert.deepEqual(actual, expected);
  t.diagnostic(`Remaining reviewed source defects: ${Object.entries(knownSourceErrors).map(([id, values]) => `${id} (${values.length})`).join(', ')}`);
});

test('heading anchors, related links, external links and scrollable GFM tables survive', () => {
  const html = render('## Experimental setup\n\n[Related](chen26z_interspeech.md#results) [Source](https://example.org/paper)\n\n| Loss | Value |\n| --- | --- |\n| $L_{ctc}$ | 0.5 |');
  assert.match(html, /<h2 id="experimental-setup">/);
  // Next's Link normalizes trailing slashes according to the runtime config.
  assert.match(html, /href="\/papers\/chen26z_interspeech\/?#results"/);
  assert.match(html, /href="https:\/\/example.org\/paper" target="_blank" rel="noreferrer"/);
  assert.match(html, /class="table-scroll" tabindex="0" role="region" aria-label="Research results table"><table>/);
  assert.match(html, /<td><span class="katex"/);
});
