import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export type Icon = (props: React.ComponentProps<"svg">) => JSX.Element

export interface StringObj {
  [x: string]: string
}
export interface ActionObj {
  [x: string]: ActionCreatorWithPayload<any, string>
}

export interface KeyValueObj {
  key: string
  value: string
}
