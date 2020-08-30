import { Component, OnInit } from '@angular/core';
import { BaseFormControlComponent } from '../../models/base-form.component';

@Component({
    selector: 'smz-calendar',
    templateUrl: './calendar.component.html',
})
export class CalendarComponent extends BaseFormControlComponent implements OnInit
{
    public ptBr: any;

    constructor() { super(); }

    public ngOnInit(): void
    {
        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
            dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
            dayNamesMin: ["D","S","T","Qua","Qui","Sex","Sa"],
            monthNames: [ "Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro" ],
            monthNamesShort: [ "Jan", "Fev", "Mar", "Abr", "Mai", "Jun","Jul", "Ago", "Set", "Out", "Nov", "Dez" ],
            today: 'Hoje',
            clear: 'Limpar',
            dateFormat: 'dd/mm/yy',
            weekHeader: 'Sem'
        };
    }

}
