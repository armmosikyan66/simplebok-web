import {Button} from "@/components/ui/button.tsx";
import {SVGProps, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {Separator} from "@/components/ui/separator.tsx";
import {JSX} from "react/jsx-runtime";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "@/components/ui/use-toast.ts";
import {useAppDispatch} from "@/hooks/redux.ts";
import {
    generateAuthenticationOptions,
    login,
    verifyAuthenticationResponse,
} from "@/services/user.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {startAuthentication} from "@simplewebauthn/browser";

const KeyIcon = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
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
        <circle cx="7.5" cy="15.5" r="5.5"/>
        <path d="m21 2-9.6 9.6"/>
        <path d="m15.5 7.5 3 3L22 7l-3-3"/>
    </svg>
)

const FormSchema = z.object({
    identifier: z.string().min(1, "Username or Email is required")
})

const Signup = () => {
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState<"passkey" | "verificationCode">("verificationCode")
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            identifier: "",
        },
    });

    const sendVerificationCode = async (identifier: string) => {
        const res = await dispatch(login(identifier));

        if (res.type === "user/login/rejected") {
            if (typeof res?.payload === "string") {
                toast({
                    variant: "destructive",
                    title: res?.payload,
                })
            }
            return
        }
        navigate("/verify-code");
    }

    const checkPasskey = async (identifier: string) => {
        const resp = await generateAuthenticationOptions(identifier);

        if ("detail" in resp) {
            return
        }

        let attResp;
        try {
            attResp = await startAuthentication(resp);
        } catch (error) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if ("name" in error && error.name === 'InvalidStateError') {
                toast({
                    variant: "destructive",
                    title: 'Authenticator was probably already registered by user',
                })
            } else {
                console.error(error)
            }
            return
        }

        const verificationResp = await dispatch(verifyAuthenticationResponse(attResp));

        if (verificationResp.type === "user/login/rejected") {
            toast({
                variant: "destructive",
                title: 'Oh no, something went wrong!!',
            })
        }
    }

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        if (type === "passkey") {
            await checkPasskey(data.identifier);
        } else {
            await sendVerificationCode(data.identifier);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-white container">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your email to receive a verification code.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email or Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="u@exmaple.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button onClick={() => setType("verificationCode")} className="w-full" type="submit">Submit</Button>
                    <div className="space-y-2">
                        <div className="flex items-center justify-center">
                            <Separator className="w-full"/>
                            <span
                                className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">Or</span>
                            <Separator className="w-full"/>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <Button onClick={() => setType("passkey")} className="flex-1" variant="outline">
                                <KeyIcon className="w-5 h-5 mr-2"/>
                                Passkey
                            </Button>
                        </div>
                    </div>
                    </form>

                </Form>

                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {"Don't have an account? "}
                    <Link className="underline cursor-pointer" to="/sign-up">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
