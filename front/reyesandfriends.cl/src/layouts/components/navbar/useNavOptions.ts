import { useState, useCallback } from "react";
import { useServiceList } from "../../../hooks/services/useServiceList";

const useNavOptions = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const serviceList = useServiceList();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false);
    }, []);

    const dropdownOptions = serviceList.map(({ name, path }) => ({
        label: name,
        path,
    }));

    return {
        isDropdownOpen,
        toggleDropdown,
        closeDropdown,
        dropdownOptions,
    };
};

export default useNavOptions;
