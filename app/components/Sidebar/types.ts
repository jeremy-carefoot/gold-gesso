export type SidebarItem = {
    id: string;
    label: string;
    icon: string;
};

export type SidebarProps = {
    items: SidebarItem[];
    activeSection: string;
};
