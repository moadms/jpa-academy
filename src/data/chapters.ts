import { Chapter } from '@/types';

export const chapters: Chapter[] = [
  // --- CHAPITRE 1 : TP 1 ---
  {
    id: 'intro-hibernate-h2',
    number: 1,
    title: "TP 1 : Introduction à Maven, Hibernate & H2",
    subtitle: "Le traducteur magique entre le monde Java et la Base de Données",
    animeTheme: {
      emoji: '⚡',
      character: 'Kaito l’Apprenti Ninja',
      gradient: 'from-blue-600 via-indigo-600 to-purple-600',
      badge: 'Genin du Code'
    },
    kidExplanation: {
      story: "Imagine que dans ton jeu vidéo préféré, tes héros sont faits en Lego 🧱 (Objets Java), mais le coffre-fort magique où tu sauvegardes ta partie ne comprend que des tableaux de chiffres dessinés à la craie 📊 (SQL et Tables). Si tu devais traduire chaque bloc à la main, tu perdrais des heures ! Hibernate est ton traducteur ninja magique : dès que tu dis 'Sauvegarde mon héros !', il range automatiquement chaque Lego dans le bon tiroir du coffre.",
      analogy: "Java parle Français, la base de données parle Ninja Ancien. Hibernate est le dictionnaire automatique instantané qui fait le pont sans que tu aies besoin de traduire toi-même !",
      keyTakeaway: "JPA est la loi universelle (l'interface), Hibernate est l'ouvrier ninja qui l'exécute, et H2 est une boîte de Lego magique en mémoire (RAM) qui s'efface quand on ferme le jeu."
    },
    anatomyElements: [
      {
        name: "pom.xml",
        role: "La liste des ingrédients magiques (dépendances Maven).",
        kidDescription: "C'est la liste de courses de ton robot. Tu lui dis : 'Achète-moi Hibernate Core et le pilote H2', et il télécharge tout tout seul.",
        codeExample: `<dependency>
  <groupId>org.hibernate</groupId>
  <artifactId>hibernate-core</artifactId>
  <version>5.6.5.Final</version>
</dependency>`
      },
      {
        name: "persistence.xml",
        role: "La carte secrète de connexion au coffre.",
        kidDescription: "C'est la lettre qui donne l'adresse du coffre (URL H2), le mot de passe, et le nom de l'équipe (persistence-unit).",
        codeExample: `<persistence-unit name="gestion-reservations" transaction-type="RESOURCE_LOCAL">
  <provider>org.hibernate.jpa.HibernatePersistenceProvider</provider>
  <properties>
    <property name="javax.persistence.jdbc.url" value="jdbc:h2:mem:reservations_db"/>
    <property name="hibernate.hbm2ddl.auto" value="update"/>
  </properties>
</persistence-unit>`
      },
      {
        name: "EntityManagerFactory",
        role: "L'usine géante qui fabrique les traducteurs.",
        kidDescription: "Très lourde à créer ! On n'en fabrique qu'une seule au démarrage de l'application.",
        codeExample: `EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion-reservations");`
      },
      {
        name: "EntityManager",
        role: "Le petit robot ouvrier personnel.",
        kidDescription: "C'est lui qui effectue tes actions quotidiennes : persist(), find(), remove(). Chaque joueur a son propre robot ouvrier !",
        codeExample: `EntityManager em = emf.createEntityManager();`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "L'Oubli de Transaction (RESOURCE_LOCAL)",
        dangerLevel: 'Critique',
        symptom: "Tu appelles em.persist(monHero), le programme se termine sans erreur... mais ton héros n'existe pas dans la base !",
        whyItHappens: "En mode RESOURCE_LOCAL, si tu n'ouvres pas le coffre avec begin() et ne le verrouilles pas avec commit(), les modifications sont jetées à la poubelle !",
        solution: "Toujours entourer les écritures de em.getTransaction().begin() et commit().",
        correctCode: `em.getTransaction().begin();
em.persist(nouvelUtilisateur);
em.getTransaction().commit();`
      },
      {
        problemName: "La fuite de mémoire (EntityManager non fermé)",
        dangerLevel: 'Moyen',
        symptom: "Après 1000 parties, l'application devient ultra lente et plante.",
        whyItHappens: "Chaque EntityManager garde en mémoire un cache d'objets. Si tu ne le fermes pas, la mémoire explose.",
        solution: "Toujours fermer em.close() dans un bloc finally ou try-with-resources.",
        correctCode: `try {
    // tes opérations
} finally {
    em.close();
}`
      }
    ],
    engineeringGuide: {
      overview: "Comment un ingénieur structure le bootstrap d'une persistance JPA avec Singleton et cycle de vie propre.",
      criticalQuestions: [
        {
          question: "Pourquoi créer un HibernateUtil singleton plutôt que recréer l'EntityManagerFactory ?",
          whyItMatters: "L'EntityManagerFactory analyse le métamodèle, ouvre le pool de connexions et compile les métadonnées. C'est un coût de 1 à 3 secondes et plusieurs dizaines de Mo de mémoire.",
          rookieMistake: "Faire `Persistence.createEntityManagerFactory(...)` à chaque appel de méthode dans le DAO.",
          seniorDecision: "Initialiser l'EMF une seule fois dans un bloc `static` privé et exposer une méthode `getEntityManager()` thread-safe."
        },
        {
          question: "RESOURCE_LOCAL ou JTA : quand choisir quoi ?",
          whyItMatters: "Détermine qui orchestre le rollback à 2 phases et les frontières transactionnelles.",
          rookieMistake: "Tenter d'utiliser des annotations `@Transactional` de Jakarta sans conteneur Spring ou serveur Java EE actif.",
          seniorDecision: "En pur Java SE / Standalone : Toujours `RESOURCE_LOCAL` avec `EntityTransaction` explicite."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Fichier de configuration de déploiement",
          jpaAnnotation: "META-INF/persistence.xml",
          codeSnippet: `<persistence-unit name="pu-app" transaction-type="RESOURCE_LOCAL">`,
          engineeringRule: "Placer rigoureusement dans `src/main/resources/META-INF/persistence.xml` pour que le ClassLoader de JPA le détecte automatiquement."
        }
      ],
      architectureChecklist: [
        "Vérifier que hibernate-core et h2 sont bien en scope test/runtime adéquat dans le pom.xml.",
        "Toujours fermer l'EntityManagerFactory à l'extinction de l'application (emf.close()).",
        "Ne jamais laisser une transaction ouverte en cas d'exception (toujours rollback() dans le catch)."
      ]
    },
    schema: {
      title: "Architecture globale JPA / Hibernate",
      type: "lifecycle",
      description: "Application Java -> EntityManager -> Hibernate Core -> Pilote JDBC -> Base H2"
    }
  },

  // --- CHAPITRE 2 : TP 2 ---
  {
    id: 'entities-mapping-tp2',
    number: 2,
    title: "TP 2 : Entités, Clés Primaires & Types",
    subtitle: "Donner une identité unique à chaque objet du monde réel",
    animeTheme: {
      emoji: '🏷️',
      character: 'Sakura la Gardienne des Noms',
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      badge: 'Chunin du Mapping'
    },
    kidExplanation: {
      story: "Si tu as 50 chats dans une pièce, comment savoir lequel s'appelle Félix ? Tu lui mets un collier avec un numéro unique (#1, #2, #3...). Dans Hibernate, chaque objet sauvegardé DOIT avoir son collier magique : c'est sa clé primaire (@Id). Sans collier, Hibernate panique et refuse de s'en occuper !",
      analogy: "Une Entité est comme une figurine Lego avec son code-barres officiel. La base de données colle une étiquette sur chaque figurine.",
      keyTakeaway: "Une classe Java devient une table grâce à @Entity. Chaque ligne a un numéro unique généré avec @GeneratedValue."
    },
    anatomyElements: [
      {
        name: "@Entity",
        role: "Transforme une simple classe Java en tableau de base de données.",
        kidDescription: "C'est le tampon magique : 'Attention, cet objet a le droit d'aller dans le coffre-fort !'",
        codeExample: `@Entity
@Table(name = "utilisateurs")
public class Utilisateur { ... }`
      },
      {
        name: "@Id & @GeneratedValue",
        role: "Le numéro de série automatique (clé primaire).",
        kidDescription: "Le distributeur automatique de tickets : chaque nouvel arrivant reçoit un ticket avec le numéro suivant (1, puis 2, puis 3).",
        codeExample: `@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;`
      },
      {
        name: "@Column(nullable = false, unique = true)",
        role: "Les règles de sécurité du tiroir.",
        kidDescription: "Interdit d'avoir deux joueurs avec le même email (unique), et interdit de laisser la case vide (nullable = false).",
        codeExample: `@Column(name = "email_user", nullable = false, unique = true, length = 120)
private String email;`
      },
      {
        name: "Constructeur sans argument (no-arg)",
        role: "Obligation vitale pour la magie de JPA.",
        kidDescription: "Hibernate a besoin de fabriquer un objet vide avant de le remplir avec les données du tiroir. S'il n'y a pas de constructeur vide, crash immédiat !",
        codeExample: `public Utilisateur() {
    // Requis par JPA / Hibernate !
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "Crash Instantané : No default constructor for entity",
        dangerLevel: 'Critique',
        symptom: "org.hibernate.InstantiationException: No default constructor for entity",
        whyItHappens: "Tu as créé un super constructeur avec tous les paramètres, mais tu as oublié de laisser le constructeur vide !",
        solution: "Ajoute un constructeur public ou protected sans paramètres.",
        correctCode: `public Salle() {} // Constructeur vide obligatoire !

public Salle(String nom, int capacite) {
    this.nom = nom;
    this.capacite = capacite;
}`
      }
    ],
    engineeringGuide: {
      overview: "Comment passer d'une classe UML à une table SQL normalisée avec typage fort et intégrité de domaine.",
      criticalQuestions: [
        {
          question: "Faut-il utiliser des types primitifs (`int`, `boolean`) ou des objets Wrappers (`Integer`, `Boolean`) ?",
          whyItMatters: "En SQL, une colonne peut être NULL. Un type primitif `int` ne peut pas être NULL et prendra 0 par défaut, corrompant la sémantique de l'absence de valeur.",
          rookieMistake: "Déclarer `private int capacite;` : impossible de savoir si la capacité est non renseignée (NULL) ou réellement égale à 0.",
          seniorDecision: "Toujours utiliser les Wrappers (`Integer`, `Long`, `BigDecimal`) pour refléter fidèlement le NULL SQL."
        },
        {
          question: "Quelle stratégie de génération de clé (@GeneratedValue) privilégier ?",
          whyItMatters: "IDENTITY désactive le batch-insert de JDBC car Hibernate doit faire un insert immédiat pour récupérer l'ID généré.",
          rookieMistake: "Mettre IDENTITY partout sans connaître l'impact sur les insertions de masse.",
          seniorDecision: "En H2/MySQL : IDENTITY est courant. En PostgreSQL/Oracle pour forte volumétrie : privilégier SEQUENCE avec allocationSize = 50."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Attribut souligné (Identifiant UML)",
          jpaAnnotation: "@Id @GeneratedValue(strategy = GenerationType.IDENTITY)",
          codeSnippet: `@Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;`,
          engineeringRule: "Toujours utiliser `Long` pour les IDs afin d'éviter le débordement à 2 milliards d'enregistrements (Integer)."
        },
        {
          umlConcept: "Contrainte d'unicité {unique}",
          jpaAnnotation: "@Column(unique = true)",
          codeSnippet: `@Column(unique = true, nullable = false)`,
          engineeringRule: "Créer un index unique au niveau du schéma SQL pour garantir l'intégrité même face aux accès concurrents."
        }
      ],
      architectureChecklist: [
        "Vérifier la présence d'un constructeur sans paramètre dans chaque entité.",
        "Vérifier que les champs temporels utilisent l'API moderne Java 8+ (`LocalDate`, `LocalDateTime`) et non `java.util.Date`.",
        "Ne jamais annoter les champs calculés ou temporaires sans `@Transient`."
      ]
    },
    schema: {
      title: "Mapping Objet-Relationnel (ORM)",
      type: "relation",
      description: "Classe Java Utilisateur <---> Table SQL 'utilisateurs' avec colonnes (id, email, nom)"
    }
  },

  // --- CHAPITRE 3 : TP 3 ---
  {
    id: 'associations-relations-tp3',
    number: 3,
    title: "TP 3 : Associations & Liens d'Amitié",
    subtitle: "OneToMany, ManyToOne, ManyToMany & Suppression Orpheline",
    animeTheme: {
      emoji: '🤝',
      character: 'Ren le Tisseur de Liens',
      gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
      badge: 'Jonin des Alliances'
    },
    kidExplanation: {
      story: "Dans notre école ninja : Un professeur a plusieurs élèves (OneToMany). Mais chaque élève n'a qu'un seul professeur principal (ManyToOne). Et pour les armes d'entraînement ninja (Équipements) : une salle peut contenir 10 shurikens, et plusieurs salles utilisent le même type de shuriken (ManyToMany) ! Mais attention : qui est le chef responsable de tenir le carnet de liaison ? C'est toujours celui qui porte la clé étrangère !",
      analogy: "Si un enfant perd son jouet dans sa chambre, c'est un lien. Si on jette la chambre et que le jouet disparaît automatiquement avec, c'est CascadeType.ALL + orphanRemoval !",
      keyTakeaway: "Toujours synchroniser les 2 côtés avec des méthodes helper (addReservation, removeEquipement). Le côté sans mappedBy est le propriétaire."
    },
    anatomyElements: [
      {
        name: "@ManyToOne (Le Côté Propriétaire)",
        role: "Porte la clé étrangère en base de données.",
        kidDescription: "Chaque réservation pointe du doigt son utilisateur : 'C'est lui mon créateur !'",
        codeExample: `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "utilisateur_id", nullable = false)
private Utilisateur utilisateur;`
      },
      {
        name: "@OneToMany(mappedBy = '...')",
        role: "Le miroir (côté inverse).",
        kidDescription: "mappedBy dit : 'Je n'ai pas la clé dans ma table, regarde plutôt dans la poche de l'autre classe !'",
        codeExample: `@OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Reservation> reservations = new ArrayList<>();`
      },
      {
        name: "orphanRemoval = true",
        role: "Nettoyeur automatique d'objets abandonnés.",
        kidDescription: "Si tu retires une réservation de la liste de l'utilisateur, Hibernate la détruit pour de bon de la base de données !",
        codeExample: `utilisateur.getReservations().remove(res);
// Dès le commit, la réservation est DELETE de la base !`
      },
      {
        name: "Méthodes Helpers Bidirectionnelles",
        role: "Garder Java et la base de données parfaitement synchronisés en mémoire.",
        kidDescription: "Quand tu donnes la main à un copain, vous vous tenez tous les deux la main, pas seulement d'un côté !",
        codeExample: `public void addReservation(Reservation r) {
    reservations.add(r);
    r.setUtilisateur(this); // Crucial pour le côté propriétaire !
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "La Boucle Infinie (StackOverflowError dans toString)",
        dangerLevel: 'Catastrophique',
        symptom: "L'application plante avec java.lang.StackOverflowError dès que tu affiches System.out.println(utilisateur) !",
        whyItHappens: "Utilisateur appelle reservations.toString(), qui appelle utilisateur.toString(), qui appelle reservations.toString()... à l'infini jusqu'au crash !",
        solution: "Ne jamais inclure la collection inverse bidirectionnelle dans la méthode toString() ou hashCode().",
        correctCode: `@Override
public String toString() {
    return "Utilisateur{id=" + id + ", nom='" + nom + "'}";
    // NE PAS METTRE this.reservations ici !
}`
      },
      {
        problemName: "La Clé Étrangère qui reste NULL (Oubli du côté propriétaire)",
        dangerLevel: 'Critique',
        symptom: "La réservation est insérée en base, mais sa colonne utilisateur_id vaut NULL !",
        whyItHappens: "Tu as fait utilisateur.getReservations().add(res), mais tu as oublié res.setUtilisateur(utilisateur). Comme mappedBy est sur l'utilisateur, Hibernate n'a rien vu !",
        solution: "Toujours utiliser une méthode utilitaire addReservation() qui met à jour les 2 côtés.",
        correctCode: `public void addReservation(Reservation r) {
    this.reservations.add(r);
    r.setUtilisateur(this);
}`
      }
    ],
    engineeringGuide: {
      overview: "Comment traduire un diagramme de relations UML (1..*, *..*) en JPA sans créer de bugs de clés étrangères ou de fuites mémoire.",
      criticalQuestions: [
        {
          question: "Qui doit posséder le `mappedBy` dans une relation bidirectionnelle ?",
          whyItMatters: "L'attribut `mappedBy` désigne le côté INVERSE. Il signifie à Hibernate d'ignorer les écritures sur cette collection lors de la génération des requêtes SQL INSERT/UPDATE.",
          rookieMistake: "Mettre `mappedBy` sur le `@ManyToOne` (erreur de compilation JPA) ou oublier d'assigner l'objet père sur le fils.",
          seniorDecision: "`mappedBy` est STRICTEMENT réservé au côté `@OneToMany` ou `@OneToOne` inverse. Le côté propriétaire est TOUJOURS celui avec `@JoinColumn`."
        },
        {
          question: "Faut-il utiliser `Set` ou `List` pour les collections ManyToMany ?",
          whyItMatters: "Avec deux collections `List` en FetchType.EAGER ou lors de jointures, Hibernate lève `MultipleBagFetchException` car il ne peut pas cartésiennement dédoublonner deux listes sans index ordonné.",
          rookieMistake: "Utiliser `List<Equipement>` partout dans les `@ManyToMany`.",
          seniorDecision: "Privilégier `Set<T>` pour les relations `@ManyToMany` non ordonnées pour garantir l'unicité et éviter le produit cartésien de listes."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Multiplicité 1 vers 0..*",
          jpaAnnotation: "@OneToMany(mappedBy = 'parent') & @ManyToOne",
          codeSnippet: `@OneToMany(mappedBy = "salle", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Reservation> reservations = new ArrayList<>();`,
          engineeringRule: "Initialiser la collection immédiatement à `new ArrayList<>()` pour éviter les `NullPointerException`."
        },
        {
          umlConcept: "Multiplicité * vers * (ManyToMany)",
          jpaAnnotation: "@ManyToMany + @JoinTable",
          codeSnippet: `@ManyToMany
@JoinTable(name = "salle_equipement",
    joinColumns = @JoinColumn(name = "salle_id"),
    inverseJoinColumns = @JoinColumn(name = "equipement_id"))
private Set<Equipement> equipements = new HashSet<>();`,
          engineeringRule: "Ne jamais mettre de cascade REMOVE sur un ManyToMany !"
        }
      ],
      architectureChecklist: [
        "Vérifier la présence systématique des méthodes helpers `addChild()` et `removeChild()`.",
        "Exclure toute collection bidirectionnelle de `toString()`, `equals()` et `hashCode()`.",
        "S'assurer que toutes les associations `@ManyToOne` sont en `FetchType.LAZY`."
      ]
    },
    schema: {
      title: "Relations et Table de Jointure",
      type: "relation",
      description: "Utilisateur (1) <---FK--- (N) Reservation | Salle (N) <--- table salle_equipement ---> (N) Equipement"
    }
  },

  // --- CHAPITRE 4 : TP 4 ---
  {
    id: 'inheritance-strategies-tp4',
    number: 4,
    title: "TP 4 : Héritage & Stratégies de Mapping",
    subtitle: "SINGLE_TABLE, JOINED & TABLE_PER_CLASS : Choisir la bonne armure",
    animeTheme: {
      emoji: '🏛️',
      character: 'Kenji le Maître des Métamorphoses',
      gradient: 'from-amber-500 via-orange-500 to-red-600',
      badge: 'Maître des Formes'
    },
    kidExplanation: {
      story: "Dans notre garage de robots : Il y a les Robots Terrestres (Voitures avec climatisation) et les Robots Rapides (Motos avec cylindrée). Tous les deux ont un nom et un prix parce que ce sont des Robots ! Comment ranger ça dans notre classeur SQL ? Option 1 : Un seul énorme tiroir avec plein de cases vides (SINGLE_TABLE). Option 2 : Un tiroir commun pour le nom, et deux petits tiroirs séparés pour les pièces spéciales (JOINED). Option 3 : Deux tiroirs complètement séparés sans rien en commun (TABLE_PER_CLASS).",
      analogy: "SINGLE_TABLE est un sac à dos géant où tout est mélangé. JOINED est une armoire bien rangée avec des tiroirs étiquetés mais qu'il faut tous ouvrir.",
      keyTakeaway: "SINGLE_TABLE est le plus rapide (par défaut) mais crée des colonnes NULL. JOINED est le plus propre et normalisé mais utilise des jointures SQL."
    },
    anatomyElements: [
      {
        name: "@Inheritance(strategy = ...)",
        role: "Choisit comment la hiérarchie d'héritage est représentée en SQL.",
        kidDescription: "C'est l'ordre de mission qui dit à Hibernate quelle stratégie de tiroirs utiliser.",
        codeExample: `@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Vehicule { ... }`
      },
      {
        name: "@DiscriminatorColumn & @DiscriminatorValue",
        role: "La colonne qui indique le type de la sous-classe (cruciale en SINGLE_TABLE).",
        kidDescription: "C'est le tampon sur le carton : 'Ceci est une Voiture' ou 'Ceci est une Moto'.",
        codeExample: `@DiscriminatorColumn(name = "type_vehicule")
// Dans la fille :
@DiscriminatorValue("MOTO")`
      },
      {
        name: "@MappedSuperclass",
        role: "Héritage de code uniquement, pas de table polymorphique.",
        kidDescription: "Permet de factoriser les champs dateCreation et dateModification dans toutes tes entités sans créer de table parente.",
        codeExample: `@MappedSuperclass
public abstract class BaseEntity {
    @Id @GeneratedValue private Long id;
    private LocalDateTime dateCreation;
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "Colonnes NOT NULL impossibles en SINGLE_TABLE",
        dangerLevel: 'Moyen',
        symptom: "Tu mets @Column(nullable = false) sur le champ 'cylindree' de Moto, et Hibernate plante quand tu sauvegardes une Voiture !",
        whyItHappens: "Comme Voiture et Moto sont dans la même table, quand on sauvegarde une Voiture, la colonne cylindree DOIT être NULL. Interdiction de forcer NOT NULL en base !",
        solution: "Si des sous-classes exigent des contraintes NOT NULL strictes, utilise la stratégie JOINED.",
        correctCode: `@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Employe { ... }`
      }
    ],
    engineeringGuide: {
      overview: "Comment traduire un arbre d'héritage UML en schéma physique optimal selon les contraintes de performance et d'intégrité.",
      criticalQuestions: [
        {
          question: "Faut-il privilégier `SINGLE_TABLE` ou `JOINED` ?",
          whyItMatters: "`SINGLE_TABLE` a des perfs exceptionnelles en lecture polymorphe (zéro jointure), mais viole la 3e forme normale et force toutes les colonnes spécifiques à être `NULLABLE`. `JOINED` garantit l'intégrité relationnelle mais paie le coût des jointures.",
          rookieMistake: "Choisir `SINGLE_TABLE` pour un modèle avec 15 sous-classes ayant chacune 10 champs obligatoires distincts.",
          seniorDecision: "Si sous-classes riches avec contraintes `NOT NULL` : `JOINED`. Si sous-classes simples avec peu de variations : `SINGLE_TABLE`."
        },
        {
          question: "Quand utiliser `@MappedSuperclass` plutôt que `@Inheritance` ?",
          whyItMatters: "Si vous n'avez jamais besoin d'exécuter de requête polymorphique (`SELECT e FROM BaseEntity e`), une table parente est inutile.",
          rookieMistake: "Créer une table abstraite mère pour stocker juste un `id` et une `dateCreation`.",
          seniorDecision: "Utiliser `@MappedSuperclass` pour factoriser des attributs techniques (audit, id) sans créer de hiérarchie relationnelle."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Généralisation UML (Flèche triangle vide)",
          jpaAnnotation: "@Inheritance(strategy = InheritanceType.JOINED)",
          codeSnippet: `@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Personne { ... }`,
          engineeringRule: "Déclarer la classe racine `abstract` pour empêcher l'instanciation directe d'un type générique sans sous-classe."
        }
      ],
      architectureChecklist: [
        "Vérifier qu'aucun champ spécifique d'une fille en SINGLE_TABLE n'est marqué nullable = false.",
        "Définir un @DiscriminatorColumn explicite avec un nom clair (ex: dtype, type_entite).",
        "Tester les requêtes polymorphiques pour observer les requêtes SQL générées (LEFT OUTER JOIN)."
      ]
    },
    schema: {
      title: "Comparatif des Stratégies d'Héritage",
      type: "inheritance",
      description: "SINGLE_TABLE (1 table + Discriminator) VS JOINED (1 table mère + tables filles avec FK) VS TABLE_PER_CLASS (tables filles indépendantes)"
    }
  },

  // --- CHAPITRE 5 : TP 5 ---
  {
    id: 'advanced-queries-tp5',
    number: 5,
    title: "TP 5 : Requêtes Avancées & Pagination",
    subtitle: "JPQL, Criteria API & Salles Libres sans ralentir le serveur",
    animeTheme: {
      emoji: '🔍',
      character: 'Yuki la Détective Astrale',
      gradient: 'from-violet-600 via-purple-600 to-indigo-700',
      badge: 'Oracle des Requêtes'
    },
    kidExplanation: {
      story: "Si ton école compte 100 000 élèves et que tu veux trouver tous ceux qui s'appellent 'Alex', tu ne vas pas faire venir les 100 000 élèves dans la cour ! Tu demandes au concierge de ne t'amener que les 10 premiers (Pagination : setFirstResult et setMaxResults). Et pour trouver les salles libres, tu demandes les salles qui n'ont AUCUNE réservation pendant le créneau demandé !",
      analogy: "JPQL ressemble à SQL mais parle avec tes Objets Java (SELECT s FROM Salle s) au lieu des tables physiques (SELECT * FROM t_salles_2026).",
      keyTakeaway: "Toujours utiliser des paramètres nommés (:nom) pour contrer les injections de pirates, et paginer les résultats pour protéger la mémoire."
    },
    anatomyElements: [
      {
        name: "JPQL avec Paramètres Nommés",
        role: "Requêtes orientées objets sécurisées.",
        kidDescription: "Tu écris une question propre : 'Donne-moi les salles dont la capacité dépasse :minCapacite'.",
        codeExample: `String jpql = "SELECT s FROM Salle s WHERE s.capacite >= :minCap";
List<Salle> salles = em.createQuery(jpql, Salle.class)
    .setParameter("minCap", 50)
    .getResultList();`
      },
      {
        name: "Pagination (setFirstResult & setMaxResults)",
        role: "Découper 10 000 résultats en pages faciles à digérer.",
        kidDescription: "Page 2 : Saute les 10 premiers (setFirstResult(10)) et donne-moi les 10 suivants (setMaxResults(10)).",
        codeExample: `TypedQuery<Salle> query = em.createQuery(jpql, Salle.class);
query.setFirstResult((page - 1) * pageSize); // Offset
query.setMaxResults(pageSize);              // Limit`
      },
      {
        name: "CriteriaBuilder & CriteriaQuery",
        role: "Construire des requêtes dynamiques en pur code Java sans risque de faute de frappe.",
        kidDescription: "Comme assembler des rails de train en Lego : si une condition est cochée, tu clipses un nouveau filtre !",
        codeExample: `CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Salle> cq = cb.createQuery(Salle.class);
Root<Salle> salle = cq.from(Salle.class);
cq.select(salle).where(cb.gt(salle.get("capacite"), 20));`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "La Faille d'Injection (Concaténation de texte)",
        dangerLevel: 'Catastrophique',
        symptom: "Un pirate tape 'OR 1=1' dans le champ de recherche et télécharge tous les utilisateurs de la base !",
        whyItHappens: "Tu as fait 'SELECT u FROM Utilisateur u WHERE u.nom = ' + nomSaisi !",
        solution: "Toujours utiliser .setParameter('nom', nomSaisi).",
        correctCode: `em.createQuery("SELECT u FROM Utilisateur u WHERE u.nom = :nom", Utilisateur.class)
  .setParameter("nom", userInput)
  .getResultList();`
      }
    ],
    engineeringGuide: {
      overview: "Comment construire des requêtes dynamiques de recherche multi-critères et pagination sans saturer la RAM du serveur.",
      criticalQuestions: [
        {
          question: "JPQL vs Criteria API : quand utiliser quoi ?",
          whyItMatters: "JPQL est lisible et concis mais statique. Criteria API est verbeux mais 100% type-safe et permet d'ajouter dynamiquement des clauses `WHERE` selon les filtres renseignés par l'utilisateur.",
          rookieMistake: "Faire de la concaténation de String JPQL avec des `if (nom != null) jpql += ' AND ...'` dangereux.",
          seniorDecision: "Requêtes statiques connues -> JPQL ou `@NamedQuery`. Écrans de recherche avec filtres optionnels dynamiques -> CriteriaBuilder."
        },
        {
          question: "Comment paginer efficacement de grandes volumétries ?",
          whyItMatters: "Faire `getResultList()` puis découper la liste en mémoire avec `list.subList()` charge 1 million de lignes dans la RAM JVM et provoque un OutOfMemoryError.",
          rookieMistake: "Paginer côté Java plutôt que côté base de données.",
          seniorDecision: "Toujours exécuter deux requêtes SQL au niveau DB : `COUNT(*)` pour le total de pages, puis la requête avec `setFirstResult(offset)` et `setMaxResults(limit)`."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Méthode de recherche avec filtres (Opération du Repository)",
          jpaAnnotation: "CriteriaQuery + Predicate list",
          codeSnippet: `List<Predicate> predicates = new ArrayList<>();
if (nom != null) predicates.add(cb.like(cb.lower(salle.get("nom")), "%" + nom.toLowerCase() + "%"));
cq.where(predicates.toArray(new Predicate[0]));`,
          engineeringRule: "Compiler la liste de prédicats sous forme de tableau dans `cq.where()` pour combiner automatiquement en AND."
        }
      ],
      architectureChecklist: [
        "Ne jamais utiliser de concaténation de chaînes dans les requêtes JPQL.",
        "Vérifier que les colonnes filtrées fréquemment disposent d'un index SQL (@Index).",
        "Encapsuler les résultats paginés dans un DTO `PaginationResult<T>` contenant (items, totalItems, page, pageSize, totalPages)."
      ]
    },
    schema: {
      title: "Cycle d'Exécution d'une Requête JPQL",
      type: "lifecycle",
      description: "JPQL (Objets Java) -> Hibernate HQL Parser -> SQL Natif de la base -> Hydratation des Entités Java"
    }
  },

  // --- CHAPITRE 6 : RÉVISION GESTION COMMERCIALE ---
  {
    id: 'revision-commerciale-tp',
    number: 6,
    title: "Lab Révision : Gestion Commerciale Complète",
    subtitle: "Catégories, Produits, Commandes & Cohérence financière en production",
    animeTheme: {
      emoji: '🛒',
      character: 'Mei la Marchande Stratège',
      gradient: 'from-emerald-600 via-green-600 to-teal-700',
      badge: 'Maîtresse du Commerce'
    },
    kidExplanation: {
      story: "Imagine un supermarché géant. Tu as des rayons (Catégories) et des jouets dessus (Produits). Un client arrive avec un caddie (Commande) et y dépose des fiches avec le nombre de jouets voulus (Lignes de Commande). Si le magasin brûle ou ferme, tout doit être compté au centime près ! Tu ne peux pas perdre de l'argent avec des arrondis bizarres (on utilise BigDecimal) et tu ne peux pas supprimer un rayon sans décider quoi faire des jouets dessus !",
      analogy: "C'est comme un reçu de caisse : chaque ligne de commande appartient à un seul ticket, mais le produit existe toujours dans le catalogue même quand le ticket est jeté.",
      keyTakeaway: "La relation Commande -> LigneCommande est une COMPOSITION (CascadeType.ALL + orphanRemoval). Produit -> LigneCommande est une RÉFÉRENCE (pas de cascade DELETE)."
    },
    anatomyElements: [
      {
        name: "BigDecimal pour les Montants",
        role: "Calcul financier d'une précision absolue sans erreur d'arrondi binaire.",
        kidDescription: "Avec `double`, 0.1 + 0.2 = 0.30000000000000004 ! En finance, on perdrait des millions. BigDecimal compte chaque centime avec exactitude.",
        codeExample: `@Column(precision = 10, scale = 2, nullable = false)
private BigDecimal prixUnitaire;`
      },
      {
        name: "Composition Commande -> LigneCommande",
        role: "Une ligne de commande n'existe que par sa commande.",
        kidDescription: "Si le client annule son panier, toutes les lignes du panier disparaissent avec lui !",
        codeExample: `@OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
private List<LigneCommande> lignes = new ArrayList<>();`
      },
      {
        name: "GenericDao<T, ID>",
        role: "Factoriser tout le code CRUD répétitif pour toutes les entités.",
        kidDescription: "Une boîte à outils universelle : save(), findById(), findAll(), delete() fonctionnent pour n'importe quelle entité sans recopier le code !",
        codeExample: `public interface GenericDao<T, ID> {
    T create(T entity);
    T findById(ID id);
    List<T> findAll();
    T update(T entity);
    void delete(T entity);
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "La suppression en cascade accidentelle du Catalogue Produit",
        dangerLevel: 'Catastrophique',
        symptom: "Un utilisateur annule une commande... et le produit 'Ordinateur Portable' est supprimé de tout le magasin !",
        whyItHappens: "Tu as mis CascadeType.REMOVE ou ALL sur la relation LigneCommande -> Produit !",
        solution: "Ne jamais mettre de cascade REMOVE de la ligne vers le produit. Seul le lien ManyToOne standard doit exister.",
        correctCode: `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "produit_id", nullable = false)
private Produit produit; // PAS de CascadeType.REMOVE ici !`
      }
    ],
    engineeringGuide: {
      overview: "Architecture d'un système commercial robuste avec séparation nette entre Couche DAO générique et Couche Service Métier.",
      criticalQuestions: [
        {
          question: "Pourquoi interdire `float` et `double` pour les prix et totaux ?",
          whyItMatters: "Les flottants IEEE 754 stockent les nombres en base 2, produisant des imprécisions d'arrondi inacceptables pour la comptabilité et les audits fiscaux.",
          rookieMistake: "Déclarer `double prix` ou `float total`.",
          seniorDecision: "Toujours utiliser `BigDecimal` avec `@Column(precision = 12, scale = 2)` et manipuler via `.add()`, `.multiply()` avec `RoundingMode.HALF_UP`."
        },
        {
          question: "Où calculer le total d'une commande : en base (JPQL SUM) ou en Java ?",
          whyItMatters: "Calculer en Java sur de grosses commandes nécessite de charger toutes les lignes en mémoire. En base, la requête SUM est optimisée par le moteur SQL.",
          rookieMistake: "Faire une boucle Java sur 10 000 lignes pour faire la somme.",
          seniorDecision: "Pour l'affichage d'une commande courante : méthode métier Java sur l'agrégat `commande.calculerTotal()`. Pour les rapports financiers globaux : requête JPQL `SELECT SUM(l.prixUnitaire * l.quantite) FROM Commande c JOIN c.lignes l`."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Composition Commande ◆--- (1..*) LigneCommande",
          jpaAnnotation: "@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)",
          codeSnippet: `public void addLigne(Produit p, int quantite) {
    LigneCommande ligne = new LigneCommande(this, p, quantite, p.getPrix());
    this.lignes.add(ligne);
}`,
          engineeringRule: "Figer le prix unitaire dans la LigneCommande au moment de l'achat pour que l'historique ne change pas si le prix du produit évolue plus tard !"
        }
      ],
      architectureChecklist: [
        "Vérifier que les DAO n'exposent que des opérations atomiques et que la gestion transactionnelle est dans le Service.",
        "Figer le prix unitaire dans la ligne d'achat (Snapshot de prix).",
        "Vérifier le stock avant de valider la commande sous transaction atomique."
      ]
    },
    schema: {
      title: "Diagramme Entité-Association Commercial",
      type: "relation",
      description: "Categorie (1) <--- (N) Produit <--- (N) LigneCommande (N) ---> (1) Commande"
    }
  },

  // --- CHAPITRE 7 : TP 6 CONCURRENCE ---
  {
    id: 'optimistic-locking-tp6',
    number: 7,
    title: "TP 6 : Concurrence & Verrouillage Optimiste (@Version)",
    subtitle: "Empêcher deux ninjas de réserver le même dojo à la même seconde",
    animeTheme: {
      emoji: '🛡️',
      character: 'Tatsuo le Bouclier du Temps',
      gradient: 'from-amber-600 via-yellow-500 to-amber-700',
      badge: 'Gardien du Temps'
    },
    kidExplanation: {
      story: "Deux ninjas, Naruto et Sasuke, ouvrent l'application à la même seconde pour réserver la dernière place de la Salle d'Entraînement. Naruto clique à 10h00m01s. Sasuke clique à 10h00m02s. Sans protection, le clic de Sasuke écraserait celui de Naruto sans que personne ne s'en rende compte ! Le verrouillage optimiste (@Version) met un tampon avec un numéro de révision sur la salle (Version 1). Quand Naruto réserve, la version passe à 2. Quand Sasuke tente de sauvegarder sa version 1 obsolète, le système crie : 'STOP ! La salle a changé entre temps !' et déclenche une OptimisticLockException.",
      analogy: "C'est comme éditer un document Google Docs : si quelqu'un a modifié le texte pendant que tu étais hors ligne, tu ne peux pas écraser son travail à l'aveugle.",
      keyTakeaway: "Un simple champ @Version private Long version; protège ton système contre les pertes de données sans bloquer la base de données."
    },
    anatomyElements: [
      {
        name: "@Version",
        role: "Incrémente automatiquement un numéro à chaque UPDATE.",
        kidDescription: "Le compteur de sécurité. Hibernate vérifie : 'WHERE id = ? AND version = ?'. Si la version a bougé, zéro ligne mise à jour -> alarme !",
        codeExample: `@Version
private Long version;`
      },
      {
        name: "OptimisticLockException",
        role: "L'exception qui prévient qu'un conflit concurrent a eu lieu.",
        kidDescription: "Le signal d'alarme : 'Désolé, quelqu'un a été plus rapide que toi, recharge la page pour voir le nouvel état !'",
        codeExample: `try {
    em.getTransaction().commit();
} catch (RollbackException e) {
    if (e.getCause() instanceof OptimisticLockException) {
        System.out.println("Conflit détecté ! Veuillez rafraîchir.");
    }
}`
      },
      {
        name: "ReservationRetryHandler (Boucle de réessai)",
        role: "Automatiser la nouvelle tentative en cas de collision concurrente.",
        kidDescription: "Si la porte s'est refermée devant toi, tu respires, tu regardes si la salle est encore libre, et tu re-tentes ta chance jusqu'à 3 fois !",
        codeExample: `int maxRetries = 3;
for (int attempt = 1; attempt <= maxRetries; attempt++) {
    try {
        return executeReservation();
    } catch (OptimisticLockException e) {
        if (attempt == maxRetries) throw e;
        Thread.sleep(50 * attempt); // Backoff exponentiel
    }
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "La 'Mise à jour Perdue' (Lost Update)",
        dangerLevel: 'Catastrophique',
        symptom: "L'utilisateur A modifie le nom de la salle, l'utilisateur B modifie la capacité. Les modifications de A sont effacées à jamais !",
        whyItHappens: "Aucun mécanisme de versioning n'était présent sur l'entité.",
        solution: "Ajouter l'annotation @Version sur un champ Long ou Integer.",
        correctCode: `@Entity
public class Salle {
    @Id @GeneratedValue private Long id;
    @Version private Long version; // Protection instantanée !
}`
      }
    ],
    engineeringGuide: {
      overview: "Comment concevoir une stratégie de concurrence pour les systèmes à fort trafic (Billetterie, Réservations hôtelières).",
      criticalQuestions: [
        {
          question: "Verrouillage Optimiste (@Version) ou Verrouillage Pessimiste (SELECT FOR UPDATE) ?",
          whyItMatters: "Le verrou pessimiste bloque les threads au niveau de la base (SELECT ... FOR UPDATE), créant des goulots d'étranglement et des risques de deadlocks. Le verrou optimiste ne bloque rien et détecte le conflit au moment du commit.",
          rookieMistake: "Mettre du pessimisme partout et faire s'effondrer le débit de requêtes de l'application.",
          seniorDecision: "Optimiste par défaut (95% des cas) avec boucle de réessai. Pessimiste réservé aux opérations critiques à très fort conflit (débit de compte bancaire)."
        },
        {
          question: "Comment gérer proprement l'exception d'invalidation concurrente ?",
          whyItMatters: "L'EntityManager est corrompu dès qu'un RollbackException/OptimisticLockException survient. Il DOIT être fermé et recréé pour la tentative suivante.",
          rookieMistake: "Tenter de réutiliser le même EntityManager après une exception pour faire le réessai.",
          seniorDecision: "Fermer l'EntityManager, en rouvrir un nouveau, recharger l'état frais depuis la base, réappliquer la logique métier et committer."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Champ technique de contrôle de concurrence",
          jpaAnnotation: "@Version",
          codeSnippet: `@Version
@Column(name = "optlock_version")
private Long version;`,
          engineeringRule: "Ne jamais modifier la valeur du champ version manuellement dans le code Java (pas de setter public) !"
        }
      ],
      architectureChecklist: [
        "Vérifier que toutes les entités sujettes à mise à jour concurrente possèdent @Version.",
        "Implémenter un intercepteur ou un handler de réessai (retry loop avec jitter/backoff).",
        "Couvrir la concurrence par un test d'intégration multithread (ex: ExecutorService avec 2 threads simultanés)."
      ]
    },
    schema: {
      title: "Scénario Concurrence Optimiste",
      type: "locking",
      description: "User 1 lit v1 -> User 2 lit v1 -> User 1 commit (v2 OK) -> User 2 tente commit (attendu v1, trouvé v2 -> OptimisticLockException !)"
    }
  },

  // --- CHAPITRE 8 : TP 7 CACHE L2 & N+1 ---
  {
    id: 'cache-n-plus-one-tp7',
    number: 8,
    title: "TP 7 : Cache de Second Niveau & Le Piège N+1",
    subtitle: "JOIN FETCH, EntityGraph & Ehcache : Rendre ton application 100x plus rapide",
    animeTheme: {
      emoji: '⚡',
      character: 'Hikari la Vitesse Éclair',
      gradient: 'from-cyan-500 via-blue-600 to-indigo-800',
      badge: 'Hokage des Performances'
    },
    kidExplanation: {
      story: "Imagine un serveur de restaurant. Tu lui demandes : 'Apporte-moi les 20 menus avec la boisson de chaque client'. Si le serveur est bête, il va faire 1 aller-retour pour la liste des 20 clients, PUIS 20 allers-retours séparés en cuisine pour chaque verre d'eau ! C'est 1 + 20 = 21 allers-retours ! C'est exactement le PIÈGE N+1 d'Hibernate ! La solution ? JOIN FETCH : le serveur prend un grand plateau et amène tout en UN SEUL VOYAGE ! Et pour le Cache L2 : on pose les verres les plus fréquents sur une table à côté pour ne même plus aller en cuisine !",
      analogy: "Le piège N+1 est d'acheter 10 bonbons en faisant 10 trajets séparés au magasin au lieu d'acheter le paquet complet en une seule fois.",
      keyTakeaway: "Toujours utiliser 'JOIN FETCH' ou un 'EntityGraph' sur les collections pour éradiquer le problème N+1."
    },
    anatomyElements: [
      {
        name: "JOIN FETCH",
        role: "Charge l'entité et ses collections associées en une seule requête SQL JOIN.",
        kidDescription: "Le grand plateau magique : au lieu de faire 100 requêtes, Hibernate n'en fait qu'une seule !",
        codeExample: `// Sans JOIN FETCH : 1 requête pour les salles + N requêtes pour les équipements !
// AVEC JOIN FETCH : 1 seule requête SQL !
String jpql = "SELECT DISTINCT s FROM Salle s JOIN FETCH s.equipements";
List<Salle> salles = em.createQuery(jpql, Salle.class).getResultList();`
      },
      {
        name: "EntityGraph",
        role: "Déclare dynamiquement les relations à charger en EAGER sans réécrire la requête JPQL.",
        kidDescription: "Le plan d'accès personnalisé qui dit à Hibernate : 'Pour cette fois-ci, prends aussi les réservations !'",
        codeExample: `EntityGraph<Salle> graph = em.createEntityGraph(Salle.class);
graph.addAttributeNodes("equipements");
TypedQuery<Salle> q = em.createQuery("SELECT s FROM Salle s", Salle.class);
q.setHint("javax.persistence.fetchgraph", graph);`
      },
      {
        name: "Cache de Second Niveau (L2 Cache)",
        role: "Mémoire partagée entre tous les EntityManagers de l'application.",
        kidDescription: "Le Cache L1 (Session) est ton sac à dos personnel. Le Cache L2 (SessionFactory) est le frigo commun de la colocation : si quelqu'un a déjà cherché la Salle 1, elle est déjà dans le frigo pour tout le monde !",
        codeExample: `@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Equipement { ... }`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "Le Problème N+1 (Effondrement de la base de données)",
        dangerLevel: 'Catastrophique',
        symptom: "Charger 500 salles génère 501 requêtes SQL dans la console Hibernate, le serveur de base sature !",
        whyItHappens: "La relation @ManyToMany ou @OneToMany est en FetchType.LAZY. Quand tu parcours salle.getEquipements(), Hibernate tire une requête par salle !",
        solution: "Utiliser JOIN FETCH dans ta requête JPQL.",
        correctCode: `SELECT DISTINCT s FROM Salle s LEFT JOIN FETCH s.equipements`
      },
      {
        problemName: "LazyInitializationException (La session fermée)",
        dangerLevel: 'Critique',
        symptom: "org.hibernate.LazyInitializationException: could not initialize proxy - no Session",
        whyItHappens: "Tu as fermé l'EntityManager, puis tu as essayé de lire salle.getEquipements(). Le proxy ne peut plus parler à la base fermée !",
        solution: "Soit charger les équipements avant de fermer l'EntityManager avec JOIN FETCH, soit laisser la transaction ouverte.",
        correctCode: `// Charger avec JOIN FETCH avant de fermer la session !
Salle s = em.createQuery("SELECT s FROM Salle s JOIN FETCH s.equipements WHERE s.id = :id", Salle.class)
    .setParameter("id", 1L).getSingleResult();
em.close();
s.getEquipements().size(); // Fonctionne sans erreur !`
      }
    ],
    engineeringGuide: {
      overview: "Maîtriser les performances de persistance : éradication du N+1 et mise en cache stratégique (Ehcache / Redis).",
      criticalQuestions: [
        {
          question: "Pourquoi FetchType.EAGER ne résout PAS le problème N+1 en JPQL ?",
          whyItMatters: "Quand vous exécutez `SELECT s FROM Salle s`, le parser JPQL génère une première requête SQL pour les salles. Pour chaque salle, constatant que la relation est EAGER, Hibernate tire immédiatement N sous-requêtes ! C'est le piège numéro 1 des développeurs débutants.",
          rookieMistake: "Remplacer LAZY par EAGER en croyant corriger le problème N+1.",
          seniorDecision: "Garder LAZY partout, et utiliser `JOIN FETCH` (ou `EntityGraph`) spécifiquement dans la requête JPQL concernée."
        },
        {
          question: "Quand doit-on activer le Cache L2 ?",
          whyItMatters: "Le cache L2 consomme de la mémoire heap et nécessite une stratégie d'invalidation rigoureuse si des écritures concurrentes ont lieu.",
          rookieMistake: "Mettre du Cache L2 sur des données hautement volatiles qui changent 50 fois par seconde.",
          seniorDecision: "Activer le Cache L2 (`READ_ONLY` ou `READ_WRITE`) sur les référentiels stables et très consultés (ex: Catégories, Types de matériel, Droits d'accès)."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Optimisation de chargement de graphe d'objets",
          jpaAnnotation: "JOIN FETCH / @NamedEntityGraph",
          codeSnippet: `SELECT DISTINCT s FROM Salle s LEFT JOIN FETCH s.equipements LEFT JOIN FETCH s.reservations`,
          engineeringRule: "Toujours ajouter le mot-clé `DISTINCT` en JPQL lors d'un `JOIN FETCH` sur une collection pour éviter les doublons dans la liste racine résultante."
        }
      ],
      architectureChecklist: [
        "Activer `hibernate.show_sql` et `format_sql` en environnement de dev pour surveiller le nombre de requêtes émises.",
        "Valider qu'aucune LazyInitializationException ne survient au niveau de la couche d'exposition (DTO / API).",
        "Configurer les durées TTL (Time To Live) du cache L2 dans ehcache.xml."
      ]
    },
    schema: {
      title: "Architecture des Caches L1 et L2",
      type: "cache",
      description: "EntityManager 1 (L1) & EntityManager 2 (L1) ---> SessionFactory (Cache L2 Partagé / Ehcache) ---> Base SQL"
    }
  },

  // --- CHAPITRE 9 : EVALUATION 3 MINI-PROJETS ---
  {
    id: 'evaluation-multi-domaines',
    number: 9,
    title: "Évaluation Finale : Architecture Multi-Domaines",
    subtitle: "Stock, Projets & État Civil : Modélisation complète de 3 univers métiers",
    animeTheme: {
      emoji: '🏆',
      character: 'Daiki le Grand Maître Architecte',
      gradient: 'from-fuchsia-600 via-purple-700 to-indigo-900',
      badge: 'Grand Maître S-Rank'
    },
    kidExplanation: {
      story: "C'est l'examen final de l'académie des ninjas ! Tu dois construire 3 royaumes en même temps : 1) Le Royaume des Marchands (Stock avec Produits et Commandes), 2) Le Royaume des Bâtisseurs (Projets avec Tâches assignées à des Employés), et 3) Le Royaume des Familles (État Civil où un Homme et une Femme s'unissent par un Mariage). Chaque royaume a ses propres règles et ses propres serments de fidélité !",
      analogy: "C'est comme être le maire d'une grande ville qui doit gérer l'entrepôt logistique, le bureau des chantiers et la mairie des mariages sans qu'aucun document ne se mélange.",
      keyTakeaway: "Un grand ingénieur sait découper son projet en modules indépendants, avec une hiérarchie de services et des tests unitaires automatisés pour chaque domaine."
    },
    anatomyElements: [
      {
        name: "Architecture en Couches (IDao -> AbstractService)",
        role: "Séparer strictement l'accès aux données des règles métiers.",
        kidDescription: "Chaque métier a son propre spécialiste : les DAO savent fouiller dans les coffres, les Services savent appliquer les lois !",
        codeExample: `public abstract class AbstractService<T, ID> {
    protected final IDao<T, ID> dao;
    public T save(T entity) { return dao.create(entity); }
}`
      },
      {
        name: "Domaine 1 : Gestion de Stock",
        role: "Modéliser Produits, Catégories et Commandes avec calcul de chiffre d'affaires.",
        kidDescription: "Suivre chaque carton, calculer la valeur totale du hangar et figer les prix à l'achat.",
        codeExample: `Produit p = new Produit("Ordinateur", new BigDecimal("1200.00"), 10);
categorie.addProduit(p);`
      },
      {
        name: "Domaine 2 : Projets & Tâches",
        role: "Organiser des chantiers avec tâches assignées à des employés.",
        kidDescription: "Un projet a plusieurs missions. Chaque employé peut avoir plusieurs missions sur différents projets.",
        codeExample: `@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "projet_id", nullable = false)
private Projet projet;`
      },
      {
        name: "Domaine 3 : État Civil & Héritage JOINED",
        role: "Personne (abstrait) hérité par Homme et Femme, liés par l'entité Mariage.",
        kidDescription: "Un papa (Homme) et une maman (Femme) sont tous deux des Personnes. L'acte de mariage relie les deux avec la date de leur union.",
        codeExample: `@Entity
public class Mariage {
    @ManyToOne(optional = false) private Homme homme;
    @ManyToOne(optional = false) private Femme femme;
    private LocalDate dateMariage;
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "Confusion des contextes de persistance entre domaines",
        dangerLevel: 'Moyen',
        symptom: "Une erreur dans le domaine État Civil fait planter les transactions du domaine Stock !",
        whyItHappens: "Mélanger les opérations de domaines distincts dans la même transaction globale sans isolation.",
        solution: "Découper chaque domaine dans son propre package de services et exécuter les tests d'intégration de façon hermétique.",
        correctCode: `@Test
void testDomaineStockIndependant() {
    // Transaction isolée pour le stock
}`
      }
    ],
    engineeringGuide: {
      overview: "Comment un ingénieur aborde un sujet d'examen ou un projet d'entreprise à multi-domaines complexes.",
      criticalQuestions: [
        {
          question: "Par quel bout commencer quand on reçoit un sujet avec 3 domaines métiers distincts ?",
          whyItMatters: "Tenter de coder les contrôleurs ou les services avant que les entités et relations ne soient claires mène à des refactorings massifs et des pertes de temps.",
          rookieMistake: "Commencer à coder sans avoir posé les cardinalités et la possession des clés étrangères sur papier.",
          seniorDecision: "La méthode en 4 étapes de l'ingénieur : 1) Valider le diagramme de classes et les cardinalités, 2) Écrire les Entités avec leurs constructeurs et helpers, 3) Écrire le GenericDao et les DAOs spécifiques, 4) Coder les Services métiers et les tests JUnit."
        },
        {
          question: "Comment tester l'héritage JOINED avec polymorphisme en JUnit 5 ?",
          whyItMatters: "Vérifier qu'un `em.find(Personne.class, id)` renvoie bien l'instance concrète (`Homme` ou `Femme`) et que la table mère contient bien la ligne partagée.",
          rookieMistake: "Ne tester que les classes concrètes sans vérifier la requête polymorphe sur la classe mère.",
          seniorDecision: "Écrire une assertion polymorphe : `Personne p = personneDao.findById(id); assertTrue(p instanceof Homme);`."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Association n-aire ou entité d'association (Mariage)",
          jpaAnnotation: "@Entity avec deux @ManyToOne vers Homme et Femme",
          codeSnippet: `@Entity
@Table(name = "mariages")
public class Mariage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "homme_id", nullable = false) private Homme homme;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "femme_id", nullable = false) private Femme femme;
    private LocalDate dateMariage;
}`,
          engineeringRule: "Toujours utiliser une clé primaire artificielle `@Id Long id` pour une entité d'association plutôt qu'une clé composite complexe quand l'association a une identité temporelle propre."
        }
      ],
      architectureChecklist: [
        "Vérifier les 3 suites de tests JUnit correspondant aux 3 exercices du sujet.",
        "S'assurer que toutes les entités de l'évaluation sont enregistrées dans le persistence.xml.",
        "Valider que le pom.xml compile avec 0 erreur (`mvn clean test`)."
      ]
    },
    schema: {
      title: "Architecture Multi-Domaines de l'Évaluation",
      type: "relation",
      description: "Module Stock (Produits/Commandes) | Module Projets (Tâches/Employés) | Module État Civil (Personne/Homme/Femme/Mariage)"
    }
  },

  // --- CHAPITRE 10 : TP CAPSTONE SYSTÈME RÉSERVATION COMPLET ---
  {
    id: 'capstone-reservation-salles',
    number: 10,
    title: "TP Capstone : Application Réservation Complète",
    subtitle: "Architecture Enterprise Hexagonale, Services, Conflits & Tests de Bout en Bout",
    animeTheme: {
      emoji: '👑',
      character: 'Kage le Suprême Architecte',
      gradient: 'from-amber-500 via-pink-600 to-purple-800',
      badge: 'Maître Kage Incontesté'
    },
    kidExplanation: {
      story: "C'est l'ultime forteresse ! Tu as assemblé tous les pouvoirs que tu as appris : le coffre magique (Hibernate), les étiquettes sécurisées (Entités), les liens d'amitié (OneToMany/ManyToMany), les armures de combat (Héritage), les détectives de l'espace (JPQL), et le bouclier temporel anti-triche (@Version). Désormais, ton système peut faire tourner un aéroport ou une université tout entière sans jamais faire d'erreur ni laisser deux personnes réserver la même salle !",
      analogy: "C'est comme construire un vaisseau spatial de Lego complet qui vole pour de vrai : chaque petite brique a été posée au millimètre près !",
      keyTakeaway: "Un projet de production complet associe modèle de données robuste, couche service transactionnelle, gestion fine de la concurrence et couverture de tests automatisée."
    },
    anatomyElements: [
      {
        name: "Couche Service Transactionnelle",
        role: "Orchestrer les règles métiers complexes et assurer la cohérence ACID.",
        kidDescription: "Le général en chef : avant de valider la réservation, il vérifie que la salle est libre, que l'utilisateur existe, et que le créneau est valide.",
        codeExample: `public Reservation reserverSalle(Long userId, Long salleId, LocalDateTime debut, LocalDateTime fin) {
    // Vérification de non-chevauchement
    // Détection de conflit concurrent
    // Persistance atomique
}`
      },
      {
        name: "Requête de non-chevauchement de créneaux",
        role: "Algorithme mathématique d'exclusion temporelle en JPQL.",
        kidDescription: "Deux réservations se chevauchent si le début de la nouvelle est avant la fin de l'ancienne ET la fin de la nouvelle est après le début de l'ancienne !",
        codeExample: `String jpql = "SELECT COUNT(r) FROM Reservation r WHERE r.salle.id = :salleId "
    + "AND r.dateDebut < :fin AND r.dateFin > :debut";`
      },
      {
        name: "Tests d'Intégration Bout en Bout (End-to-End)",
        role: "Valider l'ensemble des scénarios réels sur base en mémoire.",
        kidDescription: "Le grand tournoi de combat : on teste la création, l'ajout d'équipements, la réservation simultanée et l'annulation.",
        codeExample: `@Test
void testScenarioComplet() {
    // 1. Créer salle et équipements
    // 2. Créer utilisateur
    // 3. Réserver avec succès
    // 4. Tenter un double-booking et vérifier l'exception !
}`
      }
    ],
    problemsAndSolutions: [
      {
        problemName: "Le Chevauchement de Réservations (Double Booking Silencieux)",
        dangerLevel: 'Catastrophique',
        symptom: "Deux réunions importantes se retrouvent programmées dans la même salle au même horaire !",
        whyItHappens: "Vérification de disponibilité manquante ou exécutée hors de la transaction de réservation.",
        solution: "Requête d'intersection de créneaux JPQL exécutée dans la même transaction que l'insertion, protégée par @Version sur la Salle.",
        correctCode: `boolean conflits = reservationDao.existeConflit(salleId, debut, fin);
if (conflits) {
    throw new SalleIndisponibleException("La salle est déjà réservée sur ce créneau !");
}`
      }
    ],
    engineeringGuide: {
      overview: "L'art de concevoir un système d'information complet du cahier des charges aux tests d'intégration industriels.",
      criticalQuestions: [
        {
          question: "Comment prouver mathématiquement qu'il n'y aura aucun double booking ?",
          whyItMatters: "Deux intervalles `[A, B]` et `[C, D]` se chevauchent si et seulement si `A < D ET B > C`. C'est la formule d'or de tout planificateur temporel.",
          rookieMistake: "Faire des comparaisons complexes avec 4 clauses `BETWEEN` qui oublient les cas où un créneau englobe complètement un autre.",
          seniorDecision: "Appliquer la condition unifiée `r.dateDebut < :nouveauFin AND r.dateFin > :nouveauDebut` combinée à `@Version` sur l'entité Salle pour garantir l'isolation."
        },
        {
          question: "Quelle stratégie d'exception adopter dans la couche Service ?",
          whyItMatters: "Exposer directement des `PersistenceException` ou `SQLException` à la couche UI / API viole l'encapsulation et expose des détails d'implémentation.",
          rookieMistake: "Laisser remonter les exceptions JPA brutes jusqu'au contrôleur.",
          seniorDecision: "Traduire les exceptions d'infrastructure en exceptions métiers explicites (`SalleNonTrouveeException`, `CreneauOccupeException`, `ConflitConcurrenceException`)."
        }
      ],
      umlToCodeSteps: [
        {
          umlConcept: "Architecture Hexagonale / En couches",
          jpaAnnotation: "Service -> DAO -> EntityManager -> BD",
          codeSnippet: `// Contrôleur / UI
GestionReservationService service = new GestionReservationServiceImpl(emf);
service.reserver(userId, salleId, debut, fin);`,
          engineeringRule: "Chaque couche ne communique qu'avec l'interface de la couche immédiatement inférieure."
        }
      ],
      architectureChecklist: [
        "Vérifier que toutes les contraintes métiers sont testées unitairement avec JUnit 5.",
        "S'assurer que les scénarios nominaux et d'échec (bad path) sont tous couverts.",
        "Vérifier l'absence totale de fuites de ressources ou de sessions Hibernate non libérées."
      ]
    },
    schema: {
      title: "Architecture Globale du Capstone",
      type: "lifecycle",
      description: "Utilisateur -> ServiceGestionReservation (ACID) -> SalleDao / ReservationDao -> Hibernate Engine -> Base H2"
    }
  }
];
