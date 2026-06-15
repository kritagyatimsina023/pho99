import Image from "next/image"

const Lotus = ({ className = "w-8 h-8" }: { className?: string }) => {
    return (
        <div className={`relative z-50 shrink-0 ${className}`}>
            <Image src="/PhooRes/Building/lotusDesign.png" alt="lotus-img" fill />
        </div>
    )
}
export default Lotus