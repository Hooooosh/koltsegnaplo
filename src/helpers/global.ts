
export type ListItemCollection = ListItem[]

export interface ListItem {
    id: number,
    title: string,
    amount: number,
    date: Date,
}

export interface NewListItemInput {
    day: number,
    title: string,
    amount: number
}

export interface RecurringListItem {
    id: number,
    title: string,
    amount: number,
    startDate: Date | undefined,
    endDate: Date | undefined,
}

export interface NewRecurringListItemInput {
    id: number,
    title: string,
    amount: number,
}

export const MONTHS = ["január", "február", "március", "április", "május", "június", "július", "augusztus", "szeptember", "október", "november", "december"]
export const YEARS: number[] = (() => {
    const years = []
    const currentYear = new Date(Date.now()).getFullYear()
    for (let i = 2025; i <= currentYear; i++) {
        years.push(i)
    }
    return years;
})();

export const GetCurrentMonth = () => new Date(Date.now()).getMonth()
export const GetCurrentYear = () => new Date(Date.now()).getFullYear()

export function GetMonthStr(n: number): string {
    return MONTHS[n]
}

export interface ButtonProps {
    onClick?: () => void,
    value: string | number,
}

export interface RadioItem {
    id: number,
    props: ButtonProps
}

export interface CheckboxItem {
    id: number,
    isChecked: boolean,
    props: ButtonProps
}