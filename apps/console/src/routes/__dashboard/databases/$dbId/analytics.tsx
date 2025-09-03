import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__dashboard/databases/$dbId/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__dashboard/databases/$dbId/analytics"!</div>
}
