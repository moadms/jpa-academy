import { CourseLecture } from '@/types';

export const platformLectures: CourseLecture[] = [
  {
    id: 'cours-ch1',
    number: 1,
    title: "Chapitre 1 : Introduction à Hibernate & JPA",
    duration: "30 min",
    summary: "Comprendre l'impédance objet-relationnel, la différence cruciale entre JPA (spécification standard JSR 338) et Hibernate (implémentation moteur), l'architecture en couches, et la configuration persistence.xml vs hibernate.cfg.xml.",
    coreConcepts: [
      {
        title: "L'Impédance Objet-Relationnel (Object-Relational Impedance Mismatch)",
        description: "En Java, nous manipulons des graphes d'objets riches avec polymorphisme, encapsulation et navigation de pointeurs. En SQL, les données sont stockées dans des tables 2D reliées par des clés étrangères sans héritage natif. L'ORM agit comme un pont automatique.",
        codeSnippet: `// SANS ORM (JDBC pur et verbeux) :
PreparedStatement ps = conn.prepareStatement("INSERT INTO users(nom, email) VALUES(?, ?)");
ps.setString(1, user.getNom());
ps.setString(2, user.getEmail());
ps.executeUpdate();

// AVEC JPA/Hibernate (1 seule ligne propre !) :
em.persist(user);`
      },
      {
        title: "JPA (Spécification) vs Hibernate (Moteur)",
        description: "JPA définit les interfaces standard (`EntityManager`, `EntityManagerFactory`, JPQL) pour éviter d'être dépendant d'un fournisseur. Hibernate fournit l'implémentation complète plus des fonctionnalités puissantes comme le Dirty Checking, le cache multi-niveaux et HQL.",
        codeSnippet: `EntityManagerFactory emf = Persistence.createEntityManagerFactory("gestion-salles");
EntityManager em = emf.createEntityManager();`
      },
      {
        title: "Le Contexte de Persistance (L'Aquarium)",
        description: "Agit comme un cache de premier niveau (L1) et un identifiant unique d'objets en mémoire. Hibernate surveille automatiquement les objets managés et génère les UPDATE SQL au commit sans méthode update() manuelle !",
        codeSnippet: `em.getTransaction().begin();
User user = em.find(User.class, 1L);
user.setEmail("nouveau@email.com"); // Dirty Checking automatique !
em.getTransaction().commit(); // UPDATE envoyé automatiquement !`
      }
    ],
    comparativeTable: [
      { dimension: "Volume de code", col1: "Réduit de 40% (zéro boilerplate)", col2: "Verbeux et répétitif" },
      { dimension: "Mapping", col1: "Automatique via annotations JPA", col2: "Manuel (ResultSet vers Objets)" },
      { dimension: "Performances", col1: "Optimisées par Caching L1/L2 & Batching", col2: "Rapide pour 1 requête, pénible à grande échelle" },
      { dimension: "Sécurité SQL", col1: "Protection native contre l'injection SQL", col2: "Vulnérable si mauvaise concaténation" }
    ],
    proPractices: [
      "Toujours créer l'EntityManagerFactory en singleton lourd au démarrage de l'application.",
      "Fermer l'EntityManager à chaque fin de transaction ou requête dans un bloc finally.",
      "Privilégier l'API standard JPA plutôt que l'API native Session d'Hibernate pour garantir la portabilité."
    ]
  },
  {
    id: 'cours-ch2',
    number: 2,
    title: "Chapitre 2 : Mapping de Base des Entités",
    duration: "30 min",
    summary: "Transformer des classes Java en tables relationnelles via @Entity, @Table, les stratégies de clés primaires @GeneratedValue, et les types de données modernes.",
    coreConcepts: [
      {
        title: "Anatomie d'une Entité JPA",
        description: "Une entité doit posséder l'annotation @Entity, un identifiant @Id, et OBLIGATOIREMENT un constructeur public ou protected sans argument (no-arg constructor) pour permettre l'instanciation par réflexion.",
        codeSnippet: `@Entity
@Table(name = "salles")
public class Salle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nom;

    public Salle() {} // Obligatoire pour Hibernate !
}`
      },
      {
        title: "Stratégies de Génération de Clés Primaires",
        description: "IDENTITY (Auto-incrément géré par la DB - MySQL/H2), SEQUENCE (Recommandé en Oracle/PostgreSQL avec bloc d'allocation), TABLE (Lente, portable sur toutes les DBs), AUTO (Laisse Hibernate choisir selon le dialecte).",
        codeSnippet: `@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "seq_salle")
@SequenceGenerator(name = "seq_salle", sequenceName = "salle_seq", allocationSize = 50)
private Long id;`
      },
      {
        title: "Types Temporels Modernes Java 8+",
        description: "Remplacer l'ancien java.util.Date et @Temporal par `LocalDate`, `LocalDateTime` ou `Instant` directement supportés nativement par JPA 2.2+.",
        codeSnippet: `private LocalDate dateReservation;
private LocalDateTime dateCreation;`
      }
    ],
    proPractices: [
      "Toujours typer les clés primaires en Long (Wrapper) et non en primitif long.",
      "Éviter les colonnes String illimitées : spécifier systématiquement @Column(length = ...).",
      "Ne pas exposer les setters de clé primaire @Id."
    ]
  },
  {
    id: 'cours-ch3',
    number: 3,
    title: "Chapitre 3 : Associations & Héritage",
    duration: "30 min",
    summary: "Modélisation des relations 1-1, 1-N, N-N, maîtrise de mappedBy, des cascades, orphanRemoval et des 3 stratégies d'héritage ORM.",
    coreConcepts: [
      {
        title: "La Règle d'Or de mappedBy",
        description: "La clé étrangère physique est TOUJOURS portée par le côté enfant (@ManyToOne). Le parent porte @OneToMany avec mappedBy qui pointe vers le nom du champ Java dans l'enfant.",
        codeSnippet: `// Côté Enfant (Propriétaire de la FK)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "salle_id")
private Salle salle;

// Côté Parent (Inverse / Miroir)
@OneToMany(mappedBy = "salle", cascade = CascadeType.ALL, orphanRemoval = true)
private List<Reservation> reservations = new ArrayList<>();`
      },
      {
        title: "Les 3 Stratégies d'Héritage",
        description: "SINGLE_TABLE (1 table pour toute la hiérarchie + DiscriminatorColumn : ultra rapide mais colonnes nulles), JOINED (1 table mère + tables filles reliées par FK : normalisé et contraintes NOT NULL autorisées), TABLE_PER_CLASS (1 table physique complète par classe concrète).",
        codeSnippet: `@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Employe { ... }`
      }
    ],
    proPractices: [
      "Mettre toutes les associations @ManyToOne et @OneToOne en FetchType.LAZY.",
      "Créer des méthodes helpers bidirectionnelles `addChild()` pour maintenir la cohérence Java et BD.",
      "Ne JAMAIS mettre CascadeType.REMOVE sur une association @ManyToMany."
    ]
  },
  {
    id: 'cours-ch4',
    number: 4,
    title: "Chapitre 4 : Requêtes : JPQL, Criteria, SQL Natif & Pagination",
    duration: "30 min",
    summary: "Extraction de données orientée objet via JPQL, requêtes dynamiques type-safe avec CriteriaBuilder, requêtes natives SQL et pagination industrielle.",
    coreConcepts: [
      {
        title: "JPQL avec Paramètres Nommés",
        description: "Syntaxe orientée entités (`SELECT s FROM Salle s`) qui préserve la portabilité et protège contre les injections SQL grâce aux paramètres nommés (`:nom`).",
        codeSnippet: `TypedQuery<Salle> q = em.createQuery(
    "SELECT s FROM Salle s WHERE s.capacite >= :cap", Salle.class);
q.setParameter("cap", 30);
List<Salle> result = q.getResultList();`
      },
      {
        title: "Pagination en Base de Données",
        description: "Ne jamais charger toute la base en RAM. Utiliser `setFirstResult(offset)` et `setMaxResults(limit)` pour que le dialecte Hibernate traduise en LIMIT/OFFSET ou ROWNUM SQL natif.",
        codeSnippet: `query.setFirstResult((page - 1) * pageSize); // OFFSET
query.setMaxResults(pageSize);              // LIMIT`
      },
      {
        title: "Criteria API pour Filtres Dynamiques",
        description: "Idéal pour les formulaires de recherche multi-critères où les champs sont optionnels, évitant la concaténation de chaînes de caractères.",
        codeSnippet: `CriteriaBuilder cb = em.getCriteriaBuilder();
CriteriaQuery<Salle> cq = cb.createQuery(Salle.class);
Root<Salle> root = cq.from(Salle.class);
// Combinaison dynamique de Predicates...`
      }
    ],
    proPractices: [
      "Toujours utiliser TypedQuery<T> plutôt que Query brut pour bénéficier du typage fort.",
      "Privilégier les requêtes de projection (DTO) `SELECT new com.dto.SalleSummary(...)` pour n'extraire que les colonnes nécessaires.",
      "Indexer les colonnes fréquemment utilisées dans les clauses WHERE et ORDER BY."
    ]
  },
  {
    id: 'cours-ch5',
    number: 5,
    title: "Chapitre 5 : Cycle de Vie, Contexte de Persistance & Transactions",
    duration: "30 min",
    summary: "Maîtriser les 4 états d'une entité (Transient, Managed, Detached, Removed), le Dirty Checking, l'isolation ACID et la gestion des transactions RESOURCE_LOCAL.",
    coreConcepts: [
      {
        title: "Les 4 États d'une Entité JPA",
        description: "1. TRANSIENT (new objet), 2. MANAGED (persist() ou find(), suivi par L1 Cache), 3. DETACHED (close(), evict() ou fin de transaction), 4. REMOVED (remove(), marqué pour DELETE).",
        codeSnippet: `User u = new User("John"); // TRANSIENT
em.persist(u);             // MANAGED
em.detach(u);              // DETACHED
User managed = em.merge(u);// MANAGED (copie rattachée)`
      },
      {
        title: "Dirty Checking & Flush",
        description: "Hibernate compare l'état actuel de l'objet avec une copie snapshot prise lors du chargement. Au moment du flush/commit, si des champs diffèrent, l'UPDATE SQL est automatiquement généré.",
        codeSnippet: `// Aucune méthode em.update() n'est requise !
salle.setCapacite(50); // Automatiquement synchronisé au commit !`
      }
    ],
    proPractices: [
      "Toujours exécuter les écritures dans une transaction active (begin / commit).",
      "En cas d'exception, effectuer un rollback() immédiat dans le bloc catch.",
      "Faire attention à `em.merge()` qui retourne une nouvelle instance managée au lieu de rendre l'objet passé managé."
    ]
  },
  {
    id: 'cours-ch6',
    number: 6,
    title: "Chapitre 6 : Performance Avancée, Concurrence & Cache",
    duration: "30 min",
    summary: "Éradication du problème N+1 avec JOIN FETCH, mise en œuvre du Cache de second niveau (Ehcache/Redis) et verrouillage optimiste @Version.",
    coreConcepts: [
      {
        title: "Éradication Radicale du Problème N+1",
        description: "Le problème N+1 survient lorsqu'une requête pour N entités déclenche N requêtes supplémentaires pour charger leurs associations. La solution absolue est le JOIN FETCH ou l'EntityGraph.",
        codeSnippet: `// 1 seule requête SQL au lieu de 1 + N !
String jpql = "SELECT DISTINCT s FROM Salle s LEFT JOIN FETCH s.equipements";
List<Salle> salles = em.createQuery(jpql, Salle.class).getResultList();`
      },
      {
        title: "Verrouillage Optimiste (@Version)",
        description: "Protection contre les 'Lost Updates' en environnement concurrent. Hibernate incrémente automatiquement le compteur de version et lève une OptimisticLockException en cas de collision.",
        codeSnippet: `@Entity
public class Salle {
    @Id @GeneratedValue private Long id;
    @Version private Long version; // Bouclier anti-écrasement
}`
      },
      {
        title: "Cache de 2nd Niveau (L2 Cache)",
        description: "Partagé entre toutes les sessions de l'application via la SessionFactory. Idéal pour les données stables souvent consultées (référentiels, rôles, catalogues).",
        codeSnippet: `@Entity
@Cacheable
@org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Categorie { ... }`
      }
    ],
    proPractices: [
      "Activer l'affichage du SQL (hibernate.show_sql) et surveiller le nombre de requêtes émises.",
      "Gérer systématiquement l'OptimisticLockException avec un RetryHandler exponentiel.",
      "Ne pas mettre en cache L2 des entités modifiées des centaines de fois par seconde."
    ]
  },
  {
    id: 'cours-ch7',
    number: 7,
    title: "Chapitre 7 : Industrialisation, Tests & Bonnes Pratiques",
    duration: "30 min",
    summary: "Mise en place de tests d'intégration avec JUnit 5 et bases en mémoire H2, conteneurisation Testcontainers, migrations de schéma avec Flyway/Liquibase et patterns en couches.",
    coreConcepts: [
      {
        title: "Tests d'Intégration Hermétiques JUnit 5",
        description: "Chaque test doit être indépendant, créer ses données de test dans une transaction rollbackée ou une base H2 en mémoire propre (`DB_CLOSE_DELAY=-1`).",
        codeSnippet: `@Test
void testReservationSalleConcurrente() {
    assertNotNull(salle.getId());
    assertThrows(OptimisticLockException.class, () -> concurrentService.modifier());
}`
      },
      {
        title: "Migrations de Schéma en Production (Flyway / Liquibase)",
        description: "En production, interdire `hibernate.hbm2ddl.auto = update` ! Utiliser des scripts de migration versionnés (`V1__init_schema.sql`, `V2__add_index.sql`) pour des déploiements sûrs.",
        codeSnippet: `-- V1__init_schema.sql
CREATE TABLE salles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    version BIGINT DEFAULT 0
);`
      }
    ],
    proPractices: [
      "Régler `hbm2ddl.auto = validate` en production pour détecter les incohérences sans modifier la base.",
      "Utiliser Testcontainers pour exécuter les tests d'intégration sur le moteur SQL réel de production (MySQL/PostgreSQL) plutôt que H2 seul.",
      "Séparer rigoureusement les responsabilités : Contrôleur ➔ Service Métier (Transaction) ➔ DAO (Requêtes pures)."
    ]
  }
];
