import { useEffect, useMemo, useState } from "react"
import DatePicker from "./components/DatePicker"
import { GetCurrentYear, MONTHS, YEARS, type ListItem, type NewItemInput, type RecurringListItem } from "./helpers/global"
import NewEntryInput from "./components/NewEntryInput"
import icon1 from "./assets/money-euro-circle-line.svg"
import icon2 from "./assets/arrow-go-forward-line.svg"
import { ExpenseListNormal, ExpenseListRecurring } from "./components/ExpenseList"
import axios from "axios"

function App() {

  const [isDatePickerShown, setIsDatePickerShown] = useState(false)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(new Date(Date.now()).getMonth())
  const [_selectedYearIdx, setSelectedYearIdx] = useState(YEARS.indexOf(GetCurrentYear()))

  const selectedYear = useMemo(() => YEARS[_selectedYearIdx], [_selectedYearIdx])
  const selectedDate = useMemo(() => new Date(selectedYear, selectedMonthIdx, 1), [selectedYear, selectedMonthIdx])

  const [allNormalData, setAllNormalData] = useState<ListItem[]>([])
  const [allRecurringData, setAllRecurringData] = useState<RecurringListItem[]>([])

  const normalTransactionsThisMonth = useMemo(() => {
    const ret = allNormalData.filter(r => r.date.getMonth() == selectedMonthIdx)
    return ret.sort((f, g) => f.date.getDate() - g.date.getDate())
  }, [allNormalData, selectedMonthIdx])

  const recurringTransactionsThisMonth = useMemo(() => {
    return allRecurringData.filter(r => {
      /* if it ends sometime */
      if (r.endDate !== undefined && r.endDate !== null) {
        return selectedDate.getTime() > r.startDate.getTime() && selectedDate.getTime() < r.endDate.getTime()
      }
      /* if it goes on indefinitely */
      else {
        return selectedDate.getTime() > r.startDate.getTime()
      }
    })
  }, [selectedDate, allRecurringData])

  function recordNewNormalEntry(item: NewItemInput) {
    axios.post("/api/postNormal.php", {
      title: item.title,
      date: `${selectedYear}-${selectedMonthIdx + 1}-${item.day <= 0 ? 1 : item.day}`,
      amount: item.amount,
    })
      .then(() => refreshAll())
  }

  function recordNewRecurringEntry(item: NewItemInput) {
    axios.post("/api/postRecurring.php", {
      title: item.title,
      amount: item.amount,
      date: `${selectedYear}-${selectedMonthIdx + 1}-${item.day <= 0 ? 1 : item.day}`,
    })
      .then(e => refreshAll())
  }

  interface requestReturnNormal {
    title: string,
    date: string,
    amount: string,
  }

  interface requestReturnRecurring {
    title: string,
    amount: string,
    startDate: string,
    endDate: string | undefined,
  }

  function refreshAll() {
    axios.get("/api/getNormal.php")
      .then(e => {
        setAllNormalData(e.data.map((m: requestReturnNormal) => ({
          title: m["title"],
          date: new Date(parseInt(m["date"].split('-')[0]), parseInt(m["date"].split('-')[1]) - 1, parseInt(m["date"].split('-')[2])),
          amount: parseInt(m["amount"])
        })) as ListItem[])
      })
  }

  /* get all data on start */
  useEffect(refreshAll, [])


  return (
    <>
      <div id="main" className="p-12 w-full min-h-screen absolute top-0 left-0 flex items-center flex-col gap-4">
        {/* Top date display */}
        <div className="flex flex-col gap-[inherit] justify-center items-center max-w-4xl w-full">
          <div
            onClick={() => setIsDatePickerShown(true)}
            className={`
            mb-10
            text-center capitalize text-lg tracking-wide py-4 px-8 w-fit shadow-md rounded-xl border border-neutral-500/10 cursor-pointer
            hover:scale-[102%] duration-100 ring ring-black/10 hover:ring-[var(--primary)] hover:ring-2 hover:shadow-lg hover:text-[var(--primary)]
          `}>
            {selectedYear}. {MONTHS[selectedMonthIdx]}
          </div>
          <DatePicker
            isShown={isDatePickerShown}
            close={() => setIsDatePickerShown(false)}
            inputMonthIndex={selectedMonthIdx}
            inputYearIndex={_selectedYearIdx}
            setMonthCallback={setSelectedMonthIdx}
            setYearCallback={setSelectedYearIdx} />
          <NewEntryInput
            callback={recordNewNormalEntry}
            text="Új egyszeri tranzakció"
            iconSrc={icon1}
            selectedMonthIdx={selectedMonthIdx}
          />
          <NewEntryInput
            callback={recordNewRecurringEntry}
            text="Új havi tranzakció"
            iconSrc={icon2}
            selectedMonthIdx={selectedMonthIdx}
          />
          <ExpenseListRecurring
            items={recurringTransactionsThisMonth}
          />
          <ExpenseListNormal
            date={selectedDate}
            items={normalTransactionsThisMonth}
          />
        </div>
      </div>
    </>
  )
}

export default App
