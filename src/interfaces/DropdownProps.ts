export interface DropdownOption {
    value: string ;
    label: string;
  }
  
 export interface DropdownProps {
    label: string;
    options: DropdownOption[];
    selected: string | number;
    onSelect: (value: string | number) => void;
  }
  