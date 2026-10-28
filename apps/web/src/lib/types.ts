export type ClientStatus = 'potencial' | 'contactado' | 'negociación' | 'cliente'

export interface Client {
  id: string
  name: string
  email?: string
  phone?: string
  company?: string
  status: ClientStatus
  notes?: string
}

export interface FollowUp {
  id: string
  clientId: string
  description: string
  dueDate: string
  status: 'pendiente' | 'completado'
}
