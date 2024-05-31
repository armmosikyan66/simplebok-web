import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAppSelector} from "@/hooks/redux.ts";

const Profile = () => {
    const {me} = useAppSelector(state => state.user);

    return (
        <div className="container mx-auto max-w-4xl py-12">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">Profile</h1>
                    <p className="text-gray-500 dark:text-gray-400">Update your profile information.</p>
                </div>
                <div className="rounded-lg border bg-white p-6 dark:border-gray-800 dark:bg-gray-950">
                    <div className="grid gap-6">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="flex items-center">
                                    <Input
                                        className="flex-1"
                                        value={me?.username}
                                        disabled={Boolean(me?.username)}
                                        id="username"
                                        placeholder="Enter your username"
                                        type="text"
                                    />
                                    <Button disabled={Boolean(me?.username)} className="ml-2">Edit</Button>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">After Submit you username cannot
                                    be
                                    changed.</p>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <div className="flex items-center">
                                    <Input
                                        className="flex-1"
                                        value={me?.email}
                                        id="email"
                                        placeholder="Enter your email"
                                        type="email"
                                    />
                                    <Button className="ml-2">Edit</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
