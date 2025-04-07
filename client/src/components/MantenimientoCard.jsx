import { useState, useEffect } from 'react';

export function MantenimientoCard({ 
    id, 
    nombre, 
    descripcion, 
    fecha_inicio, 
    fecha_fin, 
    estado, 
    responsable, 
    actividades = [], 
    observaciones = [] 
}) {
    const [nuevaObservacionMantenimiento, setNuevaObservacionMantenimiento] = useState('');
    const [observacionesActividades, setObservacionesActividades] = useState({});
    const [observacionesMantenimiento, setObservacionesMantenimiento] = useState([]);
    const [editandoObservacion, setEditandoObservacion] = useState(null);
    const [editandoObservacionActividad, setEditandoObservacionActividad] = useState({ actividadId: null, observacionId: null });
    const [textoEditable, setTextoEditable] = useState(''); // Estado temporal para el texto editable
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (observacionesMantenimiento.length === 0 && observaciones.length > 0) {
            setObservacionesMantenimiento(observaciones);
        }
    }, [observaciones, observacionesMantenimiento]);

    const registrarInicio = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/mantenimientos/${id}/inicio-fin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fecha_inicio: new Date().toISOString() }),
            });
            if (response.ok) {
                alert('Inicio del mantenimiento registrado correctamente.');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al registrar el inicio del mantenimiento.');
            }
        } catch (error) {
            console.error('Error al registrar el inicio:', error);
            setError(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const registrarFin = async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/mantenimientos/${id}/inicio-fin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fecha_fin: new Date().toISOString() }),
            });
            if (response.ok) {
                alert('Fin del mantenimiento registrado correctamente.');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al registrar el fin del mantenimiento.');
            }
        } catch (error) {
            console.error('Error al registrar el fin:', error);
            setError(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const agregarObservacionMantenimiento = async () => {
        if (!nuevaObservacionMantenimiento.trim()) {
            alert('La observación no puede estar vacía');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/mantenimientos/${id}/observaciones/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: nuevaObservacionMantenimiento }),
            });

            if (response.ok) {
                const nuevaObservacion = await response.json();
                setObservacionesMantenimiento([...observacionesMantenimiento, nuevaObservacion]);
                setNuevaObservacionMantenimiento('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al agregar la observación.');
            }
        } catch (error) {
            console.error('Error al agregar la observación:', error);
            setError(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarObservacionMantenimiento = async (observacionId, nuevoTexto) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/observaciones/${observacionId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: nuevoTexto }),
            });

            if (response.ok) {
                const observacionActualizada = await response.json();
                setObservacionesMantenimiento(prevObs =>
                    prevObs.map(obs => obs.id === observacionId ? observacionActualizada : obs)
                );
                setEditandoObservacion(null);
            } else {
                throw new Error('Error al editar la observación.');
            }
        } catch (error) {
            console.error('Error al editar la observación:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const agregarObservacionActividad = async (actividadId) => {
        const nuevaObservacion = observacionesActividades[actividadId] || '';
        if (!nuevaObservacion.trim()) {
            alert('La observación no puede estar vacía');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/actividades/${actividadId}/observaciones/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: nuevaObservacion }),
            });
    
            if (response.ok) {
                const observacionCreada = await response.json();
                setObservacionesActividades(prev => ({
                    ...prev,
                    [actividadId]: '',
                }));
                alert('Observación agregada correctamente.');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al agregar la observación.');
            }
        } catch (error) {
            console.error('Error al agregar la observación:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const editarObservacionActividad = async (actividadId, observacionId, nuevoTexto) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/actividades/${actividadId}/observaciones/${observacionId}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ texto: nuevoTexto }),
            });
    
            if (response.ok) {
                alert('Observación editada correctamente.');
                setEditandoObservacionActividad({ actividadId: null, observacionId: null });
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al editar la observación.');
            }
        } catch (error) {
            console.error('Error al editar la observación:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
    
    const renderActividades = () => {
        if (!actividades || !Array.isArray(actividades)) {
            return <p>No hay actividades disponibles</p>;
        }

        return actividades.map((actividad) => (
            <li key={actividad.id}>
                <p>Nombre: {actividad.nombre}</p>
                <p>Descripción: {actividad.descripcion}</p>
                <p>Fecha de inicio proyectada: {actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toLocaleString() : "No registrada"}</p>
                <p>Fecha de fin proyectada: {actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "No registrada"}</p>
                <h4>Observaciones:</h4>
                <ul>
                    {actividad.observaciones?.map((obs) => (
                        <li key={obs.id}>
                            {editandoObservacionActividad.actividadId === actividad.id && editandoObservacionActividad.observacionId === obs.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={textoEditable} // Vincula el input al estado temporal
                                        onChange={(e) => setTextoEditable(e.target.value)} // Actualiza el estado temporal
                                    />
                                    <button onClick={() => {
                                        editarObservacionActividad(actividad.id, obs.id, textoEditable); // Usa el estado temporal para guardar
                                    }}>
                                        Guardar
                                    </button>
                                    <button onClick={() => {
                                        setEditandoObservacionActividad({ actividadId: null, observacionId: null });
                                        setTextoEditable(''); // Limpia el estado temporal al cancelar
                                    }}>
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    {obs.texto}
                                    <button onClick={() => {
                                        setEditandoObservacionActividad({ actividadId: actividad.id, observacionId: obs.id });
                                        setTextoEditable(obs.texto); // Inicializa el estado temporal con el texto actual
                                    }}>
                                        Editar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
                <textarea
                    value={observacionesActividades[actividad.id] || ''}
                    onChange={(e) => setObservacionesActividades(prev => ({ ...prev, [actividad.id]: e.target.value }))}
                    placeholder="Agregar nueva observación"
                    disabled={loading}
                />
                <button onClick={() => agregarObservacionActividad(actividad.id)} disabled={loading}>
                    Agregar Observación
                </button>
            </li>
        ));
    };

    return (
        <div>
            {error && <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>}
            <h1>{nombre}</h1>
            <p>{descripcion}</p>
            <p>Fecha de inicio proyectada: {fecha_inicio ? new Date(fecha_inicio).toLocaleString() : "No registrada"}</p>
            <p>Fecha de fin proyectada: {fecha_fin ? new Date(fecha_fin).toLocaleString() : "No registrada"}</p>
            <p>Estado: {estado}</p>
            <p>Responsable: {responsable}</p>
            <button onClick={registrarInicio} disabled={loading}>
                Registrar Inicio del Mantenimiento
            </button>
            <button onClick={registrarFin} disabled={loading}>
                Registrar Fin del Mantenimiento
            </button>
            <h3>Observaciones del Mantenimiento:</h3>
            <ul>
                {observacionesMantenimiento.map(obs => (
                    <li key={obs.id}>
                        {editandoObservacion === obs.id ? (
                            <>
                                <input
                                    type="text"
                                    value={obs.texto}
                                    onChange={(e) =>
                                        setObservacionesMantenimiento(prev =>
                                            prev.map(o => o.id === obs.id ? { ...o, texto: e.target.value } : o)
                                        )
                                    }
                                />
                                <button onClick={() => editarObservacionMantenimiento(obs.id, obs.texto)}>Guardar</button>
                                <button onClick={() => setEditandoObservacion(null)}>Cancelar</button>
                            </>
                        ) : (
                            <>
                                {obs.texto}
                                <button onClick={() => setEditandoObservacion(obs.id)}>Editar</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <textarea
                value={nuevaObservacionMantenimiento}
                onChange={(e) => setNuevaObservacionMantenimiento(e.target.value)}
                placeholder="Agregar nueva observación"
                disabled={loading}
            />
            <button onClick={agregarObservacionMantenimiento} disabled={loading}>
                Agregar Observación
            </button>
            <h3>Actividades:</h3>
            <ul>
                {renderActividades()}
            </ul>
        </div>
    );
}