import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/__dashboard/databases/$dbId/configuration',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__dashboard/databases/$dbId/configuration"!</div>
}
