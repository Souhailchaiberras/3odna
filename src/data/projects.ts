export interface Project {
  title: string
  desc: string
  subdesc: string
  logo: string
  logoStyle: React.CSSProperties
  spotlight: string
  texture: string
  tags: Array<{
    name: string
    path: string
  }>
  href: string
}

export const myProjects: Project[] = [
  
  {
    title: "XPLOR : Application Web de gestion d'activités",
    desc: "Gestion du serveur Nginx pour l'hébergement de l'application",
    subdesc: "Optimisation des performances et de la sécurité. Configuration et gestion des serveurs DNS et de messagerie.",
    logo: "/assets/nginx-logo.png",
    logoStyle: { backgroundColor: "#009639" },
    spotlight: "/assets/xplor-spotlight.jpg",
    texture: "/assets/videos/xplorviedo.mp4",
    tags: [
      { name: "Nginx", path: "/assets/nginx-logo.png" },
      { name: "DNS", path: "/assets/dns-logo.png" },
      { name: "Linux", path: "/assets/linux-logo.png" }
    ],
    href: "#"
  },
  
  {
    title: "Tourisme AI",
    desc: "Application web alimentée par l'IA pour des itinéraires touristiques personnalisés",
    subdesc: "Développée avec React.js et FastAPI. Responsable du backend et de l'intégration de l'IA.",
    logo: "/assets/ai-logo.png",
    logoStyle: { backgroundColor: "#FF6B35" },
    spotlight: "/assets/tourisme-ai-spotlight.jpg",
    texture: "/assets/videos/tourissmeai.mp4",
    tags: [
      { name: "React.js", path: "/assets/react-logo.png" },
      { name: "FastAPI", path: "/assets/fastapi-logo.png" },
      { name: "AI", path: "/assets/ai-logo.png" }
    ],
    href: "#"
  },
   {
    title: "Application d'évaluation des formations",
    desc: "Développement d'une plateforme web pour l'évaluation centralisée des formations",
    subdesc: "Responsable du backend avec ASP.NET Core (microservices) et PostgreSQL. Implémentation des API, gestion des données et sécurisation des évaluations.",
    logo: "/assets/dotnet-logo.png",
    logoStyle: { backgroundColor: "#512BD4" },
    spotlight: "/assets/evaluation-app-spotlight.jpg",
    texture: "/assets/videos/evaluation_app.mp4",
    tags: [
      { name: "ASP.NET", path: "/assets/dotnet-logo.png" },
      { name: "PostgreSQL", path: "/assets/postgresql-logo.png" },
      { name: "Microservices", path: "/assets/microservices-logo.png" }
    ],
    href: "#"
  },
  {
    title: "Stage d'initiation à Marsa Maroc",
    desc: "Développement d'une application web avec React.js pour la gestion des engins",
    subdesc: "Création d'API RESTful avec Laravel et gestion de PostgreSQL. Sécurisation des accès avec un système d'authentification et gestion des rôles.",
    logo: "/assets/react-logo.png",
    logoStyle: { backgroundColor: "#61DAFB" },
    spotlight: "/assets/marsa-maroc-spotlight.jpg",
    texture: "/assets/marsa-maroc-texture.jpg",
    tags: [
      { name: "React.js", path: "/assets/react-logo.png" },
      { name: "Laravel", path: "/assets/laravel-logo.png" },
      { name: "PostgreSQL", path: "/assets/postgresql-logo.png" }
    ],
    href: "#"
  },
   {
    title: "Application scolaire",
    desc: "Développement d'une application de gestion scolaire avec Java et JavaFX",
    subdesc: "Mise en œuvre de l'approche MVC et création d'un tableau de bord interactif.",
    logo: "/assets/java-logo.png",
    logoStyle: { backgroundColor: "#ED8B00" },
    spotlight: "/assets/school-app-spotlight.jpg",
    texture: "/assets/school-app-texture.jpg",
    tags: [
      { name: "Java", path: "/assets/java-logo.png" },
      { name: "JavaFX", path: "/assets/javafx-logo.png" },
      { name: "MVC", path: "/assets/mvc-logo.png" }
    ],
    href: "#"
  }
 
] 