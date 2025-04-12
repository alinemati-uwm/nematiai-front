import { Button } from "@/components/ui/button";

export default function ChangePasswordBtn({
  isPending,
  disabled,
  change_password,
}: {
  isPending: boolean;
  change_password: string;
  disabled: boolean;
}) {
  return (
    <Button disabled={disabled} isPending={isPending} size="sm" type="submit">
      {change_password}
    </Button>
  );
}
