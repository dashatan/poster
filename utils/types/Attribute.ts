interface Attribute {
  label: string
  formFieldType: string
  filterFieldType: string
  props?: Prop[]
  options?: string[]
}

export interface Prop {
  name: string
  value: string
}

export default Attribute
