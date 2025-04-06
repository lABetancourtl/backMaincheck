export function MantenimientoCard({ nombre, descripcion, fecha_inicio, fecha_fin, estado, responsable, actividades = [] }) {
    return (
        <div>
            <h1>{nombre}</h1>
            <p>{descripcion}</p>
            <p>Fecha de inicio: {fecha_inicio ? new Date(fecha_inicio).toLocaleDateString() : "Fecha no disponible"}</p>
            <p>Fecha de fin: {fecha_fin ? new Date(fecha_fin).toLocaleDateString() : "Fecha no disponible"}</p>
            <p>Estado: {estado}</p>
            <p>Responsable: {responsable}</p>
            <p>Actividades:</p>

            <ul>
                {actividades.length > 0 ? (
                    actividades.map((actividadId) => (
                        <li key={actividadId}>Actividad ID: {actividadId}</li>
                    ))
                ) : (
                    <li>No hay actividades asociadas</li>
                )}
            </ul>
        </div>
    );
}