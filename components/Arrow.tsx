import Image from "next/image"

const Arrow = ({ className = "w-10 h-10", imgClassName }: { className?: string; imgClassName?: string }) => {
    return (
        <div className={`relative z-50  ${className}`}>
            <Image className={`object-contain  ${imgClassName ?? ""}`} src="/PhooRes/Building/Arrow.png" alt="arrow" fill />
        </div>
    )
}
export default Arrow