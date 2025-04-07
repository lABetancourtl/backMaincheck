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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const registrarInicioActividad = async (actividadId) => {
        if (!actividadId) {
            alert('ID de actividad no válido');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/actividades/${actividadId}/inicio-fin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fecha_inicio: new Date().toISOString() }),
            });
            if (response.ok) {
                alert(`Inicio de la actividad ${actividadId} registrado correctamente.`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al registrar el inicio de la actividad ${actividadId}.`);
            }
        } catch (error) {
            console.error('Error al registrar el inicio de la actividad:', error);
            setError(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const registrarFinActividad = async (actividadId) => {
        if (!actividadId) {
            alert('ID de actividad no válido');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:8000/tasks/api/v1/actividades/${actividadId}/inicio-fin/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fecha_fin: new Date().toISOString() }),
            });
            if (response.ok) {
                alert(`Fin de la actividad ${actividadId} registrado correctamente.`);
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al registrar el fin de la actividad ${actividadId}.`);
            }
        } catch (error) {
            console.error('Error al registrar el fin de la actividad:', error);
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
                alert('Observación agregada correctamente.');
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
                alert(`Observación agregada correctamente a la actividad ${actividadId}.`);
                setObservacionesActividades((prev) => ({ ...prev, [actividadId]: '' }));
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error al agregar la observación a la actividad ${actividadId}.`);
            }
        } catch (error) {
            console.error('Error al agregar la observación:', error);
            setError(error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleObservacionActividadChange = (actividadId, value) => {
        setObservacionesActividades((prev) => ({ ...prev, [actividadId]: value }));
    };

    const renderActividades = () => {
        if (!actividades || !Array.isArray(actividades)) {
            console.log('No hay actividades o no es un array:', actividades);
            return <p>No hay actividades disponibles</p>;
        }

        return actividades.map((actividad) => (
            <li key={actividad.id}>
                <p>Nombre: {actividad.nombre}</p>
                <p>Descripción: {actividad.descripcion}</p>
                <p>Fecha de inicio proyectada: {actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toLocaleString() : "No registrada"}</p>
                <p>Fecha de fin proyectada: {actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "No registrada"}</p>
                <button 
                    onClick={() => registrarInicioActividad(actividad.id)}
                    disabled={loading}
                >
                    Registrar Inicio de Actividad
                </button>
                <button 
                    onClick={() => registrarFinActividad(actividad.id)}
                    disabled={loading}
                >
                    Registrar Fin de Actividad
                </button>
                <h4>Observaciones:</h4>
                <ul>
                    {actividad.observaciones?.map((obs, index) => (
                        <li key={index}>{obs.texto}</li>
                    )) || <li>No hay observaciones</li>}
                </ul>
                <textarea
                    value={observacionesActividades[actividad.id] || ''}
                    onChange={(e) => handleObservacionActividadChange(actividad.id, e.target.value)}
                    placeholder="Agregar nueva observación"
                    disabled={loading}
                />
                <button 
                    onClick={() => agregarObservacionActividad(actividad.id)}
                    disabled={loading}
                >
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
                {observaciones?.map((obs, index) => (
                    <li key={index}>{obs.texto}</li>
                )) || <li>No hay observaciones</li>}
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