export type Routes = Array<{
    path: string;
    component: React.FunctionComponent<any>;
    exact?: boolean;
    children?: Routes;
}>
export interface LinkParameter {
    href: string;
    name: string;
}
export type Colors = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink' | 'white' | undefined;
export type IAM = {
    id: number;
    name: string;
    email: string;
    organization: string;
    is_root: boolean;
}
