import { useMemo } from "react";
import { GetMonthStr, type ListItem, type RecurringListItem } from "../helpers/global";

export function ExpenseListNormal({ items, date }: { items: ListItem[], date: Date }) {
    const uniqueDates = useMemo(() => {
        return [...new Set(items.map(e => e.date.getDate()))]
    }, [items, date])

    return (
        <div className="flex flex-col gap-4 min-w-[400px]">
            <div className="text-center">
                Normál kiadások {date.getFullYear()} {GetMonthStr(date.getMonth())}
            </div>
            {uniqueDates.map(currDate =>
                <div className="flex outline outline-neutral-500/50 rounded-md shadow-md text-sm">
                    {/* vertical day bar */}
                    <div className="w-10 min-h-10 flex justify-center py-2 border-r border-black/20">{currDate}</div>

                    {/* one day block */}
                    <TransactionsInDay
                        transactions={items.filter(e => e.date.getDate() === currDate)}
                    />
                </div>
            )}
        </div>
    )
}

export function ExpenseListRecurring({ items }: { items: RecurringListItem[] }) {
    return (
        <div className="flex flex-col gap-4 min-w-[400px]">
            <div className="text-center">
                Havi kiadások
            </div>
            <div className="">
                {
                    items.map(t =>
                        <div className="">{t.title} - {t.amount}ft ({t.startDate.toDateString()} {t.endDate && t.endDate.toDateString()})</div>
                    )
                }
            </div>
        </div>
    )
}

function TransactionsInDay({ transactions }: { transactions: ListItem[] }) {
    return (
        <div className="flex flex-col py-2 w-full gap-1.5 justify-center">
            {
                transactions.map((t, idx) =>
                    <>
                        {idx !== 0 && <div className="w-full border-b opacity-20" />}
                        <div className="flex justify-between w-full px-3">
                            <div>{t.title}</div>
                            <div style={{color: t.amount < 0 ? "darkred" : "darkgreen"}}>{t.amount > 0 && "+"}{t.amount}.-</div>
                        </div>
                    </>
                )
            }
        </div>
    )
}