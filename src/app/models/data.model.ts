import { SimpleEntity, SimpleNamedEntity, SimpleParentEntity } from 'ngx-smz-dialogs';

export interface LocationsDropdownData
{
    regions: SimpleNamedEntity[];
    states: SimpleParentEntity<string>[];
    mesoregions: SimpleParentEntity<string>[];
    microregions: SimpleParentEntity<string>[];
    cities: SimpleParentEntity<string>[];
}

export interface LocationResponseDialog
{
    region: SimpleNamedEntity;
    state: SimpleNamedEntity;
    mesoregion: SimpleNamedEntity;
    microregion: SimpleNamedEntity;
    city: SimpleNamedEntity;
}

export interface LocationFlatResponseDialog
{
    regionId: string;
    stateId: string;
    mesoregionId: string;
    microregionId: string;
    cityId: string;
}

export interface Regiao
{
    id: number;
    nome: string;
    sigla: string;
}

export interface Estado
{
    id: number;
    nome: string;
    sigla: string;
    regiao: Regiao;
}

export interface Mesorregiao
{
    id: number;
    nome: string;
    UF: Estado;
}

export interface Microrregiao
{
    id: number;
    nome: string;
    mesorregiao: Mesorregiao;
}

export interface Municipio
{
    id: number;
    nome: string;
    microrregiao: Microrregiao;
}