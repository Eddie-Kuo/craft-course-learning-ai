interface AuthInputErrorProps {
  error: string | undefined;
}

function AuthInputError({ error }: AuthInputErrorProps) {
  return <span className="text-xs text-rose-600">{error}</span>;
}

export default AuthInputError;
