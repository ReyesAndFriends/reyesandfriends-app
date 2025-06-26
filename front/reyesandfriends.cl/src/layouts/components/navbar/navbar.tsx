import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Home, Info, Briefcase, Mail, Folder } from "lucide-react"
import useNavOptions from "./useNavOptions"
import { useContactList } from "../../../hooks/services/useServiceList"
import RouterContactModal from "../../../helpers/routerContactModal/routerContactModal"
import { useContactLinkValidator } from "../../../helpers/ContactLinkValidator/useContactLinkValidator"

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownOptions } = useNavOptions()
    const dropdownRef = useRef<HTMLLIElement>(null)
    const contactList = useContactList()
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
    const contactDropdownRef = useRef<HTMLLIElement>(null)

    const {
        isModalOpen,
        handleLinkClick,
        confirmNavigation,
        cancelNavigation
    } = useContactLinkValidator()

    const [atTop, setAtTop] = useState(true)

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
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
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

    return (
        <>
            <nav
                className="text-white py-2 z-50 fixed top-0 left-0 w-full"
                style={{
                    background: atTop ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)",
                    transition: "background 0.4s ease"
                }}
            >
                <div className="container mx-auto flex justify-between items-center px-4">
                    <button onClick={() => handleLinkClick("/")}>
                        <img src="/img/logo/logo_white_2.svg" className="h-12 mb-2" alt="Reyes and Friends Logo" />
                    </button>
                    <ul className={`md:flex space-x-0 md:space-x-6 text-lg md:ml-auto md:justify-end ${isMenuOpen ? "flex flex-col space-y-4 absolute top-full left-0 w-full bg-black p-4 z-50" : "hidden"} md:static md:flex-row md:space-y-0`}>
                        <li>
                            <button className="hover:underline block flex items-center gap-2" onClick={() => handleLinkClick("/")}>
                                <Home size={18} /> Inicio
                            </button>
                        </li>
                        <li>
                            <button className="hover:underline block flex items-center gap-2" onClick={() => handleLinkClick("/about")}>
                                <Info size={18} /> Sobre nosotros
                            </button>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleDropdownToggle}
                                className="hover:underline focus:outline-none flex items-center gap-2"
                            >
                                <Briefcase size={18} /> Nuestros servicios <ChevronDown className="ml-1" size={16} />
                            </button>
                            {isDropdownOpen && (
                                <ul className={`bg-white text-black mt-2 shadow-lg rounded md:absolute md:mt-2 md:py-2 md:w-40 ${isMenuOpen ? "w-full mt-2" : ""}`}>
                                    {dropdownOptions.map(option => (
                                        <li key={option.path}>
                                            <button
                                                className="block w-full px-4 py-2 hover:bg-gray-200 flex items-center gap-2"
                                                onClick={() => handleLinkClick(option.path)}
                                            >
                                                {option.label}
                                            </button>
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
                                <ul className={`bg-white text-black mt-2 shadow-lg rounded md:absolute md:mt-2 md:py-2 md:w-40 ${isMenuOpen ? "w-full mt-2" : ""}`}>
                                    {contactList.map(option => (
                                        <li key={option.path}>
                                            <button
                                                className="block w-full px-4 py-2 hover:bg-gray-200 flex items-center gap-2"
                                                onClick={() => handleLinkClick(option.path)}
                                            >
                                                {option.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li>
                            <button className="hover:underline block flex items-center gap-2" onClick={() => handleLinkClick("/portfolio")}>
                                <Folder size={18} /> Portafolio
                            </button>
                        </li>
                    </ul>

                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>
            {isModalOpen && (
                <RouterContactModal
                    onConfirm={confirmNavigation}
                    onCancel={cancelNavigation}
                />
            )}
        </>
    )
}

export default Navbar
