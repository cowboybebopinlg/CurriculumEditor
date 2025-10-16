export enum MediaFileType {
  Video = 'Video',
  Audio = 'Audio',
  Image = 'Image',
  Pdf = 'Pdf'
}

export interface MediaFile {
  id: string;
  name: string;
  type: MediaFileType;
  thumbnail?: string;
  orderNumber: number;
}

export interface Lesson {
  id: string;
  name: string;
  thumbnail?: string;
  orderNumber: number;
}

export interface Module {
  id: string;
  name: string;
  image?: string;
  isExpanded: boolean;
  lessons: Lesson[];
  mediaFiles: MediaFile[];
}

export interface Curriculum {
  id: string;
  name: string;
  image?: string;
  modules: Module[];
  organization?: string;
  author?: string;
  uploadDate?: string;
  status?: string;
}

export interface CurriculumListItem {
  id: string;
  name: string;
  modules: number;
  lessons: number;
  lastUpdated: string;
}
