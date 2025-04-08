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
        { label: "Desarrollo de software", path: "/services/software-development" },
        { label: "Desarrollo web", path: "/services/web-development" },
    ]

    return {
        isDropdownOpen,
        toggleDropdown,
        closeDropdown,
        dropdownOptions,
    }
}

export default useNavOptions
