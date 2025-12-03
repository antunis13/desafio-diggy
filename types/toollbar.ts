import { Category } from "./category";

export interface ToolbarProps {
  categoryButtons: any[];
  onCategorySelect: (category: Category) => void;
  onClearFilters: () => void;
  inputName: string;
  onInputChange: (value: string) => void;
  onSearch: () => void;
}
