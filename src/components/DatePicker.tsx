import { useEffect, useState } from "react"
import { MONTHS, YEARS, type RadioItem } from "../helpers/global";
import { RadioCollection, type RadioCollectionData } from "./radioCollection";
import CardWrapper from "./CardWrapper";

export default function DatePicker({ isShown = false, close, inputMonthIndex, inputYearIndex, setMonthCallback, setYearCallback }:
    {
        isShown: boolean;
        close: () => void;
        inputMonthIndex?: number;
        inputYearIndex?: number;
        setMonthCallback: (n: number) => void,
        setYearCallback: (n: number) => void,
    }
) {

    /* 0-2025, 1-2026 ... */
    const DEFAULT_YEAR_PICKER_DATA: RadioItem[] = YEARS.map((e, idx) => ({
        id: idx,
        props: {
            value: e
        }
    }))
    /* 0-jan, 1-feb ... */
    const DEFAULT_MONTH_PICKER_DATA: RadioItem[] = MONTHS.map((e, idx) => ({
        id: idx,
        props: {
            value: e
        }
    }))

    /* Default to current year and month */
    const [_yearPickerData, setYearPickerData] = useState<RadioCollectionData>({
        checkedItemId: inputYearIndex,
        collection: DEFAULT_YEAR_PICKER_DATA
    })
    const [_monthPickerData, setMonthPickerData] = useState<RadioCollectionData>({
        checkedItemId: inputMonthIndex,
        collection: DEFAULT_MONTH_PICKER_DATA
    })

    /* Set picker's internal values to match inputMonthIndex and inputYearIndex */
    function updateDataFromOutside() {
        if (inputMonthIndex != undefined && inputYearIndex != undefined) {
            setYearPickerData({ ..._yearPickerData, checkedItemId: inputYearIndex })
            setMonthPickerData({ ..._monthPickerData, checkedItemId: inputMonthIndex })
        }
    }

    /* Update picker's data if it changes from outside and it's closed */
    useEffect(() => {
        if (!isShown) {
            updateDataFromOutside()
        }
    }, [inputMonthIndex, inputYearIndex])

    /* Get data from initial outside value on mount */
    useEffect(updateDataFromOutside, [])

    /*  */
    function submit() {
        if (_yearPickerData.checkedItemId !== undefined && _monthPickerData.checkedItemId !== undefined) {
            setMonthCallback(_monthPickerData.checkedItemId)
            setYearCallback(_yearPickerData.checkedItemId)

            close()
        }
    }

    /* Reset month upon selecting a new year */
    useEffect(() => {
        if (isShown) {
            setMonthPickerData({ ..._monthPickerData, checkedItemId: undefined })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_yearPickerData])

    /* Only need to submit when clicking a month, clicking a year will reset month */
    useEffect(() => {
        if (isShown) {
            submit()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [_monthPickerData])

    return (
        <div
            className="z-50 duration-300 fixed flex flex-col justify-center items-center top-0 left-0 w-screen h-screen backdrop-blur-xs bg-black/5"
            style={{
                pointerEvents: isShown ? "all" : "none",
                opacity: isShown ? 1 : 0,
            }}
        >
            <div className="-translate-y-6">
                <CardWrapper title="Intervallum választás">
                    <div className="bg-gray-500/5 flex flex-row gap-8 px-12 py-12">
                        <div id="yearPicker" className="min-w-[20px] grid gap-2">
                            <RadioCollection data={_yearPickerData} callback={setYearPickerData} />
                        </div>
                        <div className="w-px bg-neutral-500/20 rounded-full my-3"></div>
                        <div id="monthPicker" className="grid gap-2 grid-cols-2">
                            <RadioCollection data={_monthPickerData} callback={setMonthPickerData} />
                        </div>
                    </div>
                </CardWrapper>
            </div>
        </div>
    )
}

