import { Link } from 'react-router-dom'

export default function Hero() {
    return (
        <section
            className="relative w-full bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    'radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("https://th.bing.com/th/id/R.be7cdcda8d6e95b010db2e62fdacbf37?rik=ZINsyrWD7JVxuQ&pid=ImgRaw&r=0")',
            }}
        >
            {/* Main content container */}
            <div className="max-w-screen-xl mx-auto px-6">
                {/* Responsive vertical padding container */}
                <div className="pt-32 pb-12 md:pt-40 md:pb-20 text-center text-white">
                    {/* Section header */}
                    <header>
                        <h1
                            className="text-4xl sm:text-5xl font-extrabold leading-none tracking-tight mb-4"
                            data-aos="zoom-y-out"
                        >
                            Room Availabilty Tracker System
                        </h1>
                        <p
                            className="max-w-3xl mx-auto text-base sm:text-lg text-gray-400 tracking-tight leading-relaxed mb-8"
                            data-aos="zoom-y-out"
                            data-aos-delay="150"
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nulla fringilla neque maximus, commodo dolor
                            quis, porttitor tortor. Quisque gravida auctor elit,
                            id gravida leo fringilla ut. Pellentesque vestibulum
                            erat aliquam condimentum suscipit.
                        </p>
                    </header>

                    <div
                        className="mx-auto mt-6"
                        data-aos="zoom-y-out"
                        data-aos-delay="300"
                    >
                        <Link
                            to="https://github.com/CBrosch0/Room-Availability"
                            className="inline-block bg-white text-black font-medium px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
