import { useState } from 'react';

export function MantenimientoFormPage() {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) {
            alert("Por favor, selecciona un archivo.");
            return;
        }
    
        const reader = new FileReader();
        reader.onload = async (e) => {
            try {
                const data = JSON.parse(e.target.result); // Parsear el archivo JSON
                console.log("Datos cargados:", data);
    
                // Enviar los datos al backend
                const response = await fetch('http://localhost:8000/tasks/api/v1/mantenimientos/cargar/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (response.ok) {
                    alert("Mantenimientos cargados exitosamente.");
                } else {
                    const errorData = await response.json();
                    console.error("Errores del backend:", errorData);
                    alert(`Error al cargar los mantenimientos: ${JSON.stringify(errorData.errores)}`);
                }
            } catch (error) {
                console.error("Error al procesar el archivo:", error);
                alert("El archivo no tiene un formato válido.");
            }
        };
    
        reader.readAsText(file);
    };

    return (
        <div>
            <h1>Cargar Carta Gantt</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".json" onChange={handleFileChange} />
                <button type="submit">Cargar</button>
            </form>
        </div>
    );
}