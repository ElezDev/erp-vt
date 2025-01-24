export interface ContratosModel {
    id: number
    idpersona: number
    idempresa: number
    idtipoContrato: number
    fechaContratacion: string
    fechaFinalContrato: string
    valorTotalContrato: number
    salario_id: number
    numeroContrato: string
    objetoContrato: string
    observacion: string
    perfilProfesional: string
    otrosi: string
    created_at: string
    updated_at: string
    periodoPago: number
    idContrato: number
    idEstado: number
    documentos_contrato: DocumentosContrato[]
    otrosContratos: OtrosContrato[]
    documentosContrato: any[]
    persona: Persona
    salario: Salario
    tipoContrato: TipoContrato
    empresa: Empresa
    estado: Estado
    archivoContrato: any[]
    transacciones: Transaccione[]
  }
  
  export interface DocumentosContrato {
    id: number
    fechaCarga: string
    ruta: string
    idContrato: number
    idAsignacionTipoDocumentoProceso: number
    idEstado: any
    rutaFileUrl: string
    AsignacionTipoDocumentoProceso: AsignacionTipoDocumentoProceso
  }
  
  export interface AsignacionTipoDocumentoProceso {
    id: number
    idProceso: number
    idTipoDocumento: number
    actualizar: number
    tipoDocumento: TipoDocumento
  }
  
  export interface TipoDocumento {
    id: number
    tituloDocumento: string
    descripcion: string
    idEstado: number
    created_at: any
    updated_at: any
  }
  
  export interface OtrosContrato {
    id: number
    idpersona: number
    idempresa: number
    idtipoContrato: number
    fechaContratacion: string
    fechaFinalContrato: string
    valorTotalContrato: number
    salario_id: number
    numeroContrato: string
    objetoContrato: string
    observacion: string
    perfilProfesional: string
    otrosi: string
    created_at: string
    updated_at: string
    periodoPago: number
    idContrato: any
    idEstado: number
    archivoContrato: ArchivoContrato[]
  }
  
  export interface ArchivoContrato {
    id: number
    url: string
    fecha: string
    observacion: string
    idContrato: number
    created_at: string
    updated_at: string
    rutaArchivoContratoUrl: string
  }
  
  export interface Persona {
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
    ciudad_ubicacion: CiudadUbicacion
    
  }
  
  export interface CiudadUbicacion {
    id: number
    codigo: string
    descripcion: string
    iddepartamento: number
    created_at: any
    updated_at: any
  }
  
  export interface Salario {
    id: number
    valor: number
    fecha: string
    estado_id: number
    rol_id: number
    rol: Rol
  }
  
  export interface Rol {
    id: number
    name: string
    guard_name: string
    created_at: string
    updated_at: string
    company_id: number
  }
  
  export interface TipoContrato {
    id: number
    nombreTipoContrato: string
    descripcion: string
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
  
  export interface Estado {
    id: number
    estado: string
    descripcion: string
  }
  
  export interface Transaccione {
    id: number
    fechaTransaccion: string
    hora: string
    numFacturaInicial: any
    valor: string
    idEstado: number
    idTipoTransaccion: number
    idTipoPago: number
    created_at: string
    updated_at: string
    contrato_id: any
    excedente: any
    pivot: Pivot
    pago: Pago[]
  }
  
  export interface Pivot {
    contrato_id: number
    transaccion_id: number
  }
  
  export interface Pago {
    id: number
    fechaPago: string
    fechaReg: string
    valor: string
    numeroFact: number
    excedente: any
    idEstado: number
    idTransaccion: number
    idMedioPago: number
    created_at: string
    updated_at: string
    rutaComprobante: any
    observacion: string
    porcentaje: number
    retencion: any
    idPagoTotal: any
    fechaCobro: any
    rutaComprobanteUrl: string
  }
  