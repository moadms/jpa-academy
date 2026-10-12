import { CriticalQuestion, UmlToJpaPattern } from '@/types';

export const criticalQuestionsData: CriticalQuestion[] = [
  {
    id: 'cq-1',
    category: 'Relations',
    question: "1. Qui possède la relation (Côté Propriétaire vs Côté Inverse) ?",
    childExplanation: "Quand deux amis se tiennent la main, qui a la poche pour garder le ticket de cinéma ? Si les deux oublient ou si le mauvais ami essaie de le ranger dans une poche qui n'existe pas, le ticket tombe par terre !",
    seniorExplanation: "En JPA, le côté propriétaire est TOUJOURS celui qui porte la clé étrangère en base physique (ou l'annotation @JoinColumn). Le côté inverse porte l'attribut `mappedBy`. Si vous oubliez d'assigner l'objet côté propriétaire, la clé étrangère en base reste NULL, même si la collection Java contient l'élément.",
    trapToAvoid: "Faire `parent.getChildren().add(child)` sans faire `child.setParent(parent)`. En base, `parent_id` vaudra NULL !",
    solutionRule: "Règle d'or : Toujours créer une méthode helper bidirectionnelle (ex: `addChild(Child c) { this.children.add(c); c.setParent(this); }`)."
  },
  {
    id: 'cq-2',
    category: 'Performance',
    question: "2. FetchType : Est-ce LAZY ou EAGER par défaut, et quel est le risque N+1 ?",
    childExplanation: "Si tu commandes une boîte de jouets, veux-tu qu'on te livre aussi TOUTE l'usine de fabrication d'un coup dans ton salon ? Non ! Tu veux juste le jouet, et l'usine seulement si tu en as besoin plus tard !",
    seniorExplanation: "Par défaut en JPA : @ManyToOne et @OneToOne sont en EAGER (chargement immédiat) ! @OneToMany et @ManyToMany sont en LAZY. Le piège fatal est de laisser @ManyToOne en EAGER dans des listes, provoquant des dizaines de requêtes N+1 et des saturations mémoire.",
    trapToAvoid: "Laisser `@ManyToOne` sans spécifier `fetch = FetchType.LAZY`. Charger 100 lignes déclenche 100 sous-requêtes SQL !",
    solutionRule: "Règle d'or : Tout passer systématiquement en `FetchType.LAZY`. Utiliser `JOIN FETCH` ou `EntityGraph` explicitement uniquement quand les enfants sont nécessaires."
  },
  {
    id: 'cq-3',
    category: 'Relations',
    question: "3. Quelle politique de Cycle de Vie (Cascade & OrphanRemoval) appliquer ?",
    childExplanation: "Si on jette un cahier à la poubelle, faut-il détruire toutes les pages qui sont dedans ? Oui (Cascade REMOVE). Mais si on jette un livre de bibliothèque, faut-il détruire les lecteurs qui l'ont lu ? Surtout pas !",
    seniorExplanation: "Le `CascadeType.ALL` propage persist, merge, remove. Sur une composition forte (Facture -> LignesFacture), il est indispensable avec `orphanRemoval = true`. Mais sur une agrégation partagée ou un `@ManyToMany` (Salle -> Equipement), propager REMOVE supprimerait l'équipement pour toutes les autres salles !",
    trapToAvoid: "Mettre `CascadeType.REMOVE` ou `CascadeType.ALL` sur une relation `@ManyToMany` ou un `@ManyToOne` partagé.",
    solutionRule: "Règle d'or : CascadeType.ALL + orphanRemoval = true STRICTEMENT réservé aux compositions privées (Parent-Enfant exclusif)."
  },
  {
    id: 'cq-4',
    category: 'Héritage',
    question: "4. Héritage : SINGLE_TABLE, JOINED ou TABLE_PER_CLASS ?",
    childExplanation: "Veux-tu un seul grand coffre mélangé avec plein de trous vides (SINGLE_TABLE), ou des coffres séparés bien étiquetés mais plus longs à ouvrir ensemble (JOINED) ?",
    seniorExplanation: "SINGLE_TABLE est le plus rapide en lecture (0 jointure) mais interdit les contraintes SQL `NOT NULL` sur les classes filles et dénormalise la table. JOINED offre une normalisation parfaite (3NF) et autorise les contraintes d'intégrité, au prix de JOINs SQL. TABLE_PER_CLASS complique les requêtes polymorphiques (UNION SQL).",
    trapToAvoid: "Mettre des contraintes `@Column(nullable = false)` sur les champs spécifiques de classes filles en stratégie SINGLE_TABLE.",
    solutionRule: "Règle d'or : SINGLE_TABLE si peu de colonnes distinctes et forte fréquence de lecture polymorphe. JOINED si modèle métier riche et contraintes NOT NULL strictes."
  },
  {
    id: 'cq-5',
    category: 'Concurrence',
    question: "5. Comment gérer la Concurrence et les Accès Simultanés ?",
    childExplanation: "Deux élèves écrivent sur le même tableau noir en même temps. Sans arbitre, le deuxième efface tout ce que le premier a dessiné sans le savoir !",
    seniorExplanation: "C'est le problème du 'Lost Update' (mise à jour perdue). En environnement web distribué, deux threads lisent l'état v1 et committent l'un après l'autre. Le second écrase le premier sans détection d'erreur.",
    trapToAvoid: "Faire confiance aveugle à la dernière transaction sans champ de contrôle de version.",
    solutionRule: "Règle d'or : Toujours ajouter `@Version private Long version;` sur toute entité modifiable par plusieurs utilisateurs simultanés, et encapsuler le commit dans un handler de réessai (retry loop)."
  },
  {
    id: 'cq-6',
    category: 'Transactions',
    question: "6. Où se situent les Frontières Transactionnelles (ACID) ?",
    childExplanation: "Quand tu achètes une glace : soit tu donnes la pièce ET tu reçois la glace, soit aucun des deux n'a lieu. Impossible de perdre la pièce sans avoir la glace !",
    seniorExplanation: "Une transaction doit englober l'ensemble d'une opération métier cohérente. En RESOURCE_LOCAL, `em.getTransaction().begin()` et `commit()` doivent être gérés dans une couche Service (jamais dispersés dans le DAO ni dans le contrôleur UI).",
    trapToAvoid: "Ouvrir et committer une transaction à l'intérieur de chaque méthode DAO individuelle (`dao.save(a); dao.save(b);` non atomique).",
    solutionRule: "Règle d'or : Les transactions appartiennent à la couche Service. En cas d'exception, `rollback()` immédiat et libération de l'EntityManager dans un bloc `finally`."
  },
  {
    id: 'cq-7',
    category: 'Relations',
    question: "7. Les méthodes `equals()` et `hashCode()` sont-elles basées sur la bonne clé ?",
    childExplanation: "Comment savoir si deux cartes de jeu sont identiques avant de leur avoir collé un numéro de série magique ?",
    seniorExplanation: "Si vous utilisez `id` pour `equals/hashCode`, avant le `persist()`, `id == null`. Si vous insérez deux nouvelles entités dans un `Set<Entity>`, elles auront toutes les deux `id == null` et le Set croira qu'elles sont identiques ! Si vous utilisez tous les champs dont les collections, vous provoquez une boucle infinie de récursion.",
    trapToAvoid: "Générer `equals/hashCode` avec tous les champs générés par Lombok ou l'IDE, ou basé sur `id` avant persistance.",
    solutionRule: "Règle d'or : Fonder `equals()` et `hashCode()` sur une clé métier naturelle stable (ex: code, email, reference unique) ou l'identité objet si aucune clé métier n'existe."
  }
];

export const umlToJpaPatterns: UmlToJpaPattern[] = [
  {
    umlElement: "Classe UML Standard (Entité Métier)",
    umlSymbol: "Rectangle [NomClasse | attributs : types | méthodes]",
    jpaMapping: "@Entity + @Table + @Id + @GeneratedValue",
    exampleJava: `@Entity
@Table(name = "salles")
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 100)
    private String nom;
    
    public Salle() {} // Constructeur no-arg obligatoire !
}`,
    exampleSql: `CREATE TABLE salles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL
);`,
    goldenRule: "Toujours inclure un constructeur public/protected sans argument pour permettre à Hibernate d'instancier par réflexion.",
    keyQuestion: "Quelle stratégie d'ID choisir ? (IDENTITY pour MySQL/H2 auto-increment, SEQUENCE pour PostgreSQL/Oracle, UUID pour microservices distribués)."
  },
  {
    umlElement: "Association 1..* (Un-à-Plusieurs / Plusieurs-à-Un)",
    umlSymbol: "Ligne directe avec multiplicités : Utilisateur (1) ----- (0..*) Reservation",
    jpaMapping: "@ManyToOne côté enfant + @OneToMany(mappedBy = ...) côté parent",
    exampleJava: `// Côté Enfant (Propriétaire de la FK)
@Entity
public class Reservation {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "utilisateur_id", nullable = false)
    private Utilisateur utilisateur;
}

// Côté Parent (Miroir / Collection)
@Entity
public class Utilisateur {
    @OneToMany(mappedBy = "utilisateur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reservation> reservations = new ArrayList<>();

    public void addReservation(Reservation r) {
        reservations.add(r);
        r.setUtilisateur(this);
    }
}`,
    exampleSql: `CREATE TABLE reservations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id BIGINT NOT NULL,
    CONSTRAINT fk_res_user FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id)
);`,
    goldenRule: "La clé étrangère (FK) physique est TOUJOURS dans la table côté N (l'enfant). C'est lui qui porte le @ManyToOne.",
    keyQuestion: "La vie de l'enfant dépend-elle du parent ? Si oui, activer orphanRemoval = true."
  },
  {
    umlElement: "Composition UML (Losange Plein ◆)",
    umlSymbol: "Commande ◆----- (1..*) LigneCommande",
    jpaMapping: "@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)",
    exampleJava: `@Entity
public class Commande {
    @OneToMany(mappedBy = "commande", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LigneCommande> lignes = new ArrayList<>();
}`,
    exampleSql: `CREATE TABLE ligne_commande (
    id BIGINT PRIMARY KEY,
    commande_id BIGINT NOT NULL,
    FOREIGN KEY (commande_id) REFERENCES commande(id) ON DELETE CASCADE
);`,
    goldenRule: "Une composition signifie qu'un enfant n'a aucune existence propre sans son parent. Si le parent meurt, tous les enfants meurent.",
    keyQuestion: "L'enfant a-t-il du sens tout seul ? Si NON -> Losange plein -> CascadeType.ALL + orphanRemoval = true."
  },
  {
    umlElement: "Agrégation UML (Losange Vide ◇) / ManyToMany",
    umlSymbol: "Salle ◇----- (0..*) Equipement (0..*)",
    jpaMapping: "@ManyToMany avec table de jointure @JoinTable",
    exampleJava: `// Côté Propriétaire
@Entity
public class Salle {
    @ManyToMany
    @JoinTable(
        name = "salle_equipement",
        joinColumns = @JoinColumn(name = "salle_id"),
        inverseJoinColumns = @JoinColumn(name = "equipement_id")
    )
    private Set<Equipement> equipements = new HashSet<>();
}

// Côté Inverse
@Entity
public class Equipement {
    @ManyToMany(mappedBy = "equipements")
    private Set<Salle> salles = new HashSet<>();
}`,
    exampleSql: `CREATE TABLE salle_equipement (
    salle_id BIGINT NOT NULL,
    equipement_id BIGINT NOT NULL,
    PRIMARY KEY (salle_id, equipement_id),
    FOREIGN KEY (salle_id) REFERENCES salles(id),
    FOREIGN KEY (equipement_id) REFERENCES equipements(id)
);`,
    goldenRule: "NE JAMAIS mettre CascadeType.REMOVE sur une relation ManyToMany : supprimer une salle détruirait l'équipement pour toutes les autres !",
    keyQuestion: "Si la relation porte des attributs (ex: date d'ajout, quantité), transformer la relation en entité intermédiaire avec deux @ManyToOne !"
  },
  {
    umlElement: "Généralisation / Héritage UML (Flèche triangle vide ▷)",
    umlSymbol: "Employe ▷----- Developpeur / Manager",
    jpaMapping: "@Inheritance(strategy = InheritanceType.JOINED ou SINGLE_TABLE)",
    exampleJava: `@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Employe {
    @Id @GeneratedValue private Long id;
    private String nom;
}

@Entity
@Table(name = "developpeurs")
public class Developpeur extends Employe {
    private String langagePrefere;
}`,
    exampleSql: `CREATE TABLE employe (id BIGINT PRIMARY KEY, nom VARCHAR(100));
CREATE TABLE developpeurs (
    id BIGINT PRIMARY KEY,
    langagePrefere VARCHAR(50),
    FOREIGN KEY (id) REFERENCES employe(id)
);`,
    goldenRule: "Préférer JOINED pour un modèle métier propre avec contraintes NOT NULL. Préférer SINGLE_TABLE si les sous-classes ont peu d'attributs spécifiques.",
    keyQuestion: "Les sous-classes ont-elles des champs obligatoires (NOT NULL) ? Si oui, SINGLE_TABLE est exclu !"
  }
];
