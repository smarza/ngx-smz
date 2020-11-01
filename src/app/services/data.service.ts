import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import
    {
        Estado,
        LocationsDropdownData,
        Mesorregiao,
        Microrregiao,
        Municipio,
        Regiao
    } from '../models/data.model';
import { SimpleNamedEntity, SimpleParentEntity } from 'ngx-smz-dialogs';

@Injectable({ providedIn: 'root' })
export class DataService
{
    constructor(private http: HttpClient) { }

    public getLocationsDropdownData(): Observable<LocationsDropdownData>
    {
        return forkJoin([
            this.regioes(),
            this.estados(),
            this.mesorregioes(),
            this.microrregioes(),
            this.municipios()
        ]).pipe(
            map(results =>
            {
                const regioes = results[0];
                const estados = results[1];
                const mesorregioes = results[2];
                const microrregioes = results[3];
                const municipios = results[4];

                const regions: SimpleNamedEntity[] = regioes.map(x => ({
                    id: x.id.toString(),
                    name: `${x.nome} | ${x.sigla}`
                }));

                const states: SimpleParentEntity<string>[] = regioes.map(x => ({
                    parentId: x.id.toString(),
                    data: estados
                        .filter(e => e.regiao.id === x.id)
                        .map(e => ({ id: e.id.toString(), name: e.nome }))
                }));

                const mesoregions: SimpleParentEntity<string>[] = estados.map(x => ({
                    parentId: x.id.toString(),
                    data: mesorregioes
                        .filter(e => e.UF.id === x.id)
                        .map(e => ({ id: e.id.toString(), name: e.nome }))
                }));

                const microregions: SimpleParentEntity<string>[] = mesorregioes.map(
                    x => ({
                        parentId: x.id.toString(),
                        data: microrregioes
                            .filter(e => e.mesorregiao.id === x.id)
                            .map(e => ({ id: e.id.toString(), name: e.nome }))
                    })
                );

                const cities: SimpleParentEntity<string>[] = microrregioes.map(x => ({
                    parentId: x.id.toString(),
                    data: municipios
                        .filter(e => e.microrregiao.id === x.id)
                        .map(e => ({ id: e.id.toString(), name: e.nome }))
                }));

                return {
                    regions,
                    states,
                    mesoregions,
                    microregions,
                    cities
                };
            })
        );
    }

    private regioes(): Observable<Regiao[]>
    {
        return this.http
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/regioes`)
            .pipe(map((x: Regiao[]) => x));
    }

    private estados(): Observable<Estado[]>
    {
        return this.http
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
            .pipe(map((x: Estado[]) => x));
    }

    private mesorregioes(): Observable<Mesorregiao[]>
    {
        return this.http
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes`)
            .pipe(map((x: Mesorregiao[]) => x));
    }

    private microrregioes(): Observable<Microrregiao[]>
    {
        return this.http
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes`)
            .pipe(map((x: Microrregiao[]) => x));
    }

    private municipios(): Observable<Municipio[]>
    {
        return this.http
            .get(`https://servicodados.ibge.gov.br/api/v1/localidades/municipios`)
            .pipe(map((x: Municipio[]) => x));
    }
}
