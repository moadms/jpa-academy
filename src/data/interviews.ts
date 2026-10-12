import { InterviewQuestion, MoroccanTechCompany } from '@/types';

export const moroccanCompanies: MoroccanTechCompany[] = [
  {
    name: "Oracle Maroc (MDC - Morocco Development Center)",
    locations: ["Casablanca Nearshore", "Casablanca Finance City"],
    profilesSought: ["Software Engineer (Cloud & Java Core)", "Principal Engineer", "Cloud Infrastructure Engineer", "Database Internals Engineer"],
    averageSalaryJunior: "14 000 - 18 000 DH net / mois",
    averageSalarySenior: "28 000 - 45 000 DH net / mois",
    interviewStages: [
      "1. Screening RH & Anglais technique (30 min)",
      "2. Épreuve algorithmique & Data Structures sur HackerRank / Codility (2 exercices)",
      "3. Entretien Technique Deep-Dive Java Core & Concurrency (Threads, JVM memory, Collections, Garbage Collector) (60 min)",
      "4. Entretien Architecture & System Design / Cloud Scalability (60 min)",
      "5. Entretien Comportemental & Leadership Principles avec un Engineering Director"
    ],
    keyHiringTechnologies: ["Java 17/21", "JVM Internals", "Multithreading", "Spring Boot", "Microservices", "Docker / K8s", "Oracle DB / SQL Tuning"],
    insiderTips: "Oracle ne cherche pas des développeurs qui recopient des tutoriels. Ils testent la compréhension profonde : comment fonctionne un HashMap en interne, comment la JVM alloue les objets en mémoire Heap/Stack, et comment Hibernate gère le Dirty Checking et les verrous au niveau SGBD."
  },
  {
    name: "Capgemini Maroc",
    locations: ["Casablanca Nearshore", "Rabat Technopolis", "Fès Shore", "Agadir"],
    profilesSought: ["Ingénieur d'Études et Développement Java/JEE", "Lead Développeur Fullstack", "Architecte Technique", "Scrum Master"],
    averageSalaryJunior: "9 500 - 13 000 DH net / mois",
    averageSalarySenior: "20 000 - 32 000 DH net / mois",
    interviewStages: [
      "1. Qualification téléphonique RH (motivation, mobilité, prétentions)",
      "2. Test technique en ligne (QCM Java/Spring/SQL et test de logique)",
      "3. Entretien Technique avec un Lead Tech (Architecture n-tiers, JPA, design patterns, cas concrets)",
      "4. Entretien Manager opérationnel (Fit culturel et affectation projet grand compte européen)"
    ],
    keyHiringTechnologies: ["Java 11/17", "Spring Boot", "Hibernate / Spring Data JPA", "Angular / React", "PostgreSQL / Oracle", "CI/CD GitLab / Jenkins"],
    insiderTips: "Chez Capgemini, les questions pièges portent souvent sur la gestion transactionnelle (@Transactional, rollbackFor), l'optimisation des requêtes JPA (problème N+1) et la capacité à travailler en méthode Agile Scrum."
  },
  {
    name: "CGI Maroc",
    locations: ["Casablanca Nearshore", "Rabat Technopolis", "Fès"],
    profilesSought: ["Consultant Java/Spring", "Développeur Cloud Native", "Tech Lead Back-End"],
    averageSalaryJunior: "10 000 - 13 500 DH net / mois",
    averageSalarySenior: "22 000 - 34 000 DH net / mois",
    interviewStages: [
      "1. Entretien RH préliminaire",
      "2. Test technique en direct (Live Coding ou QCM spécialisé)",
      "3. Débriefing technique avec un Architecte Référent",
      "4. Validation finale Direction de Projet"
    ],
    keyHiringTechnologies: ["Java Core", "Spring Cloud", "JPA/Hibernate", "Kafka / RabbitMQ", "Azure / AWS", "JUnit 5 / Mockito"],
    insiderTips: "CGI valorise énormément la rigueur industrielle : tests unitaires, couverture de code (SonarQube) et architecture hexagonale / Clean Architecture."
  },
  {
    name: "Société Générale Africa Technologies & Services (SG ATS)",
    locations: ["Casablanca Finance City", "Casablanca Nearshore"],
    profilesSought: ["Software Engineer Systèmes Financiers", "Fullstack Java/React", "Data Engineer"],
    averageSalaryJunior: "12 000 - 16 000 DH net / mois",
    averageSalarySenior: "25 000 - 38 000 DH net / mois",
    interviewStages: [
      "1. Entretien RH",
      "2. Test technique Live Coding algorithmes + SQL",
      "3. Entretien avec un Tech Lead Banque d'Investissement",
      "4. Entretien Management"
    ],
    keyHiringTechnologies: ["Java 17/21", "Spring Boot", "JPA / Hibernate", "Concurrence temps réel", "Kafka", "PostgreSQL"],
    insiderTips: "SG ATS traite des transactions financières critiques. Ils posent des questions poussées sur l'isolation transactionnelle ACID, le verrouillage optimiste/pessimiste et la tolérance aux pannes."
  },
  {
    name: "DXC Technology Maroc",
    locations: ["Rabat Technopolis", "Casablanca"],
    profilesSought: ["Ingénieur Java Backend", "Cloud Solution Architect"],
    averageSalaryJunior: "9 500 - 12 500 DH net / mois",
    averageSalarySenior: "20 000 - 30 000 DH net / mois",
    interviewStages: [
      "1. Entretien RH",
      "2. Test technique",
      "3. Entretien client / Responsable d'entité"
    ],
    keyHiringTechnologies: ["Java/JEE", "Spring Boot", "Hibernate", "API REST", "Docker"],
    insiderTips: "La maîtrise du français et de l'anglais technique est primordiale pour les missions en offshore direct avec l'Europe."
  }
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: 'int-1',
    companyTarget: "Oracle Maroc",
    level: "Confirmé (2-5 ans)",
    topic: "Hibernate / JPA Interne",
    question: "Comment fonctionne le mécanisme de 'Dirty Checking' dans Hibernate en interne, et quel est son impact sur la mémoire Heap de la JVM ?",
    childIntuition: "Imagine qu'à l'entrée d'un musée, on prend une photo exacte de ton sac. Quand tu sors, le vigile compare ton sac à la photo. S'il voit un objet différent, il sait exactement ce que tu as changé !",
    seniorTechnicalAnswer: "Lorsqu'une entité est chargée dans le Contexte de Persistance (L1 Cache / EntityManager), Hibernate crée en mémoire un 'snapshot' (tableau des valeurs primitives de l'état initial). Lors du flush() ou avant le commit(), Hibernate itère sur toutes les entités Managed et compare champ par champ l'état actuel de l'objet avec son snapshot. S'il y a divergence, un ordre SQL UPDATE ciblé est mis en file d'attente. Impact mémoire : chaque entité en état Managed consomme au minimum le double de son empreinte mémoire (l'instance + son snapshot). Pour de très gros volumes de lecture, utiliser read-only ou du projection DTO évite cette duplication.",
    codeExample: `// Pour désactiver le dirty checking lors de gros flux de lecture :
em.unwrap(Session.class).setDefaultReadOnly(true);
// Ou en JPQL projection DTO directe :
List<UserDTO> dtos = em.createQuery(
    "SELECT new com.app.dto.UserDTO(u.id, u.email) FROM User u", UserDTO.class
).getResultList();`,
    examinerTrap: "L'examinateur veut savoir si vous croyez qu'Hibernate utilise des écouteurs magiques ou s'il fait une comparaison par snapshot, et si vous connaissez l'impact sur les OutOfMemoryError.",
    salaryImpactProTip: "Citer l'existence du snapshot et proposer la projection DTO ou le stateless session pour les traitements batch vous classe instantanément dans le top 5% des candidats."
  },
  {
    id: 'int-2',
    companyTarget: "Capgemini",
    level: "Junior (0-2 ans)",
    topic: "Performance & SQL Tuning",
    question: "Qu'est-ce que le problème N+1 dans JPA/Hibernate, pourquoi FetchType.EAGER ne le résout pas en JPQL, et comment le corriger ?",
    childIntuition: "Tu demandes 10 livres à la bibliothèque. Au lieu de ramener le carton de 10 livres, le bibliothécaire fait 1 voyage pour voir la liste, puis 10 allers-retours séparés pour chercher chaque livre un par un !",
    seniorTechnicalAnswer: "Le problème N+1 survient lors de la récupération d'une liste de N entités parentes ayant une relation LAZY (ou même EAGER en JPQL). Une première requête SQL ramène les N parents, puis lors du parcours de la collection (ou immédiatement si EAGER sous JPQL), Hibernate génère N requêtes SQL individuelles supplémentaires, soit 1 + N requêtes SQL totales. FetchType.EAGER ne le corrige pas avec `em.createQuery(\"SELECT p FROM Parent p\")` car le parser JPQL génère d'abord le SELECT des parents, puis constate la relation et déclenche N requêtes. La vraie solution industrielle est d'utiliser `JOIN FETCH` en JPQL ou un `@EntityGraph` pour forcer une seule jointure SQL.",
    codeExample: `// FAUX (génère 1 + N requêtes) :
List<Salle> salles = em.createQuery("SELECT s FROM Salle s", Salle.class).getResultList();

// CORRECT (1 seule requête SQL avec jointure) :
List<Salle> salles = em.createQuery(
    "SELECT DISTINCT s FROM Salle s LEFT JOIN FETCH s.equipements", Salle.class
).getResultList();`,
    examinerTrap: "Le piège classique où tombent 80% des juniors : répondre 'Il suffit de mettre FetchType.EAGER'. L'examinateur vous attend au tournant car EAGER sous JPQL produit TOUJOURS N+1 !",
    salaryImpactProTip: "Expliquez la différence entre `em.find()` (qui peut exploiter EAGER avec jointure) et `em.createQuery()` (qui produit le N+1 même en EAGER). Mentionnez aussi le mot-clé `DISTINCT` pour éviter le dédoublement de racines."
  },
  {
    id: 'int-3',
    companyTarget: "Société Générale Africa Tech",
    level: "Senior / Lead Tech (5+ ans)",
    topic: "Concurrence & Transactions",
    question: "Quelle est la différence entre Verrouillage Optimiste (@Version) et Pessimiste (PESSIMISTIC_WRITE) ? Dans quel cas financier choisiriez-vous l'un ou l'autre ?",
    childIntuition: "Optimiste : Tout le monde lit le document librement, mais le premier qui enregistre gagne et le deuxième est alerté. Pessimiste : Dès que quelqu'un ouvre le document, la porte se verrouille à clé et personne ne peut même regarder !",
    seniorTechnicalAnswer: "Le Verrouillage Optimiste (@Version) ne pose aucun verrou physique en base de données. Il vérifie au moment de l'UPDATE que le numéro de version n'a pas bougé (`WHERE id = ? AND version = ?`). S'il a changé, une `OptimisticLockException` est levée. Avantage : débit élevé, 0 blocage DB. Inconvénient : requiert une stratégie de réessai (retry loop). Le Verrouillage Pessimiste (`LockModeType.PESSIMISTIC_WRITE`) traduit par un `SELECT ... FOR UPDATE` verrouille la ligne au niveau du SGBD jusqu'au commit. Choix : Optimiste pour 95% des cas (mise à jour de profil, réservation de salles, catalogues). Pessimiste pour les flux financiers ultra-critiques à très forte contention concurrente (débit de compte bancaire, transfert de solde en temps réel) où un conflit doit bloquer séquentiellement plutôt qu'échouer.",
    codeExample: `// Verrou Pessimiste bancaire :
Compte c = em.find(Compte.class, compteId, LockModeType.PESSIMISTIC_WRITE);
c.debiter(montant);
// La ligne reste verrouillée au niveau SQL jusqu'au commit de la transaction !`,
    examinerTrap: "L'examinateur vérifie si vous comprenez les risques de deadlocks (interblocages) et de saturation du pool de connexions causés par le verrouillage pessimiste.",
    salaryImpactProTip: "Mentionnez que pour le verrouillage optimiste, il est indispensable d'ajouter un handler de réessai (Exponential Backoff avec Jitter) et d'isoler la transaction dans un nouvel EntityManager."
  },
  {
    id: 'int-4',
    companyTarget: "CGI",
    level: "Confirmé (2-5 ans)",
    topic: "Spring Boot & Architecture",
    question: "Que se passe-t-il lors de l'appel d'une méthode annotée @Transactional depuis la même classe en Spring/JPA (Auto-invocation) ?",
    childIntuition: "Si le garde du corps est posté à la porte de la maison, et que tu parles à ton frère depuis le salon, le garde du corps à la porte ne peut pas vérifier votre conversation !",
    seniorTechnicalAnswer: "Spring gère les transactions via des Proxies dynamiques (CGLIB ou JDK Dynamic Proxy). Quand un appel externe arrive sur le bean, il traverse le proxy qui ouvre la transaction (`tx.begin()`), appelle la méthode cible, puis committe. En cas d'auto-invocation (une méthode interne appelant `this.autreMethodeTransactional()`), l'appel ne traverse PAS le proxy Spring ! Par conséquent, l'annotation `@Transactional` de la méthode appelée est TOTALEMENT IGNORÉE, aucune nouvelle transaction ou propagation (ex: REQUIRES_NEW) n'est créée.",
    codeExample: `@Service
public class OrderService {
    public void process() {
        // ATTENTION : Cet appel direct ignore @Transactional(REQUIRES_NEW) !
        this.saveAuditLog(); 
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveAuditLog() { ... }
}`,
    examinerTrap: "Un des bugs les plus fréquents et invisibles en production chez les clients de CGI et Capgemini. Le recruteur teste si vous comprenez le pattern Proxy AOP.",
    salaryImpactProTip: "Donnez les 2 solutions : injecter le bean en self-injection (`@Autowired private OrderService self;`) ou extraire la logique transactionnelle dans un composant dédié séparé (recommandé Clean Code)."
  },
  {
    id: 'int-5',
    companyTarget: "Oracle Maroc",
    level: "Senior / Lead Tech (5+ ans)",
    topic: "System Design & DDD",
    question: "Comment implémenteriez-vous un pattern Outbox transactionnel avec JPA pour garantir la cohérence entre la base de données et un broker d'événements comme Kafka ?",
    childIntuition: "Au lieu d'envoyer la lettre à la poste tout en payant le magasin (si la poste perd la lettre, tu as payé pour rien), tu écris la commande ET la lettre dans le même grand registre officiel. Un facteur passe ensuite lire le registre et livrer la lettre !",
    seniorTechnicalAnswer: "Le pattern Transactional Outbox résout le problème de la 'double écriture' (Dual-Write) entre une base SQL et un broker Kafka sans utiliser de transaction distribuée 2PC (XA trop lourde). Dans la même transaction JPA locale (`RESOURCE_LOCAL` ou Spring), on persiste l'entité métier principale (ex: `Commande`) ET on insère un enregistrement dans une table dédiée `outbox_events (id, aggregate_type, payload, status)`. Si la transaction committe, les deux écritures sont garanties cohérentes en ACID. Un processus asynchrone séparé (soit CDC Debezium via les logs WAL de la base, soit un scheduler JPA) lit la table outbox, publie sur Kafka, et marque l'événement comme traité. Garantit la sémantique 'At-Least-Once'.",
    codeExample: `@Transactional
public Commande creerCommande(CommandeDTO dto) {
    Commande c = new Commande(dto);
    em.persist(c);
    
    // Inséré dans la MÊME transaction ACID locale :
    OutboxEvent event = new OutboxEvent("COMMANDE_CREEE", serialize(c));
    em.persist(event);
    return c;
}`,
    examinerTrap: "Le candidat naïf propose d'appeler `kafkaTemplate.send()` à l'intérieur de la méthode `@Transactional`. Si Kafka échoue après le commit DB, ou si la DB rollback après l'envoi Kafka, les systèmes sont irrémédiablement désynchronisés !",
    salaryImpactProTip: "Mentionner 'Debezium + Change Data Capture (CDC)' pour la table outbox prouve que vous maîtrisez les architectures événementielles modernes de niveau Principal Engineer."
  },
  {
    id: 'int-6',
    companyTarget: "Atos / Eviden",
    level: "Confirmé (2-5 ans)",
    topic: "Hibernate / JPA Interne",
    question: "Pourquoi ne faut-il JAMAIS utiliser java.util.Date et pourquoi les méthodes equals() et hashCode() ne doivent pas dépendre de la clé primaire auto-incrémentée ?",
    childIntuition: "Si tu n'as pas encore reçu ton passeport officiel (l'ID n'est pas encore créé par la base), comment ton école peut-elle savoir qui tu es si elle n'utilise que ton numéro de passeport vide ?",
    seniorTechnicalAnswer: "1) `java.util.Date` est mutable, non thread-safe et mélange date, heure et fuseau horaire sans typage strict. Depuis Java 8 / JPA 2.2, `LocalDate`, `LocalDateTime` et `Instant` sont immutables et représentent fidèlement les types SQL DATE, TIMESTAMP. 2) Clé primaire auto-générée : avant le `persist()`, l'ID vaut `null`. Si vous stockez l'entité dans un `Set<Entity>` ou `Map`, `hashCode()` calcule une valeur sur `null`. Une fois persistée, l'ID passe à 1 : le `hashCode()` change en cours de vie ! L'élément devient alors INTROUVABLE dans le Set (rupture du contrat Set/Map). Solution : baser `equals/hashCode` sur une clé métier naturelle stable (code client unique, UUID généré à la création, ou référence métier).",
    codeExample: `// CORRECT : UUID métier stable généré dès le constructeur
@Entity
public class Utilisateur {
    @Id @GeneratedValue private Long id;
    
    @Column(nullable = false, unique = true, updatable = false)
    private String businessId = UUID.randomUUID().toString();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Utilisateur)) return false;
        return Objects.equals(businessId, ((Utilisateur) o).businessId);
    }
    @Override public int hashCode() { return Objects.hash(businessId); }
}`,
    examinerTrap: "L'examinateur demande souvent ce qui se passe si on génère machinalement equals/hashCode avec Lombok `@Data` sur une entité JPA (provoque des StackOverflowError sur les relations bidirectionnelles et des ruptures de Set).",
    salaryImpactProTip: "Expliquez précisément l'impact sur les collections `HashSet` et démontrez pourquoi la clé métier (business key) est le standard recommandé par l'équipe Hibernate elle-même."
  }
];
