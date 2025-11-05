export interface SubMenuItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  subMenu?: SubMenuItem[];
}
