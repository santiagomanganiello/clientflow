import { useParams, Link } from 'react-router-dom'
import { clients, followUps } from '../mocks/data'
import { ArrowLeft, Mail, Phone, Building2, CalendarClock, FileText } from 'lucide-react'

const statusStyles = {
  potencial: 'bg-gray-100 text-gray-700',
  contactado: 'bg-blue-50 text-blue-700',
  negociación: 'bg-amber-50 text-amber-700',
  cliente: 'bg-emerald-50 text-emerald-700',
}

export default function ClientDetail() {
  const { id } = useParams()
  const client = clients.find(c => c.id === id)
  const clientFollowUps = followUps.filter(f => f.clientId === id)

  if (!client) {
    return (
      <div className="card p-12 text-center">
        <p className="text-gray-500">Cliente no encontrado</p>
        <Link to="/clientes" className="btn-ghost mt-4 inline-flex">Volver a clientes</Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link to="/clientes" className="btn-ghost p-2">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-semibold text-white-900 tracking-tight">{client.name}</h1>
          <p className="text-gray-600 mt-1">Detalle del cliente</p>
        </div>
        <span className={`px-3 py-1.5 text-sm font-medium rounded-full capitalize ${statusStyles[client.status as keyof typeof statusStyles]}`}>
          {client.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Información de contacto</h2>
            </div>
            <div className="p-6 space-y-4">
              {client.email ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900 mt-0.5">{client.email}</p>
                  </div>
                </div>
              ) : null}
              {client.phone ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="text-sm text-gray-900 mt-0.5">{client.phone}</p>
                  </div>
                </div>
              ) : null}
              {client.company ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Empresa</p>
                    <p className="text-sm text-gray-900 mt-0.5">{client.company}</p>
                  </div>
                </div>
              ) : null}
              {!client.email && !client.phone && !client.company && (
                <p className="text-sm text-gray-500">Sin información de contacto</p>
              )}
            </div>
          </div>

          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Notas</h2>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-gray-600 leading-relaxed">{client.notes || 'Sin notas registradas'}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Seguimientos</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {clientFollowUps.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">Sin seguimientos</p>
                )}
                {clientFollowUps.map(f => (
                  <div key={f.id} className="p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{f.description}</p>
                    <p className="text-xs text-gray-600 mt-1.5">Vence el {f.dueDate}</p>
                    <span className={`inline-flex items-center px-2 py-0.5 mt-2.5 text-xs font-medium rounded-full ${
                      f.status === 'completado' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
