import { SimpleEntity, SimpleNamedEntity, SimpleParentEntity } from 'ngx-smz-dialogs';


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

export const MONTHS: SimpleNamedEntity[] = [
    { id: '1', name: 'Janeiro' },
    { id: '2', name: 'Fevereiro' },
    { id: '3', name: 'Março' },
    { id: '4', name: 'Abril' },
    { id: '5', name: 'Maio' },
    { id: '6', name: 'Junho' },
    { id: '7', name: 'Julho' },
    { id: '8', name: 'Agosto' },
    { id: '9', name: 'Setembro' },
    { id: '10', name: 'Outubro' },
    { id: '11', name: 'Novembro' },
    { id: '12', name: 'Dezembro' },
];

export const ZODIAC_PERIODS: SimpleNamedEntity[] = [
    { id: '1', name: '19 de janeiro a 15 de fevereiro' },
    { id: '2', name: '16 de fevereiro a 11 de março' },
    { id: '3', name: '12 de março a 18 de abril' },
    { id: '4', name: '19 de abril a 13 de maio' },
    { id: '5', name: '14 de maio a 19 de junho' },
    { id: '6', name: '20 de junho a 20 de julho' },
    { id: '7', name: '21 de julho a 9 de agosto' },
    { id: '8', name: '10 de agosto a 15 de setembro' },
    { id: '9', name: '16 de setembro a 30 de outubro' },
    { id: '10', name: '31 de outubro a 22 de novembro' },
    { id: '11', name: '23 de novembro a 29 de novembro' },
    { id: '12', name: '30 de novembro a 17 de dezembro' },
];

export const ZODIAC: SimpleNamedEntity[] = [
    { id: '1', name: 'Capricórnio' },
    { id: '2', name: 'Aquário' },
    { id: '3', name: 'Peixes' },
    { id: '4', name: 'Áries' },
    { id: '5', name: 'Touro' },
    { id: '6', name: 'Gêmeos' },
    { id: '7', name: 'Câncer' },
    { id: '8', name: 'Leão' },
    { id: '9', name: 'Virgem' },
    { id: '10', name: 'Libra' },
    { id: '11', name: 'Escorpião' },
    { id: '12', name: 'Serpentário' },
];
export const ZODIAC_LINKED: SimpleParentEntity<string>[] = ZODIAC.map(x => ({ ...x, parentId: x.id }));