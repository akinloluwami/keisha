import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__dashboard/logs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__dashboard/logs"!</div>
}
