import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem, FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/hooks/redux.ts";
import {register} from "@/services/user.ts";
import {useToast} from "@/components/ui/use-toast.ts";

const FormSchema = z.object({
    email: z.string().email("Provided email doesn't valid")
})

function SignUp() {
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {email = ""} = useAppSelector(state => state.user.me);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: email,
        },
    });

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const res = await dispatch(register(data.email));

        if (res.type === "user/register/rejected") {
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

    return (
        <div className="flex h-screen items-center justify-center bg-white container">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign Up</h1>
                    <p className="text-gray-500 dark:text-gray-400">Enter your email to receive a verification code.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="u@exmaple.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button className="w-full" type="submit">Submit</Button>
                    </form>
                </Form>
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                    {"You have an account? "}
                    <Link className="underline cursor-pointer" to="/sign-in">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp
