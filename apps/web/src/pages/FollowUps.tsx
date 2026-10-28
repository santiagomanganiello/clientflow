import { followUps, clients } from '../mocks/data'
import { CalendarClock, CheckCircle2, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function FollowUps() {
  const items = followUps.map(f => {
    const client = clients.find(c => c.id === f.clientId)
    return { ...f, clientName: client?.name || 'Desconocido', clientId: f.clientId }
  })

  const pendientes = items.filter(i => i.status === 'pendiente').length
  const completados = items.filter(i => i.status === 'completado').length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-white-900 tracking-tight">Seguimientos</h1>
        <p className="text-gray-600 mt-1">{pendientes} pendiente{pendientes !== 1 ? 's' : ''}, {completados} completado{completados !== 1 ? 's' : ''}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-2xl font-semibold text-gray-900">{pendientes}</p>
          </div>
        </div>
        <div className="card p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Completados</p>
            <p className="text-2xl font-semibold text-gray-900">{completados}</p>
          </div>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CalendarClock className="w-4 h-4 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Todas las tareas</h2>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha límite</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <Link to={`/clientes/${item.clientId}`} className="font-medium text-gray-900 hover:text-gray-700">
                    {item.clientName}
                  </Link>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.description}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.dueDate}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${
                    item.status === 'completado' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-sm text-gray-600 hover:text-gray-900">
                    Marcar como {item.status === 'pendiente' ? 'completado' : 'pendiente'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
