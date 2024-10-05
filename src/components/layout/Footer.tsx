'use client'

import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import Anchor from '../ui/Anchor'
import LinkList from '../ui/LinkList'
import SocialMediaLink from '../ui/SocialMediaLink'

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
                        {currentYear} &copy; &nbsp;
                        <Anchor
                            href="https://www.famu.edu"
                            children="Florida A&M University"
                        />
                        -
                        <Anchor
                            href="https://www.fsu.edu"
                            children="Florida State University"
                        />
                        &nbsp;
                        <Anchor
                            href="https://eng.famu.fsu.edu"
                            children="College of Engineering"
                        />
                        . All rights reserved.
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
            href: 'https://www.facebook.com/',
            icon: FaFacebook,
        },
        {
            platform: 'Instagram',
            href: 'https://www.instagram.com/',
            icon: FaInstagram,
        },
        {
            platform: 'LinkedIn',
            href: 'https://www.linkedin.com/school/florida-state-university/',
            icon: FaLinkedin,
        },
        {
            platform: 'Twitter',
            href: 'https://twitter.com/FloridaState',
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
