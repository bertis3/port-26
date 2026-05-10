import type { ReactNode } from 'react';

export default function Pullquote({ children }: { children: ReactNode }) {
  return <p className="pull">{children}</p>;
}
