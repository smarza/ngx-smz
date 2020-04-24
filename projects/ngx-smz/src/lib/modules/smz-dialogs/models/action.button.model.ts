export interface IActionButton
{
    icon: string;
    iconPos: string;
    label: string;
    onClick: (data: any) => void;
    style: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger';
    styleClass: string;

}
