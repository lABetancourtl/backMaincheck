import { useState } from 'react';

export function MantenimientoCard({ id, nombre, descripcion, fecha_inicio, fecha_fin, estado, responsable, actividades = [], observaciones = [] }) {
    const [nuevaObservacionMantenimiento, setNuevaObservacionMantenimiento] = useState(''); // Nueva observación para el mantenimiento
    const [observacionesActividades, setObservacionesActividades] = useState({}); // Observaciones para actividades

    const registrarInicio = async () => {
        try {
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
                alert('Error al registrar el inicio del mantenimiento.');
            }
        } catch (error) {
            console.error('Error al registrar el inicio:', error);
            alert('Error al registrar el inicio del mantenimiento.');
        }
    };

    const registrarFin = async () => {
        try {
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
                alert('Error al registrar el fin del mantenimiento.');
            }
        } catch (error) {
            console.error('Error al registrar el fin:', error);
            alert('Error al registrar el fin del mantenimiento.');
        }
    };

    const agregarObservacionMantenimiento = async () => {
        try {
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
                alert('Error al agregar la observación.');
            }
        } catch (error) {
            console.error('Error al agregar la observación:', error);
            alert('Error al agregar la observación.');
        }
    };

    const agregarObservacionActividad = async (actividadId) => {
        try {
            const nuevaObservacion = observacionesActividades[actividadId] || '';
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
                alert(`Error al agregar la observación a la actividad ${actividadId}.`);
            }
        } catch (error) {
            console.error('Error al agregar la observación:', error);
            alert(`Error al agregar la observación a la actividad ${actividadId}.`);
        }
    };

    const handleObservacionActividadChange = (actividadId, value) => {
        setObservacionesActividades((prev) => ({ ...prev, [actividadId]: value }));
    };

    return (
        <div>
            <h1>{nombre}</h1>
            <p>{descripcion}</p>
            <p>Fecha de inicio proyectada: {fecha_inicio ? new Date(fecha_inicio).toLocaleString() : "No registrada"}</p>
            <p>Fecha de fin proyectada: {fecha_fin ? new Date(fecha_fin).toLocaleString() : "No registrada"}</p>
            <p>Estado: {estado}</p>
            <p>Responsable: {responsable}</p>
            <button onClick={registrarInicio}>Registrar Inicio del Mantenimiento</button>
            <button onClick={registrarFin}>Registrar Fin del Mantenimiento</button>
            <h3>Observaciones del Mantenimiento:</h3>
            <ul>
                {observaciones.map((obs, index) => (
                    <li key={index}>{obs.texto}</li>
                ))}
            </ul>
            <textarea
                value={nuevaObservacionMantenimiento}
                onChange={(e) => setNuevaObservacionMantenimiento(e.target.value)}
                placeholder="Agregar nueva observación"
            />
            <button onClick={agregarObservacionMantenimiento}>Agregar Observación</button>
            <h3>Actividades:</h3>
            <ul>
                {actividades.map((actividad) => (
                    <li key={actividad.id}>
                        <p>Nombre: {actividad.nombre}</p>
                        <p>Descripción: {actividad.descripcion}</p>
                        <p>Fecha de inicio proyectada: {actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toLocaleString() : "No registrada"}</p>
                        <p>Fecha de fin proyectada: {actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "No registrada"}</p>
                        <h4>Observaciones:</h4>
                        <ul>
                            {actividad.observaciones.map((obs, index) => (
                                <li key={index}>{obs.texto}</li>
                            ))}
                        </ul>
                        <textarea
                            value={observacionesActividades[actividad.id] || ''}
                            onChange={(e) => handleObservacionActividadChange(actividad.id, e.target.value)}
                            placeholder="Agregar nueva observación"
                        />
                        <button onClick={() => agregarObservacionActividad(actividad.id)}>Agregar Observación</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}