import { useState, useRef, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { useLocation } from 'react-router-dom' // Use react-router or any routing solution
import clsx from 'clsx'

export default function MobileMenu() {
    const location = useLocation() // Replaces usePathname

    const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

    const trigger = useRef<HTMLButtonElement>(null)
    const mobileNav = useRef<HTMLDivElement>(null)

    // close the mobile menu on click outside
    useEffect(() => {
        const clickHandler = ({
            target,
        }: {
            target: EventTarget | null
        }): void => {
            if (!mobileNav.current || !trigger.current) return
            if (
                !mobileNavOpen ||
                mobileNav.current.contains(target as Node) ||
                trigger.current.contains(target as Node)
            )
                return
            setMobileNavOpen(false)
        }
        document.addEventListener('click', clickHandler)
        return () => document.removeEventListener('click', clickHandler)
    }, [mobileNavOpen])

    // close the mobile menu if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: { keyCode: number }): void => {
            if (!mobileNavOpen || keyCode !== 27) return
            setMobileNavOpen(false)
        }
        document.addEventListener('keydown', keyHandler)
        return () => document.removeEventListener('keydown', keyHandler)
    }, [mobileNavOpen])

    return (
        <div className="flex md:hidden">
            {/* Hamburger button */}
            <button
                ref={trigger}
                className={`hamburger ${mobileNavOpen ? 'active' : ''}`}
                aria-label="Toggle Mobile Menu"
                aria-controls="mobile-nav"
                aria-expanded={mobileNavOpen}
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
                <span className="sr-only">Menu</span>
                <svg
                    className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect y="4" width="24" height="2" rx="1" />
                    <rect y="11" width="24" height="2" rx="1" />
                    <rect y="18" width="24" height="2" rx="1" />
                </svg>
            </button>

            {/* Mobile navigation */}
            <div ref={mobileNav}>
                <Transition
                    show={mobileNavOpen}
                    as="nav"
                    id="mobile-nav"
                    className="border-solid border-0 border-t border-gray-800 absolute top-full h-screen z-20 left-0 w-full overflow-hidden bg-black"
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ul className="grid colgs-1 gap-6 p-6">
                        {[
                            ['Landing', '/'],
                            ['About Us', '/about'],
                            ['Contact Us', 'mailto:lichunli@eng.famu.fsu.edu'],
                            ['Project', '/project'],
                        ].map(([anchorText, hyperlink]) => (
                            <li key={hyperlink}>
                                <a
                                    href={hyperlink}
                                    className={clsx(
                                        'font-medium text-gray-400 hover:text-white transition duration-300 ease-in-out',
                                        {
                                            'text-white':
                                                location.pathname === hyperlink,
                                        },
                                    )}
                                    onClick={() => setMobileNavOpen(false)}
                                >
                                    {anchorText}
                                </a>
                            </li>
                        ))}
                    </ul>
                </Transition>
            </div>
        </div>
    )
}
