interface HeaderProps {
    heading: string
    headingLevel: 1 | 2 | 3
    subtext?: string
  }
  
  // Helper function to get the appropriate font size class based on heading level
  const getFontSizeClass = (headingLevel: number) => {
    switch (headingLevel) {
      case 1:
        return 'text-4xl'
      case 2:
        return 'text-3xl'
      case 3:
        return 'text-2xl'
    }
  }
  
  export default function Header({
    heading,
    headingLevel,
    subtext,
  }: HeaderProps) {
    const HeadingTag = `h${headingLevel}` as React.ElementType // Dynamically set the heading tag
  
    return (
      <header className="max-w-screen-md mx-auto pb-12 md:pb-16 overflow-visible text-center">
        <HeadingTag
          className={`font-bold mb-4 tracking-tighter ${getFontSizeClass(headingLevel)}`}
        >
          {heading}
        </HeadingTag>
        {subtext && <p className="sm:text-lg text-base text-gray-400">{subtext}</p>}
      </header>
    )
  }
  