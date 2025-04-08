import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, ChevronDown } from "lucide-react"
import useNavOptions from "./useNavOptions"

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isDropdownOpen, toggleDropdown, closeDropdown, dropdownOptions } = useNavOptions()
    const dropdownRef = useRef<HTMLLIElement>(null)
    const location = useLocation()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    useEffect(() => {
        closeDropdown()
    }, [location.pathname, closeDropdown])

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

    return (
        <nav className="bg-black text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
               <img src="/img/reyesandfriends.svg" className="h-16"/>
                <ul className="hidden md:flex space-x-6 text-lg">
                    <li>
                        <Link to="/" className="hover:underline">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:underline">Sobre nosotros</Link>
                    </li>
                    <li className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="hover:underline focus:outline-none flex items-center">
                           Nuestros servicios <ChevronDown className="ml-1" size={16} />
                        </button>
                        {isDropdownOpen && (
                            <ul className="absolute bg-white text-black mt-2 py-2 w-40 shadow-lg">
                                {dropdownOptions.map(option => (
                                    <li key={option.path}>
                                        <Link to={option.path} className="block px-4 py-2 hover:bg-gray-200">
                                            {option.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link to="/portfolio" className="hover:underline">Portafolio</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:underline">Contacto</Link>
                    </li>
                </ul>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="focus:outline-none" aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <ul className="flex flex-col space-y-4 px-4 pt-4 pb-8 text-lg">
                        <li>
                            <Link to="/" className="block hover:underline" onClick={toggleMenu}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block hover:underline" onClick={toggleMenu}>Sobre nosotros</Link>
                        </li>
                        <li>
                            <button onClick={toggleDropdown} className="block hover:underline focus:outline-none flex items-center">
                                Nuestros servicios <ChevronDown className="ml-1" size={16} />
                            </button>
                            {isDropdownOpen && (
                                <ul className="mt-2 space-y-2">
                                    {dropdownOptions.map(option => (
                                        <li key={option.path}>
                                            <Link to={option.path} className="block hover:underline" onClick={toggleMenu}>
                                                {option.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li>
                            <Link to="/portfolio" className="block hover:underline" onClick={toggleMenu}>Portafolio</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="block hover:underline" onClick={toggleMenu}>Contacto</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar
