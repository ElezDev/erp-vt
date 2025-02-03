export interface Vacacion {
    id: number;
    periodo: number;
    estado: string;
    idSolicitud: number | null;
    idContrato: number;
    deleted_at: string | null;
    created_at: string | null;
    updated_at: string;
  }
  
  export interface VacacionesResponse {
    total: number;
    vacaciones: Vacacion[];
  }
  