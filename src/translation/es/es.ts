const dictionary = {
  projectName: 'Proyecto',

  shared: {
    yes: 'Sí',
    no: 'No',
    cancel: 'Cancelar',
    save: 'Guardar',
    clear: 'Limpiar',
    decline: 'Rechazar',
    accept: 'Aceptar',
    dashboard: 'Tablero',
    new: 'Nuevo',
    searchNotFound: 'Nada encontrado.',
    searchPlaceholder: 'Buscar...',
    selectPlaceholder: 'Seleccionar una opción',
    datePlaceholder: 'Elegir una fecha',
    timePlaceholder: 'Elegir una hora',
    dateFormat: 'DD MMM, YYYY',
    timeFormat: 'HH:mm',
    datetimeFormat: 'DD MMM, YYYY HH:mm',
    tagsPlaceholder: 'Escriba y presione enter para agregar',
    edit: 'Editar',
    delete: 'Eliminar',
    openMenu: 'Abrir menú',
    submit: 'Enviar',
    search: 'Buscar',
    reset: 'Restablecer',
    min: 'Mín',
    max: 'Máx',
    view: 'Ver',
    copiedToClipboard: 'Copiado al portapapeles',
    exportToCsv: 'Exportar a CSV',
    import: 'Importar',
    pause: 'Pausar',
    discard: 'Descartar',
    preferences: 'Preferencias',
    session: 'Sesión',
    deleted: 'Eliminado',
    remove: 'Remover',
    startDate: 'Fecha de inicio',
    endDate: 'Fecha de finalización',

    importer: {
      importHashAlreadyExists: 'Los datos ya han sido importados',
      title: 'Importar archivo CSV',
      menu: 'Importar archivo CSV',
      line: 'Línea',
      status: 'Estado',
      pending: 'Pendiente',
      success: 'Importado',
      error: 'Error',
      total: `{0} importados, {1} pendientes y {2} con error`,
      importedMessage: `Procesado {0} de {1}.`,
      noValidRows: 'No hay filas válidas.',
      noNavigateAwayMessage:
        'No se aleje de esta página o la importación se detendrá.',
      completed: {
        success:
          'Importación completa. Todas las filas se importaron con éxito.',
        someErrors:
          'Procesamiento completado, pero algunas filas no pudieron ser importadas.',
        allErrors: 'La importación falló. No hay filas válidas.',
      },
      form: {
        downloadTemplate: 'Descargar la plantilla',
      },
      list: {
        newConfirm: '¿Estás seguro?',
        discardConfirm: '¿Estás seguro? Los datos no importados se perderán.',
      },
      errors: {
        invalidFileEmpty: 'El archivo está vacío',
        invalidFileCsv: 'Solo se permiten archivos CSV (.csv)',
        invalidFileUpload:
          'Archivo inválido. Asegúrese de estar utilizando la última versión de la plantilla.',
        importHashRequired: 'Se requiere el hash de importación',
        importHashExistent: 'Los datos ya han sido importados',
      },
    },

    dataTable: {
      filters: 'Filtros',
      noResults: 'No se encontraron resultados.',
      viewOptions: 'Ver',
      toggleColumns: 'Alternar columnas',
      actions: 'Acciones',

      sortAscending: 'Asc',
      sortDescending: 'Desc',
      hide: 'Ocultar',

      selectAll: 'Seleccionar todo',
      selectRow: 'Seleccionar fila',
      paginationTotal: 'Total: {0} fila(s)',
      paginationSelected: '{0} fila(s) seleccionada(s).',
      paginationRowsPerPage: 'Filas por página',
      paginationCurrent: `Página {0} de {1}`,
      paginationGoToFirst: 'Ir a la primera página',
      paginationGoToPrevious: 'Ir a la página anterior',
      paginationGoToNext: 'Ir a la siguiente página',
      paginationGoToLast: 'Ir a la última página',
    },

    locales: {
      en: 'Inglés',
      es: 'Español',
      de: 'Alemán',
      'pt-BR': 'Portugués (Brasil)',
    },

    localeSwitcher: {
      searchPlaceholder: 'Buscar idioma...',
      title: 'Idioma',
      placeholder: 'Seleccionar un idioma',
      searchEmpty: 'No se encontró el idioma.',
    },

    theme: {
      toggle: 'Tema',
      light: 'Claro',
      dark: 'Oscuro',
      system: 'Sistema',
    },

    errors: {
      cannotDeleteReferenced: `No se puede eliminar {0} porque está referenciado por uno o más {1}.`,
      timezone: 'Zona horaria inválida',
      required: `{0} es un campo obligatorio`,
      invalid: `{0} es inválido`,
      dateFuture: `{0} debe estar en el futuro`,
      unknown: 'Ocurrió un error',
      unique: 'El {0} ya existe',
    },
  },

  apiKey: {
    docs: {
      menu: 'Documentación de API',
    },
    form: {
      addAll: 'Añadir Todo',
    },
    edit: {
      menu: 'Editar Clave de API',
      title: 'Editar Clave de API',
      success: 'Clave de API actualizada exitosamente',
    },
    new: {
      menu: 'Nueva Clave de API',
      title: 'Nueva Clave de API',
      success: 'Clave de API creada exitosamente',
      text: `¡Guarda tu clave de API! Por razones de seguridad, solo podrás ver la clave de API una vez.`,
      subtext: `Debes añadirla al encabezado de autorización de tus llamadas a la API.`,
      backToApiKeys: 'Volver a Claves de API',
    },
    list: {
      menu: 'Claves de API',
      title: 'Claves de API',
      viewActivity: 'Ver Actividad',
      noResults: 'No se encontraron claves de API.',
    },
    destroy: {
      confirmTitle: '¿Eliminar Clave de API?',
      success: 'Clave de API eliminada exitosamente',
    },
    enumerators: {
      status: {
        active: 'Activo',
        disabled: 'Deshabilitado',
        expired: 'Expirado',
      },
    },
    fields: {
      apiKey: 'Clave de API',
      membership: 'Usuario',
      name: 'Nombre',
      keyPrefix: 'Prefijo de Clave',
      key: 'Clave',
      scopes: 'Alcances',
      expiresAt: 'Expira En',
      status: 'Estado',
      createdAt: 'Creado En',
      disabled: 'Deshabilitado',
    },
    disabledTooltip: `Deshabilitado en {0}.`,
    errors: {
      invalidScopes: 'los alcances deben coincidir con el rol del usuario',
    },
  },

  file: {
    button: 'Subir',
    delete: 'Eliminar',
    errors: {
      formats: `Formato no válido. Debe ser uno de: {0}.`,
      notImage: `El archivo debe ser una imagen`,
      tooBig: `El archivo es demasiado grande. El tamaño actual es {0} bytes, el tamaño máximo es {1} bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError:
        'No es posible iniciar sesión con este proveedor. Utiliza otro.',
      title: 'Iniciar Sesión',
      button: 'Iniciar Sesión con Correo',
      success: 'Inicio de sesión exitoso',
      email: 'Correo',
      password: 'Contraseña',
      socialHeader: 'O continuar con',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: '¿Olvidaste tu contraseña?',
      signUpLink: '¿No tienes una cuenta? Crea una',
    },
    signUp: {
      title: 'Registrarse',
      signInLink: '¿Ya tienes una cuenta? Inicia sesión',
      button: 'Registrarse',
      success: 'Registro exitoso',
      email: 'Correo',
      password: 'Contraseña',
    },
    verifyEmailRequest: {
      title: 'Reenviar verificación de correo',
      button: 'Reenviar verificación de correo',
      message:
        'Por favor confirma tu correo en <strong>{0}</strong> para continuar.',
      success: 'Verificación de correo enviada exitosamente',
    },
    verifyEmailConfirm: {
      title: 'Verifica tu correo',
      success: 'Correo verificado exitosamente',
      loadingMessage: 'Un momento, tu correo está siendo verificado...',
    },
    passwordResetRequest: {
      title: 'Olvidé mi Contraseña',
      signInLink: 'Cancelar',
      button: 'Enviar correo para restablecer contraseña',
      email: 'Correo',
      success: 'Correo para restablecer contraseña enviado exitosamente',
    },
    passwordResetConfirm: {
      title: 'Restablecer Contraseña',
      signInLink: 'Cancelar',
      button: 'Restablecer Contraseña',
      password: 'Contraseña',
      success: 'Contraseña cambiada exitosamente',
    },
    noPermissions: {
      title: 'Esperando Permisos',
      message:
        'Todavía no tienes permisos. Por favor espera a que el administrador te conceda privilegios.',
    },
    invitation: {
      title: 'Invitaciones',
      success: 'Invitación aceptada exitosamente',
      acceptWrongEmail: 'Aceptar Invitación con Este Correo',
      loadingMessage: 'Un momento, estamos aceptando la invitación...',
      invalidToken: 'Token de invitación expirado o inválido.',
    },
    tenant: {
      title: 'Espacios de Trabajo',
      create: {
        name: 'Nombre del Espacio de Trabajo',
        success: 'Espacio de trabajo creado exitosamente',
        button: 'Crear Espacio de Trabajo',
      },
      select: {
        tenant: 'Selecciona un Espacio de Trabajo',
        joinSuccess: 'Te has unido al espacio de trabajo exitosamente',
        select: 'Seleccionar Espacio de Trabajo',
        acceptInvitation: 'Aceptar Invitación',
      },
    },
    passwordChange: {
      title: 'Cambiar Contraseña',
      subtitle: 'Por favor proporciona tu contraseña anterior y la nueva.',
      menu: 'Cambiar Contraseña',
      oldPassword: 'Contraseña Anterior',
      newPassword: 'Nueva Contraseña',
      newPasswordConfirmation: 'Confirmación de Nueva Contraseña',
      button: 'Guardar Contraseña',
      success: 'Contraseña cambiada y guardada exitosamente',
      mustMatch: 'Las contraseñas deben coincidir',
      cancel: 'Cancelar',
    },
    profile: {
      title: 'Perfil',
      subtitle:
        'Tu perfil será compartido entre otros usuarios en tu espacio de trabajo.',
      menu: 'Perfil',
      firstName: 'Nombre',
      lastName: 'Apellido',
      avatars: 'Avatar',
      button: 'Guardar Perfil',
      success: 'Perfil guardado exitosamente',
      cancel: 'Cancelar',
    },
    profileOnboard: {
      title: 'Perfil',
      firstName: 'Nombre',
      lastName: 'Apellido',
      avatars: 'Avatar',
      button: 'Guardar Perfil',
      success: 'Perfil guardado exitosamente',
    },
    signOut: {
      menu: 'Cerrar Sesión',
      button: 'Cerrar Sesión',
      title: 'Cerrar Sesión',
      loading: 'Se le está desconectand...',
    },
    errors: {
      invalidApiKey: 'Clave API inválida o expirada',
      emailNotFound: 'Correo no encontrado',
      userNotFound: 'Lo siento, no reconocemos tus credenciales',
      wrongPassword: 'Lo siento, no reconocemos tus credenciales',
      weakPassword: 'Esta contraseña es demasiado débil',
      emailAlreadyInUse: 'Correo ya en uso',
      invalidPasswordResetToken:
        'Enlace para restablecer contraseña inválido o expirado',
      invalidVerifyEmailToken:
        'Enlace para verificar correo inválido o expirado',
      wrongOldPassword: 'La contraseña anterior es incorrecta',
    },
  },

  tenant: {
    switcher: {
      title: 'Espacios de trabajo',
      placeholder: 'Selecciona un espacio de trabajo',
      searchPlaceholder: 'Buscar espacio de trabajo...',
      searchEmpty: 'Ningún espacio de trabajo encontrado.',
      create: 'Crear espacio de trabajo',
    },

    invite: {
      title: `Aceptar invitación a {0}`,
      message: `Has sido invitado a {0}. Puedes elegir aceptar o rechazar.`,
    },

    form: {
      name: 'Nombre',

      new: {
        title: 'Crear espacio de trabajo',
        success: 'Espacio de trabajo creado con éxito',
      },

      edit: {
        title: 'Configuración del espacio de trabajo',
        success: 'Espacio de trabajo actualizado con éxito',
      },
    },

    destroy: {
      success: 'Espacio de trabajo eliminado exitosamente',
      confirmTitle: '¿Eliminar Espacio de Trabajo?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar el espacio de trabajo {0}? ¡Esta acción es irreversible!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Usuarios',
    },

    view: {
      title: 'Ver Usuario',
    },

    showActivity: 'Actividad',

    list: {
      menu: 'Usuarios',
      title: 'Usuarios',
      noResults: 'No se encontraron usuarios.',
    },

    export: {
      success: 'Usuarios exportados exitosamente',
    },

    edit: {
      menu: 'Editar Usuario',
      title: 'Editar Usuario',
      success: 'Usuario actualizado exitosamente',
    },

    new: {
      menu: 'Nuevo Usuario',
      title: 'Nuevo Usuario',
      success: 'Usuario creado exitosamente',
    },

    destroyMany: {
      success: 'Usuario(s) eliminado(s) exitosamente',
      noSelection: 'Debes seleccionar al menos un usuario para eliminar.',
      confirmTitle: '¿Eliminar Usuario(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} usuario(s) seleccionado(s)?',
    },

    destroy: {
      success: 'Usuario eliminado exitosamente',
      noSelection: 'Debes seleccionar al menos un usuario para eliminar.',
      confirmTitle: '¿Eliminar Usuario?',
    },

    resendInvitationEmail: {
      button: 'Reenviar Correo de Invitación',
      success: 'Correo de invitación enviado exitosamente',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Nombre Completo',
      firstName: 'Nombre',
      lastName: 'Apellido',
      email: 'Correo Electrónico',
      roles: 'Roles',
      status: 'Estado',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Custom',
      },

      status: {
        invited: 'Invitado',
        active: 'Activo',
        disabled: 'Deshabilitado',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole: 'No puedes eliminar tu propio rol de admin',
      cannotDeleteSelf: 'No puedes eliminar tu propia membresía',
      notInvited: 'No estás invitado',
      invalidStatus: `Estado inválido: {0}`,
      alreadyMember: `{0} ya es un miembro`,
      notSameEmail: `Esta invitación fue enviada a {0} pero estás ingresado como {1}. ¿Quieres continuar?`,
    },
  },

  subscription: {
    menu: 'Suscripción',
    title: 'Planes y Precios',
    current: 'Plan Actual',

    subscribe: 'Suscribirse',
    manage: 'Administrar',
    notPlanUser: 'No eres el administrador de esta suscripción.',
    cancelAtPeriodEnd: 'Este plan se cancelará al final del período.',

    plans: {
      free: {
        title: 'Gratis',
        price: '$0',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
      basic: {
        title: 'Básico',
        price: '$10',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
      enterprise: {
        title: 'Empresarial',
        price: '$50',
        pricingPeriod: '/mes',
        features: {
          first: 'Descripción de la primera función',
          second: 'Descripción de la segunda función',
          third: 'Descripción de la tercera función',
        },
      },
    },

    errors: {
      disabled: 'Las suscripciones están deshabilitadas en esta plataforma',
      alreadyExistsActive: 'Ya existe una suscripción activa',
      stripeNotConfigured: 'Faltan las variables de entorno de Stripe',
    },
  },

  projet: {
    label: 'Projet',

    dashboardCard: {
      title: 'Projets',
    },

    list: {
      menu: 'Projets',
      title: 'Projets',
      noResults: 'No se encontraron projets.',
    },

    export: {
      success: 'Projets exportados con éxito',
    },

    new: {
      menu: 'Nuevo Projet',
      title: 'Nuevo Projet',
      success: 'Projet creado con éxito',
    },

    view: {
      title: 'Ver Projet',
    },

    edit: {
      menu: 'Editar Projet',
      title: 'Editar Projet',
      success: 'Projet actualizado con éxito',
    },

    destroyMany: {
      success: 'Projet(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Projet para eliminar.',
      confirmTitle: '¿Eliminar Projet(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Projet(s) seleccionados?',
    },

    destroy: {
      success: 'Projet eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Projet para eliminar.',
      confirmTitle: '¿Eliminar Projet?',
    },

    fields: {
      title: 'Title',
      isDone: 'IsDone',
      livrable: 'Livrable',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      title: '',
      isDone: '',
      livrable: '',
    },

    enumerators: {},
  },

  livrable: {
    label: 'Livrable',

    dashboardCard: {
      title: 'Livrables',
    },

    list: {
      menu: 'Livrables',
      title: 'Livrables',
      noResults: 'No se encontraron livrables.',
    },

    export: {
      success: 'Livrables exportados con éxito',
    },

    new: {
      menu: 'Nuevo Livrable',
      title: 'Nuevo Livrable',
      success: 'Livrable creado con éxito',
    },

    view: {
      title: 'Ver Livrable',
    },

    edit: {
      menu: 'Editar Livrable',
      title: 'Editar Livrable',
      success: 'Livrable actualizado con éxito',
    },

    destroyMany: {
      success: 'Livrable(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Livrable para eliminar.',
      confirmTitle: '¿Eliminar Livrable(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Livrable(s) seleccionados?',
    },

    destroy: {
      success: 'Livrable eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Livrable para eliminar.',
      confirmTitle: '¿Eliminar Livrable?',
    },

    fields: {
      title: 'Title',
      document: 'Document',
      projet: 'Projet',
      statusname: 'Status name',
      wfs: 'Wfs',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      title: '',
      document: '',
      projet: '',
      statusname: '',
      wfs: '',
    },

    enumerators: {},
  },

  workflow: {
    label: 'Workflow',

    dashboardCard: {
      title: 'Workflows',
    },

    list: {
      menu: 'Workflows',
      title: 'Workflows',
      noResults: 'No se encontraron workflows.',
    },

    export: {
      success: 'Workflows exportados con éxito',
    },

    new: {
      menu: 'Nuevo Workflow',
      title: 'Nuevo Workflow',
      success: 'Workflow creado con éxito',
    },

    view: {
      title: 'Ver Workflow',
    },

    edit: {
      menu: 'Editar Workflow',
      title: 'Editar Workflow',
      success: 'Workflow actualizado con éxito',
    },

    destroyMany: {
      success: 'Workflow(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Workflow para eliminar.',
      confirmTitle: '¿Eliminar Workflow(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Workflow(s) seleccionados?',
    },

    destroy: {
      success: 'Workflow eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Workflow para eliminar.',
      confirmTitle: '¿Eliminar Workflow?',
    },

    fields: {
      title: 'Title',
      steps: 'Steps',
      wf: 'Wf',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      title: '',
      steps: '',
      wf: '',
    },

    enumerators: {},
  },

  steps: {
    label: 'Steps',

    dashboardCard: {
      title: 'Steps',
    },

    list: {
      menu: 'Steps',
      title: 'Steps',
      noResults: 'No se encontraron steps.',
    },

    export: {
      success: 'Steps exportados con éxito',
    },

    new: {
      menu: 'Nuevo Steps',
      title: 'Nuevo Steps',
      success: 'Steps creado con éxito',
    },

    view: {
      title: 'Ver Steps',
    },

    edit: {
      menu: 'Editar Steps',
      title: 'Editar Steps',
      success: 'Steps actualizado con éxito',
    },

    destroyMany: {
      success: 'Steps(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Steps para eliminar.',
      confirmTitle: '¿Eliminar Steps(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Steps(s) seleccionados?',
    },

    destroy: {
      success: 'Steps eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Steps para eliminar.',
      confirmTitle: '¿Eliminar Steps?',
    },

    fields: {
      title: 'Title',
      workflow: 'Workflow',
      steps: 'Steps',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      title: '',
      workflow: '',
      steps: '',
    },

    enumerators: {},
  },

  workflowStep: {
    label: 'WorkflowStep',

    dashboardCard: {
      title: 'WorkflowSteps',
    },

    list: {
      menu: 'WorkflowSteps',
      title: 'WorkflowSteps',
      noResults: 'No se encontraron workflowsteps.',
    },

    export: {
      success: 'WorkflowSteps exportados con éxito',
    },

    new: {
      menu: 'Nuevo WorkflowStep',
      title: 'Nuevo WorkflowStep',
      success: 'WorkflowStep creado con éxito',
    },

    view: {
      title: 'Ver WorkflowStep',
    },

    edit: {
      menu: 'Editar WorkflowStep',
      title: 'Editar WorkflowStep',
      success: 'WorkflowStep actualizado con éxito',
    },

    destroyMany: {
      success: 'WorkflowStep(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un WorkflowStep para eliminar.',
      confirmTitle: '¿Eliminar WorkflowStep(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} WorkflowStep(s) seleccionados?',
    },

    destroy: {
      success: 'WorkflowStep eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un WorkflowStep para eliminar.',
      confirmTitle: '¿Eliminar WorkflowStep?',
    },

    fields: {
      order: 'Order',
      isDone: 'IsDone',
      steptitle: 'Steptitle',
      workFlow: 'WorkFlow',
      observer: 'Observer',
      responsible: 'Responsible',
      livrable: 'Livrable',
      cmt: 'Cmt',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      order: '',
      isDone: '',
      steptitle: '',
      workFlow: '',
      observer: '',
      responsible: '',
      livrable: '',
      cmt: '',
    },

    enumerators: {},
  },

  status: {
    label: 'Status',

    dashboardCard: {
      title: 'Status',
    },

    list: {
      menu: 'Status',
      title: 'Status',
      noResults: 'No se encontraron status.',
    },

    export: {
      success: 'Status exportados con éxito',
    },

    new: {
      menu: 'Nuevo Status',
      title: 'Nuevo Status',
      success: 'Status creado con éxito',
    },

    view: {
      title: 'Ver Status',
    },

    edit: {
      menu: 'Editar Status',
      title: 'Editar Status',
      success: 'Status actualizado con éxito',
    },

    destroyMany: {
      success: 'Status(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Status para eliminar.',
      confirmTitle: '¿Eliminar Status(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Status(s) seleccionados?',
    },

    destroy: {
      success: 'Status eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Status para eliminar.',
      confirmTitle: '¿Eliminar Status?',
    },

    fields: {
      name: 'Name',
      livrble: 'Livrble',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      name: '',
      livrble: '',
    },

    enumerators: {},
  },

  campany: {
    label: 'Campany',

    dashboardCard: {
      title: 'Campanies',
    },

    list: {
      menu: 'Campanies',
      title: 'Campanies',
      noResults: 'No se encontraron campanies.',
    },

    export: {
      success: 'Campanies exportados con éxito',
    },

    new: {
      menu: 'Nuevo Campany',
      title: 'Nuevo Campany',
      success: 'Campany creado con éxito',
    },

    view: {
      title: 'Ver Campany',
    },

    edit: {
      menu: 'Editar Campany',
      title: 'Editar Campany',
      success: 'Campany actualizado con éxito',
    },

    destroyMany: {
      success: 'Campany(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Campany para eliminar.',
      confirmTitle: '¿Eliminar Campany(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Campany(s) seleccionados?',
    },

    destroy: {
      success: 'Campany eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Campany para eliminar.',
      confirmTitle: '¿Eliminar Campany?',
    },

    fields: {
      name: 'Name',
      logo: 'Logo',
      urlSiteOfficiel: 'UrlSiteOfficiel',
      adresse: 'Adresse',
      government: 'Government',

      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      name: '',
      logo: '',
      urlSiteOfficiel: '',
      adresse: '',
      government: '',
    },

    enumerators: {},
  },

  comment: {
    label: 'Comment',

    dashboardCard: {
      title: 'Comments',
    },

    list: {
      menu: 'Comments',
      title: 'Comments',
      noResults: 'No se encontraron comments.',
    },

    export: {
      success: 'Comments exportados con éxito',
    },

    new: {
      menu: 'Nuevo Comment',
      title: 'Nuevo Comment',
      success: 'Comment creado con éxito',
    },

    view: {
      title: 'Ver Comment',
    },

    edit: {
      menu: 'Editar Comment',
      title: 'Editar Comment',
      success: 'Comment actualizado con éxito',
    },

    destroyMany: {
      success: 'Comment(s) eliminado(s) con éxito',
      noSelection: 'Debes seleccionar al menos un Comment para eliminar.',
      confirmTitle: '¿Eliminar Comment(s)?',
      confirmDescription:
        '¿Estás seguro de que quieres eliminar los {0} Comment(s) seleccionados?',
    },

    destroy: {
      success: 'Comment eliminado con éxito',
      noSelection: 'Debes seleccionar al menos un Comment para eliminar.',
      confirmTitle: '¿Eliminar Comment?',
    },

    fields: {
      context: 'Context',
      workflowstepid: 'Workflow step id',
      createdByMembership: 'Creado por',
      updatedByMembership: 'Actualizado por',
      createdAt: 'Creado el',
      updatedAt: 'Actualizado el',
    },

    hints: {
      context: '',
      workflowstepid: '',
    },

    enumerators: {},
  },

  auditLog: {
    list: {
      menu: 'Registros de Auditoría',
      title: 'Registros de Auditoría',
      noResults: 'No se encontraron registros de auditoría.',
    },

    changesDialog: {
      title: 'Registro de Auditoría',
      changes: 'Cambios',
      noChanges: 'No hay cambios en este registro.',
    },

    export: {
      success: 'Registros de auditoría exportados exitosamente',
    },

    fields: {
      timestamp: 'Fecha',
      entityName: 'Entidad',
      entityNames: 'Entidades',
      entityId: 'ID de Entidad',
      operation: 'Operación',
      operations: 'Operaciones',
      membership: 'Usuario',
      apiKey: 'Clave API',
      apiEndpoint: 'Endpoint API',
      apiHttpResponseCode: 'Estado API',
      transactionId: 'ID de Transacción',
    },

    enumerators: {
      operation: {
        SI: 'Iniciar Sesión',
        SO: 'Cerrar Sesión',
        SU: 'Registrarse',
        PRR: 'Solicitud de Restablecimiento de Contraseña',
        PRC: 'Confirmación de Restablecimiento de Contraseña',
        PC: 'Cambio de Contraseña',
        VER: 'Solicitud de Verificación de Correo',
        VEC: 'Confirmación de Verificación de Correo',
        C: 'Crear',
        U: 'Actualizar',
        D: 'Eliminar',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Actividad',
      activityList: 'Actividad Reciente',
    },

    readableOperations: {
      SI: '{0} inició sesión',
      SU: '{0} se registró',
      PRR: '{0} solicitó restablecer la contraseña',
      PRC: '{0} confirmó el restablecimiento de la contraseña',
      PC: '{0} cambió la contraseña',
      VER: '{0} solicitó verificar el correo',
      VEC: '{0} verificó el correo',
      C: '{0} creó {1} {2}',
      U: '{0} actualizó {1} {2}',
      D: '{0} eliminó {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'reCAPTCHA está deshabilitado en esta plataforma. Omitiendo verificación.',
      invalid: 'reCAPTCHA inválido',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Restablecer tu contraseña para {0}`,
      content: `<p>Hola,</p> <p>Sigue este enlace para restablecer la contraseña de tu cuenta {0}. </p> <p><a href="{1}">{1}</a></p> <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
    },
    verifyEmailEmail: {
      subject: `Verifica tu correo electrónico para {0}`,
      content: `<p>Hola,</p><p>Sigue este enlace para verificar tu dirección de correo electrónico.</p><p><a href="{1}">{1}</a></p><p>Si no has solicitado verificar esta dirección, puedes ignorar este correo.</p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Has sido invitado a {0}`,
        content: `<p>Hola,</p> <p>Has sido invitado a {0}.</p> <p>Sigue este enlace para registrarte.</p> <p><a href="{1}">{1}</a></p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
      },
      multiTenant: {
        subject: `Has sido invitado a {1} en {0}`,
        content: `<p>Hola,</p> <p>Has sido invitado a {2}.</p> <p>Sigue este enlace para registrarte.</p> <p><a href="{1}">{1}</a></p> <p>Gracias,</p> <p>Tu equipo de {0}</p>`,
      },
    },

    errors: {
      emailNotConfigured:
        'Faltan las variables de entorno de correo electrónico',
    },
  },
};

export default dictionary;
