import { Outlet } from 'react-router'
import Nav from '@/components/layouts/Nav'
import Footer from '@/components/layouts/Footer'

export default function Layout() {
    return (
        <>
            <Nav />
            <Outlet />
            <Footer />
        </>
    )
}
