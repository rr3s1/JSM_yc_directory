import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { unstable_noStore } from "next/cache";

const Page = async () => {
    // Mark this route as dynamic (required for auth check)
    unstable_noStore();
    
    const session = await auth();

    if (!session) redirect("/");

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <h1 className="heading">Submit Your Startup</h1>
            </section>

            <StartupForm />
        </>
    );
};

export default Page;
