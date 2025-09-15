
export interface ListItem {
    id: number,
    title: string,
    amount: number,
    date: Date,
}

export interface NewItemInput {
    day: number,
    title: string,
    amount: number
}

export interface RecurringListItem {
    id: number,
    title: string,
    amount: number,
    startDate: Date,
    endDate: Date | undefined,
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
const MONTH_LENGTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const GetCurrentMonth = () => new Date(Date.now()).getMonth()
export const GetCurrentYear = () => new Date(Date.now()).getFullYear()

export function GetMonthStr(n: number): string {
    return MONTHS[n]
}

export function GetMonthLength(n: number): number {
    return MONTH_LENGTHS[n]
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