// Output of api/search?author={...}

export interface SearchResponse {
  start: number;
  num_found: number;
  numFound: number;
  docs: Doc[];
}

export interface Doc {
  title_suggest: string;
  edition_key: string[];
  cover_i?: number;
  id_amazon?: string[];
  isbn: string[];
  has_fulltext: boolean;
  title: string;
  last_modified_i: number;
  edition_count: number;
  publisher: string[];
  author_name: string[];
  cover_edition_key?: string;
  publish_year: number[];
  first_publish_year: number;
  key: string;
  text: string[];
  publish_date: string[];
  author_key: string[];
  type: Type;
  seed: string[];
  ebook_count_i: number;
  ia?: string[];
  oclc?: string[];
  contributor?: string[];
  subject?: string[];
  ddc?: string[];
  publish_place?: string[];
  lcc?: string[];
  public_scan_b?: boolean;
  language?: string[];
  lccn?: string[];
  author_alternative_name?: string[];
  person?: string[];
  id_librarything?: string[];
  id_goodreads?: string[];
  id_overdrive?: string[];
  ia_loaded_id?: string[];
  lending_identifier_s?: string;
  ia_collection_s?: string;
  ia_box_id?: string[];
  lending_edition_s?: string;
  printdisabled_s?: string;
  place?: string[];
  id_google?: string[];
  first_sentence?: string[];
  id_alibris_id?: string[];
  id_paperback_swap?: string[];
  id_depósito_legal?: string[];
  id_amazon_ca_asin?: string[];
  id_amazon_it_asin?: string[];
  id_amazon_co_uk_asin?: string[];
  id_amazon_de_asin?: string[];
  time?: string[];
  id_scribd?: string[];
  id_isfdb?: string[];
  id_wikidata?: string[];
}

export enum Type {
  Work = "work",
}
