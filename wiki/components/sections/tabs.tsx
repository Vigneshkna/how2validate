import { Button } from "../ui/button"

export const Tabs = () => {
return (<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
    <Button variant="outline"><a href="#summary">Quick Summary</a></Button>
    <Button variant="outline"><a href="#spec">Full Specification</a></Button>
    <Button variant="outline"><a href="#validate">Validate Secret</a></Button>
    <Button variant="outline"><a href="#faq">FAQs</a></Button>
    <Button variant="outline"><a href="#contibute">Contribute</a></Button>
  </div>)}