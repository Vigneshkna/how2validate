import { Label } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import SelectDropdown from "../ui/dropdown-select";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import React, { useEffect, useState } from 'react';

export const ValidationForm = () => {
    const [items, setItems] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProviderData(); // Call your internal function to fetch provider data
                setItems(data); // Set the fetched items
            } catch (err) {
                setError((err as Error).message); // Handle the error
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    // Prepare options for SelectDropdown
    const providerOptions = items.map(item => ({
        label: item,
        value: item,
    }));

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                <label>How2Validate - provider</label>
                <SelectDropdown 
                    options={providerOptions} 
                    onChange={(value: string) => {
                        console.log("Selected provider:", value); // Handle selection
                    }} 
                />
                <label>Service</label>
                {/* Uncomment and use service options when available */}
                {/* <SelectDropdown 
                    options={service} 
                    onChange={(value: string) => {
                        console.log("Selected service:", value); // Handle selection
                    }} 
                /> */}
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
    );
};
