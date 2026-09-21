import catalogRaw from './fullCatalog.json';

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  image: string;
  remoteImage: string;
  isMiniCategory?: boolean;
}

export interface Subcategory {
  name: string;
  category: string;
  pageUrl: string;
  description: string;
  image: string;
  designsCount: number;
  typesCount: number;
  miniCategoriesCount?: number;
  designs: CatalogItem[];
  types: CatalogItem[];
}

export interface MainCategory {
  name: string;
  id: string;
  subcategories: Subcategory[];
}

export const FULL_CATALOG: MainCategory[] = catalogRaw as MainCategory[];
