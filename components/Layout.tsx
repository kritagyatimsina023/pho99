interface childProps {
    children: React.ReactNode
    className?: string
}
const Layout = ({ children, className }: childProps) => {
    return (
        <div className={` ${className} max-w-7xl mx-auto relative z-50 `} >
            {children}
        </div>
    )
}
export default Layout