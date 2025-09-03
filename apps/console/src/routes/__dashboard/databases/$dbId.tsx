import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__dashboard/databases/$dbId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/db/$dbId"!</div>
}
