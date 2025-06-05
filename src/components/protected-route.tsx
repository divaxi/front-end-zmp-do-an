import { useAtomValue } from "jotai";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authState } from "@/state";
import { useModalLoader } from "@/provider/ModalProvider";
import AuthModal from "@/components/modal/auth-modal";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const auth = useAtomValue(authState);
  const location = useLocation();
  const { showModal } = useModalLoader();
  const navigate = useNavigate();

  if (!auth) {
    showModal(<AuthModal navigate={navigate} />);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
