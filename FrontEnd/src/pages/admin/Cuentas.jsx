import React, { useState, useEffect } from 'react';

const GestionClientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar clientes al montar el componente
    useEffect(() => {
        cargarClientes();
    }, []);

    const cargarClientes = async () => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:4000/api/users/admin/clientes');

            const data = await response.json();
            
            if (response.ok) {
                setClientes(data.clientes);
            } else {
                setError(data.error || 'Error al cargar clientes');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error de conexión');
        } finally {
            setLoading(false);
        }
    };

    const cambiarEstadoCliente = async (identificacion, accionActual) => {
        const accion = accionActual === 'activo' ? 'bloquear' : 'desbloquear';
        
        if (!confirm(`¿Estás seguro de que quieres ${accion} este cliente?`)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:4000/api/users/admin/clientes/${identificacion}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ accion })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.mensaje);
                cargarClientes(); // Recargar la lista
            } else {
                alert(data.error || 'Error al cambiar estado del cliente');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión');
        }
    };

    if (loading) return <div className="p-4">Cargando clientes...</div>;
    if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Gestión de Clientes</h1>
            
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Identificación
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Correo
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teléfono
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Fecha Registro
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {clientes.map((cliente) => (
                            <tr key={cliente.idUsuario}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {cliente.identificacion}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cliente.nombre} {cliente.apellido}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cliente.correo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {cliente.telefono}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        cliente.estado === 'activo' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {cliente.estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(cliente.fechaRegistro).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button
                                        onClick={() => cambiarEstadoCliente(cliente.identificacion, cliente.estado)}
                                        className={`px-4 py-2 rounded text-white font-medium ${
                                            cliente.estado === 'activo'
                                                ? 'bg-red-600 hover:bg-red-700'
                                                : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                    >
                                        {cliente.estado === 'activo' ? 'Bloquear' : 'Desbloquear'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
                {clientes.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        No hay clientes registrados
                    </div>
                )}
            </div>
        </div>
    );
};

export default GestionClientes;