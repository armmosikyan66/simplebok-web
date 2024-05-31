import {Button} from "@/components/ui/button.tsx";
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import {z} from "zod"
import {useToast} from "@/components/ui/use-toast.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@/hooks/redux.ts";
import {updateUsername} from "@/services/user.ts";
import {useEffect} from "react";

const FormSchema = z.object({
    username: z.string().min(5, "Username must be more than 4 letter").max(25, "Username must be less than 26 letter").regex(/^[^\s]+[a-zA-Z0-9_-]+$/, 'Username is not valid')
})

const Signup = () => {
    const {me} = useAppSelector(state => state.user)
    const {toast} = useToast();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
        },
    });

    useEffect(() => {
        if (me?.username) {
            // todo check the credentials
            navigate("/")
        }
    }, []);

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const res = await dispatch(updateUsername(data.username));

        if (res.type === "user/update-username/rejected") {
            if (typeof res?.payload === "string") {
                toast({
                    variant: "destructive",
                    title: res?.payload,
                })
            }
            return
        }
        // todo check the credentials
        navigate("/passkey");
    }

    return (
        <div className="flex h-screen items-center justify-center bg-white container">
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Choose a Username</h1>
                    <p className="text-gray-500 dark:text-gray-400">Choose a unique username for your account.</p>
                </div>
                <div className="w-full max-w-md">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({field}) => (
                                    <FormItem className="relative">
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input className="pr-10" placeholder="Enter a username"
                                                   type="text" {...field} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            {/*<div className="absolute w-full mt-2 max-h-40 overflow-y-auto rounded-md bg-white shadow-lg dark:bg-gray-800">*/}
                            {/*    <ul className="py-1">*/}
                            {/*        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">shadcn</li>*/}
                            {/*        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">acme</li>*/}
                            {/*        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">vercel</li>*/}
                            {/*        <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">tailwindcss</li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                            <div className="justify-center flex flex-col gap-2 sm:flex-row">
                                <Button className="w-full" type="submit">Submit</Button>
                                <Button onClick={() => navigate("/")} className="w-full" variant="outline">
                                    Skip for Now
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
