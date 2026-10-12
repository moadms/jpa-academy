export interface KnowledgeTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'jvm-memory' | 'spring-boot' | 'testing-devops' | 'microservices-angular' | 'pfe-morocco' | 'roadmap-1month' | 'trap-questions' | 'cheatsheets';
  icon: string;
  badge: string;
  summary: string;
  problemBefore: string;
  solutionAfter: string;
  deepDive: {
    sectionTitle: string;
    content: string;
    codeSnippet?: string;
    diagramAscii?: string;
    keyTakeaway: string;
  }[];
  trapQuestion: {
    question: string;
    rookieAnswer: string;
    seniorAnswer: string;
    whyRecruiterAsks: string;
  };
}

export interface PfeCompanyInfo {
  name: string;
  city: string;
  hub: string;
  hiringScope: string;
  salaryPfe: string;
  salaryJuniorCdi: string;
  requiredSkills: string[];
  selectionSteps: string[];
  insiderAdvice: string;
}

export interface RoadmapWeekPlan {
  weekNumber: number;
  title: string;
  focus: string;
  dailySchedule: {
    day: string;
    goal: string;
    tasks: string[];
  }[];
  codingGameChallenge: {
    title: string;
    difficulty: 'Facile' | 'Moyen' | 'Difficile' | 'Expert';
    description: string;
    starterCode: string;
    solutionCode: string;
    timeLimitMinutes: number;
  };
}

export interface TrapQuestionItem {
  id: string;
  topic: string;
  question: string;
  companyTarget: string;
  difficulty: 'Junior' | 'Confirmé' | 'Senior';
  theTrap: string;
  rookieMistake: string;
  seniorModelAnswer: string;
  codeIllustration?: string;
  goldenRule: string;
}

export interface CheatSheetDoc {
  id: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  contentMarkdown: string;
}

export interface LearningPathwayStage {
  stageNumber: number;
  id: string;
  title: string;
  subtitle: string;
  estimatedDuration: string;
  mindsetQuote: string;
  visualArchitectureDiagram: string;
  keyConcepts: {
    title: string;
    description: string;
    warningTrap: string;
    engineeringRule: string;
  }[];
  actionChecklist: string[];
}

export interface CoachManifesto {
  title: string;
  salutation: string;
  introManifesto: string;
  theTruthAboutMoroccanRecruiters: string;
  theThreePillarsOfVictory: {
    pillar: string;
    explanation: string;
    actionableHabit: string;
  }[];
  roiCalculation: {
    title: string;
    withoutPreparation: string;
    withDisciplinedPreparation: string;
    differenceDh: string;
  };
}

export interface PsychologicalTechnique {
  id: string;
  title: string;
  context: string;
  seniorMindset: string;
  methodologySteps: string[];
  exactScriptOrPhrase: string;
  rookieMistake: string;
}

export interface MoroccanTechVideo {
  id: string;
  title: string;
  showOrPodcast: string;
  speakers: string[];
  duration: string;
  language: 'Darija 🇲🇦' | 'Français 🇫🇷' | 'Mixte Darija / FR';
  youtubeId: string;
  badge: string;
  summary: string;
  keyPointsCovered: string[];
  whyEveryMoroccanEngineerMustWatch: string;
}

export interface MemoryFlashcard {
  id: string;
  category: string;
  frontQuestion: string;
  frontHint: string;
  backCoreConcept: string;
  backDiagramAscii?: string;
  backSeniorRule: string;
}

// -------------------------------------------------------------
// MODULE 1 : JVM & RAM INTERNALS
// -------------------------------------------------------------
export const jvmAndRamTopics: KnowledgeTopic[] = [
  {
    id: 'ram-variables-storage',
    title: 'Comment les Variables sont Stockées en RAM (Stack vs Heap)',
    subtitle: 'Comprendre l\'allocation mémoire physique pour éviter les OutOfMemoryError et optimiser les performances',
    category: 'jvm-memory',
    icon: 'Cpu',
    badge: 'Fondamental JVM',
    summary: 'La JVM découpe la mémoire vive allouée par le système d\'exploitation en plusieurs zones distinctes : la Stack (pile d\'exécution) et le Heap (tas d\'objets). Comprendre qui stocke quoi est la base absolue demandée en entretien technique.',
    problemBefore: 'Un développeur débutant pense que toutes les variables sont stockées au même endroit en mémoire. Il crée des objets dans des boucles infinies ou passe des objets géants en paramètres sans comprendre la différence entre passage par valeur et références, causant des lenteurs massives et des crashs OutOfMemoryError.',
    solutionAfter: 'Séparer rigoureusement la Stack (ultra-rapide, thread-local, stocke les types primitifs et les adresses mémoires 64-bit) du Heap (partagé entre tous les threads, stocke les corps des objets et tableaux, géré par le Garbage Collector).',
    deepDive: [
      {
        sectionTitle: '1. La Stack (Thread Stack) : Ultra-rapide & Locale',
        content: `Chaque thread Java possède sa propre Stack mémoire allouée au démarrage (taille par défaut souvent 1 MB, configurable via -Xss). 
Lorsqu'une méthode est appelée, une "Stack Frame" (cadre de pile) est poussée (push). Elle contient :
- Les variables locales de type primitif : byte, short, int, long, float, double, char, boolean. Leurs valeurs binaires brutes y sont écrites directement.
- Les pointeurs de référence d'objets (adresses mémoire de 32 ou 64 bits, comme 'userRef') qui pointent vers des objets résidant sur le Heap.
- La valeur de retour de la méthode.
Dès que la méthode se termine, son cadre est dépilé (pop) instantanément en O(1) sans intervention du Garbage Collector.`,
        codeSnippet: `public void processOrder() {
    int count = 42;                 // Stocké DIRECTEMENT sur la Stack (4 octets)
    boolean isValid = true;         // Stocké DIRECTEMENT sur la Stack (1 octet)
    User user = new User("Moad");   // 'user' (la variable référence) est sur la Stack (8 octets)
                                    // new User(...) (l'objet réel) est alloué sur le HEAP !
}`,
        diagramAscii: `+-----------------------------------------+-----------------------------------------+
|            THREAD STACK (LIFO)          |               HEAP (Shared)             |
+-----------------------------------------+-----------------------------------------+
| [Frame: processOrder()]                 |                                         |
|  - count = 42 (primitif brut)           |                                         |
|  - isValid = true (primitif brut)       |  +-----------------------------------+  |
|  - user = 0x7FFF8A42 (pointeur adresse) ===> | User { nom: "Moad", age: 24 }      |  |
|                                         |  +-----------------------------------+  |
+-----------------------------------------+-----------------------------------------+`,
        keyTakeaway: 'Les primitifs locaux et les pointeurs vivent sur la Stack. Les instances d\'objets vivent toujours sur le Heap (sauf Escape Analysis).'
      },
      {
        sectionTitle: '2. Anatomie d\'un Objet en Mémoire sur le Heap',
        content: `Un objet sur le Heap n'est pas juste la somme de ses attributs. La JVM HotSpot lui adjoint des métadonnées obligatoires :
1. Mark Word (8 octets sur 64-bit) : Stocke le HashCode identity, l'âge dans le GC (pour les promotions Eden -> Tenured), et les états de verrous de synchronisation (biased, lightweight, heavyweight lock).
2. Klass Word (8 octets ou 4 octets avec Compressed OOPs) : Pointeur vers les métadonnées de la classe dans le Metaspace.
3. Données d'instance (Instance Data) : Les valeurs réelles des champs (primitifs ou références vers d'autres objets).
4. Padding d'alignement (Padding) : La taille totale de chaque objet en mémoire doit être un multiple de 8 octets. La JVM ajoute des octets vides si nécessaire pour satisfaire l'alignement CPU 64-bit.`,
        codeSnippet: `// Exemple : Un simple Integer consomme 16 ou 24 octets en RAM !
// Mark Word (8B) + Klass Word (4B/8B) + int value (4B) + Padding (4B) = 24 octets.
// Alors qu'un 'int' primitif ne consomme que 4 octets sur la Stack.
// C'est pourquoi en haute performance, on évite le boxing inutile Integer/int.`,
        keyTakeaway: 'Le boxing d\'un primitif (int -> Integer) multiplie par 4 à 6 la consommation mémoire RAM de la valeur.'
      },
      {
        sectionTitle: '3. Escape Analysis & Scalar Replacement du compilateur JIT C2',
        content: `Depuis Java 6u23 et perfectionné sous Java 17/21, le compilateur JIT utilise l'Analyse d'Échappement (Escape Analysis). 
Si la JVM prouve qu'un objet alloué dans une méthode ne s'échappe jamais de celle-ci (il n'est pas retourné, ni stocké dans un champ statique, ni passé à un autre thread), elle applique le "Scalar Replacement" : l'objet n'est même pas alloué sur le Heap ! Ses champs sont éclatés en registres CPU ou variables sur la Stack. Résultat : zéro charge pour le Garbage Collector !`,
        codeSnippet: `public int computeDistance() {
    Point p = new Point(10, 20); // 'p' ne sort jamais de computeDistance()
    return p.x + p.y;
    // Grâce à l'Escape Analysis, aucun 'new Point' n'est alloué sur le Heap !
    // Le JIT transforme le code en : return 10 + 20; -> return 30;
}`,
        keyTakeaway: 'Le compilateur JIT est capable d\'éliminer des allocations Heap si les objets sont éphémères et confinés.'
      }
    ],
    trapQuestion: {
      question: 'En Java, les arguments d\'une méthode sont-ils passés par valeur ou par référence ?',
      rookieAnswer: 'Les types primitifs sont passés par valeur, mais les objets sont passés par référence.',
      seniorAnswer: 'Java est STRICTEMENT 100% passage par valeur (Pass-by-value), toujours. Pour les objets, la valeur qui est copiée et passée est la valeur du pointeur de référence (l\'adresse mémoire), et non l\'objet lui-même. C\'est pourquoi si on réassigne l\'argument (ex: `user = new User()`) à l\'intérieur de la méthode appelée, l\'objet initial de l\'appelant ne change absolument pas.',
      whyRecruiterAsks: 'C\'est la question de discrimination numéro 1 en entretien Java. Elle permet de savoir instantanément si le candidat comprend la mécanique de la mémoire ou s\'il récite des approximations.'
    }
  },
  {
    id: 'compilation-lifecycle-jvm',
    title: 'Le Cycle Complet de Compilation & Exécution (Javac, Bytecode, ClassLoader, JIT C1/C2)',
    subtitle: 'De la ligne de code source .java jusqu\'aux instructions assembleur exécutées par le CPU',
    category: 'jvm-memory',
    icon: 'Layers',
    badge: 'Compilation & JIT',
    summary: 'Java n\'est ni purement compilé comme le C++, ni purement interprété comme Python. C\'est un langage hybride qui compile en Bytecode intermédiaire, puis utilise un compilateur JIT à plusieurs niveaux (Tiered Compilation) pour battre souvent le C++ en exécution.',
    problemBefore: 'Penser que javac produit du code binaire machine exécutable par Windows ou Linux, et ne pas savoir expliquer le rôle de la JVM lors d\'un incident de performance en production.',
    solutionAfter: 'Maîtriser les 4 grandes phases : Compilation statique (javac), Chargement dynamique (ClassLoader Subsystem), Vérification & Liaison, et Exécution hybride (Interpréteur + JIT C1 + Profiling + JIT C2).',
    deepDive: [
      {
        sectionTitle: '1. Phase 1 : Compilation Statique par javac (.java -> .class)',
        content: `Le compilateur 'javac' transforme le code source en Bytecode. Il n'effectue AUCUNE optimisation matérielle CPU (pas d'inlining agressif, pas de vectorisation SIMD).
Ses étapes :
1. Analyse lexicale & syntaxique (Scanner/Parser) -> Arbre Syntaxique Abstrait (AST).
2. Table des symboles et attribution des types (Type Checking).
3. Désucrage syntaxique (Desugaring) : transforme les boucles 'for-each' en boucles avec Iterator, gère le try-with-resources, et synthétise les constructeurs par défaut.
4. Émission du fichier binaire .class contenant les instructions de la machine virtuelle (ex: aload_0, invokevirtual, bipush).`,
        codeSnippet: `// Source Java:
public int add(int a, int b) { return a + b; }

// Bytecode généré (visible avec 'javap -c MyClass'):
0: iload_1        // Charge le paramètre 'a' sur la pile d'opérandes
1: iload_2        // Charge le paramètre 'b' sur la pile d'opérandes
2: iadd           // Dépile les deux entiers, calcule la somme, empile le résultat
3: ireturn        // Retourne l'entier situé au sommet de la pile`,
        keyTakeaway: 'Le Bytecode est universel et indépendant de l\'OS : Write Once, Run Anywhere.'
      },
      {
        sectionTitle: '2. Phase 2 : Le Sous-Système ClassLoader',
        content: `Au démarrage, la JVM ne charge pas toutes les classes d\'un coup. Elle les charge à la demande (Lazy Loading) via une hiérarchie stricte à 3 niveaux selon le principe de délégation parentale :
1. Bootstrap ClassLoader : Écrit en C/C++, charge les classes fondamentales du JDK (java.lang.*, java.util.*) depuis java.base.
2. Platform/Extension ClassLoader : Charge les extensions Java et modules plateformes.
3. Application/System ClassLoader : Charge vos classes écrites dans le projet et les dépendances Maven/Gradle du classpath.
Ensuite vient la Liaison (Linking) :
- Verification : S'assure que le bytecode est valide et ne viole pas la sécurité mémoire.
- Preparation : Alloue la mémoire pour les variables statiques et leur assigne leurs valeurs par défaut (0, null).
- Resolution : Remplace les références symboliques du Constant Pool par des adresses mémoire directes.
- Initialization : Exécute les blocs 'static { ... }' et initialise les variables de classe.`,
        keyTakeaway: 'Le principe de délégation parentale empêche le piratage en interdisant à un développeur de remplacer la classe java.lang.String par une fausse classe malveillante.'
      },
      {
        sectionTitle: '3. Phase 3 : Tiered Compilation (Interpréteur -> JIT C1 -> JIT C2)',
        content: `Pourquoi Java démarre vite et devient ultra-rapide avec le temps ?
- Au départ, l'Interpréteur lit le bytecode instruction par instruction. Cela permet un démarrage immédiat de l'application.
- Les méthodes fréquemment appelées ("Hot Spots") sont détectées par des compteurs d'invocations.
- Niveau 1 à 3 (C1 Client Compiler) : Compile rapidement le bytecode en code machine avec profilage de base.
- Niveau 4 (C2 Server Compiler) : Prend le relais sur les méthodes critiques. Il applique des optimisations extrêmes :
  * Inlining de méthode : Remplace l'appel de fonction par son corps brut pour éliminer l'overhead du call stack.
  * Loop Unrolling : Déroule les boucles pour exploiter le pipeline superscalaire du processeur.
  * Dead Code Elimination : Supprime le code impossible à atteindre.
  * Monomorphic Inlining : Si une interface n'a qu'une seule implémentation active en pratique, le JIT supprime la table virtuelle (vtable) et fait un appel direct !`,
        keyTakeaway: 'La compilation Just-In-Time (JIT) optimise le code en fonction des données d\'exécution réelles, ce qui est impossible pour un compilateur statique comme C++ ou Rust.'
      }
    ],
    trapQuestion: {
      question: 'Qu\'est-ce que le Metaspace en Java et en quoi diffère-t-il du PermGen qui existait avant Java 8 ?',
      rookieAnswer: 'C\'est l\'endroit où sont stockés les objets de l\'application.',
      seniorAnswer: 'Le PermGen (Permanent Generation) faisait partie du Heap Java avec une taille fixe (-XX:MaxPermSize), ce qui provoquait couramment des `java.lang.OutOfMemoryError: PermGen space` lors de déploiements successifs sur Tomcat. Depuis Java 8, il a été supprimé et remplacé par le Metaspace, qui réside en mémoire NATIVE (hors du Heap Java). Le Metaspace grandit automatiquement jusqu\'à la limite de la RAM physique de la machine (sauf si bridé par -XX:MaxMetaspaceSize) et stocke les métadonnées de classes, le constant pool et les méthodes compilées.',
      whyRecruiterAsks: 'Vérifie si le candidat a une expérience de production et s\'il comprend la séparation entre mémoire gérée par la JVM et mémoire OS native.'
    }
  },
  {
    id: 'garbage-collection-leaks',
    title: 'Le Garbage Collector (GC) & Comment Créer une Vraie Fuite Mémoire en Java',
    subtitle: 'Hypothèse générationnelle, Minor/Major GC, G1 GC, ZGC et détection de fuites avec Heap Dump',
    category: 'jvm-memory',
    icon: 'Flame',
    badge: 'Garbage Collection & OOM',
    summary: 'Le ramasse-miettes automatise la libération de la mémoire. Mais contrairement à ce que croient les juniors, les fuites de mémoire sont tout à fait possibles et très dangereuses en Java lorsque des objets inutilisés restent référencés.',
    problemBefore: 'L\'application ralentit après 3 jours de production, subit des "Stop-The-World" de 15 secondes qui coupent les connexions des utilisateurs, puis crashe avec `java.lang.OutOfMemoryError: Java heap space`. L\'équipe redémarre le serveur aveuglément sans comprendre la cause racine.',
    solutionAfter: 'Comprendre l\'hypothèse générationnelle (Eden, S0, S1, Old Gen), choisir le bon ramasse-miettes (G1 GC par défaut, ou ZGC pour des pauses < 1ms), générer un Heap Dump (`-XX:+HeapDumpOnOutOfMemoryError`) et l\'analyser avec Eclipse Memory Analyzer (MAT).',
    deepDive: [
      {
        sectionTitle: '1. L\'Hypothèse Générationnelle & Structure du Heap',
        content: `Observation empirique universelle : 98% des objets meurent presque immédiatement après leur création (ex: DTOs, buffers temporaires, strings de requêtes HTTP).
Le Heap est donc découpé en :
1. Young Generation :
   - Eden Space : Lieu de création de tout nouvel objet.
   - Survivor Spaces (S0 et S1 / From et To) : Objets ayant survécu à un GC. À chaque cycle de Minor GC, les survivants d'Eden et S0 sont copiés dans S1, et leurs âges s'incrémentent de 1.
2. Old Generation (Tenured) :
   - Quand un objet atteint un âge seuil (Tenuring Threshold, par défaut 15 cycles), il est promu dans la Old Generation.
- Minor GC : Nettoie uniquement la Young Gen. Ultra-rapide (quelques millisecondes).
- Major / Full GC : Nettoie tout le Heap (Young + Old Gen). Coûteux, provoque un "Stop-The-World" où tous les threads applicatifs sont mis en pause !`,
        diagramAscii: `+---------------------------------------------------------+-----------------------+
|                   YOUNG GENERATION                      |    OLD GENERATION     |
+--------------------------+---------------+--------------+-----------------------+
|        EDEN (80%)        |   S0 (10%)    |   S1 (10%)   |    TENURED / OLD      |
|  [new Object() créés ici] |  [Survivants] |  [Survivants] | [Objets de longue vie]|
+--------------------------+---------------+--------------+-----------------------+
  Minor GC balaie Eden ---> Copie vers S0/S1 ---> Si âge > 15 ---> Promu dans Old Gen`,
        keyTakeaway: 'Le partitionnement générationnel évite de devoir scanner l\'intégralité du Heap à chaque nettoyage.'
      },
      {
        sectionTitle: '2. Les Ramasse-Miettes Modernes : G1 vs ZGC',
        content: `- G1 GC (Garbage-First, défaut depuis Java 9) : Découpe le Heap en milliers de petites régions égales (1MB à 32MB). Il estime quelles régions contiennent le plus de déchets ("Garbage First") et les nettoie en priorité dans le respect d\'une cible de pause maximale (ex: -XX:MaxGCPauseMillis=200).
- ZGC (Z Garbage Collector, disponible en production) : GC scalable conçu pour des heaps de 8 MB à 16 Terabytes avec des temps de pause Stop-The-World inférieurs à 1 milliseconde, quelle que soit la taille de la mémoire ! Utilise des "Colored Pointers" et des "Load Barriers" concurrentes.`,
        keyTakeaway: 'Pour les applications temps réel ou bancaires à forte volumétrie, ZGC offre des pauses imperceptibles pour les utilisateurs.'
      },
      {
        sectionTitle: '3. Les 4 Causes Majeures de Fuites Mémoire Réelles en Java',
        content: `Une fuite mémoire en Java se produit lorsqu'un objet dont l'application n'a plus besoin reste atteignable depuis une "GC Root" (variable statique, thread en cours d'exécution, etc.).
1. Collections Statiques sans limite :
   \`private static final Map<String, Object> cache = new HashMap<>();\`
   Si on y insère des éléments sans politique d'éviction (LRU) ni limite de taille, la map grossit jusqu'au crash OOM.
2. ThreadLocal non nettoyé dans un pool Tomcat :
   Les serveurs d'applications réutilisent les threads de requêtes HTTP. Si vous faites \`threadLocal.set(userData)\` sans appeler \`threadLocal.remove()\` dans un bloc \`finally\`, les données restent vivantes indéfiniment attachées au thread !
3. Listeners / Callbacks non désinscrits :
   S'enregistrer comme observateur auprès d'un singleton sans jamais se désinscrire maintient la référence vers l'écouteur.
4. Flux I/O et connexions JDBC non fermées.`,
        codeSnippet: `// Exemple typique de fuite ThreadLocal en Spring Boot :
public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) {
    try {
        UserContext.set(currentUser); // Stocké dans le ThreadLocal du thread Tomcat
        chain.doFilter(req, res);
    } finally {
        UserContext.remove(); // OBLIGATOIRE ! Sans cela, fuite mémoire garantie !
    }
}`,
        keyTakeaway: 'Toujours nettoyer les ThreadLocal dans un bloc finally, et borner les caches avec Caffeine ou Guava.'
      }
    ],
    trapQuestion: {
      question: 'Appeler System.gc() garantit-il que la mémoire sera immédiatement libérée par la JVM ?',
      rookieAnswer: 'Oui, cela force la JVM à exécuter le Garbage Collector pour vider la mémoire.',
      seniorAnswer: 'Absolument PAS. En Java, `System.gc()` n\'est qu\'une simple suggestion polie faite à la JVM. La JVM est totalement libre d\'ignorer cet appel si elle juge que ce n\'est pas opportun. Pire encore, si la JVM l\'exécute, cela déclenche un Full GC Stop-The-World qui fige tous les threads applicatifs. En production, on désactive souvent explicitement cette option avec le flag `-XX:+DisableExplicitGC`.',
      whyRecruiterAsks: 'Permet de vérifier si le candidat connaît les bonnes pratiques de production et les impacts de performance du Garbage Collector.'
    }
  }
];

// -------------------------------------------------------------
// MODULE 2 : SPRING BOOT INTERNALS & ARCHITECTURE
// -------------------------------------------------------------
export const springBootTopics: KnowledgeTopic[] = [
  {
    id: 'ioc-bean-lifecycle',
    title: 'Le Conteneur IoC & Le Cycle de Vie Complet d\'un Spring Bean',
    subtitle: 'De l\'instanciation par réflexion jusqu\'à la destruction : ce qui se passe sous le capot',
    category: 'spring-boot',
    icon: 'Zap',
    badge: 'IoC & Bean Lifecycle',
    summary: 'Le principe d\'Inversion de Contrôle (IoC) confie la gestion des dépendances et du cycle de vie des objets au conteneur Spring (ApplicationContext). Comprendre les étapes exactes de vie d\'un Bean est indispensable pour maîtriser Spring.',
    problemBefore: 'Instancier manuellement des objets avec "new" au sein de services métiers, créant un couplage fort rendant impossible les tests unitaires isolés et la gestion centralisée des transactions.',
    solutionAfter: 'Laisser Spring instancier, configurer et assembler les Beans via le conteneur IoC, avec injection de dépendances par constructeur et intercepteurs BeanPostProcessor.',
    deepDive: [
      {
        sectionTitle: '1. Les 3 Modes d\'Injection : Pourquoi l\'Injection par Constructeur est la Seule Recommandée',
        content: `Spring propose 3 manières d'injecter une dépendance :
1. Injection par Champ (@Autowired sur private field) : DÉCONSEILLÉE & ANTI-PATTERN.
   - Rend les tests unitaires impossibles sans lancer le conteneur Spring ou utiliser la réflexion.
   - Masque la violation du principe de Responsabilité Unique (un service peut accumuler 12 dépendances sans que ça se voie).
   - Interdit l'utilisation de champs 'final' (immuabilité impossible).
2. Injection par Setter : Utile uniquement pour des dépendances optionnelles (très rare).
3. Injection par Constructeur : LA NORME D'EXCELLENCE INDUSTRIELLE.
   - Champs déclarés 'private final' : immuabilité garantie, thread-safe.
   - Tests unitaires ultra-simples : \`new OrderService(mockRepo, mockMailer)\` sans framework de mock lourd.
   - Échec rapide au démarrage (Fail-Fast) : Si une dépendance est manquante, le constructeur ne peut pas être appelé.
   - Depuis Spring 4.3, l'annotation @Autowired n'est même plus nécessaire sur le constructeur unique !`,
        codeSnippet: `@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final PaymentClient paymentClient;

    // Constructeur propre recommandé par l'équipe Spring :
    public OrderService(OrderRepository orderRepository, PaymentClient paymentClient) {
        this.orderRepository = orderRepository;
        this.paymentClient = paymentClient;
    }
}`,
        keyTakeaway: 'Toujours préférer l\'injection par constructeur avec des champs `final` pour garantir l\'immuabilité et la testabilité.'
      },
      {
        sectionTitle: '2. Les 8 Étapes du Cycle de Vie d\'un Spring Bean',
        content: `Lorsque le contexte Spring démarre, chaque bean traverse ce cheminement précis :
1. Instanciation : Spring appelle le constructeur via réflexion (Constructor Invocation).
2. Injection des propriétés : Spring injecte les dépendances requises (Populate Properties).
3. Méthodes Aware : Si le bean implémente BeanNameAware, BeanFactoryAware ou ApplicationContextAware, Spring lui injecte ces références.
4. BeanPostProcessor (Before Initialization) : Exécute \`postProcessBeforeInitialization()\` sur tous les intercepteurs configurés.
5. Initialisation : Exécution de la méthode annotée avec \`@PostConstruct\` ou \`InitializingBean.afterPropertiesSet()\`.
6. BeanPostProcessor (After Initialization) : Exécute \`postProcessAfterInitialization()\`. ATTENTION : C'est ICI que Spring remplace le bean par un PROXY dynamique s'il est annoté avec @Transactional, @Async ou @Security !
7. Bean Prêt : Le bean est mis en cache dans le singleton pool et disponible pour les requêtes.
8. Destruction : À l'arrêt de l'application, appel de \`@PreDestroy\` ou \`DisposableBean.destroy()\`.`,
        diagramAscii: `[1. Constructeur] -> [2. Injection Dépendances] -> [3. Aware Callbacks]
       |
       v
[4. BeanPostProcessor Before] -> [5. @PostConstruct] -> [6. BeanPostProcessor After (PROXIFICATION AOP)]
       |
       v
[7. BEAN PRÊT À L'EMPLOI (Singleton)] --------(Arrêt App)--------> [8. @PreDestroy]`,
        keyTakeaway: "C'est dans le BeanPostProcessor After que la magie AOP (proxification pour @Transactional et @Async) s'opère."
      },
      {
        sectionTitle: '3. Scopes de Beans & Le Piège du Prototype injecté dans un Singleton',
        content: `- Singleton (défaut) : Une seule instance par ApplicationContext.
- Prototype : Une nouvelle instance est créée à chaque demande (\`getBean()\` ou injection).
- Request / Session / Application : Scopes web (une instance par requête HTTP ou session).
LE PIÈGE : Si vous injectez un bean \`@Scope("prototype")\` dans un service \`@Service\` (qui est par défaut Singleton), que se passe-t-il ?
Comme le singleton n'est instancié qu'une seule fois au démarrage, la dépendance prototype n'est injectée QU'UNE SEULE FOIS ! Le bean prototype se comporte alors comme un singleton.
Solution : Utiliser l'annotation \`@Lookup\` ou injecter \`ObjectProvider<MyPrototypeBean>\`.`,
        codeSnippet: `@Service
public class OrderService {
    private final ObjectProvider<TokenGenerator> tokenGeneratorProvider;

    public OrderService(ObjectProvider<TokenGenerator> tokenGeneratorProvider) {
        this.tokenGeneratorProvider = tokenGeneratorProvider;
    }

    public void createOrder() {
        // Chaque appel à getObject() crée bien une NOUVELLE instance prototype :
        TokenGenerator generator = tokenGeneratorProvider.getObject();
        generator.generate();
    }
}`,
        keyTakeaway: 'Injecter directement un Prototype dans un Singleton casse le comportement du prototype. Utiliser ObjectProvider ou @Lookup.'
      }
    ],
    trapQuestion: {
      question: 'Quelle est la différence fondamentale entre @Component, @Service, @Repository et @Configuration ?',
      rookieAnswer: '@Service c\'est pour les services, @Repository pour la base de données, et @Component pour les autres.',
      seniorAnswer: `Techniquement, @Service, @Repository et @Configuration sont toutes des méta-annotations qui héritent de @Component. Cependant, elles apportent des comportements spécifiques essentiels :
1. @Repository enregistre automatiquement un PersistenceExceptionTranslationPostProcessor qui traduit les exceptions SQL natives spécifiques en hiérarchie Spring homogène DataAccessException.
2. @Configuration active un proxy CGLIB sur la classe pour que les appels inter-méthodes annotées @Bean retournent la même instance singleton (évite la ré-instanciation accidentelle).
3. @Service sert d'indicateur sémantique pour la couche métier (Domain Logic) et facilite le ciblage des pointcuts AOP.`,
      whyRecruiterAsks: 'Permet de voir si le développeur comprend les fonctionnalités cachées de Spring ou s\'il voit ces annotations comme de simples marqueurs cosmétiques.'
    }
  },
  {
    id: 'transactional-proxy-mechanics',
    title: 'Comment Fonctionne Vraiment @Transactional Sous le Capot (Proxies AOP & Piège de l\'Auto-Invocation)',
    subtitle: 'La question d\'entretien la plus redoutable chez Capgemini, SG ATS et Oracle Maroc',
    category: 'spring-boot',
    icon: 'Shield',
    badge: 'AOP & Transactions',
    summary: 'Spring n\'ajoute pas de code magique dans vos méthodes. Il entoure votre classe d\'un Proxy dynamique. Comprendre ce fonctionnement évite les pires corruptions de données en production.',
    problemBefore: 'Une méthode métier appelle une méthode privée ou interne annotée @Transactional. Une exception est levée, mais aucun rollback n\'est effectué en base de données. Des transactions fantômes restent validées et corrompent les comptes bancaires.',
    solutionAfter: 'Comprendre l\'architecture Proxy (CGLIB / JDK Dynamic Proxy), la règle de l\'auto-invocation (self-invocation) et configurer les règles de rollback explicites (`rollbackFor = Exception.class`).',
    deepDive: [
      {
        sectionTitle: '1. Le Mécanisme du Proxy Spring AOP',
        content: `Lorsque Spring détecte @Transactional sur une classe ou méthode :
1. Il génère au runtime une sous-classe ou un wrapper appelé PROXY (généré par CGLIB ou JDK Dynamic Proxy).
2. L'appelant extérieur (ex: un Controller HTTP) ne parle JAMAIS à votre objet réel, mais au PROXY.
3. Le Proxy intercepte l'appel :
   - Ouvre la transaction via le PlatformTransactionManager : \`status = txManager.getTransaction(def)\`
   - Exécute le code de votre méthode métier réelle dans un bloc try/catch.
   - Si aucune exception n'est levée : \`txManager.commit(status)\`
   - Si une RuntimeException survient : \`txManager.rollback(status)\``,
        diagramAscii: `[HTTP Request]
      |
      v
+-----------------------------------------------------------+
|                     SPRING PROXY                          |
|                                                           |
| 1. txManager.getTransaction() [BEGIN]                     |
| 2. try {                                                  |
|       monServiceReel.transfererArgent(...)  <-------------|-- Appelle l'instance réelle
|    } catch (Throwable ex) {                               |
|       txManager.rollback() [ROLLBACK]                     |
|    }                                                      |
| 3. txManager.commit() [COMMIT]                            |
+-----------------------------------------------------------+`,
        keyTakeaway: 'La transaction n\'est pas gérée dans votre méthode, mais autour d\'elle par le Proxy Spring.'
      },
      {
        sectionTitle: '2. Le Piège Mortel de la Self-Invocation (Auto-Invocation)',
        content: `C'est le piège numéro 1 posé en entretien technique senior !
Regardez ce code vicieux :
\`\`\`java
@Service
public class BankService {

    public void processPayment() {
        // ... vérifications ...
        this.saveAudit(); // APPEL INTERNE DIRECT !
    }

    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void saveAudit() {
        auditRepository.save(new AuditLog());
    }
}
\`\`\`
QUE SE PASSE-T-IL ICI ?
L'annotation \`@Transactional\` sur \`saveAudit()\` est COMPLÈTEMENT IGNORÉE ! Aucune transaction n'est créée !
Pourquoi ?
Parce que l'appel \`this.saveAudit()\` est un appel direct de pointeur mémoire interne 'this'. Il ne passe PAS par le Proxy Spring !
Solutions industrielles :
1. Déplacer la méthode \`saveAudit()\` dans un service dédié (\`AuditService\`) et l'injecter.
2. Injecter le bean par lui-même (\`self-injection\`) pour forcer le passage par le proxy.`,
        codeSnippet: `// Solution 1 (La plus propre) : Séparer les responsabilités
@Service
public class BankService {
    private final AuditService auditService; // Injecté -> passe par le Proxy !

    public BankService(AuditService auditService) {
        this.auditService = auditService;
    }

    public void processPayment() {
        auditService.saveAudit(); // Transaction REQUIRES_NEW exécutée avec succès !
    }
}`,
        keyTakeaway: 'Tout appel d\'une méthode @Transactional au sein de la même classe (this.method) contourne le proxy et annule la gestion de transaction.'
      },
      {
        sectionTitle: '3. Le Piège du Rollback : Checked vs Unchecked Exceptions',
        content: `Par défaut, Spring ne fait de Rollback QUE sur les exceptions NON surveillées :
- \`RuntimeException\` et \`Error\` (Unchecked Exceptions).
Si votre méthode lance une exception surveillée (\`Exception\` ou \`IOException\`), Spring effectue un COMMIT par défaut !
Pour forcer le rollback sur toutes les exceptions :
\`@Transactional(rollbackFor = Exception.class)\``,
        keyTakeaway: 'Toujours expliciter rollbackFor = Exception.class sur vos transactions critiques.'
      }
    ],
    trapQuestion: {
      question: 'Peut-on mettre @Transactional sur une méthode privée (private) en Spring ?',
      rookieAnswer: 'Oui, si on a besoin qu\'elle s\'exécute dans une transaction.',
      seniorAnswer: 'Non. Spring AOP génère des proxies basés sur l\'héritage (CGLIB) ou les interfaces (JDK). Une méthode privée ne peut ni être redéfinie (override) par une sous-classe, ni figurer dans une interface. Par conséquent, le proxy ne peut pas intercepter une méthode privée. Spring ignorera purement et simplement l\'annotation `@Transactional` sans lever d\'erreur. Les méthodes transactionnelles doivent obligatoirement être `public`.',
      whyRecruiterAsks: 'Teste la compréhension fine du fonctionnement des proxys dynamiques Java et CGLIB.'
    }
  },
  {
    id: 'spring-boot-autoconfiguration',
    title: 'Comment Fonctionne l\'Auto-Configuration de Spring Boot',
    subtitle: 'De @SpringBootApplication aux conditions @ConditionalOnClass et imports',
    category: 'spring-boot',
    icon: 'Sparkles',
    badge: 'Auto-Config & Starter',
    summary: 'Comment Spring Boot sait-il qu\'il doit configurer un serveur Tomcat, une DataSource HikariCP et un EntityManager Hibernate dès que vous ajoutez une dépendance Maven ? Démystification de l\'auto-configuration.',
    problemBefore: 'Écrire des centaines de lignes de fichiers XML ou de classes de configuration Java verbeuses pour déclarer manuellement chaque DataSource, LocalContainerEntityManagerFactoryBean et PlatformTransactionManager.',
    solutionAfter: 'Spring Boot inspecte le Classpath au démarrage. Grâce aux starters et aux annotations conditionnelles, il configure automatiquement l\'environnement optimal.',
    deepDive: [
      {
        sectionTitle: '1. @SpringBootApplication : 3 Annotations en Une',
        content: `@SpringBootApplication est une méta-annotation qui regroupe :
1. @Configuration : Permet de déclarer des beans via @Bean.
2. @ComponentScan : Scanne le package courant et tous ses sous-packages pour trouver les @Component, @Service, @Repository, @Controller.
3. @EnableAutoConfiguration : Déclenche le mécanisme d'auto-configuration basé sur le classpath.`,
        keyTakeaway: '@SpringBootApplication configure le scanning local et l\'auto-configuration globale.'
      },
      {
        sectionTitle: '2. Le Fichier d\'Imports et les Annotations Conditionnelles',
        content: `Au démarrage, Spring Boot lit les classes d'auto-configuration enregistrées dans :
- \`META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports\` (Spring Boot 3.x)
- ou \`META-INF/spring.factories\` (Spring Boot 2.x).
Chaque classe d'auto-configuration est protégée par des conditions strictes :
- \`@ConditionalOnClass(DataSource.class)\` : Ne s'active que si la classe est présente dans le classpath (présence de la dépendance Maven).
- \`@ConditionalOnMissingBean(DataSource.class)\` : Ne configure le bean que si le développeur n'a PAS déjà configuré son propre bean de ce type. C'est le principe : "Opinionated defaults, but easily overridden".
- \`@ConditionalOnProperty(name = "spring.datasource.url")\` : Ne s'active que si la propriété existe.`,
        codeSnippet: `// Extrait conceptuel de DataSourceAutoConfiguration dans Spring Boot :
@AutoConfiguration
@ConditionalOnClass({ DataSource.class, EmbeddedDatabaseType.class })
@EnableConfigurationProperties(DataSourceProperties.class)
public class DataSourceAutoConfiguration {

    @Bean
    @ConditionalOnMissingBean // Si l'ingénieur n'a pas créé de DataSource, Spring en crée une !
    public DataSource dataSource(DataSourceProperties properties) {
        return properties.initializeDataSourceBuilder().type(HikariDataSource.class).build();
    }
}`,
        keyTakeaway: 'Le principe de Spring Boot repose sur @ConditionalOnMissingBean : il fournit des valeurs par défaut intelligentes tant que vous ne les personnalisez pas.'
      }
    ],
    trapQuestion: {
      question: 'Comment désactiver une auto-configuration spécifique qui cause un conflit au démarrage ?',
      rookieAnswer: 'On supprime la dépendance du pom.xml.',
      seniorAnswer: 'Si la dépendance est requise pour une autre fonctionnalité mais qu\'on veut empêcher son auto-configuration, on utilise l\'attribut `exclude` de `@SpringBootApplication` : `@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })`, ou dans `application.properties` via `spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration`.',
      whyRecruiterAsks: 'Vérifie si le candidat sait résoudre des conflits de configuration complexes en projet réel.'
    }
  }
];

// -------------------------------------------------------------
// MODULE 3 : TESTING & DEVOPS EVOLUTION
// -------------------------------------------------------------
export const testingAndDevopsTopics: KnowledgeTopic[] = [
  {
    id: 'testing-evolution-history',
    title: 'L\'Évolution Historique des Tests : De l\'Ancien vers le Moderne (JUnit, Testcontainers, SonarQube)',
    subtitle: 'Comprendre pourquoi et comment l\'industrie a abandonné les tests manuels et la base H2 au profit de Testcontainers et SonarQube',
    category: 'testing-devops',
    icon: 'Shield',
    badge: 'Histoire & Modernité des Tests',
    summary: 'Raconter l\'histoire des tests logiciels lors d\'un entretien montre une maturité senior exceptionnelle : comment l\'industrie est passée des tests manuels à JUnit 4/5, du mocking avec Mockito, des déboires d\'H2 vers Testcontainers Docker, et de Selenium vers Playwright.',
    problemBefore: 'Les équipes livraient du code sans tests automatisés. Un testeur humain cliquait pendant des heures sur les écrans. Les bugs étaient découverts en production par les clients. Quand on a créé les tests d\'intégration, on utilisait la BDD mémoire H2 qui tolérait des syntaxes SQL fausses incompatibles avec PostgreSQL/Oracle en production.',
    solutionAfter: 'La pyramide moderne de tests : Tests unitaires ultra-rapides (JUnit 5 + Mockito) -> Tests d\'intégration avec de VRAIS conteneurs Docker (Testcontainers) -> Quality Gates SonarQube automatisées en CI/CD -> Tests E2E modernes.',
    deepDive: [
      {
        sectionTitle: '1. Étape 1 : Tests Unitaires avec JUnit 5 & Mockito',
        content: `Pourquoi JUnit 5 a remplacé JUnit 4 ?
- Architecture modulaire : JUnit Platform + JUnit Jupiter + JUnit Vintage.
- Nouvelles annotations plus sémantiques : @BeforeEach (au lieu de @Before), @AfterEach, @DisplayName pour documenter en langage métier clair.
- Tests paramétrés puissants : \`@ParameterizedTest\` et \`@CsvSource\` pour tester 20 cas de bord avec une seule méthode.
- Mockito : Isole la classe testée en remplaçant ses dépendances externes par des simulacres programmés (\`when().thenReturn()\`). Permet d'affirmer avec \`verify()\` qu'une méthode a été appelée le bon nombre de fois avec les bons arguments (\`ArgumentCaptor\`).`,
        codeSnippet: `@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository; // Faux repo sans BDD

    @InjectMocks
    private ReservationService reservationService; // Vrai service testé

    @Test
    @DisplayName("Devrait lever une exception si la salle est déjà réservée")
    void shouldThrowExceptionWhenRoomAlreadyBooked() {
        when(reservationRepository.existsBySalleIdAndCreneau(1L, "10h-12h"))
            .thenReturn(true);

        assertThrows(RoomUnavailableException.class, () -> 
            reservationService.reserver(1L, "10h-12h")
        );

        verify(reservationRepository, never()).save(any()); // Vérifie qu'aucune écriture n'a eu lieu
    }
}`,
        keyTakeaway: 'Le test unitaire doit s\'exécuter en moins de 10 millisecondes et ne doit JAMAIS toucher au réseau ou au disque.'
      },
      {
        sectionTitle: '2. Étape 2 : Le Piège d\'H2 et la Révolution Testcontainers',
        content: `Pendant 15 ans, les développeurs Java utilisaient la base mémoire H2 pour leurs tests d'intégration (\`@DataJpaTest\`).
LE PROBLÈME HISTORIQUE D'H2 :
- H2 n'a pas les mêmes types natifs que PostgreSQL ou Oracle (ex: JSONB, PostGIS, UUID, ENUMs natifs).
- H2 tolère des requêtes invalides ou a des comportements de verrous de concurrence totalement différents de la réalité.
- Résultat : Tous les tests passent avec H2 en local, mais l'application plante lamentablement au déploiement en production !
LA RÉVOLUTION TESTCONTAINERS :
Testcontainers lance une VRAIE instance Docker de PostgreSQL, MySQL, Kafka ou Redis pendant la suite de tests, configure automatiquement la DataSource Spring Boot, et détruit le conteneur à la fin.
Vous testez ainsi EXACTEMENT la même version de base de données qu'en production !`,
        codeSnippet: `@SpringBootTest
@Testcontainers // Active Testcontainers avec Docker
class ReservationIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Test
    void testRealDatabaseConstraints() {
        // Teste de VRAIES contraintes d'intégrité PostgreSQL 16 !
    }
}`,
        keyTakeaway: 'H2 est obsolète pour les tests sérieux en 2025/2026. Testcontainers est le standard industriel incontournable.'
      },
      {
        sectionTitle: '3. Étape 3 : De Selenium WebDriver vers Playwright (Tests E2E)',
        content: `Selenium a été le pionnier de l'automatisation de navigateurs Web.
Ses défauts historiques :
- Lenteur excessive et consommation mémoire colossale.
- Problème des tests "flaky" (tests instables qui échouent aléatoirement à cause de temps de chargement réseau imprévisibles, obligeant à des Thread.sleep affreux).
- Configuration pénible des binaires ChromeDriver/GeckoDriver.
Playwright (par Microsoft) a révolutionné le domaine :
- Auto-Wait natif : Playwright attend automatiquement qu'un bouton devienne visible, actif et cliquable avant d'interagir.
- Exécution headless multi-navigateurs ultra-rapide en WebSockets.
- Isolation totale des contextes de session en quelques millisecondes.`,
        keyTakeaway: 'Playwright élimine 95% des tests instables grâce à son attente intelligente native.'
      },
      {
        sectionTitle: '4. Étape 4 : SonarQube & Les Métriques de Qualité Code',
        content: `SonarQube est intégré dans la chaîne CI/CD (GitLab CI, GitHub Actions, Jenkins) pour inspecter le code avant chaque merge.
Concepts clés demandés en entretien :
1. Quality Gate (Porte de Qualité) : Un ensemble de conditions booléennes strictes qui bloque la mise en production si elles ne sont pas respectées (ex: Couverture de test < 80%, ou 1 vulnérabilité de sécurité).
2. Les 3 Catégories d'Issues :
   - Bugs : Erreurs probables de logique pouvant causer un NullPointerException ou une fuite de ressources.
   - Vulnérabilités : Failles de sécurité (injections SQL, mots de passe en dur, failles OWASP Top 10).
   - Code Smells : Mauvaises pratiques dégradant la maintenabilité (méthodes de 300 lignes, duplication de code).
3. Complexité Cyclomatique vs Complexité Cognitive :
   - Cyclomatique : Mesure le nombre de chemins d'exécution indépendants (calcul mathématique basé sur if, while, for).
   - Cognitive (inventée par Sonar) : Mesure l'effort mental qu'un humain doit fournir pour comprendre la méthode (pénalise l'imbrication profonde de boucles dans des conditions).`,
        keyTakeaway: 'Une Quality Gate SonarQube garantit qu\'aucun code dégradé ou non testé ne peut atteindre la branche principale de production.'
      }
    ],
    trapQuestion: {
      question: 'Avoir 100% de couverture de code (Code Coverage) garantit-il que l\'application est exempte de bugs ?',
      rookieAnswer: 'Oui, si chaque ligne de code est couverte par un test, il n\'y a plus de bug.',
      seniorAnswer: 'Absolument PAS. Une couverture de 100% signifie seulement que chaque ligne de code a été traversée lors de l\'exécution des tests. Elle ne garantit absolument pas que les assertions (`assert`) étaient pertinentes, ni que les cas limites (edge cases : null, nombres négatifs, concurrence, pannes réseau) ont été testés. On peut avoir 100% de couverture avec des tests sans aucune assertion ! C\'est pourquoi on complète la couverture par du Mutation Testing (avec des outils comme PIT / Pitest) pour tester la robustesse réelle de la suite de tests.',
      whyRecruiterAsks: 'Permet de voir si le candidat comprend la différence entre une métrique superficielle et la qualité logicielle effective.'
    }
  }
];

// -------------------------------------------------------------
// MODULE 4 : MICROSERVICES & ANGULAR
// -------------------------------------------------------------
export const microservicesAndAngularTopics: KnowledgeTopic[] = [
  {
    id: 'monolith-to-microservices',
    title: 'De l\'Architecture Monolithique vers les Microservices : Pourquoi et Comment',
    subtitle: 'Service Discovery (Eureka), API Gateway, Resilience4j, et Communication Kafka vs REST',
    category: 'microservices-angular',
    icon: 'GitBranch',
    badge: 'Microservices & Cloud',
    summary: 'Le passage aux microservices n\'est pas une mode, mais une réponse à des problèmes d\'échelle organisationnelle et technique. Maîtriser les composants Spring Cloud est un prérequis pour les postes en ESN et banques.',
    problemBefore: 'Une équipe de 50 développeurs travaille sur un seul gros projet Maven (Monolithe). Une modification mineure sur le module facturation casse le module catalogue. Tout déploiement nécessite d\'arrêter toute l\'entreprise la nuit pendant 4 heures. La base de données subit des blocages de tables.',
    solutionAfter: 'Découper le système en services autonomes alignés sur les domaines métiers (DDD Bounded Context), avec leur propre base de données, orchestrés par une API Gateway et un Service Registry, résilients aux pannes grâce à Circuit Breaker.',
    deepDive: [
      {
        sectionTitle: '1. Les Composants Vitaux de l\'Écosystème Spring Cloud',
        content: `1. Service Registry (Netflix Eureka / HashiCorp Consul) :
   - Annuaire dynamique des services. Chaque microservice s'enregistre au démarrage (\`eureka.client.serviceUrl\`) avec son nom et son IP/port.
   - Envoie un heartbeat toutes les 30s. Si un service crash, Eureka le retire de l'annuaire.
2. API Gateway (Spring Cloud Gateway) :
   - Point d'entrée unique pour les clients externes (Angular, Mobile).
   - Rôles : Routage dynamique vers les microservices via Eureka, validation des tokens JWT, Rate Limiting pour contrer les attaques DDoS, CORS centralisé.
3. Config Server (Spring Cloud Config) :
   - Centralise la configuration de tous les microservices dans un dépôt Git chiffré.
   - Permet de modifier la config à chaud avec \`@RefreshScope\` sans redémarrer les conteneurs.`,
        diagramAscii: `[Client Angular]
       |
       v
+-------------------------------+
|     SPRING CLOUD GATEWAY      | <---> [EUREKA SERVICE REGISTRY]
|  (Auth JWT, CORS, Rate Limit) |
+-------------------------------+
       |             |
       v             v
+-------------+ +-------------+
| User Service| | Order Serv. | <--- (Resilience4j Circuit Breaker)
+-------------+ +-------------+
       |             |
       v             v
 [DB Postgres]  [DB Postgres]  (Database-Per-Service)`,
        keyTakeaway: 'Le Gateway et Eureka permettent de masquer la topologie interne des microservices au client frontend.'
      },
      {
        sectionTitle: '2. Résilience avec Resilience4j : Le Pattern Circuit Breaker',
        content: `Si le microservice Paiement tombe en panne, que se passe-t-il pour le microservice Commande qui l'appelle via REST ?
Sans Circuit Breaker : Les threads de Commande attendent le timeout HTTP, s'accumulent, saturent le pool de threads Tomcat, et font crasher l'ensemble du système en cascade !
Avec Resilience4j Circuit Breaker :
- État CLOSED (Normal) : Toutes les requêtes passent.
- État OPEN (Disjoncté) : Si le taux d'échec dépasse le seuil (ex: 50%), le disjoncteur saute. Les requêtes suivantes échouent IMMÉDIATEMENT sans appeler le service en panne, et exécutent une méthode de secours (FALLBACK).
- État HALF-OPEN (Test de reprise) : Après un délai (ex: 10s), laisse passer quelques requêtes de test. Si elles réussissent, il repasse en CLOSED.`,
        codeSnippet: `@Service
public class OrderService {

    @CircuitBreaker(name = "paymentService", fallbackMethod = "paymentFallback")
    public PaymentResponse pay(Order order) {
        return paymentClient.process(order);
    }

    // Méthode de fallback appelée immédiatement si le paiement est down :
    public PaymentResponse paymentFallback(Order order, Throwable throwable) {
        log.warn("Paiement indisponible, mise en attente de la commande {}", order.getId());
        return new PaymentResponse(order.getId(), "EN_ATTENTE_DIFFÉREE");
    }
}`,
        keyTakeaway: 'Le Circuit Breaker protège votre système contre les pannes en cascade et préserve les ressources.'
      },
      {
        sectionTitle: '3. Transactions Distribuées : Pourquoi 2PC est Mort et Comment le Pattern Saga Résout le Problème',
        content: `Dans un monolithe, \`@Transactional\` gère la transaction ACID sur une seule base SQL.
En microservices, chaque service a sa propre base de données. Comment faire si la commande est créée dans Postgres A, mais que le paiement échoue dans Postgres B ?
- Le Two-Phase Commit (2PC) est abandonné : Il est bloquant sur le réseau et détruit les performances.
- La Solution moderne : Le Pattern SAGA.
  Une suite de transactions locales où chaque transaction met à jour la base de son service et émet un événement. Si une étape échoue, la saga exécute des TRANSACTIONS DE COMPENSATION pour annuler en sens inverse les étapes précédentes (ex: rembourser, débloquer le stock).
- Le Transactional Outbox Pattern :
  Pour éviter qu'un microservice écrive en base mais plante avant de publier son message dans Kafka, on écrit le message dans une table SQL 'outbox' dans la MÊME transaction locale. Un outil de Change Data Capture (Debezium CDC) lit le journal des transactions de la BDD et pousse le message de manière garantie dans Kafka.`,
        keyTakeaway: 'En microservices, la cohérence n\'est plus immédiate (ACID) mais éventuelle (Eventual Consistency) grâce aux sagas.'
      }
    ],
    trapQuestion: {
      question: 'Pourquoi ne doit-on JAMAIS partager une même base de données entre plusieurs microservices ?',
      rookieAnswer: 'Parce que ce n\'est pas joli en architecture.',
      seniorAnswer: 'Partager une base de données réintroduit le pire défaut du monolithe : le couplage fort au niveau du schéma. Si l\'équipe du service A modifie une table ou une colonne, elle risque de casser le service B sans le savoir. De plus, cela crée des verrous de concurrence en base, empêche d\'adapter la technologie de stockage aux besoins de chaque service (ex: Mongo pour le catalogue, Postgres pour la facturation), et interdit le scaling indépendant. La règle d\'or des microservices est : Database-Per-Service.',
      whyRecruiterAsks: 'Vérifie si le candidat a compris les fondements du découpage en microservices.'
    }
  },
  {
    id: 'angular-spring-integration',
    title: 'Intégration Frontend Angular Moderne avec Backend Spring Boot',
    subtitle: 'Standalone Components, Signals réactifs, HttpInterceptor JWT, et Résolution de l\'Erreur CORS',
    category: 'microservices-angular',
    icon: 'Code',
    badge: 'Angular 17/18 & REST API',
    summary: 'Au Maroc, le combo Java/Spring Boot + Angular est la pile la plus demandée dans les banques (SG ATS, CIH, Attijari) et les ESNs (Capgemini, CGI). Comprendre leur communication et sécurisation est indispensable.',
    problemBefore: 'L\'ingénieur backend expose ses endpoints sans configurer les en-têtes CORS, provoquant des blocages dans le navigateur du client Angular. Côté frontend, chaque service injecte manuellement le token JWT dans chaque requête HTTP, créant une duplication de code fragile.',
    solutionAfter: 'Configurer les autorisations CORS au niveau de l\'API Gateway ou de Spring Security, et utiliser un `HttpInterceptor` Angular pour injecter automatiquement le token Bearer JWT et gérer les erreurs 401 Unauthorized.',
    deepDive: [
      {
        sectionTitle: '1. Comprendre et Corriger Définitivement l\'Erreur CORS',
        content: `Qu'est-ce que l'erreur CORS (Cross-Origin Resource Sharing) ?
C'est une sécurité intégrée au NAVIGATEUR (et non au serveur !). Si votre application Angular tourne sur http://localhost:4200 et que votre API Spring Boot tourne sur http://localhost:8080, le navigateur bloque la lecture de la réponse car les origines (port ou domaine) diffèrent.
Le navigateur envoie d'abord une requête HTTP OPTIONS (Pre-flight request) pour demander au serveur s'il autorise cette origine.
La bonne correction côté Spring Boot :
Ne pas mettre \`@CrossOrigin\` partout de manière brouillonne, mais définir une configuration centralisée :`,
        codeSnippet: `@Configuration
public class WebSecurityConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:4200", "https://app.entreprise.ma"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}`,
        keyTakeaway: 'Le CORS est validé par le navigateur via une requête pre-flight OPTIONS qui doit être autorisée par Spring Security.'
      },
      {
        sectionTitle: '2. L\'HttpInterceptor Angular pour l\'Authentification JWT',
        content: `Au lieu d'ajouter l'en-tête \`Authorization: Bearer <token>\` dans chaque appel HTTP de chaque composant, on utilise un intercepteur fonctionnel moderne (Angular 15+) :`,
        codeSnippet: `// auth.interceptor.ts (Angular moderne Standalone) :
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', \`Bearer \${token}\`)
    });
    return next(authReq);
  }

  return next(req);
};`,
        keyTakeaway: 'L\'intercepteur clone la requête et injecte le token de manière transparente et centralisée.'
      },
      {
        sectionTitle: '3. Angular Moderne : Signals vs RxJS Observables',
        content: `- RxJS Observables : Idéal pour les flux asynchrones d'événements, les requêtes HTTP \`HttpClient\`, les websockets, les debounceTime sur les barres de recherche.
- Signals (depuis Angular 16) : Nouvelle primitive de réactivité synchrone. Plus besoin d'astuces avec Zone.js pour la détection de changement ! Un Signal notifie directement les éléments du DOM qui doivent être rafraîchis.
En 2025/2026, l'architecture recommandée utilise RxJS pour le transport de données (\`HttpClient\`) et convertit les flux en Signals dans les composants avec \`toSignal()\`.`,
        keyTakeaway: 'Combiner RxJS pour les flux réseau et Signals pour l\'état d\'affichage des composants.'
      }
    ],
    trapQuestion: {
      question: 'Pourquoi l\'erreur CORS n\'apparaît-elle jamais quand on teste l\'API avec Postman ou cURL, mais apparaît sur le navigateur avec Angular ?',
      rookieAnswer: 'Parce que Postman a un plugin spécial qui contourne la sécurité du serveur.',
      seniorAnswer: 'Parce que la politique de sécurité Same-Origin et CORS est implémentée EXCLUSIVEMENT par les moteurs de navigateurs Web (Chrome, Firefox, Safari) pour protéger les utilisateurs finaux contre les attaques CSRF et les vols de session. Postman, cURL ou un autre microservice backend ne sont pas des navigateurs : ils ignorent totalement les restrictions CORS et exécutent la requête HTTP directement.',
      whyRecruiterAsks: 'Permet de voir si le candidat a une réelle compréhension des couches réseau et des modèles de sécurité web.'
    }
  }
];

// -------------------------------------------------------------
// MODULE 5 : MOROCCAN PFE RECRUITMENT & TECH ECOSYSTEM
// -------------------------------------------------------------
export const moroccanPfeCompanies: PfeCompanyInfo[] = [
  {
    name: 'Capgemini Engineering & Cloud (Maroc)',
    city: 'Casablanca / Rabat / Salé',
    hub: 'Casanearshore (Sidi Maârouf) & Technopolis Rabat',
    hiringScope: 'Leader absolu en volume de recrutement PFE au Maroc. Recrute chaque année plus de 250 stagiaires ingénieurs Bac+5 en Développement Digital, Java/Spring Boot, Angular et Cloud AWS/Azure.',
    salaryPfe: '3 500 à 5 000 DH net / mois (Gratification stage)',
    salaryJuniorCdi: '11 000 à 13 500 DH net / mois en pré-embauche CDI',
    requiredSkills: [
      'Java 17/21 & POO approfondie',
      'Spring Boot (REST API, Spring Data JPA, Spring Security)',
      'Angular (v14 à v18) ou React',
      'Bases SQL (PostgreSQL, Oracle)',
      'Git & Notions de CI/CD (GitLab, Docker)'
    ],
    selectionSteps: [
      '1. Filtrage CV & Dépôt sur portail Carrières Capgemini',
      '2. Test Technique en ligne CodinGame (QCM Java + 1 exercice algo sous contrainte de temps)',
      '3. Entretien RH (Validation de la personnalité, communication en français & anglais, motivation PFE)',
      '4. Entretien Technique avec un Lead Tech (Revue du test CodinGame, questions pièges Spring Boot, architecture)'
    ],
    insiderAdvice: 'À l\'entretien technique Capgemini, montrez que vous connaissez les tests unitaires (JUnit/Mockito). La grande majorité des étudiants ne savent pas écrire un test : si vous expliquez Testcontainers et Mockito, vous passez immédiatement en tête de liste.'
  },
  {
    name: 'Oracle MDC (Morocco Development Center)',
    city: 'Casablanca',
    hub: 'Casanearshore (Bâtiment Shore 14)',
    hiringScope: 'Centre de R&D mondial d\'Oracle Corporation. Travaille sur les cœurs de produits stratégiques : Oracle Cloud Infrastructure (OCI), Java Platform Group, MySQL Cloud, et solutions d\'intelligence artificielle.',
    salaryPfe: '6 000 à 8 500 DH net / mois (La plus haute gratification PFE au Maroc)',
    salaryJuniorCdi: '15 000 à 19 000 DH net / mois + RSU (Actions Oracle en Bourse US) + Complémentaire santé premium',
    requiredSkills: [
      'Maîtrise absolue du Core Java & Internals JVM (Stack/Heap, Concurrence, Garbage Collection)',
      'Algorithmique & Structures de Données (Arbres, Graphes, Complexité O(N))',
      'Systèmes Distribués & Réseau (TCP/IP, HTTP/2, Concurrence multi-thread)',
      'Linux & scripting bas niveau',
      'Anglais courant obligatoire (équipes globales aux USA et Europe)'
    ],
    selectionSteps: [
      '1. Screening CV par l\'équipe Talent Acquisition',
      '2. Épreuve de Coding en ligne (Format LeetCode Medium sur HackerRank)',
      '3. Round 1 Technique : Structures de données, algorithmes et complexité en direct',
      '4. Round 2 Technique : System Design & internals Java avec des Senior Principal Engineers',
      '5. Entretien Managérial (Culture fit & leadership principles)'
    ],
    insiderAdvice: 'Chez Oracle MDC, ne venez pas juste en disant "je sais utiliser une annotation Spring Boot". Ils veulent comprendre comment fonctionne la JVM sous le capot, comment optimiser l\'utilisation mémoire de la RAM et comment vous gérez la concurrence multi-thread sans deadlock.'
  },
  {
    name: 'Société Générale GSC / SG ATS (Casablanca)',
    city: 'Casablanca',
    hub: 'Casanearshore & Sidi Maârouf',
    hiringScope: 'Filiale technologique de la banque Société Générale pour les activités de marché, banque de financement et d\'investissement (BFI). Forte culture de rigueur logicielle bancaire et Craftsmanship.',
    salaryPfe: '4 000 à 6 000 DH net / mois',
    salaryJuniorCdi: '12 500 à 15 500 DH net / mois',
    requiredSkills: [
      'Java moderne & Spring Boot',
      'Craftsmanship : Clean Code, TDD, DDD (Domain-Driven Design), Refactoring',
      'Architecture Microservices & Messaging (Apache Kafka)',
      'Docker, Kubernetes, Jenkins CI/CD',
      'Sensibilité aux problématiques de conformité et de sécurité financière'
    ],
    selectionSteps: [
      '1. Présélection CV sur la plateforme Société Générale Carrières',
      '2. Test technique en ligne (Plateforme d\'évaluation algorithmique et logique)',
      '3. Entretien d\'évaluation technique avec un Tech Lead (Live Coding ou analyse de code legacy)',
      '4. Entretien RH final'
    ],
    insiderAdvice: 'SG ATS valorise énormément les principes SOLID, le TDD et la clarté du code. Si vous mentionnez SonarQube, les transactions distribuées (Saga) et la traçabilité des logs, vous correspondez exactement à leur profil cible.'
  },
  {
    name: 'CGI Maroc',
    city: 'Casablanca / Rabat / Fès',
    hub: 'Rabat Madinat Al Irfane, CasaNearshore & Fès Shore',
    hiringScope: 'Multinationale canadienne de conseil et de services en technologies. Très forte présence institutionnelle au Maroc, partenaires des ministères et grandes institutions bancaires européennes.',
    salaryPfe: '3 500 à 4 500 DH net / mois',
    salaryJuniorCdi: '10 500 à 13 000 DH net / mois',
    requiredSkills: [
      'Java / J2EE / Spring Framework',
      'Angular ou React',
      'Bases de données SQL complexes (PL/SQL, requêtes optimisées)',
      'Méthodologie Agile / Scrum'
    ],
    selectionSteps: [
      '1. Dépôt de candidature & Job fairs universitaires (EMI, ENSIAS, INPT, ENSA)',
      '2. Test technique écrit ou QCM en ligne',
      '3. Entretien technique avec un chef de projet',
      '4. Validation RH'
    ],
    insiderAdvice: 'CGI cherche des ingénieurs rigoureux, capables de s\'intégrer rapidement dans des projets d\'envergure avec des clients français ou canadiens. Mettez en avant vos capacités de communication et votre travail d\'équipe.'
  },
  {
    name: 'ALTEN Maroc',
    city: 'Fès / Rabat / Casablanca',
    hub: 'Fès Shore, Technopolis Rabat & Casanearshore',
    hiringScope: 'Acteur mondial de l\'ingénierie et du conseil en technologies. Forts départements de développement logiciel automobile, télécoms et digital banking.',
    salaryPfe: '3 000 à 4 500 DH net / mois',
    salaryJuniorCdi: '9 500 à 12 500 DH net / mois',
    requiredSkills: [
      'Java 11/17 & Spring Boot',
      'Angular / Typescript',
      'REST APIs & Architecture MVC',
      'Git, Maven, Jenkins'
    ],
    selectionSteps: [
      '1. Entretien RH téléphonique de préqualification',
      '2. Test technique en ligne (QCM logique & Java)',
      '3. Entretien technique avec un Manager Technique'
    ],
    insiderAdvice: 'ALTEN est une excellente école pour démarrer sa carrière. Préparez bien les fondamentaux de la programmation orientée objet (Polymorphisme, Héritage, Encapsulation).'
  },
  {
    name: 'Sofrecom Maroc (Groupe Orange)',
    city: 'Rabat / Casablanca',
    hub: 'Rabat Technopolis & Casanearshore',
    hiringScope: 'Filiale stratégique du groupe Orange. Conçoit les plateformes digitales, applications télécoms et systèmes de facturation du groupe à l\'international.',
    salaryPfe: '4 000 à 5 500 DH net / mois',
    salaryJuniorCdi: '11 500 à 14 000 DH net / mois',
    requiredSkills: [
      'Java / Spring Cloud Microservices',
      'Angular / React moderne',
      'Docker, Kubernetes, OpenShift',
      'Bon niveau de communication en français et anglais'
    ],
    selectionSteps: [
      '1. Dépôt de candidature Orange Jobs',
      '2. Test d\'évaluation technique en ligne',
      '3. Entretien avec un Scrum Master / Lead Dev',
      '4. Entretien RH'
    ],
    insiderAdvice: 'Sofrecom a une très forte culture agile et collaborative. Insistez sur votre compréhension du cycle DevOps et des microservices Spring Cloud.'
  },
  {
    name: 'Inetum Maroc (Ex-Gfi)',
    city: 'Casablanca / Rabat',
    hub: 'Casablanca Sidi Maârouf & Technopolis',
    hiringScope: 'Entreprise de services numériques internationale présente dans plus de 27 pays. Grands projets pour le secteur public marocain et les banques.',
    salaryPfe: '3 500 à 4 500 DH net / mois',
    salaryJuniorCdi: '10 000 à 12 500 DH net / mois',
    requiredSkills: [
      'Java / JEE, Spring Boot',
      'Angular, PrimeNG',
      'SQL Server, PostgreSQL',
      'UML et conception fonctionnelle'
    ],
    selectionSteps: [
      '1. Screening RH',
      '2. Entretien technique avec un architecte applicatif',
      '3. Validation finale'
    ],
    insiderAdvice: 'Montrez votre rigueur dans la modélisation UML et la transformation d\'un besoin métier en code propre et documenté.'
  },
  {
    name: 'Cnexia (Filiale Altice / SFR)',
    city: 'Fès / Rabat',
    hub: 'Fès Shore & Technopolis',
    hiringScope: 'Hub technologique dédié au groupe SFR / Altice. Développement des solutions internes et portails clients télécoms à fort trafic.',
    salaryPfe: '3 500 à 5 000 DH net / mois',
    salaryJuniorCdi: '11 000 à 13 500 DH net / mois',
    requiredSkills: [
      'Java 17, Spring Boot, Spring Batch',
      'Angular / Vue.js',
      'Bases NoSQL (MongoDB) et relationnelles',
      'Kafka / RabbitMQ'
    ],
    selectionSteps: [
      '1. Contact RH & Test en ligne',
      '2. Entretien technique approfondi',
      '3. Entretien managérial'
    ],
    insiderAdvice: 'Préparez les notions de traitement par lots (Spring Batch) et de scalabilité sous forte volumétrie de données.'
  },
  {
    name: 'SQLI Maroc',
    city: 'Rabat / Casablanca / Oujda',
    hub: 'Rabat Madinat Al Irfane, Casanearshore & Technopole Oujda',
    hiringScope: 'Agence européenne leader dans l\'e-commerce et la transformation digitale (Adobe, commerces connectés, plateformes Java).',
    salaryPfe: '3 500 à 4 500 DH net / mois',
    salaryJuniorCdi: '10 500 à 13 000 DH net / mois',
    requiredSkills: [
      'Java / Spring Boot',
      'E-commerce & REST APIs',
      'React ou Angular',
      'Design Patterns (Factory, Strategy, Observer)'
    ],
    selectionSteps: [
      '1. Test d\'évaluation en ligne (CodinGame)',
      '2. Entretien technique avec un Lead Developer',
      '3. Entretien de fit culturel'
    ],
    insiderAdvice: 'SQLI accorde une grande importance à la curiosité technique et à la veille technologique. Citez vos projets personnels sur GitHub.'
  },
  {
    name: 'Devoteam Maroc',
    city: 'Casablanca',
    hub: 'Casablanca Nearshore & Maarif',
    hiringScope: 'Cabinet de conseil en stratégie digitale, plateformes Cloud et cybersécurité. Partenaire majeur d\'AWS, Microsoft et Google Cloud.',
    salaryPfe: '4 000 à 5 500 DH net / mois',
    salaryJuniorCdi: '12 000 à 14 500 DH net / mois',
    requiredSkills: [
      'Java / Spring Boot orienté Cloud',
      'AWS ou Azure (notions de déploiement)',
      'Conteneurs Docker & Kubernetes',
      'Terraform / CI/CD'
    ],
    selectionSteps: [
      '1. Entretien RH',
      '2. Entretien technique System Design & Cloud',
      '3. Entretien Partner / Directeur d\'agence'
    ],
    insiderAdvice: 'Avoir une petite certification Cloud (AWS Certified Cloud Practitioner ou Azure Fundamentals) vous garantit une offre immédiate.'
  },
  {
    name: 'CIH Bank Digital Factory',
    city: 'Casablanca',
    hub: 'Boulevard Hassan II & Sidi Maârouf',
    hiringScope: 'La banque marocaine pionnière du digital banking. Développe en interne ses applications mobiles et plateformes de paiement instantané.',
    salaryPfe: '4 500 à 6 000 DH net / mois',
    salaryJuniorCdi: '13 000 à 16 000 DH net / mois',
    requiredSkills: [
      'Spring Boot & Microservices bancaires',
      'Angular / Flutter pour le mobile',
      'Sécurité applicative (OAuth2, OIDC, JWT, PKCE)',
      'Haute disponibilité & résilience'
    ],
    selectionSteps: [
      '1. Dépôt sur portail CIH Carrières',
      '2. Épreuve technique de code ou QCM',
      '3. Entretien avec l\'équipe Digital Factory',
      '4. Validation par la DRH Groupe'
    ],
    insiderAdvice: 'Insistez sur la sécurité des transactions et la gestion des exceptions sans fuite d\'informations sensibles dans les logs.'
  },
  {
    name: 'Attijariwafa Bank Tech Factory',
    city: 'Casablanca',
    hub: 'Boulevard Moulay Youssef & Marina Casablanca',
    hiringScope: 'Premier groupe bancaire et financier du Maghreb. Modernisation massive du SI vers le Cloud hybride et les microservices d\'envergure panafricaine.',
    salaryPfe: '4 500 à 6 500 DH net / mois',
    salaryJuniorCdi: '13 500 à 16 500 DH net / mois',
    requiredSkills: [
      'Java 17 / Spring Cloud',
      'Architecture Event-Driven (Apache Kafka)',
      'Conteneurs Kubernetes / Rancher',
      'Bases de données SQL critiques'
    ],
    selectionSteps: [
      '1. Présélection CV',
      '2. Test technique en ligne',
      '3. Panel technique avec des architectes du groupe',
      '4. Entretien RH exécutif'
    ],
    insiderAdvice: 'La culture Attijariwafa valorise la vision d\'ensemble, la rigueur méthodologique et la capacité à travailler sur des SI volumineux.'
  },
  {
    name: 'Bank of Africa (BOA) / Eurafric Information',
    city: 'Casablanca',
    hub: 'Casablanca Finance City (CFC) & Bouskoura',
    hiringScope: 'Filiale informatique commune de Bank of Africa et RMA. Gère les cœurs bancaires et les canaux digitaux dans plus de 20 pays en Afrique et Europe.',
    salaryPfe: '4 000 à 5 500 DH net / mois',
    salaryJuniorCdi: '12 500 à 15 000 DH net / mois',
    requiredSkills: [
      'Java / Spring Boot',
      'APIs RESTful & Web Services SOAP legacy',
      'Oracle Database / PL-SQL poussé',
      'Mécanismes de batch bancaire'
    ],
    selectionSteps: [
      '1. Entretien RH',
      '2. Test technique en présentiel ou en ligne',
      '3. Entretien avec un Directeur Technique de pôle'
    ],
    insiderAdvice: 'Une solide compréhension des transactions financières ACID et de l\'intégration avec des bases Oracle est un grand atout.'
  },
  {
    name: 'DXC Technology Maroc',
    city: 'Rabat / Salé',
    hub: 'Technopolis Rabat',
    hiringScope: 'Géant américain des services informatiques (issu de la fusion CSC et HP Enterprise). Projets mondiaux en infogérance et transformation applicative.',
    salaryPfe: '3 500 à 4 500 DH net / mois',
    salaryJuniorCdi: '10 500 à 13 000 DH net / mois',
    requiredSkills: [
      'Java / Spring, Microservices',
      'Angular ou React',
      'Pratiques Agile et DevOps (GitLab CI)',
      'Bon niveau d\'anglais technique'
    ],
    selectionSteps: [
      '1. Test en ligne (Langues & Technique)',
      '2. Entretien technique avec un Team Lead',
      '3. Validation managériale'
    ],
    insiderAdvice: 'Le niveau d\'anglais est évalué chez DXC : entraînez-vous à présenter votre projet PFE en anglais pendant 2 minutes.'
  }
];


// -------------------------------------------------------------
// MODULE 6 : 1-MONTH INTENSIVE ROADMAP (ROADMAP 4 SEMAINES)
// -------------------------------------------------------------
export const oneMonthRoadmap: RoadmapWeekPlan[] = [
  {
    weekNumber: 1,
    title: 'Semaine 1 : Fondamentaux Java, Mémoire RAM & Internals JVM',
    focus: 'Devenir incollable sur la mémoire vive, la compilation, les collections et le multithreading.',
    dailySchedule: [
      {
        day: 'Jour 1 & 2',
        goal: 'Mémoire RAM & JVM',
        tasks: [
          'Maîtriser la différence Stack vs Heap et les tailles des types primitifs',
          'Comprendre l\'Escape Analysis et l\'alignement d\'objets sur 8 octets',
          'Étudier le cycle de compilation : javac -> Bytecode -> ClassLoader -> Tiered JIT'
        ]
      },
      {
        day: 'Jour 3 & 4',
        goal: 'Collections & Algorithmes Clés',
        tasks: [
          'Fonctionnement interne de HashMap : collisions de hash, linked list -> Red-Black Tree en Java 8',
          'Différence equals() et hashCode() : pourquoi violer le contrat détruit les Sets et Maps',
          'ArrayList vs LinkedList : pourquoi LinkedList est quasiment toujours plus lente en pratique à cause du cache CPU'
        ]
      },
      {
        day: 'Jour 5 & 6',
        goal: 'Garbage Collector & Nouveautés Java 8 à 21',
        tasks: [
          'Hypothèse générationnelle, Minor/Major GC, G1 GC vs ZGC',
          'Lambdas, Streams API, Records, Sealed Classes, Pattern Matching',
          'Introduction aux Virtual Threads de Java 21 (Projet Loom)'
        ]
      },
      {
        day: 'Jour 7',
        goal: 'Épreuve Pratique CodinGame',
        tasks: [
          'Résoudre 5 défis de manipulation de chaînes et d\'arbres',
          'S\'entraîner à gérer les edge cases : listes vides, nulls, grands tableaux'
        ]
      }
    ],
    codingGameChallenge: {
      title: 'Trouver la première lettre non répétée dans un flux de texte',
      difficulty: 'Moyen',
      description: 'Écrire une méthode en O(N) de temps qui retourne le premier caractère n\'apparaissant qu\'une seule fois dans la chaîne en entrée. Retourner un Optional<Character>.',
      starterCode: `public static Optional<Character> firstNonRepeatingChar(String input) {
    // TODO: Implémenter en O(N) de temps sans double boucle imbriquée !
    return Optional.empty();
}`,
      solutionCode: `public static Optional<Character> firstNonRepeatingChar(String input) {
    if (input == null || input.isEmpty()) return Optional.empty();
    
    // LinkedHashMap préserve l'ordre d'insertion des caractères !
    Map<Character, Integer> counts = new LinkedHashMap<>();
    for (char c : input.toCharArray()) {
        counts.put(c, counts.getOrDefault(c, 0) + 1);
    }
    
    return counts.entrySet().stream()
        .filter(entry -> entry.getValue() == 1)
        .map(Map.Entry::getKey)
        .findFirst();
}`,
      timeLimitMinutes: 20
    }
  },
  {
    weekNumber: 2,
    title: 'Semaine 2 : Spring Boot, IoC, Proxies & JPA / Hibernate',
    focus: 'Comprendre ce qui se passe sous le capot du framework pour désamorcer les questions pièges.',
    dailySchedule: [
      {
        day: 'Jour 8 & 9',
        goal: 'Conteneur IoC & Cycle de Vie des Beans',
        tasks: [
          'Apprendre les 8 étapes du cycle de vie d\'un Bean Spring',
          'Pourquoi l\'injection par constructeur est supérieure à @Autowired sur champ',
          'Gérer le problème de l\'injection d\'un Bean Prototype dans un Singleton'
        ]
      },
      {
        day: 'Jour 10 & 11',
        goal: 'Mécanique de @Transactional & Proxies AOP',
        tasks: [
          'Comprendre le piège de la self-invocation et la délégation par proxy dynamique',
          'Règles de rollback (Unchecked vs Checked avec rollbackFor = Exception.class)',
          'Niveaux de propagation : REQUIRED vs REQUIRES_NEW'
        ]
      },
      {
        day: 'Jour 12 & 13',
        goal: 'JPA & Hibernate Haute Performance',
        tasks: [
          'Résoudre le problème N+1 avec JOIN FETCH et EntityGraph',
          'Différence FetchType.LAZY vs EAGER et LazyInitializationException',
          'Verrouillage Optimiste (@Version) vs Pessimiste (PESSIMISTIC_WRITE)'
        ]
      },
      {
        day: 'Jour 14',
        goal: 'Quiz Technique Blanc',
        tasks: [
          'Passer le grand QCM Spring Boot & JPA (30 questions chronométrées)'
        ]
      }
    ],
    codingGameChallenge: {
      title: 'Sécuriser une transaction bancaire avec détection de solde négatif',
      difficulty: 'Moyen',
      description: 'Implémenter le transfert d\'argent avec gestion des verrous et rollback en cas de solde insuffisant.',
      starterCode: `@Service
public class CompteService {
    // TODO: Définir l'annotation et la logique pour garantir l'atomicité
    public void transferer(Long sourceId, Long destId, BigDecimal montant) {
    }
}`,
      solutionCode: `@Service
public class CompteService {
    private final CompteRepository compteRepository;

    public CompteService(CompteRepository compteRepository) {
        this.compteRepository = compteRepository;
    }

    @Transactional(rollbackFor = Exception.class, isolation = Isolation.READ_COMMITTED)
    public void transferer(Long sourceId, Long destId, BigDecimal montant) {
        Compte source = compteRepository.findById(sourceId)
            .orElseThrow(() -> new EntityNotFoundException("Compte source inexistant"));
        Compte dest = compteRepository.findById(destId)
            .orElseThrow(() -> new EntityNotFoundException("Compte destination inexistant"));

        if (source.getSolde().compareTo(montant) < 0) {
            throw new InsufficientBalanceException("Solde insuffisant pour le virement");
        }

        source.debiter(montant);
        dest.crediter(montant);
        // Hibernate exécute le Dirty Checking au commit de la transaction
    }
}`,
      timeLimitMinutes: 25
    }
  },
  {
    weekNumber: 3,
    title: 'Semaine 3 : Microservices, Tests Avancés & DevOps (Testcontainers, SonarQube)',
    focus: 'Montrer une expertise de niveau ingénieur d\'État sur la chaîne de livraison logicielle.',
    dailySchedule: [
      {
        day: 'Jour 15 & 16',
        goal: 'Tests Unitaires & Mockito',
        tasks: [
          'Écrire des tests JUnit 5 avec @ParameterizedTest et @CsvSource',
          'Maîtriser Mockito : @Mock, @InjectMocks, verify(), ArgumentCaptor',
          'Comprendre pourquoi 100% de couverture de code ne garantit pas zéro bug'
        ]
      },
      {
        day: 'Jour 17 & 18',
        goal: 'Testcontainers & Tests d\'Intégration Réels',
        tasks: [
          'Expliquer pourquoi la base mémoire H2 est un piège en intégration',
          'Configurer un conteneur PostgreSQL avec @Testcontainers et @Container',
          'Comprendre SonarQube : Quality Gates, Code Smells, Bugs, Complexité Cognitive'
        ]
      },
      {
        day: 'Jour 19 & 20',
        goal: 'Architecture Microservices & Résilience',
        tasks: [
          'Comprendre Eureka Service Registry et Spring Cloud Gateway',
          'Implémenter le Circuit Breaker Resilience4j avec méthode Fallback',
          'Pattern Saga & Transactional Outbox Pattern avec Kafka'
        ]
      },
      {
        day: 'Jour 21',
        goal: 'Architecture Frontend Angular',
        tasks: [
          'Comprendre l\'erreur CORS et la configurer proprement dans Spring Security',
          'Créer un HttpInterceptor Angular pour injecter le token Bearer JWT'
        ]
      }
    ],
    codingGameChallenge: {
      title: 'Écrire un test unitaire Mockito avec vérification d\'appels stricts',
      difficulty: 'Moyen',
      description: 'Tester un service d\'envoi de notification en s\'assurant que le mail n\'est envoyé qu\'une seule fois et que le repository sauvegarde l\'état.',
      starterCode: `@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {
    // TODO: Écrire le test avec vérification Mockito
}`,
      solutionCode: `@ExtendWith(MockitoExtension.class)
class NotificationServiceTest {

    @Mock
    private MailClient mailClient;

    @Mock
    private AuditRepository auditRepository;

    @InjectMocks
    private NotificationService notificationService;

    @Test
    void shouldSendEmailAndLogAudit() {
        notificationService.notifyUser("test@gmail.com", "Bienvenue");

        // Vérifie que le mail a été envoyé exactement 1 fois :
        verify(mailClient, times(1)).send(eq("test@gmail.com"), anyString());
        // Vérifie que l'audit a bien été enregistré :
        verify(auditRepository, times(1)).save(any(AuditRecord.class));
    }
}`,
      timeLimitMinutes: 20
    }
  },
  {
    weekNumber: 4,
    title: 'Semaine 4 : Simulations d\'Entretiens, Tests Coding Games & Pitch PFE',
    focus: 'Convertir vos connaissances en offres d\'embauche et réussir la négociation de stage/CDI.',
    dailySchedule: [
      {
        day: 'Jour 22 & 23',
        goal: 'Entraînement Intensif CodinGame & Algorithmes',
        tasks: [
          'Passer 4 tests blancs chronométrés de 45 minutes sur plateforme en ligne',
          'S\'entraîner à gérer le stress du compte à rebours et optimiser la complexité O(N)'
        ]
      },
      {
        day: 'Jour 24 & 25',
        goal: 'Les 20 Questions Pièges d\'Entretien',
        tasks: [
          'Réviser les 20 questions pièges des Lead Techs marocains et internationaux',
          'Formuler les réponses à voix haute en utilisant le vocabulaire technique précis'
        ]
      },
      {
        day: 'Jour 26 & 27',
        goal: 'Pitch Projet PFE en 3 Minutes & Soft Skills',
        tasks: [
          'Structurer son pitch PFE selon la méthode STAR (Situation, Tâche, Action, Résultat)',
          'Préparer les réponses aux questions RH : défauts, gestion des conflits, pourquoi notre entreprise'
        ]
      },
      {
        day: 'Jour 28',
        goal: 'Jour J : Prêt pour le Recrutement',
        tasks: [
          'Revue finale des fiches Cheat Sheet',
          'Confiance absolue : vous êtes mieux préparé que 95% des candidats du marché'
        ]
      }
    ],
    codingGameChallenge: {
      title: 'Détection d\'Anomalie dans une Suite de Transactions (Style CodinGame Bancaire)',
      difficulty: 'Expert',
      description: 'Identifier les identifiants de transactions qui dépassent le seuil de 10 000 DH dans une fenêtre glissante de 5 minutes pour un même utilisateur.',
      starterCode: `public static List<String> detectFrauds(List<Transaction> transactions) {
    // TODO: Retourner les IDs des transactions suspectes
    return List.of();
}`,
      solutionCode: `public static List<String> detectFrauds(List<Transaction> transactions) {
    if (transactions == null || transactions.isEmpty()) return List.of();

    // Regrouper par utilisateur
    Map<String, List<Transaction>> byUser = transactions.stream()
        .collect(Collectors.groupingBy(Transaction::getUserId));

    List<String> fraudIds = new ArrayList<>();

    for (List<Transaction> userTx : byUser.values()) {
        userTx.sort(Comparator.comparing(Transaction::getTimestamp));
        for (int i = 0; i < userTx.size(); i++) {
            Transaction current = userTx.get(i);
            BigDecimal totalWindow = current.getAmount();

            for (int j = i + 1; j < userTx.size(); j++) {
                Transaction next = userTx.get(j);
                long diffMinutes = Duration.between(current.getTimestamp(), next.getTimestamp()).toMinutes();
                if (diffMinutes <= 5) {
                    totalWindow = totalWindow.add(next.getAmount());
                } else {
                    break;
                }
            }

            if (totalWindow.compareTo(new BigDecimal("10000")) > 0) {
                fraudIds.add(current.getId());
            }
        }
    }
    return fraudIds;
}`,
      timeLimitMinutes: 30
    }
  }
];

// -------------------------------------------------------------
// MODULE 7 : TOP 20 TRAP QUESTIONS FOR TECH INTERVIEWS
// -------------------------------------------------------------
export const topTrapQuestions: TrapQuestionItem[] = [
  {
    id: 'trap-1',
    topic: 'Java Core',
    question: 'Quelle est la différence entre == et .equals() en Java ?',
    companyTarget: 'Capgemini / CGI / SG ATS',
    difficulty: 'Junior',
    theTrap: 'Penser que .equals() compare toujours le contenu des objets par défaut.',
    rookieMistake: 'Dire que "==" compare les primitifs et ".equals()" compare les objets.',
    seniorModelAnswer: 'En Java, `==` compare TOUJOURS la valeur brute stockée dans les variables. Pour deux primitifs (ex: `int a == b`), il compare leurs nombres. Pour deux objets, il compare leurs ADRESSES MÉMOIRES (références). Par défaut, l\'implémentation de `.equals()` dans la classe `Object` est simplement `return (this == obj);` ! Elle ne compare le contenu métier QUE si la classe a explicitement redéfini la méthode `equals()` (comme le font `String`, `Integer` ou les records). Si vous créez une classe `User` sans redéfinir `equals()`, deux instances distinctes avec le même nom renverront `false` avec `.equals()`.',
    codeIllustration: `User u1 = new User("Moad");
User u2 = new User("Moad");
System.out.println(u1 == u2);      // false (adresses mémoires distinctes sur le Heap)
System.out.println(u1.equals(u2));  // false si equals() n'est pas redéfini dans User !
                                    // true uniquement si equals() compare le nom.`,
    goldenRule: 'Toujours redéfinir equals() ET hashCode() ensemble si la classe est utilisée dans des collections (Set, Map).'
  },
  {
    id: 'trap-2',
    topic: 'Java Collections',
    question: 'Que se passe-t-il si vous redéfinissez equals() mais OUBLIEZ de redéfinir hashCode() ?',
    companyTarget: 'Oracle MDC / SG ATS',
    difficulty: 'Confirmé',
    theTrap: 'Ne pas comprendre l\'impact sur les structures de données basées sur le hachage (HashMap, HashSet).',
    rookieMistake: 'Dire que le code compile et fonctionne quand même sans problème.',
    seniorModelAnswer: 'C\'est une violation grave du contrat Java `equals/hashCode`. Le contrat stipule que si deux objets sont égaux selon `equals()`, ils DOIVENT obligatoirement avoir le même `hashCode()`. Si vous oubliez de redéfinir `hashCode()`, deux objets équivalents auront des hashCodes différents générés par la JVM basée sur leur adresse mémoire. Conséquence catastrophique : si vous insérez `u1` dans un `HashSet` ou une `HashMap`, puis cherchez avec `u2` (qui a les mêmes données), la table de hachage cherchera dans un "bucket" différent et renverra `false` ou `null` ! Votre HashSet contiendra des doublons.',
    codeIllustration: `Set<User> set = new HashSet<>();
set.add(new User("Moad"));
// Si hashCode() n'est pas redéfini :
System.out.println(set.contains(new User("Moad"))); // Affiche FALSE ! Bug critique !`,
    goldenRule: 'Si a.equals(b) == true, alors a.hashCode() DOIT être égal à b.hashCode().'
  },
  {
    id: 'trap-3',
    topic: 'Spring AOP',
    question: 'Si une méthode publique appelle une autre méthode @Transactional de la même classe, la transaction fonctionne-t-elle ?',
    companyTarget: 'Capgemini / Oracle MDC / Inetum',
    difficulty: 'Senior',
    theTrap: 'Le piège de la Self-Invocation dans les proxies Spring.',
    rookieMistake: 'Répondre "Oui bien sûr, l\'annotation est présente sur la méthode".',
    seniorModelAnswer: 'NON, la transaction ne fonctionnera pas ! Spring gère les transactions via des Proxies AOP qui enveloppent le Bean. Lorsqu\'un appel provient de l\'extérieur (ex: Controller HTTP), il frappe le Proxy qui démarre la transaction. Mais lorsqu\'une méthode de la classe appelle directement une autre méthode de la même classe via `this.method()`, c\'est un saut d\'adresse mémoire interne qui court-circuite le Proxy. L\'intercepteur de transaction n\'est jamais invoqué.',
    goldenRule: 'Pour qu\'un proxy AOP intercepte un appel, l\'invocation doit obligatoirement transiter par la référence injectée du bean, pas par "this".'
  },
  {
    id: 'trap-4',
    topic: 'JPA & Hibernate',
    question: 'Qu\'est-ce que le problème N+1 et comment le résoudre en production ?',
    companyTarget: 'Toutes ESNs & Banques',
    difficulty: 'Confirmé',
    theTrap: 'Confondre EAGER et LAZY, ou penser que FetchType.EAGER résout le problème N+1.',
    rookieMistake: 'Dire qu\'il suffit de mettre FetchType.EAGER sur la relation.',
    seniorModelAnswer: 'Le problème N+1 se produit lorsque le chargement d\'une liste de N entités déclenche 1 requête SQL initiale pour récupérer les N parents, puis N requêtes SQL supplémentaires pour charger chaque enfant un par un (1 + N requêtes au lieu d\'une seule !). Pire encore : mettre `FetchType.EAGER` n\'élimine PAS le problème N+1 lors des requêtes JPQL, il le rend juste immédiat ! La vraie solution industrielle consiste à utiliser un `JOIN FETCH` dans la requête JPQL, ou une annotation `@EntityGraph` pour charger le graphe complet en UNE SEULE requête SQL avec jointure.',
    codeIllustration: `// MAUVAIS (N+1 requêtes) :
@Query("SELECT s FROM Salle s") // Puis appel de s.getEquipements() dans la boucle

// BON (1 seule requête SQL avec jointure) :
@Query("SELECT s FROM Salle s LEFT JOIN FETCH s.equipements")`,
    goldenRule: 'Toujours laisser FetchType.LAZY par défaut et utiliser JOIN FETCH ou @EntityGraph au cas par cas.'
  },
  {
    id: 'trap-5',
    topic: 'Java Concurrency',
    question: 'Le mot-clé volatile garantit-il l\'atomicité d\'une opération comme count++ ?',
    companyTarget: 'Oracle MDC / SG ATS',
    difficulty: 'Senior',
    theTrap: 'Confondre Visibilité mémoire CPU et Atomicité d\'une opération.',
    rookieMistake: 'Répondre "Oui, volatile rend la variable thread-safe".',
    seniorModelAnswer: 'NON. Le mot-clé `volatile` garantit uniquement la VISIBILITÉ mémoire et l\'ordonnancement des instructions (Happens-Before). Il force les threads à lire et écrire directement dans la RAM principale en invalidant les caches L1/L2 des cœurs CPU. Cependant, l\'opération `count++` n\'est pas atomique : elle est composée de 3 instructions distinctes (Lecture, Incrémentation, Écriture). Si deux threads exécutent `count++` en même temps sur une variable volatile, une mise à jour sera écrasée (Race Condition). Pour garantir l\'atomicité, il faut utiliser `AtomicInteger` ou un bloc `synchronized`.',
    goldenRule: 'volatile assure la visibilité immédiate entre processeurs, mais PAS l\'atomicité des opérations composées.'
  },
  {
    id: 'trap-6',
    topic: 'Spring Boot',
    question: 'Pourquoi l\'injection de dépendances par constructeur est-elle préférable à @Autowired sur un champ ?',
    companyTarget: 'Capgemini / CGI / Devoteam',
    difficulty: 'Junior',
    theTrap: 'Croire que les deux modes sont équivalents parce qu\'ils font la même chose au runtime.',
    rookieMistake: 'Dire que c\'est juste une préférence de style ou que @Autowired est plus court.',
    seniorModelAnswer: 'L\'injection par champ (@Autowired sur variable privée) est considérée comme un anti-pattern par l\'équipe Spring pour 4 raisons majeures : 1) Impossibilité de déclarer les champs `final` (perte d\'immuabilité). 2) Tests unitaires complexes : oblige à lancer le contexte Spring ou à bidouiller la réflexion privée pour mocker la dépendance. 3) Masque la violation du principe de Responsabilité Unique (un service peut avoir 10 dépendances cachées). 4) Risque de NullPointerException si la classe est instanciée manuellement sans Spring. L\'injection par constructeur garantit que le bean ne peut pas être créé dans un état incomplet (Fail-Fast).',
    goldenRule: 'Champs `private final` et injection par constructeur : la seule signature propre en 2026.'
  },
  {
    id: 'trap-7',
    topic: 'Spring Security',
    question: 'Quelle est la différence entre Authentication et Authorization ?',
    companyTarget: 'Toutes entreprises',
    difficulty: 'Junior',
    theTrap: 'Inverser les deux notions ou bafouiller sur le vocabulaire.',
    rookieMistake: 'Confondre qui vous êtes et ce que vous avez le droit de faire.',
    seniorModelAnswer: 'L\'Authentification (Authentication) répond à la question : "QUI ÊTES-VOUS ?". C\'est la vérification de l\'identité de l\'utilisateur via des identifiants (mot de passe, certificat, token JWT, MFA). L\'Autorisation (Authorization) répond à la question : "QU\'AVEZ-VOUS LE DROIT DE FAIRE ?". C\'est la vérification des permissions et rôles (ex: ROLE_ADMIN, ROLE_USER) pour accéder à une ressource spécifique une fois l\'identité établie.',
    goldenRule: 'L\'authentification précède toujours l\'autorisation dans la chaîne de sécurité.'
  },
  {
    id: 'trap-8',
    topic: 'JPA Lifecycle',
    question: 'Quelle est la différence entre les états DETACHED et REMOVED d\'une entité JPA ?',
    companyTarget: 'Capgemini / Oracle MDC',
    difficulty: 'Confirmé',
    theTrap: 'Penser qu\'un objet détaché est supprimé de la base de données.',
    rookieMistake: 'Dire que les deux signifient que l\'objet n\'existe plus en mémoire.',
    seniorModelAnswer: 'Une entité DETACHED possède un identifiant (@Id) et existe toujours dans la table en base de données, mais elle n\'est plus surveillée par l\'EntityManager (le Persistence Context s\'est fermé ou `em.detach()` a été appelé). Toute modification sur ses champs n\'aura aucun impact SQL. Une entité REMOVED est marquée explicitement par `em.remove()` : elle est toujours dans le contexte de persistance, et lors du prochain `commit()` ou `flush()`, Hibernate exécutera une requête SQL `DELETE` pour l\'effacer physiquement de la base.',
    goldenRule: 'DETACHED = hors de vue de l\'EntityManager ; REMOVED = programmée pour être effacée par DELETE SQL.'
  },
  {
    id: 'trap-9',
    topic: 'Java Memory',
    question: 'Peut-on attraper (catch) une OutOfMemoryError en Java ?',
    companyTarget: 'Oracle MDC / SG ATS',
    difficulty: 'Senior',
    theTrap: 'Penser que try-catch est réservé aux Exception.',
    rookieMistake: 'Dire que c\'est impossible car c\'est une erreur système.',
    seniorModelAnswer: 'Techniquement OUI, car `OutOfMemoryError` hérite de `java.lang.Throwable` et `java.lang.Error`. On peut écrire `try { ... } catch (OutOfMemoryError e) { ... }`. Cependant, en pratique c\'est un ANTI-PATTERN DANGEREUX de tenter de continuer l\'exécution : lorsque la JVM est en OOM, l\'état de la mémoire est imprévisible, des threads peuvent être morts en tenant des verrous, et le système est instable. La seule chose légitime à faire est de journaliser l\'incident, générer un Heap Dump (`-XX:+HeapDumpOnOutOfMemoryError`) et laisser le processus redémarrer (Crash-Only Software).',
    goldenRule: 'On ne capture pas les Error de la JVM pour continuer ; on laisse le conteneur redémarrer proprement.'
  },
  {
    id: 'trap-10',
    topic: 'Clean Architecture & Microservices',
    question: 'Qu\'est-ce que le pattern Transactional Outbox et quel problème résout-il ?',
    companyTarget: 'SG ATS / Oracle MDC / Capgemini',
    difficulty: 'Senior',
    theTrap: 'Ne pas voir la faille de la double écriture (Dual-Write Problem).',
    rookieMistake: 'Dire qu\'on écrit dans la base SQL puis qu\'on fait kafkaTemplate.send() dans la même méthode.',
    seniorModelAnswer: 'Le pattern Transactional Outbox résout le problème de la double écriture (Dual-Write) entre une base SQL et un broker de messages Kafka/RabbitMQ. Si vous écrivez dans Postgres puis appelez Kafka, si le réseau coupe ou si le serveur crash entre les deux opérations, la base est mise à jour mais le message n\'est jamais envoyé ! Avec le Transactional Outbox, on enregistre l\'événement dans une table SQL `outbox` au sein de la MÊME transaction ACID que la donnée métier. Ensuite, un processus asynchrone fiable (comme Debezium CDC via le Write-Ahead Log) lit cette table et garantit la publication dans Kafka sans perte.',
    goldenRule: 'Ne jamais faire un appel réseau externe au milieu d\'une transaction SQL locale.'
  }
];

// -------------------------------------------------------------
// MODULE 8 : CHEAT SHEETS & PDF SUMMARIES
// -------------------------------------------------------------
export const cheatSheetDocs: CheatSheetDoc[] = [
  {
    id: 'cs-jvm-quickref',
    title: 'Fiche Synthèse : JVM, RAM & Garbage Collection',
    category: 'Architecture Bas Niveau',
    readTime: '5 min',
    summary: 'La fiche mémo indispensable avant un entretien technique : allocation Stack/Heap, phases du GC et options JVM de production.',
    contentMarkdown: `### 1. Organisation de la Mémoire Vive (RAM)
- **Stack (Pile)** : 
  - Allouée par thread (\`-Xss1m\`).
  - Stocke les variables primitives (\`int\`, \`boolean\`, \`double\`) et les pointeurs de référence (\`0x7FFF...\`).
  - LIFO, dépilée instantanément sans Garbage Collector.
- **Heap (Tas)** :
  - Partagé entre tous les threads (\`-Xms4g -Xmx4g\`).
  - Stocke tous les objets créés avec \`new\` et les tableaux.
  - Découpé en **Young Generation** (Eden + S0/S1) et **Old Generation** (Tenured).
- **Metaspace** :
  - Mémoire NATIVE hors-heap (remplace PermGen depuis Java 8).
  - Stocke le bytecode des classes, le constant pool, les métadonnées.

### 2. Le Garbage Collection
- **Hypothèse générationnelle** : La plupart des objets meurent très jeunes dans l'Eden.
- **Minor GC** : Nettoie l'Eden et copie les survivants dans les espaces S0/S1.
- **Major / Full GC** : Nettoie tout le Heap. Provoque un Stop-The-World (STW).
- **G1 GC** (défaut) : Découpe le Heap en milliers de régions, nettoie en priorité les plus sales.
- **ZGC** : GC à latence sub-milliseconde pour les très grands heaps.

### 3. Flags JVM Recommandés en Production
\`\`\`bash
# Dimensionnement mémoire identique pour éviter les resizings dynamiques :
-Xms4g -Xmx4g
# Utiliser G1 GC avec un objectif de pause max de 200ms :
-XX:+UseG1GC -XX:MaxGCPauseMillis=200
# Générer automatiquement un dump mémoire en cas de crash :
-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/var/log/app_dump.hprof
# Afficher les logs détaillés du GC :
-Xlog:gc*:file=/var/log/gc.log:time,uptime,pid:filecount=5,filesize=100M
\`\`\``
  },
  {
    id: 'cs-spring-quickref',
    title: 'Fiche Synthèse : Spring Boot & Architecture d\'Entreprise',
    category: 'Framework & Best Practices',
    readTime: '6 min',
    summary: 'Rappels clés sur l\'IoC, les transactions, l\'auto-configuration et les pièges classiques de développement.',
    contentMarkdown: `### 1. Cycle de Vie d'un Spring Bean
1. Constructeur appelé via réflexion.
2. Injection des propriétés et dépendances.
3. Callbacks Aware (\`BeanNameAware\`, \`ApplicationContextAware\`).
4. \`BeanPostProcessor.postProcessBeforeInitialization()\`.
5. \`@PostConstruct\` ou \`InitializingBean.afterPropertiesSet()\`.
6. \`BeanPostProcessor.postProcessAfterInitialization()\` (**Création des Proxies AOP ici !**).
7. Bean actif et en cache (Singleton).
8. \`@PreDestroy\` à l'arrêt du conteneur.

### 2. @Transactional : Règles d'Or
- **Proxies AOP** : Ne fonctionne QUE sur les méthodes \`public\`.
- **Self-Invocation** : \`this.autreMethode()\`) contourne le proxy et annule la transaction !
- **Rollback par défaut** : Uniquement sur les \`RuntimeException\` et \`Error\`. Toujours écrire : \`@Transactional(rollbackFor = Exception.class)\`.

### 3. Les 4 Niveaux de Test
1. **Tests Unitaires** : JUnit 5 + Mockito (< 10 ms par test, aucun accès disque/réseau).
2. **Tests d'Intégration BDD** : \`@SpringBootTest\` + **Testcontainers** (Docker réel PostgreSQL, abandon définitif d'H2).
3. **Tests d'API Web** : \`@WebMvcTest\` + \`MockMvc\` (teste la couche Controller et la sérialisation JSON).
4. **Tests E2E** : Playwright (automatisation navigateur sans instabilité).`
  }
];

// -------------------------------------------------------------
// MODULE 9 : LEARNING PATHWAY WORKFLOWS (PARCOURS GUIDÉ)
// -------------------------------------------------------------
export const learningPathwayStages: LearningPathwayStage[] = [
  {
    stageNumber: 1,
    id: 'stage-mindset',
    title: 'Phase 1 : Mindset & Psychologie de l\'Ingénieur',
    subtitle: 'Passer de l\'attitude étudiante à la posture d\'Architecte Software',
    estimatedDuration: 'Jours 1 à 3',
    mindsetQuote: 'Un recruteur n\'attend pas que tu saches tout. Il cherche à savoir comment tu réfléchis quand tu ne sais pas.',
    visualArchitectureDiagram: `[Étudiant Débutant]                [Ingénieur Senior Recherché]
- Apprend du code par cœur        - Comprend les flux physiques (RAM / CPU / Réseau)
- Stress devant les questions     - Pose des questions de cadrage métier
- Dit "C'est magique avec Spring" - Sait exactement ce que fait le Proxy AOP`,
    keyConcepts: [
      {
        title: 'La Décomposition en Entonnoir',
        description: 'Avant d\'écrire la moindre ligne de code en live coding, posez toujours les 3 questions de cadrage : 1) Volumétrie attendue ? 2) Contrainte de latence ? 3) Gestion des erreurs ?',
        warningTrap: 'Se jeter sur son clavier dans les 10 premières secondes. C\'est le signal d\'alerte numéro 1 pour un Lead Tech.',
        engineeringRule: 'Penser d\'abord en termes de contrat d\'interface et de cas limites (null, vide, concurrence).'
      },
      {
        title: 'Le Silence Stratégique de 5 Secondes',
        description: 'Lorsqu\'une question difficile vous est posée, ne répondez jamais par impulsion. Respirez, prenez 5 secondes, notez le mot-clé et commencez par reformuler la problématique.',
        warningTrap: 'Bafouiller des hésitations "euh, je crois que..." qui trahissent l\'anxiété.',
        engineeringRule: 'Un silence calme de 5 secondes projette un contrôle et une maturité exceptionnels.'
      }
    ],
    actionChecklist: [
      'Lire le Manifeste du Coach ci-dessous',
      'Identifier vos 3 points forts et les formuler en méthode STAR',
      'Accepter qu\'un entretien est une conversation entre deux professionnels, pas un interrogatoire'
    ]
  },
  {
    stageNumber: 2,
    id: 'stage-jvm-ram',
    title: 'Phase 2 : Fondations Invisibles (RAM & Internals JVM)',
    subtitle: 'Comprendre où vivent physiquement les octets pour justifier chaque choix',
    estimatedDuration: 'Jours 4 à 8',
    mindsetQuote: 'Ceux qui dominent les entretiens chez Oracle et les grandes banques sont ceux qui visualisent la mémoire vive.',
    visualArchitectureDiagram: `+-------------------------------------+-----------------------------------------+
|         THREAD STACK (LIFO)         |              HEAP PARTAGÉ               |
| - Variables primitives (int, bool)  | - Objets (new Entity(), DTO)            |
| - Adresses pointeurs 64-bit         | - Young Gen (Eden, S0, S1)              |
| - Libéré instantanément en O(1)     | - Old Gen (Tenured) nettoyé par GC      |
+-------------------------------------+-----------------------------------------+`,
    keyConcepts: [
      {
        title: 'Stack vs Heap & Escape Analysis',
        description: 'Visualiser comment un primitif vit sur la Stack alors qu\'un objet vit sur le Heap, sauf si le compilateur JIT applique le Scalar Replacement.',
        warningTrap: 'Croire qu\'en Java les objets sont passés par référence (Java est 100% passage par valeur !).',
        engineeringRule: 'Minimiser les créations d\'objets temporaires inutiles dans les boucles critiques.'
      },
      {
        title: 'Le Cycle de Compilation Hybride',
        description: 'javac ne compile pas en code machine, mais en Bytecode universel. La JVM utilise Tiered Compilation (Interpréteur + JIT C1 + JIT C2).',
        warningTrap: 'Penser que Java est plus lent que le C++ en ignorant le JIT inlining à chaud.',
        engineeringRule: 'Connaître le rôle du Metaspace (mémoire native OS) versus le Heap.'
      }
    ],
    actionChecklist: [
      'Maîtriser les 3 générations du Garbage Collector (Eden, Survivor, Tenured)',
      'Savoir expliquer pourquoi System.gc() est banni en production',
      'Comprendre les 4 causes majeures de fuites de mémoire réelles en Java'
    ]
  },
  {
    stageNumber: 3,
    id: 'stage-spring-jpa',
    title: 'Phase 3 : Cœur Entreprise (Spring Boot & JPA / Hibernate)',
    subtitle: 'Démystifier les annotations pour expliquer les Proxies et les requêtes SQL réelles',
    estimatedDuration: 'Jours 9 à 15',
    mindsetQuote: 'Une annotation n\'est pas magique : c\'est un marqueur exploité par un BeanPostProcessor ou un Proxy AOP.',
    visualArchitectureDiagram: `[Client HTTP] ---> [Spring Proxy CGLIB] ---> [Instance Service Réelle]
                           |
                     (Ouvre TX SQL)
                     (Try / Catch)
                     (Commit / Rollback)`,
    keyConcepts: [
      {
        title: 'Le Cycle de Vie des Beans & Injection par Constructeur',
        description: 'Comprendre les 8 étapes du Bean et pourquoi l\'injection par champ avec @Autowired est un anti-pattern banni en Clean Architecture.',
        warningTrap: 'Utiliser @Autowired sur des variables d\'instance privées rendant les tests impossibles.',
        engineeringRule: 'Toujours déclarer : private final MyService myService; et injecter via le constructeur.'
      },
      {
        title: 'Le Piège Mortel de la Self-Invocation sur @Transactional',
        description: 'Appeler this.autreMethode() au sein de la même classe contourne le Proxy Spring et désactive la transaction.',
        warningTrap: 'Croire qu\'une exception checked provoque un rollback par défaut.',
        engineeringRule: 'Spécifier @Transactional(rollbackFor = Exception.class) et séparer les services métier.'
      }
    ],
    actionChecklist: [
      'Résoudre le problème N+1 avec JOIN FETCH ou @EntityGraph',
      'Distinguer Verrou Optimiste (@Version) et Verrou Pessimiste (PESSIMISTIC_WRITE)',
      'Comprendre le Dirty Checking d\'Hibernate et le cache de premier niveau (Session)'
    ]
  },
  {
    stageNumber: 4,
    id: 'stage-tests-devops',
    title: 'Phase 4 : Rigueur & DevOps (JUnit 5, Testcontainers, SonarQube)',
    subtitle: 'Prouver que votre code est prêt pour la production dès le premier jour',
    estimatedDuration: 'Jours 16 à 21',
    mindsetQuote: 'Les débutants écrivent du code qui marche. Les ingénieurs écrivent des tests qui prouvent qu\'il ne peut pas casser.',
    visualArchitectureDiagram: `[Pyramide de Tests Moderne]
     /\\     E2E : Playwright (Navigateur headless)
    /  \\    Intégration : Testcontainers (Docker PostgreSQL réel)
   /____\\   Unitaires : JUnit 5 + Mockito (< 10 ms par test)
+ Quality Gates SonarQube automatisées en CI/CD GitLab/GitHub`,
    keyConcepts: [
      {
        title: 'Abandon de la Base H2 au profit de Testcontainers',
        description: 'H2 tolère des requêtes incompatibles avec PostgreSQL/Oracle. Testcontainers lance un conteneur Docker réel éphémère.',
        warningTrap: 'Découvrir en production un crash SQL qui passait avec succès sur la base mémoire H2.',
        engineeringRule: 'Toujours tester avec le moteur SQL exact de production via @Testcontainers.'
      },
      {
        title: 'Quality Gates SonarQube & Complexité Cognitive',
        description: 'Comprendre la différence entre complexité cyclomatique et complexité cognitive, et savoir lire un rapport de dette technique.',
        warningTrap: 'Viser 100% de couverture de code sans assertions pertinentes.',
        engineeringRule: 'Vérifier les cas limites (edge cases) et les exceptions avec assertThrows.'
      }
    ],
    actionChecklist: [
      'Écrire un test unitaire Mockito avec verify() et ArgumentCaptor',
      'Configurer un conteneur Testcontainers PostgreSQL',
      'Savoir définir ce qu\'est un Code Smell vs un Bug vs une Vulnérabilité'
    ]
  },
  {
    stageNumber: 5,
    id: 'stage-microservices',
    title: 'Phase 5 : Architecture Distribuée & Frontend Angular',
    subtitle: 'Comprendre le découpage DDD, la résilience et l\'intégration REST / Kafka',
    estimatedDuration: 'Jours 22 à 26',
    mindsetQuote: 'Dans un système distribué, la question n\'est pas de savoir si un serveur va tomber, mais quand.',
    visualArchitectureDiagram: `[Client Angular Signals] ---> [Spring Cloud Gateway] ---> [Eureka Registry]
                                    |
                           [Microservices BDD-Per-Service]
                                    |
                [Transactional Outbox] ===(CDC Debezium)===> [Kafka Broker]`,
    keyConcepts: [
      {
        title: 'Resilience4j Circuit Breaker & Fallback',
        description: 'Isoler les pannes en cascade avec les états CLOSED, OPEN et HALF-OPEN pour éviter la saturation des pools de threads.',
        warningTrap: 'Faire des appels REST synchrones bloquants sans timeout ni fallback.',
        engineeringRule: 'Appliquer le pattern Circuit Breaker sur tout appel réseau externe.'
      },
      {
        title: 'Pattern Saga & Transactional Outbox',
        description: 'Le 2PC est mort. Les microservices utilisent la cohérence éventuelle (Eventual Consistency) avec des transactions de compensation.',
        warningTrap: 'Faire une écriture SQL suivie immédiatement d\'un envoi Kafka dans la même méthode sans outbox.',
        engineeringRule: 'Enregistrer l\'événement dans une table outbox dans la transaction SQL locale.'
      }
    ],
    actionChecklist: [
      'Comprendre pourquoi le partage d\'une base SQL entre microservices est interdit',
      'Configurer les autorisations CORS dans Spring Security',
      'Créer un HttpInterceptor Angular moderne pour injecter le token Bearer JWT'
    ]
  },
  {
    stageNumber: 6,
    id: 'stage-interviews-negotiation',
    title: 'Phase 6 : Arène des Entretiens & Négociation Marocaine',
    subtitle: 'Valider ses offres de stage PFE et décrocher son premier CDI au meilleur salaire',
    estimatedDuration: 'Jours 27 à 30',
    mindsetQuote: 'Le salaire ne se négocie pas sur ce que vous valez, mais sur ce que vous prouvez pouvoir apporter à l\'équipe.',
    visualArchitectureDiagram: `[Test CodinGame en ligne] ---> [Entretien RH] ---> [Live Coding & Lead Tech] ---> [Offre de Stage / CDI]
  (30 questions chrono)         (Culture fit)      (Questions pièges & Schémas)     (Négociation salaire)`,
    keyConcepts: [
      {
        title: 'La Méthode STAR pour Décrire vos Projets',
        description: 'Situation (contexte de l\'école ou du stage) -> Tâche (défi technique à relever) -> Action (ce que VOUS avez conçu techniquement) -> Résultat (chiffres mesurés).',
        warningTrap: 'Dire "on a fait un projet de gestion de stock" sans citer de métriques ni de défis techniques.',
        engineeringRule: 'Citer des chiffres : "Réduction du temps de requête de 40% grâce à un index composite et JOIN FETCH".'
      },
      {
        title: 'Les Grilles Salariales au Maroc en 2025/2026',
        description: 'Connaître les salaires réels (PFE de 3 500 à 8 500 DH, CDI Junior de 10 500 à 18 500 DH) pour ne jamais se sous-vendre.',
        warningTrap: 'Accepter la première offre sans demander les avantages (mutuelle, RSU, prime de performance, transport).',
        engineeringRule: 'Avoir plusieurs processus d\'entretien en parallèle pour créer un levier de négociation.'
      }
    ],
    actionChecklist: [
      'Répéter les 20 Questions Pièges d\'entretien à voix haute',
      'Préparer son pitch de présentation personnelle en 2 minutes (Français et Anglais)',
      'Regarder les 6 vidéos clés de GeeksBlaBla recommandées dans la vidéothèque'
    ]
  }
];

// -------------------------------------------------------------
// MODULE 10 : COACH MANIFESTO & MOTIVATION
// -------------------------------------------------------------
export const coachManifestoData: CoachManifesto = {
  title: 'Manifeste du Coach Senior : Pourquoi vous êtes destiné à Réussir',
  salutation: 'Chers futurs Ingénieurs d\'État marocains,',
  introManifesto: `Si vous lisez ceci, vous êtes à un tournant décisif de votre vie. Dans quelques semaines ou quelques mois, vous allez passer vos entretiens de stage PFE ou de premier emploi. 

Vous ressentez peut-être le syndrome de l'imposteur. Vous vous dites : "Il y a trop de technologies, trop de frameworks, je ne maîtrise pas tout".
Écoutez bien ce que tout Lead Tech et Architecte sait en entreprise : 
PERSONNE ne maîtrise tout. 

Ce que recherchent désespérément les recruteurs chez Capgemini, Oracle MDC, Société Générale ATS, CGI et dans les grandes banques marocaines, ce ne sont PAS des génies qui ont mémorisé chaque ligne de documentation. 
Ils cherchent des ingénieurs rigoureux, humbles, curieux, qui comprennent COMMENT ÇA FONCTIONNE SOUS LE CAPOT et qui savent poser des questions pertinentes.`,
  theTruthAboutMoroccanRecruiters: `Le marché marocain de l'IT est en pleine explosion. Entre CasaNearshore, Technopolis Rabat et Fès Shore, des milliers de postes sont ouverts. Mais il y a une séparation nette entre deux catégories de candidats :
1. Les "Développeurs Copieurs de Code" : Ils savent écrire une annotation @GetMapping ou @Autowired, mais quand ça plante en production, ils sont démunis. Ils démarrent avec des salaires de 8 000 à 9 000 DH.
2. Les "Ingénieurs Concepteurs" : Ils comprennent la Stack et le Heap, ils savent pourquoi @Transactional a un piège de self-invocation, ils écrivent des tests Testcontainers, et ils dessinent un schéma avant de coder. Ces profils sont chassés et démarrent entre 12 000 et 18 500 DH.`,
  theThreePillarsOfVictory: [
    {
      pillar: 'Pilier 1 : Le Schéma Visuel Avant Tout',
      explanation: 'En entretien, lorsque le Lead Tech vous expose un problème, ne commencez jamais par taper du code. Dessinez ou décrivez le flux : "Voici l\'utilisateur, voici le Controller, voici le Proxy, voici la BDD".',
      actionableHabit: 'Prenez une feuille ou un tableau blanc et posez les boîtes et les flèches avant d\'écrire la première classe.'
    },
    {
      pillar: 'Pilier 2 : La Rigueur du Vocabulaire Technique',
      explanation: 'Bannissez les mots vagues comme "le truc", "la fonction magique", "ça envoie des données". Utilisez les termes précis : "Instance allouée sur le Heap", "Transaction avec isolation Read Committed", "Appel intercepté par un Proxy dynamique", "Inlining JIT".',
      actionableHabit: 'Le vocabulaire précis signale immédiatement au recruteur qu\'il a affaire à un futur senior.'
    },
    {
      pillar: 'Pilier 3 : La Posture de Résolution de Problèmes',
      explanation: 'Si vous ne connaissez pas une réponse, ne paniquez pas et n\'inventez rien. Démontrez votre méthode d\'investigation : "Je n\'ai pas encore rencontré ce cas précis en production, mais voici comment j\'analyserais le problème...".',
      actionableHabit: 'Les examinateurs adorent voir le cheminement intellectuel d\'un candidat confronté à l\'inconnu.'
    }
  ],
  roiCalculation: {
    title: 'Le Retour sur Investissement (ROI) de 1 Mois de Préparation Disciplinée',
    withoutPreparation: 'Candidature improvisée : Stage PFE non rémunéré ou à 1 500 DH. Premier CDI à 8 500 DH net/mois.',
    withDisciplinedPreparation: 'Préparation avec JPA Academy : Stage PFE pré-embauche de 4 500 à 8 500 DH/mois. Premier CDI chez Capgemini, SG ATS ou Oracle MDC à 12 500 - 18 500 DH net/mois.',
    differenceDh: '+60 000 à +100 000 DH net dès la première année de carrière !'
  }
};

// -------------------------------------------------------------
// MODULE 11 : PSYCHOLOGICAL TECHNIQUES & INTERVIEW MASTERY
// -------------------------------------------------------------
export const interviewPsychologyTechniques: PsychologicalTechnique[] = [
  {
    id: 'technique-1',
    title: 'La Technique de l\'Entonnoir (The Funnel Thinking)',
    context: 'Face à un problème algorithmique ou de conception système posé sur un tableau blanc ou en direct.',
    seniorMindset: 'Ne jamais supposer les contraintes sans demander. Le silence du recruteur est souvent un test pour voir si vous validez le périmètre.',
    methodologySteps: [
      '1. Écouter attentivement sans interrompre et reformuler : "Si je comprends bien, l\'objectif est de..."',
      '2. Clarifier les contraintes clés : Volumétrie (Combien d\'utilisateurs ?), Fréquence (Combien de requêtes par seconde ?), Gestion des pannes (Que faire si le service tiers est indisponible ?)',
      '3. Proposer d\'abord une solution simple naïve en $O(N^2)$ pour poser les bases, puis expliquer comment l\'optimiser en $O(N)$ avec une table de hachage.',
      '4. Mentionner immédiatement les cas limites : "Attention, si la liste est vide ou si un identifiant est null, il faut lever une exception explicite".'
    ],
    exactScriptOrPhrase: '"Avant de plonger dans l\'implémentation, permettez-moi de clarifier quelques hypothèses sur la volumétrie et la tolérance aux pannes..."',
    rookieMistake: 'Commencer à coder immédiatement sans poser aucune question et s\'apercevoir 15 minutes plus tard qu\'on a résolu le mauvais problème.'
  },
  {
    id: 'technique-2',
    title: 'La Formule d\'Or face à une Question Inconnue',
    context: 'L\'examinateur vous pose une question pointue sur une notion que vous n\'avez jamais étudiée (ex: "Connaissez-vous le pattern Bulkhead ?").',
    seniorMindset: 'L\'honnêteté intellectuelle est une valeur cardinale en ingénierie. Dire "je ne sais pas" avec assurance et méthode vaut 100 fois mieux que d\'inventer des bêtises.',
    methodologySteps: [
      '1. Reconnaître calmement que vous n\'avez pas encore manipulé ce concept précis en pratique.',
      '2. Utiliser l\'analogie et l\'intuition : décomposer le nom (ex: "Bulkhead fait référence aux cloisons étanches des bateaux pour éviter qu\'une voie d\'eau ne coule tout le navire...").',
      '3. Rapprocher du connu : "J\'ai en revanche beaucoup utilisé le Circuit Breaker de Resilience4j pour isoler les pannes réseau...".',
      '4. Demander poliment confirmation au recruteur : "Est-ce que le Bulkhead isole également des pools de threads distincts ?" (Crée un échange technique passionnant).'
    ],
    exactScriptOrPhrase: '"Je n\'ai pas encore eu l\'occasion d\'implémenter ce concept précis en environnement de production. Cependant, par analogie avec les patterns de résilience que je connais comme le Circuit Breaker, j\'imagine que le rôle est d\'isoler... Est-ce exact ?"',
    rookieMistake: 'Inventer une définition fausse avec hésitation, se faire piéger par le recruteur et perdre toute crédibilité.'
  },
  {
    id: 'technique-3',
    title: 'La Méthode STAR pour Décrire vos Projets et PFE',
    context: 'Question classique : "Parlez-moi d\'un projet difficile que vous avez réalisé" ou "Présentez votre projet de fin d\'études".',
    seniorMindset: 'Un recruteur n\'écoute pas une longue histoire chronologique. Il écoute des défis, des décisions et des résultats chiffrés.',
    methodologySteps: [
      'S - Situation : Le contexte métier (ex: "Dans le cadre d\'un système de réservation de salles pour 1 500 utilisateurs...").',
      'T - Tâche : La problématique technique difficile (ex: "Le défi majeur était d\'empêcher les réservations concurrentes simultanées sans dégrader la latence SQL").',
      'A - Action : Ce que VOUS avez fait personnellement (ex: "J\'ai analysé les requêtes, rejeté le verrou pessimiste trop bloquant, et mis en place un verrou optimiste @Version couplé à un cache Caffeine").',
      'R - Résultat : L\'impact concret (ex: "Résultat : zéro conflit en charge et un temps de réponse moyen passé sous la barre des 35 millisecondes").'
    ],
    exactScriptOrPhrase: '"Le défi technique principal résidait dans X. J\'ai pris le parti de concevoir Y, ce qui a permis d\'obtenir Z comme résultat mesurable."',
    rookieMistake: 'Raconter une histoire confuse : "Alors on s\'est mis en groupe, puis on a choisi Java, puis on a fait les pages HTML...".'
  },
  {
    id: 'technique-4',
    title: 'Inverser l\'Entretien à la Fin (Les 5 Questions d\'Impact)',
    context: 'À la fin de l\'entretien, le recruteur demande invariablement : "Avez-vous des questions pour nous ?"',
    seniorMindset: 'Dire "Non, tout est clair" est une erreur fatale. C\'est le moment de prouver que vous choisissez votre entreprise avec exigence.',
    methodologySteps: [
      'Poser une question sur la culture de qualité : "Quelle est la politique de l\'équipe concernant la dette technique et la couverture de tests ?"',
      'Poser une question sur le cycle de vie : "À quelle fréquence livrez-vous du code en production (CI/CD continu ou releases mensuelles) ?"',
      'Poser une question sur le mentorat : "Comment est structuré l\'onboarding technique pour qu\'un stagiaire PFE monte rapidement en compétences ?"',
      'Poser une question sur la stack : "Prévoyez-vous une migration vers Java 21 et les Virtual Threads prochainement ?"',
      'Poser une question sur l\'équipe : "Quels sont les plus gros défis architecturaux auxquels votre équipe fait face actuellement ?"'
    ],
    exactScriptOrPhrase: '"J\'ai en effet 2 questions : comment mesurez-vous la qualité de code au sein de l\'équipe au quotidien (SonarQube, revues de code systématiques) ?"',
    rookieMistake: 'Demander uniquement : "C\'est quoi les horaires ?" ou "Combien de jours de congé j\'aurai pendant mon PFE ?".'
  }
];

// -------------------------------------------------------------
// MODULE 12 : MOROCCAN TECH VIDEOS & PODCASTS HUB
// -------------------------------------------------------------
export const moroccanTechVideos: MoroccanTechVideo[] = [
  {
    id: 'video-geeksblabla-pfe-200',
    title: 'Making the most out of your PFE internship / سطاج ناجح',
    showOrPodcast: 'GeeksBlaBla #200',
    speakers: ['Mohammed Aboullaite', 'Youssouf El Azizi', 'Invités Experts Marocains'],
    duration: '1h 45m',
    language: 'Mixte Darija / FR',
    youtubeId: 'AUZIYQFubEVp0TRuRSrIHwOqGY9s9oOunRq_qhSX22dhTKYat4OkNW5rBXQlk78UPEkpQUwpAVML-XjJr2eHXsk1dcA3ueULc2B_u4WULrLDFb3_SmwnIltBSttFxDCgQfKlmJSI',
    badge: 'Guide PFE N°1',
    summary: 'L\'épisode de référence de la communauté tech marocaine pour tout étudiant préparant son Projet de Fin d\'Études. Comment choisir entre grand compte, startup ou multinationale, comment négocier sa gratification, et comment transformer son PFE en pré-embauche CDI.',
    keyPointsCovered: [
      'Les critères pour choisir une bonne entreprise de stage au Maroc',
      'Comment préparer les entretiens techniques et RH de sélection',
      'Les erreurs courantes des stagiaires qui bloquent leur embauche finale',
      'Comment documenter son rapport de PFE et réussir sa soutenance devant le jury universitaire'
    ],
    whyEveryMoroccanEngineerMustWatch: 'Cet épisode démystifie entièrement le monde de l\'entreprise au Maroc avec des retours d\'expérience sans filtre d\'ingénieurs qui ont fait le même parcours que vous.'
  },
  {
    id: 'video-geeksblabla-interviews-65',
    title: 'Tech Interviews in Morocco / التحضير لمقابلات العمل التقنية',
    showOrPodcast: 'GeeksBlaBla #65',
    speakers: ['Mohammed Aboullaite', 'Youssouf El Azizi', 'Hanae El Bouyousfi', 'Diaa Alhak'],
    duration: '2h 10m',
    language: 'Mixte Darija / FR',
    youtubeId: 'AUZIYQGFB0mV6Ijyv92de1KgnRGRiWcQlRgAovQar847ZR4k1-t8duDFDWURb9SYYOuEDOaAUPnYmHIRKeSIiPRVAv3DjzVNsJ-s7FjSb1HFGUIf5a7r__EF8h5ctEN5k_F9fHg=',
    badge: 'Prépa Entretien',
    summary: 'Décryptage approfondi des processus d\'entretiens techniques au Maroc et à l\'international : tests en ligne CodinGame, questions pièges des Lead Techs, questions de comportement ("Tell me about yourself"), et gestion du stress.',
    keyPointsCovered: [
      'Les différentes étapes d\'un entretien d\'embauche technique au Maroc',
      'Comment briller lors des tests de code en direct (Live Coding)',
      'Comment répondre aux questions de soft-skills et de comportement',
      'La posture psychologique pour négocier son package salarial'
    ],
    whyEveryMoroccanEngineerMustWatch: 'Donne la perspective exacte des interviewers : ce qu\'un Lead Tech note secrètement sur sa grille d\'évaluation pendant que vous parlez.'
  },
  {
    id: 'video-geeksblabla-java-160',
    title: 'Java in 2023/2024 - اش واقع فالجاڤا وهل لا زالت مطلوبة بالمغرب؟',
    showOrPodcast: 'GeeksBlaBla #160',
    speakers: ['Experts Java Marocains', 'Mohammed Aboullaite'],
    duration: '1h 50m',
    language: 'Mixte Darija / FR',
    youtubeId: 'AUZIYQHBFm08nSK-VsPqvFq2mnlF3rK7NOVTnixFnQe9Y290KQZDkEPHQiEiIaeD0mfHABRkAgtAAykVvLBEuvtbtX5yVzkhp47EfBDoHvugbpJEZKFmMfsdqCQNadbQ8XjNa0rx',
    badge: 'Écosystème Java',
    summary: 'Un tour d\'horizon complet sur l\'état de Java et Spring Boot sur le marché de l\'emploi au Maroc. Pourquoi Java reste le roi incontesté des salaires et des volumes de recrutement dans les banques et les multinationales.',
    keyPointsCovered: [
      'Pourquoi Java 17 et 21 dominent le paysage bancaire marocain',
      'La transition Spring Boot 3 et Jakarta EE',
      'Les Virtual Threads de Java 21 face aux frameworks asynchrones réactifs',
      'Les compétences les plus recherchées par les entreprises marocaines'
    ],
    whyEveryMoroccanEngineerMustWatch: 'Vous rassure à 100% sur la pertinence de votre investissement technique : Java est la compétence la plus valorisée au Maroc.'
  },
  {
    id: 'video-geeksblabla-java-25',
    title: 'Deep Dive in Java & JVM Tuning (نقاش معمق حول الجاڤا)',
    showOrPodcast: 'GeeksBlaBla #25',
    speakers: ['Architectes Java Marocains', 'Communauté GeeksBlaBla'],
    duration: '2h 15m',
    language: 'Darija 🇲🇦',
    youtubeId: 'AUZIYQFMPnChbDPgAuUiEvY9xZE-Orm4fhY9qM641EFydTfv5aLJNwm1n52gxi_X8ksfXVWmvWxabXg4tpSJW9d4Cj3HpM8OY9wUhGvzu_q4KFRQSgs0W4JpxC3Zv1p-IlBhbmjM',
    badge: 'Architecture JVM',
    summary: 'Une discussion technique de haut vol sur le fonctionnement interne de la JVM HotSpot, le Garbage Collection, les optimisations de performance et les pièges de multithreading en Darija marocaine.',
    keyPointsCovered: [
      'Organisation de la mémoire vive (Heap, Stack, Metaspace)',
      'Comment fonctionne le JIT Compiler C1 et C2',
      'Le Garbage Collection en pratique (G1 GC, CMS, ZGC)',
      'Bonnes pratiques d\'architecture logicielle d\'entreprise'
    ],
    whyEveryMoroccanEngineerMustWatch: 'Parfait pour comprendre les concepts bas niveau expliqués simplement avec les métaphores de notre culture en Darija.'
  }
];

// -------------------------------------------------------------
// MODULE 13 : MEMORY FLASHCARDS (MÉMORISATION ANIMÉE)
// -------------------------------------------------------------
export const memoryFlashcards: MemoryFlashcard[] = [
  {
    id: 'fc-1',
    category: 'Mémoire RAM',
    frontQuestion: 'Où est stockée la variable locale `int x = 10;` définie dans une méthode ?',
    frontHint: 'Pensez à la pile d\'exécution locale au thread.',
    backCoreConcept: 'Elle est stockée DIRECTEMENT sur la STACK (Thread Stack) sous forme de 4 octets binaires bruts dans la frame de la méthode courante. Aucun objet n\'est créé sur le Heap.',
    backDiagramAscii: `[Stack Frame: maMethode()]
- x = 10 (Directement dans la pile)
-> Dépilé instantanément en O(1) à la fin de l'appel`,
    backSeniorRule: 'Les types primitifs locaux ne coûtent zéro charge au Garbage Collector.'
  },
  {
    id: 'fc-2',
    category: 'Mémoire RAM',
    frontQuestion: 'Où est stockée l\'expression `User u = new User("Moad");` ?',
    frontHint: 'Il y a deux entités distinctes : la variable et l\'instance.',
    backCoreConcept: 'La variable de référence `u` (un pointeur mémoire de 8 octets) est stockée sur la STACK. L\'objet réel `new User(...)` est alloué sur le HEAP dans l\'espace Eden.',
    backDiagramAscii: `STACK: [ u = 0x7FFF1234 ] ===(Pointeur)===> HEAP: [ User { nom: "Moad" } ]`,
    backSeniorRule: 'Java est 100% passage par valeur : ce qui est passé en paramètre, c\'est la copie de la valeur du pointeur d\'adresse.'
  },
  {
    id: 'fc-3',
    category: 'Spring Boot',
    frontQuestion: 'Que se passe-t-il si une méthode appelle une autre méthode @Transactional de la MÊME classe ?',
    frontHint: 'Rappelez-vous comment Spring intercepte les appels.',
    backCoreConcept: 'La transaction N\'EST PAS ouverte ! C\'est le piège de la Self-Invocation : l\'appel direct `this.autreMethode()` court-circuite le Proxy Spring AOP.',
    backSeniorRule: 'Pour qu\'un proxy intercepte, l\'appel doit venir de l\'extérieur du Bean ou passer par un service injecté distinct.'
  },
  {
    id: 'fc-4',
    category: 'JPA / Hibernate',
    frontQuestion: 'Pourquoi FetchType.EAGER est-il considéré comme un danger majeur en production ?',
    frontHint: 'Pensez à la requête SQL qui sera générée lors d\'un findAll().',
    backCoreConcept: 'EAGER charge systématiquement les relations associées, même quand vous n\'en avez pas besoin, provoquant des requêtes SQL massives et inutiles. Il ne résout PAS le problème N+1 lors des requêtes JPQL.',
    backSeniorRule: 'Toujours laisser FetchType.LAZY par défaut et utiliser JOIN FETCH ou @EntityGraph explicitement.'
  },
  {
    id: 'fc-5',
    category: 'DevOps & Tests',
    frontQuestion: 'Pourquoi Testcontainers a-t-il totalement remplacé la base en mémoire H2 pour les tests ?',
    frontHint: 'Pensez aux différences de dialectes SQL entre H2 et PostgreSQL.',
    backCoreConcept: 'H2 n\'a pas les mêmes types natifs (JSONB, UUID, ENUMs) ni les mêmes comportements de verrous de concurrence que PostgreSQL ou Oracle de production. Testcontainers lance un vrai conteneur Docker éphémère identique à la prod.',
    backSeniorRule: 'Testcontainers garantit zéro surprise de dialecte lors du déploiement en production.'
  },
  {
    id: 'fc-6',
    category: 'Microservices',
    frontQuestion: 'Qu\'est-ce que le Transactional Outbox Pattern ?',
    frontHint: 'Pensez au problème de la double écriture BDD SQL + Message Kafka.',
    backCoreConcept: 'Il résout le problème de la double écriture (Dual-Write) en enregistrant l\'événement dans une table SQL `outbox` au sein de la MÊME transaction ACID que la donnée métier. Un outil CDC (Debezium) lit le log et pousse dans Kafka de façon garantie.',
    backSeniorRule: 'Ne jamais faire un appel réseau externe au milieu d\'une transaction SQL locale.'
  }
];
