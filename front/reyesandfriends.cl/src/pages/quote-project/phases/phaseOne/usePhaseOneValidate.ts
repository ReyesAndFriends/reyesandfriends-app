import { useState } from "react";


const capitalize = (str: string) =>
  str.replace(/\b\w/g, (char) => char.toUpperCase()).trim();

export const usePhaseOneValidate = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactMethod: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // First Name: min 2, max 40
    if (!values.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio.";
    } else if (values.firstName.trim().length < 2) {
      newErrors.firstName = "El nombre debe tener al menos 2 caracteres.";
    } else if (values.firstName.trim().length > 40) {
      newErrors.firstName = "El nombre no puede exceder 40 caracteres.";
    }

    // Last Name: min 2, max 40
    if (!values.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio.";
    } else if (values.lastName.trim().length < 2) {
      newErrors.lastName = "El apellido debe tener al menos 2 caracteres.";
    } else if (values.lastName.trim().length > 40) {
      newErrors.lastName = "El apellido no puede exceder 40 caracteres.";
    }

    // Email: min 6, max 80
    if (!values.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (values.email.trim().length < 6) {
      newErrors.email = "El correo electrónico debe tener al menos 6 caracteres.";
    } else if (values.email.trim().length > 80) {
      newErrors.email = "El correo electrónico no puede exceder 80 caracteres.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Formato de correo inválido.";
    }

    // Cellphone: exactly +569 and 8 digits (12 characters)
    if (!values.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\+569\d{8}$/.test(values.phone)) {
      newErrors.phone = "El teléfono debe tener el formato +56912345678.";
    }

    // Contact Method: required
    if (!values.contactMethod.trim()) {
      newErrors.contactMethod = "Selecciona un método de contacto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values: {
      ...values,
      firstName: capitalize(values.firstName),
      lastName: capitalize(values.lastName),
    },
    errors,
    handleChange,
    validate,
  };
};
