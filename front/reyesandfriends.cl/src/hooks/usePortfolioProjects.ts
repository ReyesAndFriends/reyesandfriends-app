import { useState } from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  client: string;
  image: string;
}

const initialProjects: Project[] = [
  {
    id:1,
    title: "Discord AbbyBot",
    description: "Bot para Discord con fines de entretenimiento y gestión de servidores.",
    category: "Entretenimiento",
    status: "EN DESARROLLO",
    client: "Reyes&Friends",
    image: "/img/projects/abbybot_bot.png",
  }
];

export const usePortfolioProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const filterProjects = (category: string) => {
    setSelectedCategory(category);
    if (category === "Todos") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter((project) => project.category === category));
    }
  };

  return { projects: filteredProjects, filterProjects, selectedCategory };
};
