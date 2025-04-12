import { useState, useCallback } from "react"

const useNavOptions = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false)
    }, [])

    const dropdownOptions = [
        { label: "Programación web", path: "/services/web-development" },
        { label: "Software empresarial", path: "/services/bussiness-software" },
        { label: "Páginas web promocionales", path: "/services/promotional-web" },
        { label: "Páginas E-Commerce", path: "/services/ecommerce-web" },
        { label: "Lista completa", path: "/services"},
    ]

    return {
        isDropdownOpen,
        toggleDropdown,
        closeDropdown,
        dropdownOptions,
    }
}

export default useNavOptions
