import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X, ChevronDown, HandHeart, Info, Mail, LogIn } from "lucide-react"
import useNavOptions from "./useNavOptions"
import { useContactList } from "../../../hooks/services/useServiceList"
import { useServiceList } from "../../../hooks/services/useServiceList"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

import ChristmasLights from "../christmas-lights/ChristmasLights"

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

    // Check christmas-events
    const [theme, setTheme] = useState<string>("reyes");
    useEffect(() => {
        const savedTheme = localStorage.getItem("page_theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

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
                        <img src="/img/logo/logo_white_2.svg" className="h-12 mb-2 pointer-events-none" alt="Reyes&Friends" />
                    </Link>
                    
                    <ul className={`md:flex space-x-0 md:space-x-8 text-base ${isMenuOpen ? "flex flex-col space-y-4 absolute top-full left-0 w-full bg-black p-4 z-50" : "hidden"} md:static md:flex-row md:space-y-0`}>
                        <li>
                            <Link
                                className="block font-medium hover:underline transition-all duration-200"
                                to="/web-planes"
                            >
                                Planes Web
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="block font-medium hover:underline transition-all duration-200"
                                to="/quote-project"
                            >
                                Cotizar Proyecto
                            </Link>
                        </li>
                        <li className="relative" ref={dropdownRef}>
                            <button
                                onClick={handleDropdownToggle}
                                className="hover:underline focus:outline-none flex items-center font-medium transition-all duration-200"
                            >
                                Nuestros Servicios <ChevronDown className="ml-1" size={14} />
                            </button>
                            <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    key="services-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className={`bg-white text-black mt-2 shadow-xl rounded-lg border z-50 ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-56"}`}
                                >
                                    {serviceList.map(option => (
                                        <li key={option.path}>
                                            <Link
                                                className="block w-full px-3 py-2.5 hover:bg-gray-100 text-left text-sm font-medium transition-colors duration-200 flex items-center gap-2"
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
                                            className="block w-full px-3 py-2.5 hover:bg-gray-100 text-left text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/services"
                                            onClick={closeDropdown}
                                        >
                                            <Menu size={16} className="inline mr-2" />
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
                                className="hover:underline focus:outline-none flex items-center font-medium transition-all duration-200"
                            >
                                Nosotros <ChevronDown className="ml-1" size={14} />
                            </button>
                            <AnimatePresence>
                            {isHelpDropdownOpen && (
                                <motion.ul
                                    key="help-dropdown"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.18 }}
                                    className={`bg-white text-black mt-2 shadow-xl rounded-lg border z-50 ${isMenuOpen ? "w-full mt-2 py-3" : "md:absolute md:mt-2 md:py-4 md:w-52"}`}
                                >
                                    <li>
                                        <Link
                                            className="block w-full px-3 py-2.5 hover:bg-gray-100 text-left text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/social-media"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <HandHeart size={16} className="mr-2" />
                                            Redes Sociales
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block w-full px-3 py-2.5 hover:bg-gray-100 text-left text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/about"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Info size={16} className="mr-2" />
                                            Sobre nosotros
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="block w-full px-3 py-2.5 hover:bg-gray-100 text-left text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                                            to="/contact"
                                            onClick={() => setIsHelpDropdownOpen(false)}
                                        >
                                            <Mail size={16} className="mr-2" />
                                            Contáctanos
                                        </Link>
                                    </li>
                                </motion.ul>
                            )}
                            </AnimatePresence>
                        </li>
                        
                        {productionMode && clientsPortalUrl && (
                            <li className="md:hidden">
                                <a
                                    href={clientsPortalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-reyes hover:bg-reyes-dark text-white font-medium rounded transition-colors duration-200"
                                >
                                    <LogIn size={16} />
                                    Área clientes
                                </a>
                            </li>
                        )}
                    </ul>

                    {productionMode && clientsPortalUrl && (
                        <a
                            href={clientsPortalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center gap-2 px-4 py-2 bg-reyes hover:bg-reyes-dark text-white font-medium rounded transition-all transform hover:scale-105"
                        >
                            <LogIn size={16} />
                            Área clientes
                        </a>
                    )}
                    
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="focus:outline-none" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
                {theme === "reyes-christmas" && <ChristmasLights />}
            </nav>
        </>
    )
}

export default Navbar