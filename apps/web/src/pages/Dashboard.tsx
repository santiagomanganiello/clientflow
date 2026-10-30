import { clients, followUps } from '../mocks/data'
import { Users, Target, Clock, AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusStyles: Record<string, string> = {
  cliente: 'bg-green-100 text-green-700',
  negociación: 'bg-blue-100 text-blue-700',
  contactado: 'bg-amber-100 text-amber-700',
  potencial: 'bg-gray-100 text-gray-700',
}

export default function Dashboard() {
  const total = clients.length
  const abiertas = clients.filter(c => c.status !== 'cliente').length
  const pendientes = followUps.filter(f => f.status === 'pendiente').length
  const vencidos = followUps.filter(f => f.status === 'pendiente' && new Date(f.dueDate) < new Date()).length

  const cards = [
    { label: 'Total clientes', value: total, icon: Users, color: 'text-gray-900' },
    { label: 'Oportunidades abiertas', value: abiertas, icon: Target, color: 'text-blue-600' },
    { label: 'Seguimientos pendientes', value: pendientes, icon: Clock, color: 'text-amber-600' },
    { label: 'Seguimientos vencidos', value: vencidos, icon: AlertTriangle, color: 'text-red-600' },
  ]

  const recentFollowUps = followUps
    .filter(f => f.status === 'pendiente')
    .slice(0, 3)
    .map(f => {
      const client = clients.find(c => c.id === f.clientId)
      return { ...f, clientName: client?.name }
    })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-white-900 tracking-tight">Dashboard</h1>
        <p className="text-gray-600 mt-1">Resumen de tu cartera comercial</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{card.label}</p>
                <p className="text-3xl font-semibold text-gray-900 mt-2">{card.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${card.color}`}>
                <card.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Próximos seguimientos</h2>
              <Link to="/seguimientos" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            {recentFollowUps.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No hay seguimientos pendientes</p>
            ) : (
              <div className="space-y-4">
                {recentFollowUps.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-2"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{item.description}</p>
                      <p className="text-xs text-gray-600 mt-1">{item.clientName} • Vence {item.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="card">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Clientes recientes</h2>
              <Link to="/clientes" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {clients.slice(0, 4).map((client) => (
                <Link 
                  key={client.id} 
                  to={`/clientes/${client.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-600">{client.company || client.email || '-'}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusStyles[client.status] ?? 'bg-gray-100 text-gray-700'}`}>
                    {client.status}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
