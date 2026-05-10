import { sectionId } from '../../utils/chapter';
import type { ReactNode } from 'react';

function extractText(node: ReactNode): string {
  if (!node) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  // Astro wraps static MDX heading content in { hydrate, value } where
  // value is an Astro-specific object whose toString() returns the text.
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>;
    if ('props' in obj) {
      const props = obj.props as Record<string, unknown>;
      if ('value' in props) return String(props.value);
      if ('children' in props) return extractText(props.children as ReactNode);
    }
  }
  return '';
}

export default function SectionHead({ children }: { children: ReactNode }) {
  const text = extractText(children);
  const id = text ? sectionId(text) : undefined;
  return (
    <div id={id} className="sec-head">
      <span>{children}</span>
    </div>
  );
}
