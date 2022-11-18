export interface T {
  [key: string]: string
}
export type HeroIcon = (props: React.ComponentProps<"svg">) => JSX.Element

export interface Filters {
  [x: string]: string
}
export interface FormData {
  [x: string]: string
}

export interface KeyValueObj {
  key: string
  value: string
}
