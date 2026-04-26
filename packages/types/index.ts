// ─── Shared TypeScript interfaces ────────────────────────────────────────────
// These mirror the Prisma schema exactly (camelCase field names).
// Import in frontend or backend with: import type { Project } from '@mayur-devhub/types'

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string | null;
  techStack: string[];
  tags: string[];
  featured: boolean;
  repoUrl?: string | null;
  liveUrl?: string | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  description: string;
  techStack: string[];
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string | null;
  proficiency?: number | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  id: string;
  fullName: string;
  headline: string;
  bio?: string | null;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitterUrl?: string | null;
  resumeUrl?: string | null;
  yearsExperience?: number | null;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

// ─── API response shapes ──────────────────────────────────────────────────────

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginatedMeta;
}

export type ProjectListResponse = PaginatedResponse<Project>;
export type ExperienceListResponse = PaginatedResponse<Experience>;
export type SkillListResponse = PaginatedResponse<Skill>;
