import type { CheckboxItem } from "../helpers/global";
import Button from "./Button";



export function CheckboxCollection({ data, callback }: { data: CheckboxItem[]; callback: (e: CheckboxItem[]) => void; }) {

    function clicked(e: CheckboxItem) {
        const newItems = [...data];
        newItems.forEach(q => {
            if (e.id === q.id) {
                q.isChecked = !q.isChecked;
            }
        });
        callback(newItems);
    }

    return data.map(e =>
        <Button
            htmlKey={e.id.toString()}
            value={e.props.value.toString()}
            onClick={() => clicked(e)}
            latchBehaviour
            isLatchActive={e.isChecked}
        />
    )
}
