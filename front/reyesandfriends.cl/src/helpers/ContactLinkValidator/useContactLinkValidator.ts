import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useContactLinkValidator = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null)
    const location = useLocation()
    const navigate = useNavigate()

    const protectedRoutes = ["/contact", "/quote-project"]

    const handleLinkClick = (path: string) => {
        if (protectedRoutes.includes(location.pathname)) {
            setPendingNavigation(path)
            setIsModalOpen(true)
        } else {
            navigate(path)
        }
    }

    const confirmNavigation = () => {
        if (pendingNavigation) {
            navigate(pendingNavigation)
            setPendingNavigation(null)
        }
        setIsModalOpen(false)
    }

    const cancelNavigation = () => {
        setPendingNavigation(null)
        setIsModalOpen(false)
    }

    return { isModalOpen, handleLinkClick, confirmNavigation, cancelNavigation }
}
