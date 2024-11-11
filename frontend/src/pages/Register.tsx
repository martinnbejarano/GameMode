import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { axi } from "../utils/axiosInstance";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { DatePicker } from "@nextui-org/react";
import {
  CalendarDate,
  parseDate,
  getLocalTimeZone,
} from "@internationalized/date";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "user",
    confirmPassword: "",
    username: "",
    birthday: parseDate("2024-01-01"),
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const requiredFields =
      formData.type === "user"
        ? [
            formData.username,
            formData.email,
            formData.password,
            formData.confirmPassword,
            formData.birthday,
          ]
        : [
            formData.username,
            formData.email,
            formData.password,
            formData.confirmPassword,
          ];

    if (requiredFields.some((field) => !field)) {
      toast.error("Todos los campos son requeridos");
      return;
    }

    setIsLoading(true);
    try {
      const submitData =
        formData.type === "company"
          ? {
              email: formData.email,
              password: formData.password,
              confirmPassword: formData.confirmPassword,
              type: formData.type,
              username: formData.username,
            }
          : {
              ...formData,
              birthday: formData.birthday.toDate(getLocalTimeZone()),
            };

      const { data } = await axi.post("/auth/users", submitData);
      useAuthStore.setState({ user: data });
      toast.success("Registro exitoso");
      navigate(data.type === "user" ? "/" : "/company/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleVisibilityConfirm = () => {
    setIsVisibleConfirm(!isVisibleConfirm);
  };

  const handleDateChange = (date: CalendarDate) => {
    setFormData({
      ...formData,
      birthday: date,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondaryv1 pb-52 md:mb-0">
      <section className="flex flex-col items-center gap-12 py-12 px-4 max max-w-[300px] md:max-w-[400px] bg-primaryv1 rounded-md shadow-xl">
        <div className="flex flex-col items-center gap-2">
          <img
            src="public/images/GameModeIcon.webp"
            alt="logo"
            className="size-16 md:size-20"
          />
          <p className="text-center text-primaryv2 font-bold text-sm md:text-base">
            Suscríbete gratis para poder contactarnos, realizar tus compras,
            conocer los nuevos lanzamientos y los mejores descuentos.
          </p>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <Input
            label="Nombre de usuario"
            name="username"
            value={formData.username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {formData.type === "user" && (
            <DatePicker
              label="Fecha de nacimiento"
              value={formData.birthday}
              onChange={handleDateChange}
            />
          )}
          <Input
            label="Contraseña"
            name="password"
            type={isVisible ? "text" : "password"}
            value={formData.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, password: e.target.value })
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />

          <Input
            label="Confirmar contraseña"
            variant="flat"
            name="confirmPassword"
            type={isVisibleConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibilityConfirm}
              >
                {isVisibleConfirm ? (
                  <IoMdEye className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <IoMdEyeOff className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
          />
          <div className="flex gap-4">
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                name="type"
                value="user"
                className="hidden peer"
                checked={formData.type === "user"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <span className="w-4 h-4 mr-2 border-2 border-white rounded-full peer-checked:bg-primaryv2"></span>
              Usuario
            </label>
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                name="type"
                value="company"
                className="hidden peer"
                checked={formData.type === "company"}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, type: e.target.value })
                }
              />
              <span className="w-4 h-4 mr-2 border-2 border-white rounded-full peer-checked:bg-primaryv2"></span>
              Empresa
            </label>
          </div>

          <Button
            className="w-full bg-primaryv2 text-white"
            type="submit"
            isLoading={isLoading}
            disabled={isLoading}
          >
            Registrarse
          </Button>
        </form>
        <Link
          className="text-sm text-white hover:underline cursor-pointer active:text-gray-200"
          to="/login"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </section>
    </div>
  );
};
