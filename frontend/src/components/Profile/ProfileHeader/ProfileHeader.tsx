import { Button } from "@nextui-org/react";
import { User } from "../../../interfaces/User";
import "./ProfileHeader.css";

interface Props {
  user: User | null;
  onLogout: () => void;
}

export const ProfileHeader = ({ user, onLogout }: Props) => {
  return (
    <div className="profile-header">
      <img
        src={`https://avatar.iran.liara.run/public/boy?username=${user?.username}`}
        alt="Avatar"
        className="profile-avatar"
      />
      <div className="profile-info">
        <h2 className="profile-username">{user?.username}</h2>
        <p className="profile-email">{user?.email}</p>
      </div>
      <Button className="logout-button" onClick={onLogout}>
        Cerrar sesión
      </Button>
    </div>
  );
};
