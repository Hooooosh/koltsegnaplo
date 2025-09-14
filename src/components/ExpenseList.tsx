import { GetMonthStr, type ListItemCollection } from "../helpers/global";

export default function ExpenseList(items: ListItemCollection, date: Date){
    
    return (
        <>
            <div className="text-xl">
                Kiadások {date.getFullYear()} {GetMonthStr(date.getMonth())} alatt:
            </div>
        </>
    )
}