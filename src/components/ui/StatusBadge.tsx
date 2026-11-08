import type { ProjectStatus } from '@/data/types'
import { statusMeta } from '@/data/status'
import { Badge } from './Badge'
import { Led } from './Led'

export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const meta = statusMeta[status]
  return (
    <Badge tone={meta.tone} className={className}>
      <Led tone={meta.tone} />
      <span>{meta.label}</span>
      <span className="sr-only"> — {meta.pt}</span>
    </Badge>
  )
}
