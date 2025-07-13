import React, { useState, useEffect } from 'react';

type PhaseOneProps = {
  values: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    contactMethod: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  validate: () => boolean;
};

const PhaseOne: React.FC<PhaseOneProps> = ({ values, errors, handleChange }) => {
  // Local state for the number without prefix
  const [localPhone, setLocalPhone] = useState('');

  // Syncs localPhone with values.phone on mount or when values.phone changes
  useEffect(() => {
    if (values.phone.startsWith('+56')) {
      setLocalPhone(values.phone.slice(3));
    } else {
      setLocalPhone('');
    }
  }, [values.phone]);

  // Handles numeric-only changes and a maximum of 9 digits
  const handleLocalPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Solo números
    if (value.length > 9) value = value.slice(0, 9);
    setLocalPhone(value);
    // Update phone in values
    handleChange({
      ...e,
      target: {
        ...e.target,
        name: 'phone',
        value: value ? `+56${value}` : '',
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="bg-black p-8 rounded-lg shadow-lg">
        <h1 className="block text-white font-bold mb-4">Fase 1. Datos personales</h1>


        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-300 font-bold mb-2">
            Nombre (Requerido)
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Ingresa tu nombre"
            value={values.firstName}
            onChange={handleChange}
            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-300 font-bold mb-2">
            Apellido (Requerido)
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Ingresa tu apellido"
            value={values.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-300 font-bold mb-2">
            Email (Requerido)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-300 font-bold mb-2">
            Teléfono (Requerido)
          </label>
          <div className="flex">
            <input
              type="text"
              value="+56"
              disabled
              className="w-16 p-3 rounded-l-sm bg-zinc-700 text-white border border-zinc-700"
              tabIndex={-1}
            />
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="912345678"
              value={localPhone}
              onChange={handleLocalPhoneChange}
              className="w-full p-3 rounded-r-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              maxLength={9}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>


        <div className="mb-4">
          <label htmlFor="contactMethod" className="block text-gray-300 font-bold mb-2">
            ¿Cómo quieres que te contactemos? (Requerido)
          </label>
          <select
            id="contactMethod"
            name="contactMethod"
            value={values.contactMethod}
            onChange={handleChange}
            className="w-full p-3 rounded-sm bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          {errors.contactMethod && (
            <p className="text-red-500 text-sm mt-1">{errors.contactMethod}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhaseOne;
