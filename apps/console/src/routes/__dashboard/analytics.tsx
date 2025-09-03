import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__dashboard/analytics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__dashboard/analytics"!</div>
}
