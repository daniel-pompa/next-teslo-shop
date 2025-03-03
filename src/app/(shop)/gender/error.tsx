'use client';
import { ErrorComponent } from '@/components';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorComponent error={error} reset={reset} />;
}
