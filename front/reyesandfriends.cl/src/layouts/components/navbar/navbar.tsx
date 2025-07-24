import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Home, Info, Briefcase, Mail, Folder, LogIn } from "lucide-react"
import useNavOptions from "./useNavOptions"
import { useContactList } from "../../../hooks/services/useServiceList"
import { Link } from "react-router-dom"

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownOptions } = useNavOptions()
    const dropdownRef = useRef<HTMLLIElement>(null)
    const contactList = useContactList()
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
    const contactDropdownRef = useRef<HTMLLIElement>(null)



    const [atTop, setAtTop] = useState(true)
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const handleDropdownToggle = () => {
        if (isDropdownOpen) closeDropdown()
        else toggleDropdown()
    }

    const toggleContactDropdown = () => {
        setIsContactDropdownOpen(!isContactDropdownOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            setAtTop(window.scrollY === 0)
        }
        
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768)
        }
        
        window.addEventListener("scroll", handleScroll)
        window.addEventListener("resize", handleResize)
        handleScroll()
        
        return () => {
            window.removeEventListener("scroll", handleScroll)
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown()
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [closeDropdown])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (contactDropdownRef.current && !contactDropdownRef.current.contains(event.target as Node)) {
                setIsContactDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const productionMode = import.meta.env.VITE_PRODUCTION_MODE === "true"
    const clientsPortalUrl = import.meta.env.VITE_CLIENTS_PORTAL_URL

    return (
        <>
            <nav
                className="text-white py-2 z-50 fixed top-0 left-0 w-full"
                style={{
                    background: (atTop && isDesktop) ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
                    transition: "background 0.4s ease"
                }}
            >
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link to="/">
                        <img src="/img/logo/logo_white_2.svg" className="h-12 mb-2" alt="Reyes and Friends Logo" />
                    </Link>
                    <ul className={`md:flex space-x-0 md:space-x-6 text-lg md:ml-auto md:justify-end ${isMenuOpen ? "flex flex-col space-y-4 absolute top-full left-0 w-full bg-black p-4 z-50" : "hidden"} md:static md:flex-row md:space-y-0`}>
                        <li>
                            <Link className="hover:underline block flex items-center gap-2" to="/">
                                <Home size={18} /> Inicio
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:underline block flex items-center gap-2" to="/about">
                                <Info size={18} /> Sobre nosotros
                            </Link>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleDropdownToggle}
                                className="hover:underline focus:outline-none flex items-center gap-2"
                            >
                                <Briefcase size={18} /> Nuestros servicios <ChevronDown className="ml-1" size={16} />
                            </button>
                            {isDropdownOpen && (
                                <ul className={`bg-white text-black mt-2 shadow-xl rounded-lg border ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-56"}`}>
                                    {dropdownOptions.map(option => (
                                        <li key={option.path}>
                                            <Link
                                                className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200"
                                                to={option.path}
                                                onClick={closeDropdown}
                                            >
                                                {option.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li className="relative" ref={contactDropdownRef}>
                            <button
                                onClick={toggleContactDropdown}
                                className="hover:underline focus:outline-none flex items-center gap-2"
                            >
                                <Mail size={18} /> Contacto <ChevronDown className="ml-1" size={16} />
                            </button>
                            {isContactDropdownOpen && (
                                <ul className={`bg-white text-black mt-2 shadow-xl rounded-lg border ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-56"}`}>
                                    {contactList.map(option => (
                                        <li key={option.path}>
                                            <Link
                                                className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200"
                                                to={option.path}
                                                onClick={() => setIsContactDropdownOpen(false)}
                                            >
                                                {option.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link className="hover:underline block flex items-center gap-2" to="/portfolio">
                                <Folder size={18} /> Portafolio
                            </Link>
                        </li>
                        {productionMode && clientsPortalUrl && (
                        <li>
                            <a
                                href={clientsPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1.5 bg-red-700 hover:bg-red-800 text-black font-bold rounded shadow-lg transition-colors duration-200 text-white"
                                style={{ textDecoration: "none" }}
                            >
                                <LogIn size={22} />
                                Acceso clientes
                            </a>
                        </li>
                        )}
                    </ul>
                    
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
