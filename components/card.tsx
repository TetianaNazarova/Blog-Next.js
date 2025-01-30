export default function Card({ children, className }: any) {
    return (
        <div className={`border rounded-md border-gray-600 p-4 ${className}`}>
            {children}
        </div>
    )
}
