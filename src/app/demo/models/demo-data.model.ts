import { SimpleEntity, SimpleNamedEntity } from 'ngx-smz-dialogs';


export interface DemoData {
    component: any;
    code: string;
}


export const MOODS: SimpleNamedEntity[] = [
    { id: '1', name: 'Feliz' },
    { id: '2', name: 'Triste' },
    { id: '3', name: 'Puto' },
    { id: '4', name: 'Energético' },
];

export const COLORS: SimpleNamedEntity[] = [
    { id: '1', name: 'Preto' },
    { id: '2', name: 'Branco' },
    { id: '3', name: 'Vermelho' },
    { id: '4', name: 'Azul' },
];