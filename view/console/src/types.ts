export interface LinkParameter {
    href: string;
    name: string;
}
export type Colors = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
export type IAM = {
    id: number;
    name: string;
    email: string;
    organization: string;
    is_root: boolean;
}
