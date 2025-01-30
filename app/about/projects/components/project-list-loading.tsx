export default function ProjectListLoading() {
    return (
        <ul className="space-y-8 ">
            {Array(3).fill(0).map((_el: any, index: number) => (
                <li key={index}>
                    <div className="w-full h-24 animate-pulse bg-neutral-100 dark:bg-neutral-50"></div>
                </li>
            ))}
        </ul>
    )
}
