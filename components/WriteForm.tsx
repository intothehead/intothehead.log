"use client";
import { useTransition, type FormEvent, type ReactNode } from "react";
import styles from "./WriteForm.module.css";

type WriteFormProps = {
  action: (formData: FormData) => Promise<{ message: string } | undefined>;
  className?: string;
  children: ReactNode;
};

export default function WriteForm({
  action,
  className,
  children,
}: WriteFormProps) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await action(formData);
      if (result) {
        alert(result.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <fieldset disabled={isPending} className={styles.Fieldset}>
        {children}
      </fieldset>
    </form>
  );
}
