import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export interface InputOTPDemoProps {
  onChange?: (value: string) => void;
}

export function InputOTPDemo({ onChange }: InputOTPDemoProps) {
  return (
    <InputOTP onChange={onChange} maxLength={4}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        {/* <InputOTPSlot index={4} />
        <InputOTPSlot index={5} /> */}
      </InputOTPGroup>
    </InputOTP>
  );
}
