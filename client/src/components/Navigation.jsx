import { Link } from "react-router-dom";

export function Navigation() {
    return (
        <div>
            <Link to="/actividad">
                <h1>Actividades</h1>
            </Link>
            <Link to="/mantenimiento-create">
                <h1>Cargar Mantenimiento</h1>
            </Link>
            <Link to="/mantenimiento">Mantenimientos</Link>
        </div>
    );
}