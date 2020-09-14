export interface BookResponse {
  key: string;
  description?: Created | string;
  created: Created;
  title: string;
  covers?: number[];
  first_publish_date?: string;
  latest_revision: number;
  last_modified: Created;
  authors?: Author[];
  type: KeyClass;
  subjects?: string[];
  revision: number;
  subtitle?: string;
  lc_classifications?: string[];
  links?: Link[];
  subject_places?: string[];
  subject_people?: string[];
  excerpts?: Excerpt[];
  subject_times?: string[];
}

export type Author =
  | {
      type: KeyClass;
      author: KeyClass;
    }
  | KeyClass;

export interface KeyClass {
  key: string;
}

export interface Created {
  type: TypeEnum;
  value: string;
}

export enum TypeEnum {
  TypeDatetime = "/type/datetime",
  TypeText = "/type/text",
}

export interface Excerpt {
  comment: string;
  excerpt: string;
  author: KeyClass;
}

export interface Link {
  url: string;
  type: KeyClass;
  title: string;
}
