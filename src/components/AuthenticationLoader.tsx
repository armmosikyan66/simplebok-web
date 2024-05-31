const AuthenticationLoader = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="space-y-4 text-center">
                <div className="flex items-center justify-center">
                    <div
                        className="h-8 w-8 animate-spin rounded-full border-4 border-gray-500 border-t-transparent dark:border-gray-400"/>
                </div>
                <p className="text-gray-500 dark:text-gray-400">Checking authorization...</p>
            </div>
        </div>
    );
};

export default AuthenticationLoader;
