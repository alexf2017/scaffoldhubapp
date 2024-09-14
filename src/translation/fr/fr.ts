const dictionary = {
  projectName: 'Gestion Livrables',

  shared: {
    yes: 'Oui',
    no: 'Non',
    cancel: 'Annuler',
    save: 'Enregistrer',
    clear: 'Effacer',
    decline: 'Refuser',
    accept: 'Accepter',
    dashboard: 'Tableau de bord',
    new: 'Nouveau',
    searchNotFound: 'Aucun résultat trouvé.',
    searchPlaceholder: 'Rechercher...',
    selectPlaceholder: 'Sélectionner une option',
    datePlaceholder: 'Sélectionner une date',
    timePlaceholder: 'Sélectionner une heure',
    dateFormat: 'DD MMM YYYY',
    timeFormat: 'HH:mm',
    datetimeFormat: 'DD MMM YYYY HH:mm',
    tagsPlaceholder: 'Tapez et appuyez sur Entrée pour ajouter',
    edit: 'Modifier',
    delete: 'Supprimer',
    openMenu: 'Ouvrir le menu',
    submit: 'Soumettre',
    search: 'Recherche',
    reset: 'Réinitialiser',
    min: 'Min',
    max: 'Max',
    view: 'Vue',
    copiedToClipboard: 'Copié dans le presse-papiers',
    exportToCsv: 'Exporter en CSV',
    import: 'Importer',
    pause: 'Pause',
    discard: 'Annuler',
    preferences: 'Préférences',
    session: 'Session',
    deleted: 'Supprimé',
    remove: 'Retirer',
    startDate: 'Date de début',
    endDate: 'Date de fin',

    importer: {
      importHashAlreadyExists: 'Les données ont déjà été importées',
      title: 'Importer un fichier CSV',
      menu: 'Importer un fichier CSV',
      line: 'Ligne',
      status: 'Statut',
      pending: 'En attente',
      success: 'Importé',
      error: 'Erreur',
      total: `{0} importé(s), {1} en attente et {2} en erreur`,
      importedMessage: `{0} sur {1} traités.`,
      noValidRows: 'Aucune ligne valide.',
      noNavigateAwayMessage:
        'Ne quittez pas cette page, sinon l’import sera annulé.',
      completed: {
        success:
          'Importation terminée. Toutes les lignes ont été importées avec succès.',
        someErrors:
          'Traitement terminé, mais certaines lignes n’ont pas pu être importées.',
        allErrors: 'Échec de l’importation. Aucune ligne valide.',
      },
      form: {
        downloadTemplate: 'Télécharger le modèle',
      },
      list: {
        newConfirm: 'Êtes-vous sûr ?',
        discardConfirm:
          'Êtes-vous sûr ? Les données non importées seront perdues.',
      },
      errors: {
        invalidFileEmpty: 'Le fichier est vide',
        invalidFileCsv: 'Seuls les fichiers CSV (.csv) sont autorisés',
        invalidFileUpload:
          'Fichier invalide. Assurez-vous d’utiliser la dernière version du modèle.',
        importHashRequired: 'Un identifiant d’importation est requis',
        importHashExistent: 'Les données ont déjà été importées',
      },
    },

    dataTable: {
      filters: 'Filtres',
      noResults: 'Aucun résultat trouvé.',
      viewOptions: 'Options de vue',
      toggleColumns: 'Basculer les colonnes',
      actions: 'Actions',
      sortAscending: 'Croissant',
      sortDescending: 'Décroissant',
      hide: 'Masquer',
      selectAll: 'Tout sélectionner',
      selectRow: 'Sélectionner la ligne',
      paginationTotal: 'Total : {0} ligne(s)',
      paginationSelected: '{0} ligne(s) sélectionnée(s).',
      paginationRowsPerPage: 'Lignes par page',
      paginationCurrent: `Page {0} sur {1}`,
      paginationGoToFirst: 'Aller à la première page',
      paginationGoToPrevious: 'Aller à la page précédente',
      paginationGoToNext: 'Aller à la page suivante',
      paginationGoToLast: 'Aller à la dernière page',
    },

    locales: {
      en: 'Anglais',
      fr: 'Français',
    },

    localeSwitcher: {
      searchPlaceholder: 'Rechercher une langue...',
      title: 'Langue',
      placeholder: 'Sélectionner une langue',
      searchEmpty: 'Aucune langue trouvée.',
    },

    theme: {
      toggle: 'Thème',
      light: 'Clair',
      dark: 'Sombre',
      system: 'Système',
    },

    errors: {
      cannotDeleteReferenced: `Impossible de supprimer {0} car il est référencé par un ou plusieurs {1}.`,
      timezone: 'Fuseau horaire invalide',
      required: `{0} est un champ obligatoire`,
      invalid: `{0} est invalide`,
      dateFuture: `{0} doit être dans le futur`,
      unknown: 'Une erreur est survenue',
      unique: `{0} doit être unique`,
    },
  },
  apiKey: {
    docs: {
      menu: 'Documentation API',
    },
    form: {
      addAll: 'Tout ajouter',
    },
    edit: {
      menu: 'Modifier la clé API',
      title: 'Modifier la clé API',
      success: 'Clé API mise à jour avec succès',
    },
    new: {
      menu: 'Nouvelle clé API',
      title: 'Nouvelle clé API',
      success: 'Clé API créée avec succès',
      text: `Enregistrez votre clé API ! Pour des raisons de sécurité, vous ne pourrez voir la clé API qu'une seule fois.`,
      subtext: `Vous devez l’ajouter dans le header Authorization de vos appels API.`,
      backToApiKeys: 'Retour aux clés API',
    },
    list: {
      menu: 'Clés API',
      title: 'Clés API',
      viewActivity: 'Voir l’activité',
      noResults: 'Aucune clé API trouvée.',
    },
    destroy: {
      confirmTitle: 'Supprimer la clé API ?',
      success: 'Clé API supprimée avec succès',
    },
    enumerators: {
      status: {
        active: 'Active',
        disabled: 'Désactivée',
        expired: 'Expirée',
      },
    },
    fields: {
      apiKey: 'Clé API',
      membership: 'Utilisateur',
      name: 'Nom',
      keyPrefix: 'Préfixe de la clé',
      key: 'Clé',
      scopes: 'Périmètres',
      expiresAt: 'Expire le',
      status: 'Statut',
      createdAt: 'Créé le',
      disabled: 'Désactivée',
    },
    disabledTooltip: `Désactivée le {0}.`,
    errors: {
      invalidScopes:
        'Les périmètres doivent correspondre au rôle de l’utilisateur',
    },
  },
  file: {
    button: 'Télécharger',
    delete: 'Supprimer',
    errors: {
      formats: `Format invalide. Doit être l'un des suivants : {0}.`,
      notImage: `Le fichier doit être une image`,
      tooBig: `Le fichier est trop volumineux. La taille actuelle est de {0} octets, la taille maximale est de {1} octets`,
    },
  },
  auth: {
    signIn: {
      oauthError:
        'Connexion avec ce fournisseur impossible. Veuillez en utiliser un autre.',
      title: 'Se connecter',
      button: "Se connecter avec l'e-mail",
      success: 'Connexion réussie',
      email: 'E-mail',
      password: 'Mot de passe',
      socialHeader: 'Ou continuer avec',
      facebook: 'Facebook',
      github: 'GitHub',
      google: 'Google',
      passwordResetRequestLink: 'Mot de passe oublié ?',
      signUpLink: "Pas encore de compte ? S'inscrire",
    },
    signUp: {
      title: "S'inscrire",
      signInLink: 'Déjà un compte ? Se connecter',
      button: "S'inscrire",
      success: 'Inscription réussie',
      email: 'E-mail',
      password: 'Mot de passe',
    },
    verifyEmailRequest: {
      title: "Renvoyer la vérification de l'e-mail",
      button: "Renvoyer la vérification de l'e-mail",
      message:
        'Veuillez confirmer votre adresse e-mail sur <strong>{0}</strong> pour continuer.',
      success: 'E-mail de vérification envoyé avec succès !',
    },
    verifyEmailConfirm: {
      title: "Vérifier l'e-mail",
      success: 'E-mail vérifié avec succès.',
      loadingMessage: 'Un moment, votre e-mail est en cours de vérification...',
    },
    passwordResetRequest: {
      title: 'Mot de passe oublié',
      signInLink: 'Annuler',
      button: "Envoyer l'e-mail de réinitialisation",
      email: 'E-mail',
      success: 'E-mail de réinitialisation envoyé avec succès',
    },
    passwordResetConfirm: {
      title: 'Réinitialiser le mot de passe',
      signInLink: 'Annuler',
      button: 'Réinitialiser le mot de passe',
      password: 'Mot de passe',
      success: 'Mot de passe modifié avec succès',
    },
    noPermissions: {
      title: 'En attente de permissions',
      message:
        "Vous n'avez pas encore les permissions. Veuillez attendre que l'administrateur vous accorde les droits.",
    },
    invitation: {
      title: 'Invitations',
      success: 'Invitation acceptée avec succès',
      acceptWrongEmail: "Accepter l'invitation avec cet e-mail",
      loadingMessage: "Un moment, nous acceptons l'invitation...",
      invalidToken: "Le jeton d'invitation est expiré ou invalide.",
    },
    tenant: {
      title: 'Espaces de travail',
      create: {
        name: "Nom de l'espace de travail",
        success: 'Espace de travail créé avec succès',
        button: 'Créer un espace de travail',
      },
      select: {
        tenant: 'Sélectionner un espace de travail',
        joinSuccess: "Rejoint l'espace de travail avec succès",
        select: 'Sélectionner un espace de travail',
        acceptInvitation: "Accepter l'invitation",
      },
    },
    passwordChange: {
      title: 'Changer le mot de passe',
      subtitle: 'Veuillez entrer votre ancien et nouveau mot de passe.',
      menu: 'Changer le mot de passe',
      oldPassword: 'Ancien mot de passe',
      newPassword: 'Nouveau mot de passe',
      newPasswordConfirmation: 'Confirmer le nouveau mot de passe',
      button: 'Enregistrer le mot de passe',
      success: 'Mot de passe enregistré avec succès',
      mustMatch: 'Les mots de passe doivent correspondre',
      cancel: 'Annuler',
    },
    profile: {
      title: 'Profil',
      subtitle:
        'Votre profil est partagé avec les autres utilisateurs de votre espace de travail.',
      menu: 'Profil',
      firstName: 'Prénom',
      lastName: 'Nom',
      avatars: 'Avatar',
      button: 'Enregistrer le profil',
      success: 'Profil enregistré avec succès',
      cancel: 'Annuler',
    },
    profileOnboard: {
      title: 'Profil',
      firstName: 'Prénom',
      lastName: 'Nom',
      avatars: 'Avatar',
      button: 'Enregistrer le profil',
      success: 'Profil enregistré avec succès',
    },
    signOut: {
      menu: 'Se déconnecter',
      button: 'Se déconnecter',
      title: 'Se déconnecter',
      loading: 'Déconnexion en cours...',
    },
    errors: {
      invalidApiKey: 'Clé API invalide ou expirée',
      emailNotFound: 'E-mail introuvable',
      userNotFound: 'Nous ne reconnaissons pas vos informations de connexion',
      wrongPassword: 'Nous ne reconnaissons pas vos informations de connexion',
      weakPassword: 'Ce mot de passe est trop faible',
      emailAlreadyInUse: "L'e-mail est déjà utilisé",
      invalidPasswordResetToken:
        'Le lien de réinitialisation du mot de passe est invalide ou expiré',
      invalidVerifyEmailToken:
        "Le lien de vérification d'e-mail est invalide ou expiré",
      wrongOldPassword: "L'ancien mot de passe est incorrect",
    },
  },
  tenant: {
    switcher: {
      title: 'Espaces de travail',
      placeholder: 'Sélectionner un espace de travail',
      searchPlaceholder: 'Rechercher un espace de travail...',
      searchEmpty: 'Aucun espace de travail trouvé.',
      create: 'Créer un espace de travail',
    },

    invite: {
      title: `Accepter l'invitation à {0}`,
      message: `Vous avez été invité à {0}. Vous pouvez choisir d'accepter ou de refuser.`,
    },

    form: {
      name: 'Nom',

      new: {
        title: 'Créer un espace de travail',
        success: 'Espace de travail créé avec succès',
      },

      edit: {
        title: 'Paramètres de l’espace de travail',
        success: 'Espace de travail mis à jour avec succès',
      },
    },

    destroy: {
      success: 'Espace de travail supprimé avec succès',
      confirmTitle: 'Supprimer l’espace de travail ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer l’espace de travail {0} ? Cette action est irréversible !',
    },
  },

  membership: {
    dashboardCard: {
      title: 'Utilisateurs',
    },

    view: {
      title: 'Voir l’utilisateur',
    },

    showActivity: 'Activité',

    list: {
      menu: 'Utilisateurs',
      title: 'Utilisateurs',
      noResults: 'Aucun utilisateur trouvé.',
    },

    export: {
      success: 'Utilisateurs exportés avec succès',
    },

    edit: {
      menu: 'Modifier l’utilisateur',
      title: 'Modifier l’utilisateur',
      success: 'Utilisateur mis à jour avec succès',
    },

    new: {
      menu: 'Nouvel utilisateur',
      title: 'Nouvel utilisateur',
      success: 'Utilisateur créé avec succès',
    },

    destroyMany: {
      success: 'Utilisateur(s) supprimé(s) avec succès',
      noSelection:
        'Vous devez sélectionner au moins un utilisateur à supprimer.',
      confirmTitle: 'Supprimer l’utilisateur ou les utilisateurs ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} utilisateur(s) sélectionné(s) ?',
    },

    destroy: {
      success: 'Utilisateur supprimé avec succès',
      noSelection:
        'Vous devez sélectionner au moins un utilisateur à supprimer.',
      confirmTitle: 'Supprimer l’utilisateur ?',
    },

    resendInvitationEmail: {
      button: 'Renvoyer l’e-mail d’invitation',
      success: 'E-mail d’invitation renvoyé avec succès',
    },

    fields: {
      avatars: 'Avatar',
      fullName: 'Nom complet',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'E-mail',
      roles: 'Rôles',
      status: 'Statut',
    },

    enumerators: {
      roles: {
        admin: 'Admin',
        custom: 'Personnalisé',
      },

      status: {
        invited: 'Invité',
        active: 'Actif',
        disabled: 'Désactivé',
      },
    },

    errors: {
      cannotRemoveSelfAdminRole:
        "Vous ne pouvez pas retirer votre propre rôle d'admin",
      cannotDeleteSelf: 'Vous ne pouvez pas supprimer votre propre adhésion',
      notInvited: "Vous n'êtes pas invité",
      invalidStatus: `Statut invalide : {0}`,
      alreadyMember: `{0} est déjà membre`,
      notSameEmail: `Cette invitation a été envoyée à {0}, mais vous êtes connecté en tant que {1}. Voulez-vous continuer ?`,
    },
  },

  subscription: {
    menu: 'Abonnement',
    title: 'Plans et Tarification',
    current: 'Plan actuel',

    subscribe: 'S’abonner',
    manage: 'Gérer',
    notPlanUser: 'Vous n’êtes pas le gestionnaire de cet abonnement.',
    cancelAtPeriodEnd: 'Ce plan sera annulé à la fin de la période.',

    plans: {
      free: {
        title: 'Gratuit',
        price: '0 $',
        pricingPeriod: '/mois',
        features: {
          first: 'Description de la première fonctionnalité',
          second: 'Description de la deuxième fonctionnalité',
          third: 'Description de la troisième fonctionnalité',
        },
      },
      basic: {
        title: 'Basique',
        price: '10 $',
        pricingPeriod: '/mois',
        features: {
          first: 'Description de la première fonctionnalité',
          second: 'Description de la deuxième fonctionnalité',
          third: 'Description de la troisième fonctionnalité',
        },
      },
      enterprise: {
        title: 'Entreprise',
        price: '50 $',
        pricingPeriod: '/mois',
        features: {
          first: 'Description de la première fonctionnalité',
          second: 'Description de la deuxième fonctionnalité',
          third: 'Description de la troisième fonctionnalité',
        },
      },
    },

    errors: {
      disabled: 'Les abonnements sont désactivés sur cette plateforme',
      alreadyExistsActive: 'Il y a déjà un abonnement actif',
      stripeNotConfigured: 'Les variables ENV Stripe sont manquantes',
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
      noResults: 'Aucun projet trouvé.',
    },

    export: {
      success: 'Projets exportés avec succès',
    },

    new: {
      menu: 'Nouveau Projet',
      title: 'Nouveau Projet',
      success: 'Projet créé avec succès',
    },

    view: {
      title: 'Voir le Projet',
    },

    edit: {
      menu: 'Modifier le Projet',
      title: 'Modifier le Projet',
      success: 'Projet mis à jour avec succès',
    },

    destroyMany: {
      success: 'Projet(s) supprimé(s) avec succès',
      noSelection: 'Vous devez sélectionner au moins un projet à supprimer.',
      confirmTitle: 'Supprimer le(s) Projet(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} projet(s) sélectionné(s) ?',
    },

    destroy: {
      success: 'Projet supprimé avec succès',
      noSelection: 'Vous devez sélectionner au moins un projet à supprimer.',
      confirmTitle: 'Supprimer le Projet ?',
    },

    fields: {
      title: 'Titre',
      isDone: 'Terminé',
      livrable: 'Livrable',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
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
      noResults: 'Aucun livrable trouvé.',
    },

    export: {
      success: 'Livrables exportés avec succès',
    },

    new: {
      menu: 'Nouveau Livrable',
      title: 'Nouveau Livrable',
      success: 'Livrable créé avec succès',
    },

    view: {
      title: 'Voir le Livrable',
    },

    edit: {
      menu: 'Modifier le Livrable',
      title: 'Modifier le Livrable',
      success: 'Livrable mis à jour avec succès',
    },

    destroyMany: {
      success: 'Livrable(s) supprimé(s) avec succès',
      noSelection: 'Vous devez sélectionner au moins un livrable à supprimer.',
      confirmTitle: 'Supprimer le(s) Livrable(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} livrable(s) sélectionné(s) ?',
    },

    destroy: {
      success: 'Livrable supprimé avec succès',
      noSelection: 'Vous devez sélectionner au moins un livrable à supprimer.',
      confirmTitle: 'Supprimer le Livrable ?',
    },

    fields: {
      title: 'Titre',
      document: 'Document',
      projet: 'Projet',
      statusname: 'Nom du statut',
      wfs: 'Flux de travail',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
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
    label: 'Flux de travail',

    dashboardCard: {
      title: 'Flux de travail',
    },

    list: {
      menu: 'Flux de travail',
      title: 'Flux de travail',
      noResults: 'Aucun flux de travail trouvé.',
    },

    export: {
      success: 'Flux de travail exporté avec succès',
    },

    new: {
      menu: 'Nouveau flux de travail',
      title: 'Nouveau flux de travail',
      success: 'Flux de travail créé avec succès',
    },

    view: {
      title: 'Voir le flux de travail',
    },

    edit: {
      menu: 'Modifier le flux de travail',
      title: 'Modifier le flux de travail',
      success: 'Flux de travail mis à jour avec succès',
    },

    destroyMany: {
      success: 'Flux de travail(s) supprimé(s) avec succès',
      noSelection:
        'Vous devez sélectionner au moins un flux de travail à supprimer.',
      confirmTitle: 'Supprimer le(s) flux de travail(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer le(s) {0} flux de travail sélectionné(s) ?',
    },

    destroy: {
      success: 'Flux de travail supprimé avec succès',
      noSelection:
        'Vous devez sélectionner au moins un flux de travail à supprimer.',
      confirmTitle: 'Supprimer le flux de travail ?',
    },

    fields: {
      title: 'Titre',
      steps: 'Étapes',
      wf: 'Flux',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
    },

    hints: {
      title: '',
      steps: '',
      wf: '',
    },

    enumerators: {},
  },

  steps: {
    label: 'Étapes',

    dashboardCard: {
      title: 'Étapes',
    },

    list: {
      menu: 'Étapes',
      title: 'Étapes',
      noResults: 'Aucune étape trouvée.',
    },

    export: {
      success: 'Étapes exportées avec succès',
    },

    new: {
      menu: 'Nouvelles étapes',
      title: 'Nouvelles étapes',
      success: 'Étapes créées avec succès',
    },

    view: {
      title: 'Voir les étapes',
    },

    edit: {
      menu: 'Modifier les étapes',
      title: 'Modifier les étapes',
      success: 'Étapes mises à jour avec succès',
    },

    destroyMany: {
      success: 'Étape(s) supprimée(s) avec succès',
      noSelection: 'Vous devez sélectionner au moins une étape à supprimer.',
      confirmTitle: 'Supprimer les étapes ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} étapes sélectionnées ?',
    },

    destroy: {
      success: 'Étape supprimée avec succès',
      noSelection: 'Vous devez sélectionner au moins une étape à supprimer.',
      confirmTitle: 'Supprimer l’étape ?',
    },

    fields: {
      title: 'Titre',
      workflow: 'Flux de travail',
      steps: 'Étapes',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
    },

    hints: {
      title: '',
      workflow: '',
      steps: '',
    },

    enumerators: {},
  },

  workflowStep: {
    label: 'Étape du flux de travail',

    dashboardCard: {
      title: 'Étapes du flux de travail',
    },

    list: {
      menu: 'Étapes du flux de travail',
      title: 'Étapes du flux de travail',
      noResults: 'Aucune étape du flux de travail trouvée.',
    },

    export: {
      success: 'Étapes du flux de travail exportées avec succès',
    },

    new: {
      menu: 'Nouvelle étape du flux de travail',
      title: 'Nouvelle étape du flux de travail',
      success: 'Étape du flux de travail créée avec succès',
    },

    view: {
      title: 'Voir l’étape du flux de travail',
    },

    edit: {
      menu: 'Modifier l’étape du flux de travail',
      title: 'Modifier l’étape du flux de travail',
      success: 'Étape du flux de travail mise à jour avec succès',
    },

    destroyMany: {
      success: 'Étape(s) du flux de travail supprimée(s) avec succès',
      noSelection:
        'Vous devez sélectionner au moins une étape du flux de travail à supprimer.',
      confirmTitle: 'Supprimer l’étape du flux de travail ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} étapes du flux de travail sélectionnées ?',
    },

    destroy: {
      success: 'Étape du flux de travail supprimée avec succès',
      noSelection:
        'Vous devez sélectionner au moins une étape du flux de travail à supprimer.',
      confirmTitle: 'Supprimer l’étape du flux de travail ?',
    },

    fields: {
      order: 'Ordre',
      isDone: 'Terminée',
      steptitle: 'Titre de l’étape',
      workFlow: 'Flux de travail',
      observer: 'Observateur',
      responsible: 'Responsable',
      livrable: 'Livrable',
      cmt: 'Commentaire',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
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
    label: 'Statut',

    dashboardCard: {
      title: 'Statut',
    },

    list: {
      menu: 'Statut',
      title: 'Statut',
      noResults: 'Aucun statut trouvé.',
    },

    export: {
      success: 'Statut exporté avec succès',
    },

    new: {
      menu: 'Nouveau statut',
      title: 'Nouveau statut',
      success: 'Statut créé avec succès',
    },

    view: {
      title: 'Voir le statut',
    },

    edit: {
      menu: 'Modifier le statut',
      title: 'Modifier le statut',
      success: 'Statut mis à jour avec succès',
    },

    destroyMany: {
      success: 'Statut(s) supprimé(s) avec succès',
      noSelection: 'Vous devez sélectionner au moins un statut à supprimer.',
      confirmTitle: 'Supprimer le(s) statut(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} statuts sélectionnés ?',
    },

    destroy: {
      success: 'Statut supprimé avec succès',
      noSelection: 'Vous devez sélectionner au moins un statut à supprimer.',
      confirmTitle: 'Supprimer le statut ?',
    },

    fields: {
      name: 'Nom',
      livrble: 'Livrable',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
    },

    hints: {
      name: '',
      livrble: '',
    },

    enumerators: {},
  },

  campany: {
    label: 'Entreprise',

    dashboardCard: {
      title: 'Entreprises',
    },

    list: {
      menu: 'Entreprises',
      title: 'Entreprises',
      noResults: 'Aucune entreprise trouvée.',
    },

    export: {
      success: 'Entreprises exportées avec succès',
    },

    new: {
      menu: 'Nouvelle entreprise',
      title: 'Nouvelle entreprise',
      success: 'Entreprise créée avec succès',
    },

    view: {
      title: 'Voir l’entreprise',
    },

    edit: {
      menu: 'Modifier l’entreprise',
      title: 'Modifier l’entreprise',
      success: 'Entreprise mise à jour avec succès',
    },

    destroyMany: {
      success: 'Entreprise(s) supprimée(s) avec succès',
      noSelection:
        'Vous devez sélectionner au moins une entreprise à supprimer.',
      confirmTitle: 'Supprimer l’entreprise(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer les {0} entreprises sélectionnées ?',
    },

    destroy: {
      success: 'Entreprise supprimée avec succès',
      noSelection:
        'Vous devez sélectionner au moins une entreprise à supprimer.',
      confirmTitle: 'Supprimer l’entreprise ?',
    },

    fields: {
      name: 'Nom',
      logo: 'Logo',
      urlSiteOfficiel: 'URL du site officiel',
      adresse: 'Adresse',
      government: 'Gouvernement',

      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
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
    label: 'Commentaire',

    dashboardCard: {
      title: 'Commentaires',
    },

    list: {
      menu: 'Commentaires',
      title: 'Commentaires',
      noResults: 'Aucun commentaire trouvé.',
    },

    export: {
      success: 'Commentaires exportés avec succès',
    },

    new: {
      menu: 'Nouveau commentaire',
      title: 'Nouveau commentaire',
      success: 'Commentaire créé avec succès',
    },

    view: {
      title: 'Voir le commentaire',
    },

    edit: {
      menu: 'Modifier le commentaire',
      title: 'Modifier le commentaire',
      success: 'Commentaire mis à jour avec succès',
    },

    destroyMany: {
      success: 'Commentaire(s) supprimé(s) avec succès',
      noSelection:
        'Vous devez sélectionner au moins un commentaire à supprimer.',
      confirmTitle: 'Supprimer le(s) commentaire(s) ?',
      confirmDescription:
        'Êtes-vous sûr de vouloir supprimer le(s) {0} commentaire(s) sélectionné(s) ?',
    },

    destroy: {
      success: 'Commentaire supprimé avec succès',
      noSelection:
        'Vous devez sélectionner au moins un commentaire à supprimer.',
      confirmTitle: 'Supprimer le commentaire ?',
    },

    fields: {
      context: 'Contexte',
      workflowstepid: 'ID de l’étape du flux de travail',
      createdByMembership: 'Créé par',
      updatedByMembership: 'Mis à jour par',
      createdAt: 'Créé le',
      updatedAt: 'Mis à jour le',
    },

    hints: {
      context: '',
      workflowstepid: '',
    },

    enumerators: {},
  },

  auditLog: {
    list: {
      menu: 'Journaux d’audit',
      title: 'Journaux d’audit',
      noResults: 'Aucun journal d’audit trouvé.',
    },

    changesDialog: {
      title: 'Journal d’audit',
      changes: 'Modifications',
      noChanges: 'Aucun changement dans ce journal.',
    },

    export: {
      success: 'Journaux d’audit exportés avec succès',
    },

    fields: {
      timestamp: 'Date',
      entityName: 'Entité',
      entityNames: 'Entités',
      entityId: 'ID de l’entité',
      operation: 'Opération',
      operations: 'Opérations',
      membership: 'Utilisateur',
      apiKey: 'Clé API',
      apiEndpoint: 'Point de terminaison API',
      apiHttpResponseCode: 'Statut API',
      transactionId: 'ID de la transaction',
    },

    enumerators: {
      operation: {
        SI: 'Connexion',
        SO: 'Déconnexion',
        SU: 'Inscription',
        PRR: 'Demande de réinitialisation du mot de passe',
        PRC: 'Confirmation de réinitialisation du mot de passe',
        PC: 'Changement de mot de passe',
        VER: 'Demande de vérification de l’email',
        VEC: 'Confirmation de vérification de l’email',
        C: 'Création',
        U: 'Mise à jour',
        D: 'Suppression',
        AG: 'API Get',
        APO: 'API Post',
        APU: 'API Put',
        AD: 'API Delete',
      },
    },

    dashboardCard: {
      activityChart: 'Activité',
      activityList: 'Activité récente',
    },

    readableOperations: {
      SI: '{0} s’est connecté',
      SU: '{0} s’est inscrit',
      PRR: '{0} a demandé la réinitialisation du mot de passe',
      PRC: '{0} a confirmé la réinitialisation du mot de passe',
      PC: '{0} a changé le mot de passe',
      VER: '{0} a demandé la vérification de l’email',
      VEC: '{0} a vérifié l’email',
      C: '{0} a créé {1} {2}',
      U: '{0} a mis à jour {1} {2}',
      D: '{0} a supprimé {1} {2}',
    },
  },

  recaptcha: {
    errors: {
      disabled:
        'reCAPTCHA est désactivé sur cette plateforme. Vérification ignorée.',
      invalid: 'reCAPTCHA invalide',
    },
  },

  emails: {
    passwordResetEmail: {
      subject: `Réinitialisez votre mot de passe pour {0}`,
      content: `<p>Bonjour,</p> <p>Suivez ce lien pour réinitialiser votre mot de passe {0} pour votre compte.</p> <p><a href="{1}">{1}</a></p> <p>Si vous n’avez pas demandé la réinitialisation de votre mot de passe, vous pouvez ignorer cet email.</p> <p>Merci,</p> <p>Votre équipe {0}</p>`,
    },
    verifyEmailEmail: {
      subject: `Vérifiez votre email pour {0}`,
      content: `<p>Bonjour,</p><p>Suivez ce lien pour vérifier votre adresse email.</p><p><a href="{1}">{1}</a></p><p>Si vous n’avez pas demandé la vérification de cette adresse, vous pouvez ignorer cet email.</p> <p>Merci,</p> <p>Votre équipe {0}</p>`,
    },
    invitationEmail: {
      singleTenant: {
        subject: `Vous avez été invité à {0}`,
        content: `<p>Bonjour,</p> <p>Vous avez été invité à {0}.</p> <p>Suivez ce lien pour vous inscrire.</p> <p><a href="{1}">{1}</a></p> <p>Merci,</p> <p>Votre équipe {0}</p>`,
      },
      multiTenant: {
        subject: `Vous avez été invité à {1} sur {0}`,
        content: `<p>Bonjour,</p> <p>Vous avez été invité à {2}.</p> <p>Suivez ce lien pour vous inscrire.</p> <p><a href="{1}">{1}</a></p> <p>Merci,</p> <p>Votre équipe {0}</p>`,
      },
    },

    errors: {
      emailNotConfigured:
        'Les variables d’environnement pour les emails sont manquantes',
    },
  },
};

export default dictionary;
