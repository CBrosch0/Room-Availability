import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Anchor from '@/components/ui/Anchor'
import SocialMediaLink from '@/components/ui/SocialLink'

// Footer Component
export default function Footer() {
    // Get the current year
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-solid border-0 border-t border-gray-800 bg-black text-gray-800 w-full">
            {/* Main content container */}
            <div className="max-w-screen-xl mx-auto p-6">
                {/* Bottom area */}
                <div className="flex max-md:gap-6 flex-col md:flex-row items-center justify-between">
                    {/* Social Links Component */}
                    <SocialMediaLinks />
                    {/* Copyright notice */}
                    <p className="max-md:text-center text-base text-gray-600">
                        {/*{currentYear} &copy; &nbsp;*/}
                        <Anchor
                            href="https://www.ucf.edu"
                            children="University of Central Florida"
                        />
                        {/*. All rights reserved.*/}
                    </p>
                </div>
            </div>
        </footer>
    )
}

// SocialLinks Component
function SocialMediaLinks() {
    // Social icons data
    const socialIcons = [
        {
            platform: 'Facebook',
            href: 'https://www.facebook.com/UCF',
            icon: FaFacebook,
        },
        {
            platform: 'Instagram',
            href: 'https://www.instagram.com/ucf.edu/',
            icon: FaInstagram,
        },
        {
            platform: 'LinkedIn',
            href: 'https://www.linkedin.com/school/university-of-central-florida/',
            icon: FaLinkedin,
        },
        {
            platform: 'X',
            href: 'https://twitter.com/UCF',
            icon: FaTwitter,
        },
    ]

    return (
        <ul className="flex gap-6 md:order-1">
            {socialIcons.map((social, index) => (
                <li key={index}>
                    <SocialMediaLink
                        platform={social.platform}
                        href={social.href}
                        icon={social.icon}
                    />
                </li>
            ))}
        </ul>
    )
}
