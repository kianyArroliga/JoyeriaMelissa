import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, duration, ...props }) {
        return (
          <Toast key={id} duration={duration} {...props}
            className={cn(
              "rounded-xl p-4 pr-6 shadow-lg flex flex-col items-center text-center transition-all",
              props.variant === "confirmar-eliminar"
                ? "bg-red-100 border border-red-300 text-red-800"
                : "bg-white border text-gray-800"
            )}          >

            <div className="grid gap-1">
              {title && <ToastTitle className="text-base font-semibold text-gray-900 text-center">
                {title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-base text-gray-600 text-center">
                  {description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
