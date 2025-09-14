/* eslint-disable no-constant-binary-expression */
import { useState } from "react";
import type { NewListItemInput } from "../helpers/global";
import CardWrapper from "./CardWrapper";
import { Input } from "./Input";
import Button from "./Button";
import icon from "../assets/money-euro-circle-line.svg"



export default function NewEntryInput(
  { callback }:
    { callback: (e: NewListItemInput) => void }
) {
  const [day, setDay] = useState<string>("")
  const [title, setTitle] = useState<string>("")
  const [amount, setAmount] = useState<string>("")

  function submit() {

  }

  return (
    <CardWrapper title="Új egyszeri tranzakció" iconSrc={icon} closeOnIdle>
      <div className="flex gap-3 p-4">
        <Input
          callback={(e) => setDay(e)}
          type="number"
          placeholder="Nap"
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
          onClick={() => { }}
          disabled={day === "" || title === "" || amount === ""}
        />

      </div>
    </CardWrapper>
  )
}