import { useEffect, useState } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "../services/api-client";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const { request, cancel } = userService.getAll<User>();
    request
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((errObj) => {
        if (errObj instanceof CanceledError) return;

        setError(errObj.message);
        setIsLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, isLoading, setUsers, setError };
};

export default useUsers;
