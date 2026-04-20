export interface Project {
  id: string;
  name: string;
  category: string;
  year: string;
  imageUrl: string;
  description?: string;
  role?: string;
  credits?: string;
  focus?: string;
  heroStyle?: 'fullbleed' | 'contained';
  objectPosition?: string;
}

export interface NavItem {
  label: string;
  href: string;
}