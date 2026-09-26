import { Head } from '@inertiajs/react';

export default function UnclaimedPolicy() {
    return (
        <>
            <Head title="Unclaimed Policy" />
            <div className="flex flex-1 flex-col p-4 md:p-6">
                <section className="mx-auto w-full max-w-5xl rounded-xl border border-sidebar-border/70 bg-white px-6 py-8 shadow-sm dark:border-sidebar-border dark:bg-neutral-900 md:px-12 md:py-10">
                    <div className="mx-auto max-w-3xl space-y-8 text-center">
                        <div>
                            <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Unclaimed Item Policy
                            </h1>
                            <p className="mt-2 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                                Items that remain unclaimed after one year may be
                                processed according to school policy, including
                                donation to the community where authorized.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Safety &amp; Security Review
                            </h2>
                            <p className="mt-2 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                                Staff review found items before release. Sensitive
                                information, such as identification documents,
                                should be handled only by authorized personnel.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                                Claim Verification
                            </h2>
                            <p className="mt-2 text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                                Claimants must provide an accurate description
                                and verification details. Staff may approve a
                                claim or decline it when requirements are not met.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

UnclaimedPolicy.layout = {
    breadcrumbs: [
        {
            title: 'Unclaimed Policy',
            href: '/unclaimed-policy',
        },
    ],
};