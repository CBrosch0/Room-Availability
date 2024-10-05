import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import MobileMenu from '@/components/layout/MobileMenu'
import Anchor from '@/components/ui/Anchor'

const SCROLL_THRESHOLD = 10

function SiteBranding() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <Anchor
            className="flex items-center gap-3"
            href="https://ucf.edu/"
            title="Visit the UCF home page"
        >
            <img
                alt="UCF Logo"
                className="h-8 w-8 inline-block sm:h-12 sm:w-12"
                src="https://www.ucf.edu/brand/wp-content/blogs.dir/13/files/2016/07/UCF-tab-NoBleed_vert-KG-7406.png"
            />
            <span className="font-semibold inline-block text-white">
                {screenWidth < 512
                    ? 'UCF KH Team'
                    : screenWidth < 1920
                      ? 'UCF Knight Hacks Team'
                      : 'University of Central Florida Knight Hacks Team'}
            </span>
        </Anchor>
    )
}

function DesktopMenu() {
    const menuItems = [
        ['Home', '/'],
        ['Search', '/search'],
    ]

    return (
        <ul className="gap-6 justify-end flex-wrap items-center hidden md:flex md:grow">
            {menuItems.map(([anchorText, hyperlink]) => (
                <li key={hyperlink}>
                    <Link
                        to={hyperlink}
                        className={
                            'font-medium text-gray-400 hover:text-white transition duration-300 ease-in-out'
                        }
                    >
                        {anchorText}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default function Nav() {
    const [top, setTop] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            setTop(window.pageYOffset <= SCROLL_THRESHOLD)
        }
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div>
            <nav
                className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
                    top
                        ? ''
                        : 'border-solid border-0 border-b border-gray-800 bg-black backdrop-blur-sm'
                }`}
            >
                <div className="max-w-screen-xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <SiteBranding />
                        <DesktopMenu />
                        <MobileMenu />
                    </div>
                </div>
            </nav>
            <main className="p-4">
                <Outlet />
            </main>
        </div>
    )
}
