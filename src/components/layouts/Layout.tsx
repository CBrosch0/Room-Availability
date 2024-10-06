import Nav from '@/components/layouts/Nav'
import Footer from '@/components/layouts/Footer'

interface Props {
    children: React.ReactNode
}

export default function Layout({ children }: Props) {
    return (
        <>
            <Nav />
            <main>{children}</main>
            <Footer />
        </>
    )
}
