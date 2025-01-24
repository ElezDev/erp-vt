
export interface NotificationModel {
  id: number
  fecha: string
  hora: string
  asunto: string
  mensaje: string
  estado_id: number
  idUsuarioReceptor: number
  idUsuarioRemitente: number
  idTipoNotificacion: number
  idEmpresa: number
  created_at: any
  updated_at: any
  route: string
  estado: Estado
  personaReceptor: PersonaReceptor
  personaRemitente: PersonaRemitente
  tipoNotificacion: TipoNotificacion
  empresa: Empresa
}

export interface Estado {
  id: number
  estado: string
  descripcion: string
}

export interface PersonaReceptor {
  id: number
  identificacion: string
  nombre1: string
  nombre2: string
  apellido1: string
  apellido2: string
  fechaNac: string
  direccion: string
  email: string
  telefonoFijo: string
  celular: string
  perfil: string
  sexo: string
  rh: string
  rutaFoto: string
  idTipoIdentificacion: number
  idCiudad: number
  idCiudadNac: number
  idCiudadUbicacion: number
  created_at: string
  updated_at: string
  rutaFotoUrl: string
}

export interface PersonaRemitente {
  id: number
  identificacion: string
  nombre1: string
  nombre2?: string
  apellido1: string
  apellido2?: string
  fechaNac: string
  direccion: string
  email: string
  telefonoFijo?: string
  celular: string
  perfil: string
  sexo: string
  rh: string
  rutaFoto: string
  idTipoIdentificacion: number
  idCiudad?: number
  idCiudadNac: number
  idCiudadUbicacion: number
  created_at: string
  updated_at: string
  rutaFotoUrl: string
}

export interface TipoNotificacion {
  id: number
  tipoNotificacion: string
  observacion: string
  created_at: any
  updated_at: any
}

export interface Empresa {
  id: number
  razonSocial: string
  nit: string
  rutaLogo: string
  representanteLegal: string
  digitoVerificacion: number
  created_at: string
  updated_at: string
  rutaLogoUrl: string
}
