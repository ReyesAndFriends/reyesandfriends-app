import { useState } from "react";

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

    if (!values.firstName.trim()) {
      newErrors.firstName = "El nombre es obligatorio.";
    }

    if (!values.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio.";
    }

    if (!values.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Formato de correo inválido.";
    }

    if (!values.phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio.";
    } else if (!/^\+569\d{8}$/.test(values.phone)) {
      newErrors.phone = "El teléfono debe tener el formato +56912345678.";
    }

    if (!values.contactMethod.trim()) {
      newErrors.contactMethod = "Selecciona un método de contacto.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    values,
    errors,
    handleChange,
    validate,
  };
};
