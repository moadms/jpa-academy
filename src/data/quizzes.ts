import { QuizQuestion } from '@/types';

export const quizzes: QuizQuestion[] = [
  // TP 1 / Intro
  {
    id: 'q-tp1-1',
    chapterId: 'intro-hibernate-h2',
    labTitle: 'TP 1 : Projet Maven, Hibernate & H2',
    question: "Dans le fichier pom.xml, à quoi sert la dépendance hibernate-core ?",
    options: [
      "À compiler le code Java",
      "À fournir le pilote JDBC pour H2",
      "À fournir l’implémentation JPA / Hibernate pour la persistance",
      "À exécuter les tests unitaires JUnit"
    ],
    correctAnswerIndex: 2,
    explanation: "hibernate-core contient le moteur ORM complet de Hibernate ainsi que le fournisseur de persistance JPA (HibernatePersistenceProvider).",
    proTip: "JPA est la spécification (l'interface standard), Hibernate est le moteur concret qui fait le travail."
  },
  {
    id: 'q-tp1-2',
    chapterId: 'intro-hibernate-h2',
    labTitle: 'TP 1 : Projet Maven, Hibernate & H2',
    question: "Dans persistence.xml, que signifie transaction-type='RESOURCE_LOCAL' ?",
    options: [
      "Les transactions sont gérées par un serveur d'application Java EE (JTA)",
      "Les transactions sont gérées localement par l'application via EntityManager / EntityTransaction",
      "La base de données est obligatoirement stockée sur le disque dur local",
      "L'application ne peut pas effectuer d'opérations d'écriture"
    ],
    correctAnswerIndex: 1,
    explanation: "RESOURCE_LOCAL indique que l'application gère elle-même ses transactions manuellement avec em.getTransaction().begin() et commit(), sans conteneur JTA d'entreprise.",
    proTip: "Sans conteneur d'entreprise comme WildFly ou WebLogic, c'est toujours RESOURCE_LOCAL qu'on utilise en Java SE !"
  },

  // TP 2 / Mapping
  {
    id: 'q-tp2-1',
    chapterId: 'entities-mapping-tp2',
    labTitle: 'TP 2 : Entités & Mapping',
    question: "Quelle annotation est obligatoire pour désigner la clé primaire d'une entité JPA ?",
    options: [
      "@PrimaryKey",
      "@Key",
      "@Id",
      "@Column(primary = true)"
    ],
    correctAnswerIndex: 2,
    explanation: "@Id de javax.persistence (ou jakarta.persistence) est l'annotation standard définissant l'identifiant unique de chaque entité.",
    proTip: "Chaque entité JPA sans exception DOIT posséder un champ annoté @Id."
  },
  {
    id: 'q-tp2-2',
    chapterId: 'entities-mapping-tp2',
    labTitle: 'TP 2 : Entités & Mapping',
    question: "Pourquoi une entité JPA doit-elle obligatoirement avoir un constructeur sans argument (no-arg constructor) ?",
    options: [
      "Pour que Java puisse compiler la classe",
      "Pour qu'Hibernate puisse instancier l'objet par réflexion avant d'y injecter les valeurs de la base",
      "Pour accélérer les requêtes SQL",
      "Pour permettre la sérialisation JSON uniquement"
    ],
    correctAnswerIndex: 1,
    explanation: "Lorsqu'Hibernate charge une ligne depuis la base de données, il utilise la réflexion Java pour appeler Class.newInstance() sans arguments, puis remplit les champs.",
    proTip: "Ce constructeur peut être 'protected' ou 'public', mais il doit obligatoirement exister !"
  },

  // TP 3 / Associations
  {
    id: 'q-tp3-1',
    chapterId: 'associations-relations-tp3',
    labTitle: 'TP 3 : Associations & Liens',
    question: "Dans une relation bidirectionnelle @OneToMany / @ManyToOne, quel côté est le propriétaire de la relation ?",
    options: [
      "Le côté @OneToMany avec mappedBy",
      "Le côté @ManyToOne qui porte la clé étrangère (sans mappedBy)",
      "Les deux côtés sont propriétaires",
      "Aucun côté, c'est la base de données qui décide"
    ],
    correctAnswerIndex: 1,
    explanation: "Le côté propriétaire est TOUJOURS celui qui porte la clé étrangère en base (le côté @ManyToOne). C'est lui qu'Hibernate regarde lors du INSERT/UPDATE.",
    proTip: "Le mot clé 'mappedBy' indique toujours le côté INVERSE (miroir). Il n'a aucun pouvoir de mise à jour de clé étrangère !"
  },
  {
    id: 'q-tp3-2',
    chapterId: 'associations-relations-tp3',
    labTitle: 'TP 3 : Associations & Liens',
    question: "Que provoque l'option orphanRemoval = true sur une collection d'entités dépendantes ?",
    options: [
      "Elle lève une exception si un objet est orphelin",
      "Elle supprime automatiquement l'entité orpheline de la base de données dès qu'elle est retirée de la collection Java",
      "Elle met la clé étrangère à NULL en base",
      "Elle active le chargement EAGER"
    ],
    correctAnswerIndex: 1,
    explanation: "Quand une réservation est retirée de utilisateur.getReservations().remove(r), orphanRemoval=true ordonne à Hibernate d'exécuter un DELETE SQL pour la supprimer physiquement.",
    proTip: "Parfait pour les compositions parent-enfant comme Commande -> LignesDeCommande !"
  },

  // TP 4 / Inheritance
  {
    id: 'q-tp4-1',
    chapterId: 'inheritance-strategies-tp4',
    labTitle: 'TP 4 : Héritage avec Hibernate',
    question: "Quelle est la stratégie d'héritage par défaut dans JPA si aucune n'est spécifiée ?",
    options: [
      "InheritanceType.JOINED",
      "InheritanceType.TABLE_PER_CLASS",
      "InheritanceType.SINGLE_TABLE",
      "InheritanceType.MAPPED_SUPERCLASS"
    ],
    correctAnswerIndex: 2,
    explanation: "SINGLE_TABLE est la stratégie par défaut de JPA : toutes les classes de la hiérarchie sont stockées dans une seule table avec une colonne discriminante.",
    proTip: "C'est la plus rapide en lecture car elle ne nécessite aucune jointure SQL, mais elle oblige les colonnes spécifiques à être 'nullable'."
  },
  {
    id: 'q-tp4-2',
    chapterId: 'inheritance-strategies-tp4',
    labTitle: 'TP 4 : Héritage avec Hibernate',
    question: "Quel est le rôle de @DiscriminatorColumn dans la stratégie SINGLE_TABLE ?",
    options: [
      "Définir la clé primaire de la table",
      "Indiquer le nom de la colonne qui stocke le type de la sous-classe (ex: VOITURE ou MOTO)",
      "Chiffrer les données sensibles",
      "Créer une clé étrangère vers une table parente"
    ],
    correctAnswerIndex: 1,
    explanation: "La colonne discriminante (par défaut DTYPE) permet à Hibernate de savoir quelle sous-classe instancier en mémoire lorsqu'il lit une ligne de la table unique.",
    proTip: "Chaque classe fille déclare ensuite sa valeur avec @DiscriminatorValue('VALEUR')."
  },

  // TP 5 / Requêtes
  {
    id: 'q-tp5-1',
    chapterId: 'advanced-queries-tp5',
    labTitle: 'TP 5 : Requêtes JPQL & Pagination',
    question: "Comment paginer une requête JPQL pour obtenir la page 2 avec 10 éléments par page ?",
    options: [
      "query.setPage(2).setSize(10);",
      "query.setFirstResult(10).setMaxResults(10);",
      "query.setFirstResult(20).setMaxResults(10);",
      "query.limit(10).offset(2);"
    ],
    correctAnswerIndex: 1,
    explanation: "setFirstResult((page - 1) * pageSize) définit l'index du premier élément (10 pour la page 2), et setMaxResults(10) limite le nombre de lignes retournées.",
    proTip: "En SQL sous-jacent, Hibernate traduit cela en 'LIMIT 10 OFFSET 10' (PostgreSQL/H2) ou 'FETCH FIRST 10 ROWS' (Oracle)."
  },

  // TP 6 / Optimistic Locking
  {
    id: 'q-tp6-1',
    chapterId: 'optimistic-locking-tp6',
    labTitle: 'TP 6 : Concurrence & @Version',
    question: "Quelle annotation permet d'activer le verrouillage optimiste sans verrouiller les tables en base ?",
    options: [
      "@Lock",
      "@Optimistic",
      "@Version",
      "@Concurrent"
    ],
    correctAnswerIndex: 2,
    explanation: "L'annotation @Version sur un champ (Long, Integer ou Timestamp) active automatiquement le contrôle de concurrence optimiste géré par Hibernate.",
    proTip: "Hibernate ajoute automatiquement 'AND version = ?' dans chaque UPDATE et incrémente le compteur."
  },
  {
    id: 'q-tp6-2',
    chapterId: 'optimistic-locking-tp6',
    labTitle: 'TP 6 : Concurrence & @Version',
    question: "Quelle exception est levée quand deux transactions tentent de modifier la même entité en même temps sous verrouillage optimiste ?",
    options: [
      "ConcurrentModificationException",
      "OptimisticLockException (ou StaleObjectStateException)",
      "SQLException: Deadlock detected",
      "TransactionRolledBackException"
    ],
    correctAnswerIndex: 1,
    explanation: "Lorsque la deuxième transaction tente de commiter avec un numéro de version devenu obsolète, Hibernate détecte que zéro ligne a été modifiée et lève OptimisticLockException.",
    proTip: "L'application doit alors attraper cette exception, annuler la transaction et proposer à l'utilisateur de recharger la page."
  },

  // TP 7 / Cache & N+1
  {
    id: 'q-tp7-1',
    chapterId: 'cache-n-plus-one-tp7',
    labTitle: 'TP 7 : Cache L2 & Problème N+1',
    question: "Comment élimine-t-on radicalement le problème N+1 lors de la récupération d'une collection d'entités en JPQL ?",
    options: [
      "En utilisant FetchType.EAGER sur toutes les entités",
      "En écrivant une boucle Java avec em.find()",
      "En utilisant une clause JOIN FETCH dans la requête JPQL",
      "En désactivant le cache de premier niveau"
    ],
    correctAnswerIndex: 2,
    explanation: "JOIN FETCH force Hibernate à exécuter une jointure SQL et à charger l'entité et sa collection liée en UNE SEULE requête SQL, au lieu de 1 + N requêtes séparées.",
    proTip: "Attention : FetchType.EAGER ne résout PAS le problème N+1 en JPQL, seul JOIN FETCH ou un EntityGraph le résout !"
  },
  {
    id: 'q-tp7-2',
    chapterId: 'cache-n-plus-one-tp7',
    labTitle: 'TP 7 : Cache L2 & Problème N+1',
    question: "Quelle est la différence fondamentale entre le cache L1 et le cache L2 dans Hibernate ?",
    options: [
      "Le cache L1 est payant, le cache L2 est open-source",
      "Le cache L1 est attaché à l'EntityManager (portée transactionnelle), le cache L2 est attaché à l'EntityManagerFactory (partagé entre toutes les sessions)",
      "Le cache L1 est sur le disque dur, le cache L2 est en RAM",
      "Le cache L1 stocke du SQL, le cache L2 stocke du binaire"
    ],
    correctAnswerIndex: 1,
    explanation: "Le cache L1 (Session) est toujours actif et local à un seul EntityManager. Le cache L2 (Ehcache, Hazelcast) est partagé par tous les utilisateurs de l'application.",
    proTip: "Une entité mise dans le cache L2 peut être réutilisée par n'importe quelle session sans toucher la base de données !"
  }
];
