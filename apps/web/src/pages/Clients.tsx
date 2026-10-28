import { useState } from 'react'
import { clients as mockClients } from '../mocks/data'
import { ClientStatus } from '../lib/types'
import { Plus, Search, Mail, Phone, Building2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const statusStyles: Record<ClientStatus, string> = {
  potencial: 'bg-gray-100 text-gray-700',
  contactado: 'bg-blue-50 text-blue-700',
  negociación: 'bg-amber-50 text-amber-700',
  cliente: 'bg-emerald-50 text-emerald-700',
}

export default function Clients() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<ClientStatus | 'todos'>('todos')

  const filtered = mockClients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.company?.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'todos' || c.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white-900 tracking-tight">Clientes</h1>
          <p className="text-gray-600 mt-1">{filtered.length} cliente{filtered.length !== 1 ? 's' : ''}</p>
        </div>
        <button className="btn-primary">
          <Plus className="w-4 h-4" />
          Nuevo cliente
        </button>
      </div>

      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o empresa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="input w-full sm:w-48"
          >
            <option value="todos">Todos los estados</option>
            <option value="potencial">Potencial</option>
            <option value="contactado">Contactado</option>
            <option value="negociación">Negociación</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Empresa</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{client.name}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {client.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-3.5 h-3.5" />
                        {client.email}
                      </div>
                    )}
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3.5 h-3.5" />
                        {client.phone}
                      </div>
                    )}
                    {!client.email && !client.phone && <span className="text-sm text-gray-400">-</span>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {client.company ? (
                    <div className="flex items-center gap-2 text-sm text-gray-900">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      {client.company}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full capitalize ${statusStyles[client.status as ClientStatus]}`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <Link to={`/clientes/${client.id}`} className="text-sm font-medium text-gray-900 hover:text-gray-700">
                    Ver detalle
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron clientes</p>
          </div>
        )}
      </div>
    </div>
  )
}
