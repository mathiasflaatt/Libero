export interface AuthorResponse {
  name: string;
  links?: Link[];
  created: Created;
  personal_name?: string;
  alternate_names?: string[];
  photos?: number[];
  last_modified: Created;
  latest_revision: number;
  key: string;
  birth_date?: string;
  remote_ids?: RemoteIDS;
  type: TypeClass;
  revision: number;
  bio?: Created | string;
  death_date?: string;
  wikipedia?: string;
  fuller_name?: string;
}

export interface Created {
  type: TypeEnum;
  value: string;
}

export enum TypeEnum {
  TypeDatetime = "/type/datetime",
  TypeText = "/type/text",
  TypeAuthor = "/type/author",
  TypeLink = "/type/link",
}

export interface TypeClass {
  key: TypeEnum;
}

export interface Link {
  url: string;
  type: TypeClass;
  title: string;
}

export interface RemoteIDS {
  [key: string]: string;
}
