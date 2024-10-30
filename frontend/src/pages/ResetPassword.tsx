import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { axi } from "../utils/axiosInstance";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id, token } = useParams();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Las contraseñas no pueden estar vacías");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    try {
      const response = await axi.post(`/auth/reset-password/${id}/${token}`, {
        password: newPassword,
      });
      if (response.status === 200) {
        toast.success("Contraseña restablecida exitosamente");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al restablecer la contraseña");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondaryv1">
      <section className="flex flex-col items-center gap-12 py-12 px-4 max max-w-[300px] md:max-w-[400px] bg-primaryv1 rounded-md shadow-xl">
        <h2 className="text-center text-primaryv2 font-bold">
          Restablecer Contraseña
        </h2>

        <div className="flex flex-col items-center gap-4">
          <img src="/images/GameModeIcon.webp" alt="logo" className="size-20" />
          <p className="text-center text-primaryv2 font-bold">
            Recuerda no compartir tu contraseña y asegúrate de que sea segura.
          </p>
        </div>

        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <Input
            label="Nueva Contraseña"
            variant="flat"
            type="password"
            value={newPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
          <Input
            label="Confirmar Contraseña"
            variant="flat"
            type="password"
            value={confirmPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
          />
          <Button className="w-full bg-primaryv2 text-white" type="submit">
            Restablecer Contraseña
          </Button>
        </form>
      </section>
    </div>
  );
};
