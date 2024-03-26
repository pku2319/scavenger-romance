import { ReactElement } from "react"

export async function resolvedComponent(Component: (arg0: any) => any, props: any) {
  const ComponentResolved = await Component(props)
  return () => ComponentResolved
}