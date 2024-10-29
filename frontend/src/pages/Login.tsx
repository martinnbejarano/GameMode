import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { axi } from "../utils/axiosInstance";
import { useAuthStore } from "../store/authStore";
export const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "user",
  });
  const [isVisible, setIsVisible] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    console.log(formData);
    const { data } = await axi.post("/auth/sessions", formData);
    useAuthStore.setState({ user: data.user, isAuthenticated: true });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondaryv1">
      <section className="flex flex-col items-center gap-12 py-12 px-4 max max-w-[300px] md:max-w-[400px] bg-primaryv1 rounded-md shadow-xl">
        <div className="flex flex-col items-center gap-2">
          <img
            src="public/images/GameModeIcon.webp"
            alt="logo"
            className="size-20"
          />
          <p className="text-center text-primaryv2 font-bold">
            Suscríbete gratis para poder contactarnos, realizar tus compras,
            conocer los nuevos lanzamientos y los mejores descuentos.
          </p>
        </div>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            label="Password"
            variant="flat"
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
                aria-label="toggle password visibility"
              >
                {isVisible ? (
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

          <Button className="w-full bg-primaryv2 text-white" type="submit">
            Iniciar sesión
          </Button>
          <p className="text-start text-sm text-white hover:underline cursor-pointer active:text-gray-200">
            Has olvidado tu contraseña?
          </p>
        </form>
      </section>
    </div>
  );
};
