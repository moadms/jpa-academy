import { CodeFillGame, BugHunterGame, LifecycleStep } from '@/types';

export const codeFillGames: CodeFillGame[] = [
  {
    id: 'cf-1',
    title: 'Déclarer une Entité JPA',
    difficulty: 'Facile',
    description: 'Complète l’annotation magique qui transforme cette classe en table de base de données.',
    templateCode: `{{BLANK}}
@Table(name = "salles")
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}`,
    choices: ['@Table', '@Entity', '@Repository', '@DatabaseTable'],
    correctAnswer: '@Entity',
    explanation: "@Entity est l'annotation JPA obligatoire qui marque une classe Java comme gérée par l'ORM."
  },
  {
    id: 'cf-2',
    title: 'Activer le Verrouillage Optimiste',
    difficulty: 'Moyen',
    description: 'Protège cette entité contre les écritures concurrentes écrasées.',
    templateCode: `@Entity
public class Reservation {
    @Id @GeneratedValue
    private Long id;

    {{BLANK}}
    private Long version;
}`,
    choices: ['@Lock', '@Version', '@Revision', '@Optimistic'],
    correctAnswer: '@Version',
    explanation: "@Version demande à Hibernate de surveiller le numéro de révision de l'entité lors des UPDATEs."
  },
  {
    id: 'cf-3',
    title: 'Bannir le Problème N+1',
    difficulty: 'Expert',
    description: 'Complète la requête JPQL pour charger la salle et ses équipements en un seul aller-retour SQL.',
    templateCode: `String jpql = "SELECT s FROM Salle s {{BLANK}} s.equipements WHERE s.id = :id";
Salle s = em.createQuery(jpql, Salle.class)
    .setParameter("id", 1L)
    .getSingleResult();`,
    choices: ['JOIN', 'LEFT JOIN', 'JOIN FETCH', 'FETCH ALL'],
    correctAnswer: 'JOIN FETCH',
    explanation: "JOIN FETCH force Hibernate à initialiser la collection associée immédiatement dans la même requête SELECT."
  },
  {
    id: 'cf-4',
    title: 'Miroir Bidirectionnel',
    difficulty: 'Moyen',
    description: 'Désigne l’attribut qui porte la clé étrangère du côté propriétaire.',
    templateCode: `// Dans Salle.java :
@OneToMany({{BLANK}} = "salle", cascade = CascadeType.ALL)
private List<Reservation> reservations = new ArrayList<>();`,
    choices: ['targetEntity', 'mappedBy', 'referencedColumn', 'joinColumn'],
    correctAnswer: 'mappedBy',
    explanation: "mappedBy = 'salle' indique que l'attribut 'salle' dans la classe Reservation porte la clé étrangère."
  }
];

export const bugHunterGames: BugHunterGame[] = [
  {
    id: 'bug-1',
    title: 'Le Mystère de la Sauvegarde Fantôme',
    scenario: "Un développeur junior a écrit ce service pour créer un nouvel utilisateur. Le code s'exécute sans aucune exception dans la console... pourtant la table 'utilisateurs' reste désespérément vide !",
    buggyCode: `public void creerUtilisateur(String email, String nom) {
    EntityManager em = emf.createEntityManager();
    Utilisateur u = new Utilisateur(email, nom);
    em.persist(u);
    em.close();
}`,
    question: "Pourquoi l'utilisateur n'est-il jamais sauvegardé en base de données ?",
    options: [
      {
        text: "Il manque l'annotation @Transactional sur la méthode",
        isBug: false,
        explanation: "En pur Java SE sans Spring, @Transactional n'a aucun effet automatique."
      },
      {
        text: "En mode RESOURCE_LOCAL, aucune transaction n'a été ouverte ni commitée (begin/commit manquants) !",
        isBug: true,
        explanation: "EXACT ! En mode RESOURCE_LOCAL, em.persist() enregistre l'entité dans le contexte de persistance, mais sans em.getTransaction().begin() et commit(), aucune instruction SQL INSERT n'est envoyée au coffre !"
      },
      {
        text: "L'entité Utilisateur ne doit pas avoir d'identifiant",
        isBug: false,
        explanation: "Au contraire, chaque entité doit avoir un identifiant."
      },
      {
        text: "Il fallait appeler em.merge() au lieu de em.persist()",
        isBug: false,
        explanation: "merge() sert à réattacher une entité détachée, pas à persister un nouvel objet."
      }
    ]
  },
  {
    id: 'bug-2',
    title: 'L’Explosion de Mémoire StackOverflow',
    scenario: "Chaque fois qu'on affiche un Utilisateur dans les logs, le serveur plante brutalement avec : java.lang.StackOverflowError !",
    buggyCode: `// Dans Utilisateur.java :
@Override
public String toString() {
    return "Utilisateur{id=" + id + ", reservations=" + reservations + "}";
}

// Dans Reservation.java :
@Override
public String toString() {
    return "Reservation{id=" + id + ", utilisateur=" + utilisateur + "}";
}`,
    question: "Quel est le piège mortel dans ces deux méthodes toString() ?",
    options: [
      {
        text: "toString() est réservé aux classes non-entités",
        isBug: false,
        explanation: "On a le droit de surcharger toString() sur des entités."
      },
      {
        text: "Boucle infinie récursive entre les deux côtés bidirectionnels !",
        isBug: true,
        explanation: "BRAVO ! Utilisateur.toString() appelle reservations.toString(), qui appelle pour chaque réservation utilisateur.toString(), qui rappelle reservations.toString()... jusqu'à épuisement de la mémoire de la pile d'exécution !"
      },
      {
        text: "Il fallait utiliser StringBuilder",
        isBug: false,
        explanation: "L'opérateur + compile déjà en StringBuilder, le problème est la récursion mutuelle."
      }
    ]
  },
  {
    id: 'bug-3',
    title: 'Le Piège du Fantôme Orphelin',
    scenario: "L'administrateur retire un shuriken de la liste des équipements de la Salle 1, puis sauvegarde. Pourtant, la ligne de l'équipement shuriken existe toujours en base de données !",
    buggyCode: `// Dans Salle.java :
@OneToMany(mappedBy = "salle")
private List<Equipement> equipements = new ArrayList<>();

// Dans le code de mise à jour :
salle.getEquipements().remove(shuriken);
em.getTransaction().commit();`,
    question: "Pourquoi l'équipement shuriken n'est-il pas supprimé de la base de données ?",
    options: [
      {
        text: "Il faut ajouter orphanRemoval = true sur l'annotation @OneToMany",
        isBug: true,
        explanation: "PARFAIT ! Sans 'orphanRemoval = true', retirer un élément d'une collection Java ne dit PAS à Hibernate de le DELETE en base. L'objet devient juste orphelin mais reste en base."
      },
      {
        text: "Hibernate refuse de supprimer les équipements",
        isBug: false,
        explanation: "Hibernate supprime n'importe quelle entité si on lui configure la bonne cascade."
      },
      {
        text: "Il fallait fermer l'EntityManager avant le commit",
        isBug: false,
        explanation: "Fermer l'EntityManager avant le commit annulerait tout."
      }
    ]
  }
];

export const lifecycleSteps: LifecycleStep[] = [
  {
    id: 'step-1',
    title: 'Instanciation en mémoire (new Salle())',
    description: 'Objet Java pur dans la mémoire JVM, inconnu de la base de données et sans identifiant.',
    state: 'NEW / TRANSIENT',
    order: 1
  },
  {
    id: 'step-2',
    title: 'Prise en charge (em.persist(salle))',
    description: 'L’entité entre dans le Contexte de Persistance (Cache L1). Elle devient MANAGED et reçoit un ID.',
    state: 'MANAGED',
    order: 2
  },
  {
    id: 'step-3',
    title: 'Synchronisation SQL (em.flush() ou commit())',
    description: 'Hibernate génère et exécute les requêtes INSERT / UPDATE SQL vers la base de données.',
    state: 'MANAGED',
    order: 3
  },
  {
    id: 'step-4',
    title: 'Séparation de la session (em.close() ou em.detach())',
    description: 'La session se ferme. L’entité existe toujours en mémoire Java mais Hibernate ne surveille plus ses changements.',
    state: 'DETACHED',
    order: 4
  },
  {
    id: 'step-5',
    title: 'Réattachement (em.merge(salle))',
    description: 'Hibernate charge une copie managed depuis la base et applique les changements de l’entité détachée.',
    state: 'MANAGED',
    order: 5
  },
  {
    id: 'step-6',
    title: 'Suppression programmée (em.remove(salle))',
    description: 'L’entité est marquée pour destruction. Un DELETE SQL sera émis au prochain flush/commit.',
    state: 'REMOVED',
    order: 6
  }
];
