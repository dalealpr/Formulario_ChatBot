import { useEffect, useState } from "react";
// Form
import { FormValues } from "../../types/formulario";
import {
  latinAmericanCountries,
  countryNameMap,
  countryPhoneCodeMap,
} from "../../types/dataPaises";
import emailjs from "@emailjs/browser";
import { useForm, SubmitHandler } from "react-hook-form";
import ReactFlagsSelect from "react-flags-select";
// Styles
import styles from "./CardForm.module.css";

const CardForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const countryName = countryNameMap[countrySelect];
    const formData = {
      nombre: data.nombre,
      email: data.email,
      pais: countryName,
      codigo_telefono: data.codigo_telefono,
      telefono: data.telefono,
    };

    // Formatear el texto para el correo
    const formDataText = formatFormDataText(formData);

    console.log("Formulario enviado:", formDataText);

    // Enviar el formulario a través de EmailJS
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { message: formDataText },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log("SUCCESS!", result.text);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  const formatFormDataText = (data: FormValues) => {
    return `
        Nombre: ${data.nombre}
        Email: ${data.email}
        País: ${data.pais}
        Código de teléfono: ${data.codigo_telefono}
        Teléfono: ${data.telefono}

    `.trim(); // `trim()` para eliminar espacios en blanco al principio y al final
  };

  const [countrySelect, setCountrySelect] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");

  useEffect(() => {
    if (countrySelect) {
      const code = countryPhoneCodeMap[countrySelect];
      setPhoneCode(code);
      setValue("codigo_telefono", code);
    } else {
      setPhoneCode("");
      setValue("codigo_telefono", "");
    }
  }, [countrySelect, setValue]);

  return (
    <div className={styles.cont_CardForm}>
      <h2 className={styles.title_CardForm}>Contáctanos</h2>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formCont}>
        <input
          className={styles.input}
          placeholder="Nombres"
          type="text"
          id="nombre"
          {...register("nombre", { required: true })}
        />
        {errors.nombre && (
          <span className={styles.error_text}>Este campo es obligatorio</span>
        )}

        <ReactFlagsSelect
          selected={countrySelect}
          onSelect={(code) => setCountrySelect(code)}
          placeholder="Selecciona un País"
          countries={latinAmericanCountries}
        />
        {errors.pais && (
          <span className={styles.error_text}>Este campo es obligatorio</span>
        )}

        <div className={styles.cont_number}>
          <select
            className={styles.input_tel}
            {...register("codigo_telefono", { required: true })}
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
          >
            {latinAmericanCountries.map((code) => (
              <option key={code} value={countryPhoneCodeMap[code]}>
                {countryPhoneCodeMap[code]}
              </option>
            ))}
          </select>

          <input
            className={styles.number}
            type="text"
            id="telefono"
            placeholder="Telefono"
            {...register("telefono", { required: true })}
          />
        </div>

        {errors.telefono && (
          <span className={styles.error_text}>Este campo es obligatorio</span>
        )}

        <input
          className={styles.input}
          type="email"
          id="email"
          placeholder="Mail"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className={styles.error_text}>Este campo es obligatorio</span>
        )}

        <button className={styles.btn_enviar} type="submit">
          Enviar
        </button>
      </form>
      <p>ChatbotProLATAM todos los derechos reservados ©</p>
    </div>
  );
};

export default CardForm;
