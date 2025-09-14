import type { RadioItem } from "../helpers/global";
import Button from "./Button";

export interface RadioCollectionData {
    checkedItemId?: number,
    collection: RadioItem[],
}

export function RadioCollection({ data, callback }: { data: RadioCollectionData, callback: (e: RadioCollectionData) => void }) {

    function clicked(e: RadioItem) {
        const newCollection = { ...data }
        newCollection.checkedItemId = e.id
        callback(newCollection)
    }

    return data.collection.map(e =>
        <Button
            htmlKey={e.id.toString()}
            value={e.props.value.toString()}
            onClick={() => clicked(e)}
            latchBehaviour
            isLatchActive={data.checkedItemId === e.id}
        />
    )
}

/* <button
    key={e.id.toString()}
    className={`${data.checkedItemId === e.id && "checked"} shadow-sm hover:shadow-md bg-white cursor-pointer py-2.5 px-5 rounded-md text-center capitalize`}
    onClick={() => clicked(e)}>{e.props.value}</button> */