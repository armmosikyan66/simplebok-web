import {Button} from "@/components/ui/button.tsx";
import {SVGProps, useEffect, useState} from "react";
import {JSX} from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import {resend, verify} from "@/services/user.ts";
import {useToast} from "@/components/ui/use-toast.ts";
import {useAppDispatch, useAppSelector} from "@/hooks/redux.ts";
import {IUser} from "@/types/IUser.ts";

function ArrowLeftIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </svg>
    )
}


const FormSchema = z.object({
    verification_code: z.string().min(6, {
        message: "Your Verification code must be 6 characters.",
    }),
})


const VerifyCode = () => {
    const {me} = useAppSelector(state => state.user);
    const navigate = useNavigate();
    const [time, setTime] = useState(5 * 60);
    const dispatch = useAppDispatch();
    const {toast} = useToast();

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    return prevTime;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            verification_code: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const res = await dispatch(verify({verification_code: data.verification_code, email: me.email}));

        if (res.type === "user/verify/rejected") {
            if (typeof res?.payload === "string") {
                return toast({
                    variant: "destructive",
                    title: res?.payload,
                })
            }
        }

        if (!(res.payload as IUser).username) {
            navigate("/username")
        } else {
            navigate("/")
        }
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const resendCode = async () => {
        const res = await dispatch(resend(me.email));

        if (res.type === "user/login/rejected") {
            if (typeof res?.payload === "string") {
                toast({
                    variant: "destructive",
                    title: res?.payload,
                })
            }
            return
        }

        setTime(5 * 60)
    }

    return (
        <div className="flex h-screen items-center justify-center bg-white container">
            <div className="mx-auto max-w-md space-y-6">
                <Button
                    className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-950 dark:text-gray-50 dark:hover:bg-gray-800 dark:focus:ring-gray-300"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back
                </Button>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Verify Email</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter the 6-digit code sent to your email.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="verification_code"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTP maxLength={6} {...field}>
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0}/>
                                                <InputOTPSlot index={1}/>
                                                <InputOTPSlot index={2}/>
                                                <InputOTPSlot index={3}/>
                                                <InputOTPSlot index={4}/>
                                                <InputOTPSlot index={5}/>
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage/>
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        <span id="timer">{`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}</span>
                                    </div>
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <Button disabled={time === 0} type="submit">Verify</Button>
                            <Button disabled={time > 240} onClick={resendCode} type="button" variant="outline">Resend code</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default VerifyCode;
