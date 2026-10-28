import { Client, FollowUp } from './types'

export const clients: Client[] = [
  { id: '1', name: 'María García', email: 'maria@acme.com', phone: '+34 600 111 222', company: 'Acme SL', status: 'cliente' },
  { id: '2', name: 'Juan López', email: 'juan@startup.io', phone: '+34 600 333 444', company: 'StartupIO', status: 'negociación' },
  { id: '3', name: 'Ana Martínez', company: 'FreelanceCo', status: 'contactado' },
  { id: '4', name: 'Pedro Sánchez', email: 'pedro@empresa.es', status: 'potencial' },
]

export const followUps: FollowUp[] = [
  { id: 'f1', clientId: '2', description: 'Enviar propuesta comercial', dueDate: '2026-10-29', status: 'pendiente' },
  { id: 'f2', clientId: '1', description: 'Revisar contrato', dueDate: '2026-10-28', status: 'completado' },
  { id: 'f3', clientId: '4', description: 'Llamar para seguimiento', dueDate: '2026-10-27', status: 'pendiente' },
]
