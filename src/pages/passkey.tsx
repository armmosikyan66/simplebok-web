import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {startRegistration} from '@simplewebauthn/browser';
import {generateRegistrationOptions, verifyRegistrationResponse} from "@/services/user.ts";
import {useToast} from "@/components/ui/use-toast.ts";

const Passkey = () => {
    const navigate = useNavigate();
    const {toast} = useToast()

    const register = async () => {
        const resp = await generateRegistrationOptions();

        let attResp;
        try {
            attResp = await startRegistration(resp);
        } catch (error) {
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

        const verificationResp = await verifyRegistrationResponse(attResp);

        if (verificationResp?.success) {
            navigate("/")
        } else {
            toast({
                variant: "destructive",
                title: String(verificationResp?.detail || "Something went wrong...")
            })
        }
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen px-4 md:px-6">
            <div className="max-w-md space-y-4 text-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Secure Your Account with a Passkey</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    A passkey is a secure, passwordless way to sign in to your account. It's more secure than a
                    traditional
                    password and easier to use. Create your passkey now to protect your account.
                </p>
                <div className="justify-center flex flex-col gap-2 sm:flex-row">
                    <Button onClick={register} className="w-full sm:w-auto">Create Passkey</Button>
                    <Button onClick={() => navigate("/")} className="w-full sm:w-auto" variant="outline">
                        Skip for Now
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Passkey;
