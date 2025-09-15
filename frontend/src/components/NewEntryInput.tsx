import { useState } from "react";
import { GetMonthLength, type NewItemInput } from "../helpers/global";
import CardWrapper from "./CardWrapper";
import { Input } from "./Input";
import Button from "./Button";

export default function NewEntryInput(
  { callback, text, iconSrc, selectedMonthIdx }:
    {
      callback: (e: NewItemInput) => void,
      text: string, /* card title */
      iconSrc: string,
      selectedMonthIdx: number, /* for clamping day number to month length */
    }
) {
  const [day, setDay] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  function submit() {
    const output: NewItemInput = {day: parseInt(day), title, amount: parseInt(amount)}
    callback(output)
  }

  return (
    <CardWrapper title={text} iconSrc={iconSrc} closeOnIdle>
      <div className="flex gap-3 p-4 newInputs">
        <Input
          callback={(e) => setDay(e)}
          type="number"
          placeholder="Nap"
          min={1}
          max={GetMonthLength(selectedMonthIdx)}
        />
        <Input
          callback={(e) => setTitle(e)}
          type="string"
          disabled={day === ""}
          placeholder="Cím"
        />
        <Input
          callback={(e) => setAmount(e)}
          type="number"
          disabled={day === "" || title === ""}
          placeholder="Összeg"
        />
        <Button
          value="Feltölt"
          color="success"
          onClick={submit}
          disabled={day === "" || title === "" || amount === "" || Number.isNaN(parseInt(amount))}
        />

      </div>
    </CardWrapper>
  )
}