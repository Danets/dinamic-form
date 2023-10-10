export interface Response {
    encounter: Encounter
    conditions: Condition[]
  }
  
  export interface Encounter {
    date: string
  }
  
  export interface Condition {
    id: string
    context: Context
    code: Code
    notes: string
    onset_date: string
  }
  
  export interface Context {
    identifier: Identifier
  }
  
  export interface Identifier {
    type: Type
    value: string
  }
  
  export interface Type {
    coding: Coding[]
  }
  
  export interface Coding {
    system: string
    code: string
  }
  
  export interface Code {
    coding: Coding2[]
  }
  
  export interface Coding2 {
    system: string
    code: string
  }
  