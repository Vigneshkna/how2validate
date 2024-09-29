type txtSecProps = {
    sectionTitle: string,
    infoTxt: string
}
export const TxtSection = (props: txtSecProps) => {
    return (<>
        <h3 className="text-2xl font-bold mb-4">{props.sectionTitle}</h3>
        <div className="space-y-2">
            {props.infoTxt?.length ?
                <div>{props.sectionTitle}</div>
                : [...Array(7)].map((_, i) => (
                    <div key={i} className="h-4 bg-muted rounded w-full" />
                ))}
        </div>
    </>)
}