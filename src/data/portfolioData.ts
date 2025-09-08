export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  image: string;
  year: number;
}

export interface Accolade {
  title: string;
  organization: string;
  date: string; 
  link: string;
}

export interface Affiliation {
  name: string;
  role: string;
  description: string;
  logo: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export const projects: Project[] = [
  {
    title: "PaintedPages",
    description: "Create and share beautiful memories with PaintedPages - the free scrapbook app for capturing and sharing life's special moments. Invite friends and loved ones to add their own touches to your pages, creating shared stories that connect hearts across the world. Paint your story with others, one page at a time.",
    technologies: ["ReactJS", "Netlify", "TailwindCSS", "Supabase", "Vercel"],
    githubUrl: "https://github.com/lukegabriel520/PaintedPages",
    demoUrl: "https://paintedpages.netlify.app",
    image: "/projects/PaintedPages.png",
    year: 2025
  },
  {
    title: "CertiFi",
    description: "CertiFi is a digital verification service that proves whether documents are real or fake. The platform works by having official organizations upload authentic documents, which CertiFi then converts into unique digital signatures and stores permanently on blockchain technology. When someone needs to verify a document later, they submit it to CertiFi, which creates a new digital signature and compares it to the original stored version. If the signatures match perfectly, the document is genuine; if they don't match, it's been altered or forged.",
    technologies: ["Motoko", "ReactJS", "ICP", "Linux", "TailwindCSS"],
    githubUrl: "https://github.com/lukegabriel520/CertiFi",
    demoUrl: "https://github.com/lukegabriel520/CertiFi",
    image: "/projects/CertiFi.png",
    year: 2024
  },
  {
    title: "Alerto: ESP32 Fire System",
    description: "Alerto is your ESP32-powered fire system that intends to shelter your worries from impeding fire disasters. Equipped with MQ6 Sensor for early-gas detection, alongside with Fire Sensor for the infrared readings that will eventually output a ringing buzz when fire is detected. Arduino software was used to ensure compatability with the system.",
    technologies: ["Arduino", "ESP32", "C++", "Sensors", "Electronics"],
    githubUrl: "https://github.com/lukegabriel520/ESP32-Fire-System",
    demoUrl: "https://wokwi.com/projects/421769575820944385?fbclid=IwY2xjawLOwtpleHRuA2FlbQIxMABicmlkETF2QVBLdm5ZdnE1S2sxMjlNAR5_69_zApRMp-1Tvn7LzxwozwfF1_wX0bz2mXV4Zk9-qS6OlpLWKoqgn_lCMQ_aem_TF7J5ACo5rqG9ePv-Xy0Ow",
    image: "/projects/FireSystem.png",
    year: 2024
  },
  {
    title: "Banking System",
    description: "A demonstration system that lets customers do all their banking safely and quickly. Built with languages like C, C++, and Java, the system allows users to check their account balance, withdraw and deposit money, transfer funds to other accounts, and pay bills automatically. Customers can create different types of accounts like savings or checking, view their transaction history to see where their money went, and apply for loans directly through the platform.",
    technologies: ["C", "C++", "Java"],
    githubUrl: "https://github.com/lukegabriel520/C-ICC-BankingSystem",
    demoUrl: "https://github.com/lukegabriel520/C-ICC-BankingSystem",
    image: "/projects/BankingSystem.png",
    year: 2023
  }
].sort((a, b) => b.year - a.year);

export const accolades: Accolade[] = [
  {
    title: "Google Data Analytics Certificate",
    organization: "Google",
    date: "2025-09-07",
    link: "https://www.coursera.org/account/accomplishments/specialization/Q1XCPBYLIL1L",
    logo: "/logos/google.png"
  },
  {
    title: "Data Science Tools and Fundamentals",
    organization: "International Business Machines",
    date: "2025-08-26",
    link: "https://courses.cognitiveclass.ai/certificates/ff40c0232a6f4e2b9b7b390a498fee55",
    logo: "/logos/ibm.png"
  },
  {
    title: "DOST Spark-Up Challenge Qualifier",
    organization: "Department of Science and Technology",
    date: "2025-07-11",
    link: "https://jumpshare.com/s/0CDwPC6WCfOtppP2yJpE",
    logo: "/logos/dost.png"
  },
  {
    title: "WCHL International Hackathon Qualifier",
    organization: "World Computer Hacker League",
    date: "2025-06-20",
    link: "",
    logo: "/logos/wchl.png"
  },
  {
    title: "ICP Hackathon Finalist",
    organization: "ICP Philippines",
    date: "2025-06-10",
    link: "leave it blank",
    logo: "/logos/icp.png"
  },
  {
    title: "React Foundations",
    organization: "Vercel",
    date: "2025-04-26",
    link: "https://www.linkedin.com/in/lukelumakin/details/certifications/",
    logo: "/logos/vercel.png"
  },
  {
    title: "GitHub Foundations",
    organization: "GitHub",
    date: "2025-04-26",
    link: "https://www.datacamp.com/statement-of-accomplishment/track/b3c3336c37045f13cd94aac35315daf73bfe9a2f?raw=1",
    logo: "/logos/github.png"
  },
  {
    title: "Machine Learning Foundation",
    organization: "Amazon Web Services",
    date: "2025-03-17",
    link: "https://www.credly.com/earner/earned/share/484364f4-9d44-4943-8016-6545616eea42",
    logo: "/logos/amazon.png"
  },
  {
    title: "AWS Cloud Quest: Cloud Practitioner",
    organization: "Amazon Web Services",
    date: "2025-05-16",
    link: "https://www.credly.com/badges/f7dcd56d-4f7d-4ab2-b236-ffa37b90055b/linked_in?t=swbnbh",
    logo: "/logos/amazon.png"
  },
  {
    title: "Python Data Associate",
    organization: "DataCamp",
    date: "2025-07-07",
    link: "https://www.linkedin.com/in/lukelumakin/details/certifications/",
    logo: "/logos/datacamp.png"
  },
  {
    title: "Associate Data Analyst",
    organization: "DataCamp",
    date: "2025-02-27",
    link: "https://www.datacamp.com/certificate/DAA0013375515980",
    logo: "/logos/datacamp.png"
  },
  {
    title: "SQL Associate",
    organization: "DataCamp",
    date: "2025-03-24",
    link: "https://www.datacamp.com/certificate/SQA0010837343136",
    logo: "/logos/datacamp.png"
  },
  {
    title: "Cloud Practitioner",
    organization: "DataCamp",
    date: "2025-02-08",
    link: "https://www.datacamp.com/statement-of-accomplishment/track/9c4a8305f5a87c7029ff8951ed09c73d46c4da21?raw=1",
    logo: "/logos/datacamp.png"
  },
  {
    title: "Legacy JavaScript Algorithms and Data Structures",
    organization: "FreeCodeCamp",
    date: "2025-01-26",
    link: "https://www.freecodecamp.org/certification/sausage520/javascript-algorithms-and-data-structures",
    logo: "/logos/freecodecamp.png"
  },
  {
    title: "DataCamp Scholar",
    organization: "DataCamp",
    date: "2025-01-27",
    link: "https://www.facebook.com/share/p/1FwkatZSzm/",
    logo: "/logos/datacamp.png"
  },
  {
    title: "DOST-SEI Scholar",
    organization: "Department of Science and Technology",
    date: "2024-06-20",
    link: "https://2024results.science-scholarships.ph",
    logo: "/logos/dost.png"
  },

  {
    title: "DLSU Dasmarinas Research Conference Qualifier",
    organization: "De La Salle University",
    date: "2024-05-16",
    link: "leave it blank",
    logo: "/logos/dlsu.png"
  },
  {
    title: "UP ALCHEMES Research Fair Finalist",
    organization: "University of the Philippines",
    date: "2024-02-12",
    link: "leave it blank",
    logo: "/logos/up.png"
  },
  {
    title: "SEAMO Young Scientists Recipient",
    organization: "Southeast Asian Mathematical Olympiad Society",
    date: "2024-02-12",
    link: "leave it blank",
    logo: "/logos/seamo.png"
  },
  {
    title: "Division Science and Technology Fair",
    organization: "DEPED",
    date: "2023-11-14",
    link: "leave it blank",
    logo: "/logos/deped.png"
  }
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const affiliations: Affiliation[] = [
    {
      name: "DevCon Philippines",
      role: "Member",
      description: "Assisted in logistics and operations for tech events and community programs.",
      logo: "/affiliations/DevCon.png"
    },
    {
      name: "The BLOKC",
      role: "Cohort Mentee",
      description: "Trained in Web3 development with focus on Base and Solidity smart contracts.",
      logo: "/affiliations/BLOKC.png"
    },
    {
      name: "Google Developer Students Club",
      role: "Member",
      description: "Joined workshops, seminars and coding events on Google technologies and cloud tools.",
      logo: "/affiliations/GDSC.png"
    },
    {
      name: "Junior Blockchain Education Consortium of the Philippines",
      role: "Finance",
      description: "Underwent finance mentoring and budgeting for club-related student initiatives.",
      logo: "/affiliations/JBECP.png"
    },
    {
      name: "Microsoft Student Community",
      role: "Member",
      description: "Engaged in learning sessions on Azure, GitHub, and Microsoft tools.",
      logo: "/affiliations/MSC.png"
    },
    {
      name: "AWS Cloud Club",
      role: "Member",
      description: "Participated in cloud computing activities using AWS services and labs.",
      logo: "/affiliations/AWS.png"
    }
  ];

export const testimonials: Testimonial[] = [
    {
      name: "James Larios",
      role: "Junior Java Developer",
      content: "When I got stuck debugging Python, Luke stepped in and explained each error clearly. His guidance helped me spot mistakes I didn't even know I was making.",
      avatar: "/people/JamesLarios.png"
    },
    {
      name: "Neil Balantac",
      role: "Full-Stack Developer",
      content: "Thanks to Luke, I finally understood how to build a responsive website from scratch. He explains things simply but effectively, perfect for someone just starting out.",
      avatar: "/people/NeilBalantac.png"
    },
    {
      name: "James Matienzo",
      role: "AI Enthusiast",
      content: "I've always been interested in AI, and Luke introduced me to ML in a way that made sense. He connects the dots between theory and code really well.",
      avatar: "/people/JamesMatienzo.png"
    },
    {
      name: "Julius Miranda",
      role: "Aspiring Data Scientist",
      content: "Explaining HTML and CSS isn't always easy, but Luke made it feel intuitive. His teaching style adapts to what you need, not just what the topic is.",
      avatar: "/people/JuliusMiranda.png"
    },
    {
      name: "Jimnoeri Enriquez",
      role: "UI/UX Designer",
      content: "He introduced me to GitHub and taught me how to properly manage my code. What stood out was how patient he was even when I needed things repeated.",
      avatar: "/people/JimnoeriEnriquez.png"
    },
    {
      name: "Charles Chua",
      role: "Game Developer",
      content: "We worked together on a mini-game in JavaScript, and I learned more than I expected. Luke doesn't just give solutions, he makes sure you understand why it works.",
      avatar: "/people/CharlesChua.png"
    }
  ];

export const personalInfo = {
  name: "Luke Lumakin",
  role: "Associate Data Analyst",
  slogan: "I like building things through Mechatronics, IoT, and AI/ML, eventually to extend human capabilities. Innovate, lest, reproducible brilliance.",
  languages: ["Filipino", "English"],
  status: "Blockchain Intern",
  school: "Pamantasan ng Lungsod ng Maynila (PLM)",
  email: "lukegabriel520@gmail.com",
  github: "https://github.com/lukegabriel520",
  linkedin: "https://linkedin.com/in/lukelumakin",
  resume: "https://lukelumakin.tiiny.site"
};
