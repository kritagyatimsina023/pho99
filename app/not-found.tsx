import Button from "@/components/Button"
import Heading from "@/components/Heading"
import Image from "next/image"
import Link from "next/link"

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen relative z-50 bg-white">
            <div className="w-full h-full">
                <Image fill src="/PhooRes/NotFoundTwo.png" className="object-cover" alt="not-found" />
            </div>
            <div className="absolute  bottom-10 z-50" >
                <Link href={"/"}>
                    <Button>
                        Find Your Way Back
                    </Button>
                </Link>

            </div>
        </div>
    )
}
export default NotFound