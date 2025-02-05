export interface IncapacidadModel {
    id: number
    fechaSolicitud: string
    fechaInicial: string
    fechaFinal: string
    urlSoporte: string
    idContrato: number
    idContratoSupervisor?: number
    idTipoIncapacidad: number
    numDias: number
    valor: number
    estado: string
    created_at: string
    updated_at: string
    rutaSoporte: string
  }
  