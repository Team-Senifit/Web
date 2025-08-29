import { Suspense } from "react";
import LoginForm from "./panel/LoginForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>{"Loading..."}</div>}>
      <LoginForm />
    </Suspense>
  );
}
