export function MantenimientoCard({ id, nombre, descripcion, fecha_inicio, fecha_fin, estado, responsable, actividades = [] }) {
    const registrarInicio = async () => {
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
    };

    const registrarFin = async () => {
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
    };

    const registrarInicioActividad = async (actividadId) => {
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
            alert(`Error al registrar el inicio de la actividad ${actividadId}.`);
        }
    };

    const registrarFinActividad = async (actividadId) => {
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
            alert(`Error al registrar el fin de la actividad ${actividadId}.`);
        }
    };

    return (
        <div>
            <h1>{nombre}</h1>
            <p>{descripcion}</p>
            <p>Fecha de inicio: {fecha_inicio ? new Date(fecha_inicio).toLocaleString() : "No registrada"}</p>
            <p>Fecha de fin: {fecha_fin ? new Date(fecha_fin).toLocaleString() : "No registrada"}</p>
            <p>Estado: {estado}</p>
            <p>Responsable: {responsable}</p>
            <button onClick={registrarInicio}>Registrar Inicio del Mantenimiento</button>
            <button onClick={registrarFin}>Registrar Fin del Mantenimiento</button>
            <p>Actividades:</p>
            <ul>
                {actividades.length > 0 ? (
                    actividades.map((actividad) => (
                        <li key={actividad.id}>
                            <p>Nombre: {actividad.nombre}</p>
                            <p>Descripción: {actividad.descripcion}</p>
                            <p>Fecha de inicio: {actividad.fecha_inicio ? new Date(actividad.fecha_inicio).toLocaleString() : "No registrada"}</p>
                            <p>Fecha de fin: {actividad.fecha_fin ? new Date(actividad.fecha_fin).toLocaleString() : "No registrada"}</p>
                            <p>Observaciones: {actividad.observaciones || "Sin observaciones"}</p>
                            <button onClick={() => registrarInicioActividad(actividad.id)}>Registrar Inicio</button>
                            <button onClick={() => registrarFinActividad(actividad.id)}>Registrar Fin</button>
                        </li>
                    ))
                ) : (
                    <li>No hay actividades asociadas</li>
                )}
            </ul>
        </div>
    );
}