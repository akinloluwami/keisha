import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__dashboard/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__dashboard/settings"!</div>
}
