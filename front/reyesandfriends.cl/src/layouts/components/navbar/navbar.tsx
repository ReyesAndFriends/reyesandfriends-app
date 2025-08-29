import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, Home, Info, Mail, Code, LogIn, DollarSign, Gem } from "lucide-react"
import useNavOptions from "./useNavOptions"
import { useContactList } from "../../../hooks/services/useServiceList"
import { useServiceList } from "../../../hooks/services/useServiceList"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownOptions } = useNavOptions()
    const dropdownRef = useRef<HTMLLIElement>(null)
    const contactList = useContactList()
    const serviceList = useServiceList()
    const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false)
    const contactDropdownRef = useRef<HTMLLIElement>(null)
    const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false)
    const helpDropdownRef = useRef<HTMLLIElement>(null)

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (helpDropdownRef.current && !helpDropdownRef.current.contains(event.target as Node)) {
                setIsHelpDropdownOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const productionMode = import.meta.env.VITE_PRODUCTION_MODE === "true"
    const clientsPortalUrl = import.meta.env.VITE_CLIENTS_PORTAL_URL || "https://panel.reyesandfriends.cl"

    return (
        <>
            <nav
                className="text-white py-2 z-50 fixed top-0 left-0 w-full"
                style={{
                    background: "black",
                    transition: "background 0.4s ease"
                }}
            >
                <div className="container mx-auto flex justify-between items-center px-4">
                    <Link to="/">
                        <img src="/img/logo/logo_white_2.svg" className="h-12 mb-2" alt="Reyes and Friends Logo" />
                    </Link>
                    <ul className={`md:flex space-x-0 md:space-x-6 text-lg md:ml-auto md:justify-end ${isMenuOpen ? "flex flex-col space-y-4 absolute top-full left-0 w-full bg-black p-4 z-50" : "hidden"} md:static md:flex-row md:space-y-0`}>
                        <li>
                            <Link
                                className="block flex items-center gap-2 font-semibold"
                                to="/web-planes"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <DollarSign size={18} className="mr-1" />
                                <span className="hover:underline">Planes Web</span>
                                <span className="ml-1 px-2 py-0.5 rounded text-white text-xs font-bold bg-red-600" style={{marginLeft: 4}}>
                                    NUEVO
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block flex items-center gap-2 font-semibold"
                                to="/quote-project"
                                style={{ display: "flex", alignItems: "center" }}
                            >
                                <Gem size={18} className="mr-1" />
                                <span className="hover:underline">Cotiza tu proyecto</span>
                            </Link>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleDropdownToggle}
                                className="hover:underline focus:outline-none flex items-center gap-2"
                            >
                                <Code size={18} /> Servicios personalizados <ChevronDown className="ml-1" size={16} />
                            </button>
                            <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    key="services-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className={`bg-white text-black mt-2 shadow-xl rounded-lg border ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-56"}`}
                                >
                                    {serviceList.map(option => (
                                        <li key={option.path}>
                                            <Link
                                                className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200 flex items-center gap-2"
                                                to={option.path}
                                                onClick={closeDropdown}
                                            >
                                                {option.icon}
                                                {option.name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link
                                            className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/services"
                                            onClick={closeDropdown}
                                        >
                                            <Code size={18} className="inline mr-2" />
                                            Lista completa
                                        </Link>
                                    </li>
                                </motion.ul>
                            )}
                            </AnimatePresence>
                        </li>
                        <li className="relative" ref={helpDropdownRef}>
                            <button
                                onClick={() => setIsHelpDropdownOpen(!isHelpDropdownOpen)}
                                className="hover:underline focus:outline-none flex items-center gap-2"
                            >
                                <Info size={18} /> Ayuda <ChevronDown className="ml-1" size={16} />
                            </button>
                            <AnimatePresence>
                            {isHelpDropdownOpen && (
                                <motion.ul
                                    key="help-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className={`bg-white text-black mt-2 shadow-xl rounded-lg border ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-56"}`}
                                >
                                    <li>
                                        <Link
                                            className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/about"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Info size={18} className="mr-2" />
                                            Sobre nosotros
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block w-full px-4 py-3 hover:bg-gray-100 text-left text-base font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/contact"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Mail size={18} className="mr-2" />
                                            Contáctanos
                                        </Link>
                                    </li>
                                </motion.ul>
                            )}
                            </AnimatePresence>
                        </li>
                        {productionMode && clientsPortalUrl && (
                        <li>
                            <a
                                href={clientsPortalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold rounded shadow-lg transition-colors duration-200 text-red-500 hover:underline"
                            >
                                <LogIn size={22} />
                                Área clientes
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