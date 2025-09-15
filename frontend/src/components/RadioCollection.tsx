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

    return data.collection.map((e, idx) =>
        <Button
            key={idx.toString()}
            value={e.props.value.toString()}
            onClick={() => clicked(e)}
            latchBehaviour
            isLatchActive={data.checkedItemId === e.id}
        />
    )
}
