import { useMemo, useState } from "react"
import DatePicker from "./components/DatePicker"
import { GetCurrentYear, MONTHS, YEARS } from "./helpers/global"
import NewEntryInput from "./components/NewEntryInput"
import NewRecurringEntryInput from "./components/NewRecurringEntryInput"

function App() {

  const [isDatePickerShown, setIsDatePickerShown] = useState(false)
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(new Date(Date.now()).getMonth())
  const [_selectedYearIdx, setSelectedYearIdx] = useState(YEARS.indexOf(GetCurrentYear()))

  const selectedYear = useMemo(() => YEARS[_selectedYearIdx], [_selectedYearIdx])

  function closeDatePicker() {
    setIsDatePickerShown(false)
  }

  return (
    <>
      <div id="main" className="p-12 fixed top-0 left-0 w-screen h-screen flex items-center flex-col gap-4">
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
            close={closeDatePicker}
            inputMonthIndex={selectedMonthIdx}
            inputYearIndex={_selectedYearIdx}
            setMonthCallback={setSelectedMonthIdx}
            setYearCallback={setSelectedYearIdx} />
          <NewEntryInput callback={() => { }} />
          <NewRecurringEntryInput callback={() => { }} />
        </div>
      </div>
    </>
  )
}

export default App
