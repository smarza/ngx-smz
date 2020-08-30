export interface SmzFormsTemplate
{
    extraSmall?: SmzResponsive;
    small?: SmzResponsive;
    medium?: SmzResponsive;
    large?: SmzResponsive;
    extraLarge?: SmzResponsive;

}

export interface SmzResponsive
{
    row?: 'col-1' | 'col-2' | 'col-3' | 'col-4' | 'col-5' | 'col-6' | 'col-7' | 'col-8' | 'col-9' | 'col-10' | 'col-11' | 'col-12' | 'col' | 'col-auto';
    verticalAlignment?: 'align-items-start' | 'align-items-center' | 'align-items-end';
    horizontalAlignment?: 'justify-content-start' | 'justify-content-center' | 'justify-content-end' | 'justify-content-around' | 'justify-content-between';

}

export namespace SmzBreakpoints
{
    export const Breakpoint =
    {
        EXTRA_SMALL: 'extraSmall',
        SMALL: 'small',
        MEDIUM: 'medium',
        LARGE: 'large',
        EXTRA_LARGE: 'extraLarge',
    }

    export const Tags =
    {
        [Breakpoint.EXTRA_SMALL]: '',
        [Breakpoint.SMALL]: 'sm-',
        [Breakpoint.MEDIUM]: 'md-',
        [Breakpoint.LARGE]: 'lg-',
        [Breakpoint.EXTRA_LARGE]: 'xl-',
    }

    export const ReplacePositions =
    {
        row: 5,
        verticalAlignment: 13,
        horizontalAlignment: 17,
    }
}