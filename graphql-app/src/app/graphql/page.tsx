import type { Metadata } from 'next';
import { EditorQraphqlRequest } from './editor';

export const metadata: Metadata = {
  title: 'Editor - Graphql playground',
};

export default function GraphqlPage() {
  return (
    <main className="flex-1 flex flex-col items-center">
      <EditorQraphqlRequest />
    </main>
  );
}
