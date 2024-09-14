const dictionary = {
  projectName: 'Projeto',

  shared: {
    yes: 'Sim',
    no: 'Não',
    cancel: 'Cancelar',
    save: 'Salvar',
    clear: 'Limpar',
    decline: 'Recusar',
    accept: 'Aceitar',
    dashboard: 'Painel',
    new: 'Novo',
    searchNotFound: 'Nada encontrado.',
    searchPlaceholder: 'Pesquisar...',
    selectPlaceholder: 'Escolher uma opção',
    datePlaceholder: 'Escolha uma data',
    timePlaceholder: 'Escolha um horário',
    dateFormat: 'DD MMM, YYYY',
    timeFormat: 'hh:mmA',
    datetimeFormat: 'DD MMM, YYYY hh:mmA',
    tagsPlaceholder: 'Digite e aperte enter para adicionar',
    edit: 'Editar',
    delete: 'Excluir',
    openMenu: 'Abrir menu',
    submit: 'Enviar',
    search: 'Pesquisar',
    reset: 'Redefinir',
    min: 'Mín',
    max: 'Máx',
    view: 'Visualizar',
    copiedToClipboard: 'Copiado para a área de transferência',
    exportToCsv: 'Exportar para CSV',
    import: 'Importar',
    pause: 'Pausar',
    discard: 'Descartar',
    preferences: 'Preferências',
    session: 'Sessão',
    deleted: 'Excluído',
    remove: 'Remover',
    startDate: 'Data de Início',
    endDate: 'Data de Término',

    importer: {
      importHashAlreadyExists: 'Dados já foram importados',
      title: 'Importar arquivo CSV',
      menu: 'Importar arquivo CSV',
      line: 'Linha',
      status: 'Status',
      pending: 'Pendente',
      success: 'Importado',
      error: 'Erro',
      total: `{0} importados, {1} pendentes e {2} com erro`,
      importedMessage: `Processado {0} de {1}.`,
      noValidRows: 'Não há linhas válidas.',
      noNavigateAwayMessage:
        'Não saia desta página ou a importação será interrompida.',
      completed: {
        success:
          'Importação concluída. Todas as linhas foram importadas com sucesso.',
        someErrors:
          'Processamento concluído, mas algumas linhas não puderam ser importadas.',
        allErrors: 'Falha na importação. Não há linhas válidas.',
      },
      form: {
        downloadTemplate: 'Baixar modelo',
      },
      list: {
        newConfirm: 'Tem certeza?',
        discardConfirm: 'Tem certeza? Dados não importados serão perdidos.',
      },
      errors: {
        invalidFileEmpty: 'O arquivo está vazio',
        invalidFileCsv: 'Somente arquivos CSV (.csv) são permitidos',
        invalidFileUpload:
          'Arquivo inválido. Certifique-se de usar a última versão do modelo.',
        importHashRequired: 'Hash de importação é obrigatório',
        importHashExistent: 'Dados já foram importados',
      },
    },

    dataTable: {
      filters: 'Filtros',
      noResults: 'Nenhum resultado encontrado.',
      viewOptions: 'Visualizar',
      toggleColumns: 'Alternar colunas',
      actions: 'Ações',

      sortAscending: 'Asc',
      sortDescending: 'Desc',
      hide: 'Ocultar',

      selectAll: 'Selecionar tudo',
      selectRow: 'Selecionar linha',
      paginationTotal: 'Total: {0} linha(s)',
      paginationSelected: '{0} linha(s) selecionada(s)',
      paginationRowsPerPage: 'Linhas por página',
      paginationCurrent: `Página {0} de {1}`,
      paginationGoToFirst: 'Ir para a primeira página',
      paginationGoToPrevious: 'Ir para a página anterior',
      paginationGoToNext: 'Ir para a próxima página',
      paginationGoToLast: 'Ir para a última página',
    },

    locales: {
      en: 'Inglês',
      es: 'Espanhol',
      de: 'Alemão',
      fr: 'Français',
    },

    localeSwitcher: {
      searchPlaceholder: 'Procurar idioma...',
      title: 'Idioma',
      placeholder: 'Selecionar um idioma',
      searchEmpty: 'Nenhum idioma encontrado.',
    },

    theme: {
      toggle: 'Tema',
      light: 'Claro',
      dark: 'Escuro',
      system: 'Sistema',
    },

    errors: {
      cannotDeleteReferenced: `Não é possível excluir {0} porque está referenciado por um ou mais {1}.`,
      timezone: 'Fuso horário inválido',
      required: `{0} é um campo obrigatório`,
      invalid: `{0} é inválido`,
      dateFuture: `{0} deve estar no futuro`,
      unknown: 'Ocorreu um erro',
      unique: 'O {0} deve ser único',
    },
  },

  apiKey: {
    docs: {
      menu: 'Documentação da API',
    },
    form: {
      addAll: 'Adicionar Tudo',
    },
    edit: {
      menu: 'Editar Chave da API',
      title: 'Editar Chave da API',
      success: 'Chave da API atualizada com sucesso',
    },
    new: {
      menu: 'Nova Chave da API',
      title: 'Nova Chave da API',
      success: 'Chave da API criada com sucesso',
      text: `Salve sua chave da API! Por razões de segurança, você só poderá vê-la uma vez.`,
      subtext: `Você deve adicioná-la ao cabeçalho Authorization das suas chamadas de API.`,
      backToApiKeys: 'Voltar para Chaves da API',
    },
    list: {
      menu: 'Chaves da API',
      title: 'Chaves da API',
      viewActivity: 'Ver Atividade',
      noResults: 'Nenhuma chave da API encontrada.',
    },
    destroy: {
      confirmTitle: 'Excluir Chave da API?',
      success: 'Chave da API excluída com sucesso',
    },
    enumerators: {
      status: {
        active: 'Ativo',
        disabled: 'Desativado',
        expired: 'Expirado',
      },
    },
    fields: {
      apiKey: 'Chave da API',
      membership: 'Usuário',
      name: 'Nome',
      keyPrefix: 'Prefixo da Chave',
      key: 'Chave',
      scopes: 'Escopos',
      expiresAt: 'Expira Em',
      status: 'Status',
      createdAt: 'Criado Em',
      disabled: 'Desativado',
    },
    disabledTooltip: `Desativado em {0}.`,
    errors: {
      invalidScopes: 'escopos devem corresponder ao papel do usuário',
    },
  },

  file: {
    button: 'Enviar',
    delete: 'Excluir',
    errors: {
      formats: `Formato inválido. Deve ser um dos seguintes: {0}.`,
      notImage: `O arquivo deve ser uma imagem`,
      tooBig: `O arquivo é muito grande. O tamanho atual é {0} bytes, o tamanho máximo é {1} bytes`,
    },
  },

  auth: {
    signIn: {
      oauthError: 'Não é possível entrar com esse provedor. Use outro.',
      title: 'Entrar',
      button: 'Entrar com Email',
      success: 'Entrou com sucesso',
      email: 'Email',
      password: 'Senha',
      socialHeader: 'Ou continue com',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: 'Esqueceu a senha?',
      signUpLink: 'Não tem uma conta? Crie uma',
    },
    signUp: {
      title: 'Cadastrar',
      signInLink: 'Já tem uma conta? Entre',
      button: 'Cadastrar',
      success: 'Cadastro realizado com sucesso',
      email: 'Email',
      password: 'Senha',
    },
    verifyEmailRequest: {
      title: 'Reenviar verificação de email',
      button: 'Reenviar verificação de email',
      message:
        'Por favor, confirme seu email em <strong>{0}</strong> para continuar.',
      success: 'Verificação de email enviada com sucesso!',
    },
    verifyEmailConfirm: {
      title: 'Verifique seu email',
      success: 'Email verificado com sucesso.',
      loadingMessage: 'Só um momento, seu email está sendo verificado...',
    },
    passwordResetRequest: {
      title: 'Esqueceu a Senha',
      signInLink: 'Cancelar',
      button: 'Enviar email para redefinir senha',
      email: 'Email',
      success: 'Email para redefinição de senha enviado com sucesso',
    },
    passwordResetConfirm: {
      title: 'Redefinir Senha',
      signInLink: 'Cancelar',
      button: 'Redefinir Senha',
      password: 'Senha',
      success: 'Senha alterada com sucesso',
    },
    noPermissions: {
      title: 'Aguardando Permissões',
      message:
        'Você ainda não tem permissões. Aguarde o administrador concedê-las.',
    },
    invitation: {
      title: 'Convites',
      success: 'Convite aceito com sucesso',
      acceptWrongEmail: 'Aceitar Convite Com Este Email',
      loadingMessage: 'Só um momento, estamos aceitando o convite...',
      invalidToken: 'Token de convite expirado ou inválido.',
    },
    tenant: {
      title: 'Espaços de Trabalho',
      create: {
        name: 'Nome do Espaço de Trabalho',
        success: 'Espaço de Trabalho criado com sucesso',
        button: 'Criar Espaço de Trabalho',
      },
      select: {
        tenant: 'Selecionar um Espaço de Trabalho',
        joinSuccess: 'Entrou com sucesso no espaço de trabalho',
        select: 'Selecionar Espaço de Trabalho',
        acceptInvitation: 'Aceitar Convite',
      },
    },
    passwordChange: {
      title: 'Alterar Senha',
      subtitle: 'Forneça sua senha antiga e nova.',
      menu: 'Alterar Senha',
      oldPassword: 'Senha Antiga',
      newPassword: 'Nova Senha',
      newPasswordConfirmation: 'Confirmação da Nova Senha',
      button: 'Salvar Senha',
      success: 'Senha alterada com sucesso',
      mustMatch: 'As senhas devem coincidir',
      cancel: 'Cancelar',
    },
    profile: {
      title: 'Perfil',
      subtitle:
        'Seu perfil será compartilhado com outros usuários no seu espaço de trabalho.',
      menu: 'Perfil',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      avatars: 'Avatar',
      button: 'Salvar Perfil',
      success: 'Perfil salvo com sucesso',
      cancel: 'Cancelar',
    },
    profileOnboard: {
      title: 'Perfil',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      avatars: 'Avatar',
      button: 'Salvar Perfil',
      success: 'Perfil salvo com sucesso',
    },
    signOut: {
      menu: 'Sair',
      button: 'Sair',
      title: 'Sair',
      loading: 'Você está sendo desconectado...',
    },
    errors: {
      invalidApiKey: 'Chave de API inválida ou expirada',
      emailNotFound: 'Email não encontrado',
      userNotFound: 'Desculpe, não reconhecemos suas credenciais',
      wrongPassword: 'Desculpe, não reconhecemos suas credenciais',
      weakPassword: 'Esta senha é muito fraca',
      emailAlreadyInUse: 'Email já está em uso',
      invalidPasswordResetToken:
        'Link para redefinir senha é inválido ou expirou',
      invalidVerifyEmailToken:
        'Link para verificar email é inválido ou expirou',
      wrongOldPassword: 'A senha antiga está errada',
    },
  },

  tenant: {
    switcher: {
      title: 'Espaços de Trabalho',
      placeholder: 'Selecione um Espaço de Trabalho',
      searchPlaceholder: 'Pesquisar espaço de trabalho...',
      searchEmpty: 'Nenhum espaço de trabalho encontrado.',
      create: 'Criar Espaço de Trabalho',
    },

    invite: {
      title: `Aceitar Convite para {0}`,
      message: `Você foi convidado para {0}. Você pode escolher aceitar ou recusar.`,
    },

    form: {
      name: 'Nome',

      new: {
        title: 'Criar Espaço de Trabalho',
        success: 'Espaço de Trabalho criado com sucesso',
      },

      edit: {
        title: 'Configurações do Espaço de Trabalho',
        success: 'Espaço de Trabalho atualizado com sucesso',
      },
    },

    destroy: {
      success: 'Espaço de Trabalho excluído com sucesso',
      confirmTitle: 'Deletar Espaço de Trabalho?',
      confirmDescription:
        'Tem certeza de que deseja excluir o espaço de trabalho {0}? Esta ação é irreversível!',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Usuários',
    },

    showActivity: 'Atividade',

    view: {
      title: 'Ver Usuário',
    },

    list: {
      menu: 'Usuários',
      title: 'Usuários',
      noResults: 'Nenhum usuário encontrado.',
    },

    export: {
      success: 'Usuários exportados com sucesso',
    },

    edit: {
      menu: 'Editar Usuário',
      title: 'Editar Usuário',
      success: 'Usuário atualizado com sucesso',
    },

    new: {
      menu: 'Novo Usuário',
      title: 'Novo Usuário',
      success: 'Usuário criado com sucesso',
    },

    destroyMany: {
      success: 'Usuário(s) deletado(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um usuário para deletar.',
      confirmTitle: 'Deletar Usuário(s)?',
      confirmDescription:
        'Tem certeza de que deseja deletar os {0} usuários selecionados?',
    },

    destroy: {
      success: 'Usuário deletado com sucesso',
      noSelection: 'Você deve selecionar pelo menos um usuário para deletar.',
      confirmTitle: 'Deletar Usuário?',
    },

    resendInvitationEmail: {
      button: 'Reenviar Email de Convite',
      success: 'Email de convite reenviado com sucesso',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Nome Completo',
      firstName: 'Primeiro Nome',
      lastName: 'Sobrenome',
      email: 'Email',
      roles: 'Funções',
      status: 'Status',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Custom',
      },

      status: {
        invited: 'Convidado',
        active: 'Ativo',
        disabled: 'Desativado',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole:
        'Você não pode remover seu próprio papel de admin',
      cannotDeleteSelf: 'Você não pode remover sua própria associação',
      notInvited: 'Você não está convidado',
      invalidStatus: `Status inválido: {0}`,
      alreadyMember: `{0} já é um membro`,
      notSameEmail: `Este convite foi enviado para {0}, mas você está logado como {1}. Deseja continuar?`,
    },
  },

  subscription: {
    menu: 'Assinatura',
    title: 'Planos e Preços',
    current: 'Plano Atual',

    subscribe: 'Assinar',
    manage: 'Gerenciar',
    notPlanUser: 'Você não é o gerente desta assinatura.',
    cancelAtPeriodEnd: 'Este plano será cancelado no final do período.',

    plans: {
      free: {
        title: 'Grátis',
        price: 'R$0',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
      basic: {
        title: 'Básico',
        price: 'R$10',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
      enterprise: {
        title: 'Empresarial',
        price: 'R$50',
        pricingPeriod: '/mês',
        features: {
          first: 'Primeira descrição do recurso',
          second: 'Segunda descrição do recurso',
          third: 'Terceira descrição do recurso',
        },
      },
    },

    errors: {
      disabled: 'As assinaturas estão desativadas nesta plataforma',
      alreadyExistsActive: 'Já existe uma assinatura ativa',
      stripeNotConfigured: 'As variáveis de ambiente do Stripe estão faltando',
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
      noResults: 'Nenhum projets encontrado.',
    },

    export: {
      success: 'Projets exportados com sucesso',
    },

    new: {
      menu: 'Novo Projet',
      title: 'Novo Projet',
      success: 'Projet criado com sucesso',
    },

    view: {
      title: 'Ver Projet',
    },

    edit: {
      menu: 'Editar Projet',
      title: 'Editar Projet',
      success: 'Projet atualizado com sucesso',
    },

    destroyMany: {
      success: 'Projet(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Projet para excluir.',
      confirmTitle: 'Excluir Projet(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Projet(s) selecionados?',
    },

    destroy: {
      success: 'Projet excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Projet para excluir.',
      confirmTitle: 'Excluir Projet?',
    },

    fields: {
      title: 'Title',
      isDone: 'IsDone',
      livrable: 'Livrable',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum livrables encontrado.',
    },

    export: {
      success: 'Livrables exportados com sucesso',
    },

    new: {
      menu: 'Novo Livrable',
      title: 'Novo Livrable',
      success: 'Livrable criado com sucesso',
    },

    view: {
      title: 'Ver Livrable',
    },

    edit: {
      menu: 'Editar Livrable',
      title: 'Editar Livrable',
      success: 'Livrable atualizado com sucesso',
    },

    destroyMany: {
      success: 'Livrable(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Livrable para excluir.',
      confirmTitle: 'Excluir Livrable(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Livrable(s) selecionados?',
    },

    destroy: {
      success: 'Livrable excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Livrable para excluir.',
      confirmTitle: 'Excluir Livrable?',
    },

    fields: {
      title: 'Title',
      document: 'Document',
      projet: 'Projet',
      statusname: 'Status name',
      wfs: 'Wfs',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum workflows encontrado.',
    },

    export: {
      success: 'Workflows exportados com sucesso',
    },

    new: {
      menu: 'Novo Workflow',
      title: 'Novo Workflow',
      success: 'Workflow criado com sucesso',
    },

    view: {
      title: 'Ver Workflow',
    },

    edit: {
      menu: 'Editar Workflow',
      title: 'Editar Workflow',
      success: 'Workflow atualizado com sucesso',
    },

    destroyMany: {
      success: 'Workflow(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Workflow para excluir.',
      confirmTitle: 'Excluir Workflow(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Workflow(s) selecionados?',
    },

    destroy: {
      success: 'Workflow excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Workflow para excluir.',
      confirmTitle: 'Excluir Workflow?',
    },

    fields: {
      title: 'Title',
      steps: 'Steps',
      wf: 'Wf',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum steps encontrado.',
    },

    export: {
      success: 'Steps exportados com sucesso',
    },

    new: {
      menu: 'Novo Steps',
      title: 'Novo Steps',
      success: 'Steps criado com sucesso',
    },

    view: {
      title: 'Ver Steps',
    },

    edit: {
      menu: 'Editar Steps',
      title: 'Editar Steps',
      success: 'Steps atualizado com sucesso',
    },

    destroyMany: {
      success: 'Steps(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Steps para excluir.',
      confirmTitle: 'Excluir Steps(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Steps(s) selecionados?',
    },

    destroy: {
      success: 'Steps excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Steps para excluir.',
      confirmTitle: 'Excluir Steps?',
    },

    fields: {
      title: 'Title',
      workflow: 'Workflow',
      steps: 'Steps',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum workflowsteps encontrado.',
    },

    export: {
      success: 'WorkflowSteps exportados com sucesso',
    },

    new: {
      menu: 'Novo WorkflowStep',
      title: 'Novo WorkflowStep',
      success: 'WorkflowStep criado com sucesso',
    },

    view: {
      title: 'Ver WorkflowStep',
    },

    edit: {
      menu: 'Editar WorkflowStep',
      title: 'Editar WorkflowStep',
      success: 'WorkflowStep atualizado com sucesso',
    },

    destroyMany: {
      success: 'WorkflowStep(s) excluído(s) com sucesso',
      noSelection:
        'Você deve selecionar pelo menos um WorkflowStep para excluir.',
      confirmTitle: 'Excluir WorkflowStep(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} WorkflowStep(s) selecionados?',
    },

    destroy: {
      success: 'WorkflowStep excluído com sucesso',
      noSelection:
        'Você deve selecionar pelo menos um WorkflowStep para excluir.',
      confirmTitle: 'Excluir WorkflowStep?',
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
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum status encontrado.',
    },

    export: {
      success: 'Status exportados com sucesso',
    },

    new: {
      menu: 'Novo Status',
      title: 'Novo Status',
      success: 'Status criado com sucesso',
    },

    view: {
      title: 'Ver Status',
    },

    edit: {
      menu: 'Editar Status',
      title: 'Editar Status',
      success: 'Status atualizado com sucesso',
    },

    destroyMany: {
      success: 'Status(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Status para excluir.',
      confirmTitle: 'Excluir Status(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Status(s) selecionados?',
    },

    destroy: {
      success: 'Status excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Status para excluir.',
      confirmTitle: 'Excluir Status?',
    },

    fields: {
      name: 'Name',
      livrble: 'Livrble',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum campanies encontrado.',
    },

    export: {
      success: 'Campanies exportados com sucesso',
    },

    new: {
      menu: 'Novo Campany',
      title: 'Novo Campany',
      success: 'Campany criado com sucesso',
    },

    view: {
      title: 'Ver Campany',
    },

    edit: {
      menu: 'Editar Campany',
      title: 'Editar Campany',
      success: 'Campany atualizado com sucesso',
    },

    destroyMany: {
      success: 'Campany(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Campany para excluir.',
      confirmTitle: 'Excluir Campany(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Campany(s) selecionados?',
    },

    destroy: {
      success: 'Campany excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Campany para excluir.',
      confirmTitle: 'Excluir Campany?',
    },

    fields: {
      name: 'Name',
      logo: 'Logo',
      urlSiteOfficiel: 'UrlSiteOfficiel',
      adresse: 'Adresse',
      government: 'Government',

      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
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
      noResults: 'Nenhum comments encontrado.',
    },

    export: {
      success: 'Comments exportados com sucesso',
    },

    new: {
      menu: 'Novo Comment',
      title: 'Novo Comment',
      success: 'Comment criado com sucesso',
    },

    view: {
      title: 'Ver Comment',
    },

    edit: {
      menu: 'Editar Comment',
      title: 'Editar Comment',
      success: 'Comment atualizado com sucesso',
    },

    destroyMany: {
      success: 'Comment(s) excluído(s) com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Comment para excluir.',
      confirmTitle: 'Excluir Comment(s)?',
      confirmDescription:
        'Tem certeza de que deseja excluir os {0} Comment(s) selecionados?',
    },

    destroy: {
      success: 'Comment excluído com sucesso',
      noSelection: 'Você deve selecionar pelo menos um Comment para excluir.',
      confirmTitle: 'Excluir Comment?',
    },

    fields: {
      context: 'Context',
      workflowstepid: 'Workflow step id',
      createdByMembership: 'Criado Por',
      updatedByMembership: 'Atualizado Por',
      createdAt: 'Criado em',
      updatedAt: 'Atualizado em',
    },

    hints: {
      context: '',
      workflowstepid: '',
    },

    enumerators: {},
  },

  auditLog: {
    list: {
      menu: 'Logs de Auditoria',
      title: 'Logs de Auditoria',
      noResults: 'Nenhum log de auditoria encontrado.',
    },

    changesDialog: {
      title: 'Log de Auditoria',
      changes: 'Mudanças',
      noChanges: 'Não há mudanças neste log.',
    },

    export: {
      success: 'Logs de Auditoria exportados com sucesso',
    },

    fields: {
      timestamp: 'Data',
      entityName: 'Entidade',
      entityNames: 'Entidades',
      entityId: 'ID da Entidade',
      operation: 'Operação',
      operations: 'Operações',
      membership: 'Usuário',
      apiKey: 'Chave da API',
      apiEndpoint: 'Endpoint da API',
      apiHttpResponseCode: 'Status da API',
      transactionId: 'ID da Transação',
    },

    enumerators: {
      operation: {
        SI: 'Entrou',
        SO: 'Saiu',
        SU: 'Cadastrou-se',
        PRR: 'Solicitou Redefinição de Senha',
        PRC: 'Confirmou Redefinição de Senha',
        PC: 'Alterou Senha',
        VER: 'Solicitou Verificação de Email',
        VEC: 'Confirmou Verificação de Email',
        C: 'Criou',
        U: 'Atualizou',
        D: 'Excluiu',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Atividade',
      activityList: 'Atividade Recente',
    },

    readableOperations: {
      SI: '{0} entrou',
      SU: '{0} se registrou',
      PRR: '{0} solicitou redefinição de senha',
      PRC: '{0} confirmou redefinição de senha',
      PC: '{0} alterou a senha',
      VER: '{0} solicitou verificação de email',
      VEC: '{0} verificou o email',
      C: '{0} criou {1} {2}',
      U: '{0} atualizou {1} {2}',
      D: '{0} excluiu {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'O reCAPTCHA está desativado nesta plataforma. Verificação ignorada.',
      invalid: 'reCAPTCHA inválido',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Redefina sua senha para {0}`,
      content: `<p>Olá,</p> <p>Siga este link para redefinir a senha da sua conta {0}.</p> <p><a href="{1}">{1}</a></p> <p>Se você não solicitou a redefinição de senha, pode ignorar este e-mail.</p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
    },
    verifyEmailEmail: {
      subject: `Verifique seu e-mail para {0}`,
      content: `<p>Olá,</p><p>Siga este link para verificar seu endereço de e-mail.</p><p><a href="{1}">{1}</a></p><p>Se você não solicitou essa verificação, pode ignorar este e-mail.</p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Você foi convidado para {0}`,
        content: `<p>Olá,</p> <p>Você foi convidado para {0}.</p> <p>Siga este link para se registrar.</p> <p><a href="{1}">{1}</a></p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
      },
      multiTenant: {
        subject: `Você foi convidado para {1} em {0}`,
        content: `<p>Olá,</p> <p>Você foi convidado para {2}.</p> <p>Siga este link para se registrar.</p> <p><a href="{1}">{1}</a></p> <p>Obrigado,</p> <p>Equipe {0}</p>`,
      },
    },
    errors: {
      emailNotConfigured: 'Variáveis de ambiente de e-mail estão faltando',
    },
  },
};

export default dictionary;
