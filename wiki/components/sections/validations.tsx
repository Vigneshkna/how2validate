import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"

// const service: {label: string, value: string}[] = mod.getService("SonarCloud").map(item => ({ label: item, value: item }));
// const provider: {label: string, value: string}[] = mod.getProvider().map(item => ({ label: item, value: item }));

export const ValidationForm = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <label>How2Validate -provider</label>
              {/* <SelectDropdown options={provider} onChange={function (value: string): void {
                  throw new Error("Function not implemented.")
                } }>
              </SelectDropdown> */}
              <label>Service</label>
              {/* <SelectDropdown options={service} onChange={function (value: string): void {
                  throw new Error("Function not implemented.")
                } }>
              </SelectDropdown> */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
              <label>Secret</label>
              <Input placeholder="secret" />
              <div className="flex items-center space-x-2">
                <Switch id="response" />
                <label htmlFor="response">Response</label>
                <Switch id="report" />
                <label htmlFor="report">Report</label>
              </div>
            </div>
            <Button className="w-full mb-2">Validate</Button>
            <Button variant="outline" className="w-full">Copy CLI command</Button>
            <Textarea className="mt-4" rows={6} />
        </>
    )
}