export interface ProjectMediaItem {
  src: string;
  alt: string;
}

export interface ProjectMediaGroup {
  type: 'single' | 'grid';
  items: ProjectMediaItem[];
}

export interface ProjectSection {
  title?: string;
  description?: string[];
  collaborators?: string[];
  link?: { text: string; url: string };
  mediaGroups: ProjectMediaGroup[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  year?: string;
  imageUrl: string;
  heroImage: string;
  objectPosition?: string;
  description?: string | string[];
  role?: string;
  scope?: string[];
  collaborators?: string[];
  sections?: ProjectSection[];
  confidentialNotice?: string;
}

export interface NavItem {
  label: string;
  href: string;
}