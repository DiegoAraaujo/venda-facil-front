export interface Subcategory {
  id: number;
  name: string;
}

export interface CategoryWithSubcategories {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface CategorySimple {
  id: number;
  name: string;
}
