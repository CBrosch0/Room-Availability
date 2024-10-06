import { ReactNode } from 'react'
import Header from '@/components/ui/Header'
import Mapper from '@/components/ui/Mapper'
import SocialLink from '@/components/ui/SocialLink'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface TeamMemberProps {
  bio?: string
  children?: ReactNode
  id: number
  image: string
  name: string
  role?: string
  socialLinks?: {
    platform: string
    href: string
    icon: IconType
    className?: string
  }[]
}

const teamMembers: TeamMemberProps[] = [
    {
        id: 1,
        name: 'Andrew Young',
        role: 'Front End',
        image: '/src/assets/images/Andrew_Young.png',
        socialLinks: [
          {
            platform: 'GitHub',
            href: 'https://github.com/acy2k5',
            icon: FaGithub,
            className: 'text-purple-600 hover:text-purple-800',
          },
          {
            platform: 'LinkedIn',
            href: 'https://www.linkedin.com/in/youngandrewchristian/',
            icon: FaLinkedin,
            className: 'text-blue-700 hover:text-blue-900',
          },
        ],
      },
  {
    id: 2,
    name: 'Calvin Brosch',
    role: 'Back End',
    image:
      '/src/assets/images/Calvin_Brosch.jpg',
    socialLinks: [
    {
        platform: 'GitHub',
        href: 'https://github.com/CBrosch0',
        icon: FaGithub,
        className: 'text-purple-600 hover:text-purple-800',
      },
      {
        platform: 'LinkedIn',
        href: 'https://www.linkedin.com/in/cbrosch0/',
        icon: FaLinkedin,
        className: 'text-blue-700 hover:text-blue-900',
      },
    ],
  },
  {
    id: 3,
    name: 'Garrett Webb',
    role: 'Front End',
    image:
      '/src/assets/images/Garrett_Webb.jpg',
    socialLinks: [
      {
        platform: 'GitHub',
        href: 'https://github.com/webbgamers',
        icon: FaGithub,
        className: 'text-purple-600 hover:text-purple-800',
      },
      {
        platform: 'LinkedIn',
        href: 'https://www.linkedin.com/in/garrettwebb0/',
        icon: FaLinkedin,
        className: 'text-blue-700 hover:text-blue-900',
      },
    ],
  },
]

export default function TeamMembers() {
  return (
    <section className="relative bg-gray-100 py-12 md:py-20">
      <div className="max-w-screen-xl mx-auto px-6">
        <Header
          heading="Our Team"
          headingLevel={2}
          subtext="Meet the people behind this project!"
        />
        <Mapper<TeamMemberProps>
          data={teamMembers}
          renderItem={(member) => (
            <li
              className="text-center text-gray-400 bg-white rounded-lg shadow-md p-6"
              key={member.id}
            >
              <img
                alt={`${member.name}'s profile picture`}
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={member.image}
              />
              <div>
                <h3 className="font-semibold sm:text-lg text-base text-gray-900">
                  {member.name}
                </h3>
                {member.role && (
                  <p className="text-base text-gray-400">{member.role}</p>
                )}
                {member.bio && (
                  <p className="text-base text-gray-400">{member.bio}</p>
                )}
              </div>
              {member.socialLinks && (
                <ul className="flex justify-center mt-4 space-x-4">
                  {member.socialLinks.map((link, index) => (
                    <li key={index}>
                      <SocialLink
                        href={link.href}
                        icon={link.icon}
                        platform={link.platform}
                        className={link.className}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )}
          WrapperElement="ul"
          wrapperProps={{
            className:
              'grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          }}
        />
      </div>
    </section>
  )
}
